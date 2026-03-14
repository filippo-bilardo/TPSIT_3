# Express.js - Guida Completa

## Indice
- [Introduzione](#introduzione)
- [Installazione e Setup](#installazione-e-setup)
- [Concetti Fondamentali](#concetti-fondamentali)
- [Routing](#routing)
- [Middleware](#middleware)
- [Request e Response](#request-e-response)
- [REST API con Express](#rest-api-con-express)
- [Gestione Errori](#gestione-errori)
- [Best Practices](#best-practices)

---

## Introduzione

### Cos'è Express.js?

**Express.js** è un framework web minimalista e flessibile per Node.js che fornisce un set robusto di funzionalità per applicazioni web e API.

**Caratteristiche principali:**
- 🚀 Veloce e leggero
- 🔧 Minimalista ma estendibile
- 🛣️ Sistema di routing potente
- 🔌 Middleware componibili
- 📡 Ideale per REST API
- 📦 Vasto ecosistema di plugin

**Quando usarlo:**
- Creare REST API
- Server web per applicazioni SPA (React, Vue, Angular)
- Backend per applicazioni mobile
- Microservizi
- Server-side rendering

---

## Installazione e Setup

### Installazione

```bash
# Inizializza progetto Node.js
npm init -y

# Installa Express
npm install express

# Dipendenze comuni
npm install cors              # Cross-Origin Resource Sharing
npm install morgan            # HTTP request logger (opzionale)
```

### Server Minimo

```javascript
// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Route base
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Avvia server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
```

**Esecuzione:**
```bash
node server.js
```

**Con auto-reload (sviluppo):**
```bash
# Installa nodemon
npm install --save-dev nodemon

# Esegui
npx nodemon server.js

# Oppure aggiungi script in package.json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## Concetti Fondamentali

### 1. Applicazione Express

```javascript
const express = require('express');
const app = express(); // Crea applicazione Express

// app è l'oggetto principale che gestisce:
// - Routing
// - Middleware
// - Configurazione
// - Server HTTP
```

### 2. Request-Response Cycle

```
Client → HTTP Request → Express → Route Handler → Response → Client
              ↓
          Middleware
```

### 3. Metodi HTTP

```javascript
app.get('/path', handler);     // Leggi risorsa
app.post('/path', handler);    // Crea risorsa
app.put('/path', handler);     // Aggiorna risorsa (completa)
app.patch('/path', handler);   // Aggiorna risorsa (parziale)
app.delete('/path', handler);  // Elimina risorsa
app.all('/path', handler);     // Tutti i metodi
```

### 4. Route Handler

```javascript
// Firma: (req, res, next) => {}
app.get('/hello', (req, res) => {
  res.send('Ciao!');
});

// req  = request object  (dati in arrivo)
// res  = response object (dati in uscita)
// next = funzione per passare al prossimo middleware
```

---

## Routing

### Route Base

```javascript
// GET /users
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Mario' }]);
});

// POST /users
app.post('/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
});

// PUT /users/:id
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({ id, updated: true });
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  res.status(204).send(); // No content
});
```

### Route Parameters

```javascript
// URL: /users/123
app.get('/users/:id', (req, res) => {
  const userId = req.params.id; // "123"
  res.json({ id: userId });
});

// Parametri multipli
// URL: /users/123/posts/456
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});
```

### Query Parameters

```javascript
// URL: /search?q=express&sort=date&limit=10
app.get('/search', (req, res) => {
  const query = req.query.q;        // "express"
  const sort = req.query.sort;      // "date"
  const limit = req.query.limit;    // "10" (stringa!)
  
  res.json({ query, sort, limit: parseInt(limit) });
});
```

### Express Router

```javascript
// users.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Mario' }]);
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;

// server.js
const usersRouter = require('./users.routes');
app.use('/users', usersRouter); // Tutte le route iniziano con /users
```

---

## Middleware

### Cos'è un Middleware?

Un middleware è una funzione che ha accesso a `req`, `res` e `next`. Viene eseguita **prima** del route handler.

```javascript
// Struttura middleware
function myMiddleware(req, res, next) {
  // 1. Fa qualcosa con req/res
  console.log('Middleware eseguito');
  
  // 2. Passa al prossimo middleware/route
  next();
  
  // Se non chiami next(), la richiesta si blocca!
}
```

### Middleware Globale

```javascript
// Applicato a TUTTE le route
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/test', (req, res) => {
  res.send('Test');
});
// Log: GET /test
```

### Middleware Built-in

```javascript
// 1. Servire file statici
app.use(express.static('public')); // Serve file da cartella public/

