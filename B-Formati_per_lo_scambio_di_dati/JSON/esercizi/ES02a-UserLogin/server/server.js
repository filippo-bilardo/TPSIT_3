const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(cors());
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

function validateCredentials(username, password) {
  if (!username || username.length < 3 || username.length > 20) {
    return 'Username deve essere tra 3 e 20 caratteri';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username può contenere solo lettere, numeri e underscore';
  }
  if (!password || password.length < 6) {
    return 'Password deve essere almeno 6 caratteri';
  }
  return null;
}

// === API ===

// POST /register
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const validationError = validateCredentials(username, password);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    
    const data = await readUsers();
    
    const userExists = data.users.find(u => u.username === username);
    if (userExists) {
      return res.status(400).json({ error: 'Username già esistente' });
    }
    
    const newUser = {
      id: data.nextId++,
      username,
      password, // ⚠️ PASSWORD IN CHIARO - SOLO EDUCATIVO!
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
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username e password obbligatori' });
    }
    
    const data = await readUsers();
    const user = data.users.find(u => u.username === username);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }
    
    res.json({
      success: true,
      message: 'Login effettuato con successo',
      user: { id: user.id, username: user.username, createdAt: user.createdAt }
    });
  } catch (error) {
    console.error('Errore login:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// GET /users
app.get('/users', async (req, res) => {
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
  console.log(`🚀 Server ES02a su https://w4s-3001.filippobilardo.it`);
  console.log(`⚠️  ATTENZIONE: Versione educativa - password in chiaro!`);
});
