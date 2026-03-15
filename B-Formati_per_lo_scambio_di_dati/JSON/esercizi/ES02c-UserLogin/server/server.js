const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fs = require('fs').promises;
const path = require('path');

const { authenticateToken, optionalAuth } = require('./middleware/auth');
const { requireRole, requireAdmin } = require('./middleware/rbac');
const { JWT_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = require('./config/jwt.config');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'users.json');
const REFRESH_TOKENS_FILE = path.join(__dirname, 'refresh-tokens.json');
const SALT_ROUNDS = 10;

// === MIDDLEWARE ===

app.use(cors({
  origin: 'https://w4s-3001.filippobilardo.it',
  credentials: true
}));

app.use(express.json());
app.use(express.static('../client'));

// === UTILITY ===

async function readUsers() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [], nextId: 1 };
  }
}

async function writeUsers(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function readRefreshTokens() {
  try {
    const data = await fs.readFile(REFRESH_TOKENS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { tokens: [] };
  }
}

async function writeRefreshTokens(data) {
  await fs.writeFile(REFRESH_TOKENS_FILE, JSON.stringify(data, null, 2));
}

// JWT Helpers
function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
}

// === VALIDATORI ===

const registerValidators = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username deve essere tra 3 e 20 caratteri')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username può contenere solo lettere, numeri e underscore'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password deve essere almeno 8 caratteri')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password deve contenere maiuscole, minuscole e numeri'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role deve essere user o admin')
];

const loginValidators = [
  body('username').trim().notEmpty().withMessage('Username obbligatorio'),
  body('password').notEmpty().withMessage('Password obbligatoria')
];

// === API ===

// POST /register
app.post('/register', registerValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { username, password, role = 'user' } = req.body;
    const data = await readUsers();

    const userExists = data.users.find(u => u.username === username);
    if (userExists) {
      return res.status(400).json({ error: 'Username già esistente' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = {
      id: data.nextId++,
      username,
      password: hashedPassword,
      role,
      createdAt: new Date().toISOString()
    };

    data.users.push(newUser);
    await writeUsers(data);

    res.status(201).json({
      success: true,
      message: 'Utente registrato con successo',
      user: { id: newUser.id, username: newUser.username, role: newUser.role }
    });
  } catch (error) {
    console.error('Errore registrazione:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// POST /login
app.post('/login', loginValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { username, password } = req.body;
    const data = await readUsers();
    const user = data.users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    // Genera token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Salva refresh token
    const refreshData = await readRefreshTokens();
    refreshData.tokens.push({
      token: refreshToken,
      userId: user.id,
      createdAt: new Date().toISOString()
    });
    await writeRefreshTokens(refreshData);

    res.json({
      success: true,
      message: 'Login effettuato con successo',
      accessToken,
      refreshToken,
      user: { 
        id: user.id, 
        username: user.username,
        role: user.role,
        createdAt: user.createdAt 
      }
    });
  } catch (error) {
    console.error('Errore login:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// POST /refresh
app.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token mancante' });
    }

    // Verifica refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    // Controlla whitelist
    const refreshData = await readRefreshTokens();
    const tokenExists = refreshData.tokens.find(t => t.token === refreshToken);

    if (!tokenExists) {
      return res.status(403).json({ error: 'Refresh token non valido' });
    }

    // Ottieni utente
    const userData = await readUsers();
    const user = userData.users.find(u => u.id === decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    // Genera nuovo access token
    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token scaduto' });
    }
    console.error('Errore refresh:', error);
    res.status(403).json({ error: 'Refresh token non valido' });
  }
});

// POST /logout
app.post('/logout', authenticateToken, async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Rimuovi refresh token da whitelist
      const refreshData = await readRefreshTokens();
      refreshData.tokens = refreshData.tokens.filter(t => t.token !== refreshToken);
      await writeRefreshTokens(refreshData);
    }

    res.json({ success: true, message: 'Logout effettuato' });
  } catch (error) {
    console.error('Errore logout:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// GET /me (route protetta)
app.get('/me', authenticateToken, async (req, res) => {
  try {
    const data = await readUsers();
    const user = data.users.find(u => u.id === req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Errore /me:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// GET /users (route protetta)
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const data = await readUsers();
    const users = data.users.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role,
      createdAt: u.createdAt
    }));
    res.json(users);
  } catch (error) {
    console.error('Errore lista utenti:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// GET /admin/stats (route ADMIN-ONLY)
app.get('/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const data = await readUsers();
    
    const stats = {
      totalUsers: data.users.length,
      totalAdmins: data.users.filter(u => u.role === 'admin').length,
      totalRegularUsers: data.users.filter(u => u.role === 'user').length,
      recentUsers: data.users
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(u => ({
          id: u.id,
          username: u.username,
          role: u.role,
          createdAt: u.createdAt
        }))
    };

    res.json(stats);
  } catch (error) {
    console.error('Errore stats:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// DELETE /admin/users/:id (route ADMIN-ONLY)
app.delete('/admin/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const data = await readUsers();

    const userIndex = data.users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    // Non permettere auto-cancellazione
    if (userId === req.user.userId) {
      return res.status(400).json({ error: 'Non puoi eliminare il tuo account admin da qui' });
    }

    const deletedUser = data.users.splice(userIndex, 1)[0];
    await writeUsers(data);

    res.json({
      success: true,
      message: `Utente ${deletedUser.username} eliminato`,
      deletedUser: { id: deletedUser.id, username: deletedUser.username }
    });
  } catch (error) {
    console.error('Errore eliminazione:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint non trovato' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Errore:', err);
  res.status(500).json({ error: 'Errore interno del server' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ES02c su https://w4s-3001.filippobilardo.it`);
  console.log(`✅ JWT Authentication attivo`);
  console.log(`✅ RBAC (Role-Based Access Control) attivo`);
  console.log(`✅ Access Token: ${ACCESS_TOKEN_EXPIRY}`);
  console.log(`✅ Refresh Token: ${REFRESH_TOKEN_EXPIRY}`);
});