// 2. Parse JSON body
app.use(express.json()); // Converte body JSON in req.body

// 3. Parse URL-encoded forms
app.use(express.urlencoded({ extended: true }));
```

### Middleware di Terze Parti

```javascript
const cors = require('cors');

// CORS - Cross-Origin Resource Sharing
app.use(cors()); // Permette richieste da altri domini

// CORS configurato
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
```

### Middleware per Route Specifiche

```javascript
// Solo per /admin/*
app.use('/admin', authMiddleware);

app.get('/admin/dashboard', (req, res) => {
  res.send('Dashboard'); // authMiddleware viene eseguito prima
});

// Multipli middleware per una route
app.get('/protected', 
  authMiddleware, 
  validateMiddleware, 
  (req, res) => {
    res.send('Protetto');
  }
);
```

### Ordine di Esecuzione

```javascript
// 1️⃣ Eseguito per tutte le richieste
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

// 2️⃣ Eseguito solo per /api/*
app.use('/api', (req, res, next) => {
  console.log('Middleware 2');
  next();
});

// 3️⃣ Route handler
app.get('/api/users', (req, res) => {
  console.log('Handler');
  res.send('Users');
});

// Output per GET /api/users:
// Middleware 1
// Middleware 2
// Handler
```

---

## Request e Response

### Request Object (req)

```javascript
app.get('/example', (req, res) => {
  // URL parameters
  req.params.id;          // /users/:id → { id: "123" }
  
  // Query parameters
  req.query.search;       // /search?search=test → { search: "test" }
  
  // Body (con express.json())
  req.body.name;          // POST { "name": "Mario" } → { name: "Mario" }
  
  // Headers
  req.headers['content-type'];  // application/json
  req.get('Content-Type');      // Alternativa
  
  // Metodo HTTP
  req.method;             // GET, POST, PUT, DELETE...
  
  // URL
  req.url;                // /users?sort=name
  req.path;               // /users
  req.originalUrl;        // URL completo
  
  // IP client
  req.ip;                 // "127.0.0.1"
});
```

### Response Object (res)

```javascript
app.get('/example', (req, res) => {
  // 1. Inviare testo
  res.send('Hello World');
  
  // 2. Inviare JSON
  res.json({ message: 'Success' });
  
  // 3. Status code
  res.status(404).send('Not Found');
  res.status(201).json({ created: true });
  
  // 4. Redirect
  res.redirect('/login');
  res.redirect(301, '/new-url'); // Permanent redirect
  
  // 5. Inviare file
  res.sendFile('/path/to/file.pdf');
  res.download('/path/to/file.pdf', 'documento.pdf');
  
  // 6. Set headers
  res.set('Content-Type', 'text/html');
  res.setHeader('X-Custom-Header', 'value');
  
  // 7. End response (senza body)
  res.end();
  res.status(204).end(); // No content
});
```

### Status Codes Comuni

```javascript
// Success
res.status(200); // OK
res.status(201); // Created
res.status(204); // No Content

// Client Errors
res.status(400); // Bad Request
res.status(401); // Unauthorized
res.status(403); // Forbidden
res.status(404); // Not Found
res.status(409); // Conflict

