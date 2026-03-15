const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const fs = require('fs').promises;
const path = require('path');
const { requireAuth } = require('./middleware/auth');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'users.json');
const SALT_ROUNDS = 10;

// === MIDDLEWARE ===

app.use(cors({
  origin: 'https://w4s-3001.filippobilardo.it',
  credentials: true
}));

app.use(express.json());
app.use(express.static('../client'));

// Configurazione sessioni
app.use(session({
  secret: 'es02b-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 ore
  }
}));

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
    .withMessage('Password deve contenere maiuscole, minuscole e numeri')
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
      return res.status(400).json({ 
        error: errors.array()[0].msg 
      });
    }

    const { username, password } = req.body;
    const data = await readUsers();

    const userExists = data.users.find(u => u.username === username);
    if (userExists) {
      return res.status(400).json({ error: 'Username già esistente' });
    }

    // Hash password con bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = {
      id: data.nextId++,
      username,
      password: hashedPassword,  // ✅ Password hashata!
      createdAt: new Date().toISOString()
    };

    data.users.push(newUser);
    await writeUsers(data);

    res.status(201).json({
      success: true,
      message: 'Utente registrato con successo',
      user: { id: newUser.id, username: newUser.username }
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
      return res.status(400).json({ 
        error: errors.array()[0].msg 
      });
    }

    const { username, password } = req.body;
    const data = await readUsers();
    const user = data.users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    // Verifica password con bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    // Crea sessione
    req.session.userId = user.id;

    res.json({
      success: true,
      message: 'Login effettuato con successo',
      user: { 
        id: user.id, 
        username: user.username,
        createdAt: user.createdAt 
      }
    });
  } catch (error) {
    console.error('Errore login:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// POST /logout
app.post('/logout', requireAuth, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Errore durante il logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logout effettuato' });
  });
});

// GET /me (route protetta)
app.get('/me', requireAuth, async (req, res) => {
  try {
    const data = await readUsers();
    const user = data.users.find(u => u.id === req.session.userId);

    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    res.json({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Errore /me:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// GET /users (route protetta)
app.get('/users', requireAuth, async (req, res) => {
  try {
    const data = await readUsers();
    const users = data.users.map(u => ({
      id: u.id,
      username: u.username,
      createdAt: u.createdAt
    }));
    res.json(users);
  } catch (error) {
    console.error('Errore lista utenti:', error);
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
  console.log(`🚀 Server ES02b su https://w4s-3001.filippobilardo.it`);
  console.log(`✅ Bcrypt attivo - Password hashate`);
  console.log(`✅ Express-session attivo - Sessioni server-side`);
});