// Server Errors
res.status(500); // Internal Server Error
res.status(503); // Service Unavailable
```

---

## REST API con Express

### Esempio: Todo List REST API

Vedi il file `../server/server.js` per un esempio completo di REST API con Express.

**Endpoint disponibili:**
```javascript
GET    /todos              // Lista tutti i todo
GET    /todos/:id          // Dettagli todo singolo
POST   /todos              // Crea nuovo todo
PUT    /todos/:id          // Aggiorna todo completo
PATCH  /todos/:id/toggle   // Cambia stato completed
DELETE /todos/:id          // Elimina todo
GET    /stats              // Statistiche
```

**Esempio implementazione:**
```javascript
// GET /todos
app.get('/todos', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.todos);
  } catch (error) {
    res.status(500).json({ error: 'Errore server' });
  }
});

// POST /todos
app.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Validazione
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Titolo obbligatorio' });
    }
    
    const data = await readData();
    const newTodo = {
      id: data.nextId++,
      title: title.trim(),
      description: description?.trim() || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    data.todos.push(newTodo);
    await writeData(data);
    
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Errore server' });
  }
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await readData();
    
    const initialLength = data.todos.length;
    data.todos = data.todos.filter(t => t.id !== id);
    
    if (data.todos.length === initialLength) {
      return res.status(404).json({ error: 'Todo non trovato' });
    }
    
    await writeData(data);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Errore server' });
  }
});
```

---

## Gestione Errori

### Error Handler Middleware

```javascript
// Deve avere 4 parametri: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    error: err.message || 'Errore interno del server'
  });
});
```

### Try-Catch in Route Handler

```javascript
app.get('/todos/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      throw new Error('ID non valido');
    }
    
    const data = await readData();
    const todo = data.todos.find(t => t.id === id);
    
    if (!todo) {
      const error = new Error('Todo non trovato');
      error.status = 404;
      throw error;
    }
    
    res.json(todo);
  } catch (error) {
    next(error); // Passa al error handler
  }
});
```

---

## Best Practices

### 1. Struttura del Progetto

```
project/
├── server/
│   ├── server.js          # Entry point
│   ├── package.json
│   └── data.json          # Database simulato
├── client/                # Frontend
│   ├── index.html
│   ├── app.js
│   └── style.css
└── docs/                  # Documentazione
    └── express.md
```

### 2. Validazione Input

```javascript
const validateTodo = (req, res, next) => {
  const { title } = req.body;
  
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Titolo non valido' });
  }
  
  if (title.length > 200) {
    return res.status(400).json({ error: 'Titolo troppo lungo' });
  }
  
  next();
};

app.post('/todos', validateTodo, async (req, res) => {
  // Input già validato
  // ...
});
```

### 3. CORS Configurato

```javascript
const cors = require('cors');

// Sviluppo - permissivo
app.use(cors());

// Produzione - restrittivo
app.use(cors({
  origin: 'https://miodominio.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
```

### 4. Persistenza con File JSON

```javascript
const fs = require('fs').promises;
const path = require('path');
const DATA_FILE = path.join(__dirname, 'data.json');

// Leggi dati
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { todos: [], nextId: 1 };
  }
}

// Scrivi dati
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}
```

### 5. Gestione 404

```javascript
// Dopo tutte le route
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint non trovato' });
});
```

---

## Risorse Aggiuntive

### Documentazione Ufficiale
- [Express.js Docs](https://expressjs.com/)
- [Express API Reference](https://expressjs.com/en/4x/api.html)
- [Express Guide](https://expressjs.com/en/guide/routing.html)

### Middleware Popolari
- [cors](https://www.npmjs.com/package/cors) - CORS
- [helmet](https://www.npmjs.com/package/helmet) - Security headers
- [morgan](https://www.npmjs.com/package/morgan) - HTTP logger
- [express-validator](https://www.npmjs.com/package/express-validator) - Validazione

### Tutorial
- [Express.js Tutorial - MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [Node.js + Express Tutorial](https://www.javascripttutorial.net/nodejs-tutorial/express/)

---

**Buono studio!** 🚀
