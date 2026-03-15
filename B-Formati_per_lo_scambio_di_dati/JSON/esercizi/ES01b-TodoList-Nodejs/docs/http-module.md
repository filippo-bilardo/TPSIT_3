# Modulo HTTP di Node.js - Guida Completa

## Indice
- [Introduzione](#introduzione)
- [Creare un Server HTTP](#creare-un-server-http)
- [Request Object](#request-object)
- [Response Object](#response-object)
- [Routing Manuale](#routing-manuale)
- [Parsing URL e Query Parameters](#parsing-url-e-query-parameters)
- [Parsing Body](#parsing-body)
- [Headers e CORS](#headers-e-cors)
- [Metodi HTTP](#metodi-http)
- [Status Codes](#status-codes)
- [Gestione Errori](#gestione-errori)
- [Best Practices](#best-practices)
- [Esempi Pratici](#esempi-pratici)

---

## Introduzione

### Cos'è il modulo HTTP?

Il **modulo HTTP** è un modulo nativo di Node.js che permette di creare server e client HTTP senza bisogno di framework esterni.

```javascript
const http = require('http');
```

**Caratteristiche:**
- ✅ Nativo di Node.js (nessuna installazione)
- ✅ Basso livello (controllo completo)
- ✅ Leggero (nessuna dipendenza)
- ⚠️ Verboso (molto codice manuale)
- ⚠️ Nessun routing automatico
- ⚠️ Nessun parsing automatico

**Quando usarlo:**
- Imparare come funziona HTTP
- Progetti semplicissimi (1-5 endpoint)
- Massime prestazioni (zero overhead)
- Evitare dipendenze esterne

**Quando NON usarlo:**
- API complesse (usa Express, Fastify, Koa)
- Serve middleware avanzato
- Progetti di produzione

---

## Creare un Server HTTP

### Server Minimo

```javascript
const http = require('http');

// Crea server
const server = http.createServer((req, res) => {
  // req = richiesta in arrivo
  // res = risposta da inviare
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

// Avvia server sulla porta 3000
server.listen(3000, () => {
  console.log('Server in ascolto su https://w4s-3001.filippobilardo.it');
});
```

**Test:**
```bash
node server.js
curl https://w4s-3001.filippobilardo.it
# Output: Hello World!
```

### Server con Callback

```javascript
function requestHandler(req, res) {
  console.log(`Richiesta ricevuta: ${req.method} ${req.url}`);
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Benvenuto!</h1>');
}

const server = http.createServer(requestHandler);
server.listen(3000);
```

### Cambiare Porta

```javascript
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server su porta ${PORT}`);
});
```

**Uso:**
```bash
PORT=8080 node server.js
# Server su porta 8080
```

---

## Request Object

L'oggetto `req` contiene tutte le informazioni sulla richiesta HTTP.

### Proprietà Principali

```javascript
http.createServer((req, res) => {
  // Metodo HTTP
  console.log(req.method);        // GET, POST, PUT, DELETE...
  
  // URL completo
  console.log(req.url);           // /users?name=mario&age=30
  
  // Headers
  console.log(req.headers);       // Oggetto con tutti gli headers
  console.log(req.headers['content-type']);  // application/json
  console.log(req.headers['user-agent']);    // Mozilla/5.0...
  
  // Versione HTTP
  console.log(req.httpVersion);   // 1.1
  
  // IP del client
  console.log(req.socket.remoteAddress);  // ::1 (localhost)
  
  res.end('OK');
});
```

### Leggere Headers Specifici

```javascript
http.createServer((req, res) => {
  const contentType = req.headers['content-type'];
  const authorization = req.headers['authorization'];
  const userAgent = req.headers['user-agent'];
  
  console.log('Content-Type:', contentType);
  console.log('Authorization:', authorization);
  console.log('User-Agent:', userAgent);
  
  res.end('Headers ricevuti');
});
```

### Request come Stream

La richiesta è uno **stream readable**, utile per leggere il body.

```javascript
http.createServer((req, res) => {
  let body = '';
  
  // Dati in arrivo
  req.on('data', chunk => {
    body += chunk.toString();
    console.log('Chunk ricevuto:', chunk.length, 'bytes');
  });
  
  // Fine della richiesta
  req.on('end', () => {
    console.log('Body completo:', body);
    res.end('Dati ricevuti');
  });
  
  // Errore durante la lettura
  req.on('error', err => {
    console.error('Errore:', err);
    res.statusCode = 500;
    res.end('Errore lettura dati');
  });
});
```

---

## Response Object

L'oggetto `res` permette di inviare la risposta al client.

### Metodi Principali

```javascript
http.createServer((req, res) => {
  
  // 1. Imposta status code e headers
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'Valore'
  });
  
  // 2. Invia corpo della risposta
  res.write('Prima parte');
  res.write('Seconda parte');
  
  // 3. Termina la risposta
  res.end('Ultima parte');
  
  // OPPURE tutto insieme:
  // res.end('Tutto il corpo');
});
```

### Status Code

```javascript
// Metodo 1: con writeHead
res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end('Not Found');

// Metodo 2: con statusCode
res.statusCode = 201;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ created: true }));
```

### Headers

```javascript
// Imposta header singolo
res.setHeader('Content-Type', 'text/html');
res.setHeader('X-Powered-By', 'Node.js');

// Imposta multipli headers
res.writeHead(200, {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*'
});

// Leggi header già impostato
const contentType = res.getHeader('Content-Type');

// Rimuovi header
res.removeHeader('X-Powered-By');
```

### Inviare JSON

```javascript
function sendJSON(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Uso
http.createServer((req, res) => {
  const data = { message: 'Hello', timestamp: Date.now() };
  sendJSON(res, data);
});
```

### Redirect

```javascript
http.createServer((req, res) => {
  res.writeHead(302, { 'Location': '/new-page' });
  res.end();
  
  // Oppure 301 (permanent)
  res.writeHead(301, { 'Location': 'https://example.com' });
  res.end();
});
```

---

## Routing Manuale

Il modulo HTTP non ha routing automatico. Devi gestirlo manualmente.

### Routing Base con if/else

```javascript
http.createServer((req, res) => {
  const { method, url } = req;
  
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  }
  else if (method === 'GET' && url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Page</h1>');
  }
  else if (method === 'GET' && url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: ['Mario', 'Luigi'] }));
  }
  else {
    // 404 Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page Not Found');
  }
});
```

### Routing con switch

```javascript
http.createServer((req, res) => {
  const { method, url } = req;
  const route = `${method} ${url}`;
  
  switch (route) {
    case 'GET /':
      res.end('Home');
      break;
      
    case 'GET /users':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([{ id: 1, name: 'Mario' }]));
      break;
      
    case 'POST /users':
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ created: true }));
      break;
      
    default:
      res.writeHead(404);
      res.end('Not Found');
  }
});
```

### Routing con RegEx (parametri URL)

```javascript
http.createServer((req, res) => {
  const { method, url } = req;
  
  // GET /users/123
  const userMatch = url.match(/^\/users\/(\d+)$/);
  if (method === 'GET' && userMatch) {
    const userId = userMatch[1];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ id: userId, name: 'Mario' }));
    return;
  }
  
  // DELETE /users/123
  const deleteMatch = url.match(/^\/users\/(\d+)$/);
  if (method === 'DELETE' && deleteMatch) {
    const userId = deleteMatch[1];
    res.writeHead(204); // No Content
    res.end();
    return;
  }
  
  res.writeHead(404);
  res.end('Not Found');
});
```

### Router Function

```javascript
function router(req, res) {
  const { method, url } = req;
  
  // GET /
  if (method === 'GET' && url === '/') {
    return handleHome(req, res);
  }
  
  // GET /users
  if (method === 'GET' && url === '/users') {
    return handleGetUsers(req, res);
  }
  
  // POST /users
  if (method === 'POST' && url === '/users') {
    return handleCreateUser(req, res);
  }
  
  // 404
  res.writeHead(404);
  res.end('Not Found');
}

function handleHome(req, res) {
  res.end('Home Page');
}

function handleGetUsers(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify([{ id: 1, name: 'Mario' }]));
}

function handleCreateUser(req, res) {
  // Leggi body, crea user, ecc.
  res.writeHead(201);
  res.end('User created');
}

// Server
http.createServer(router).listen(3000);
```

---

## Parsing URL e Query Parameters

### Parsing URL con URL API

```javascript
const http = require('http');
const { URL } = require('url');

http.createServer((req, res) => {
  // Crea oggetto URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  
  const pathname = parsedUrl.pathname;      // /search
  const search = parsedUrl.search;          // ?q=node&limit=10
  const searchParams = parsedUrl.searchParams;
  
  console.log('Pathname:', pathname);
  console.log('Query string:', search);
  console.log('Query params:', searchParams);
  
  res.end('OK');
});
```

### Leggere Query Parameters

```javascript
http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  // GET singolo parametro
  const q = url.searchParams.get('q');           // "node"
  const limit = url.searchParams.get('limit');   // "10" (stringa!)
  
  // GET con default
  const page = url.searchParams.get('page') || '1';
  
  // Converti a numero
  const limitNum = parseInt(limit) || 10;
  
  // GET tutti i valori di un parametro (array)
  // URL: ?tag=js&tag=node
  const tags = url.searchParams.getAll('tag');  // ["js", "node"]
  
  // Controlla esistenza
  const hasFilter = url.searchParams.has('filter');  // true/false
  
  console.log('q:', q);
  console.log('limit:', limitNum);
  console.log('tags:', tags);
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ q, limit: limitNum, tags }));
});
```

### Esempio Completo: Ricerca

```javascript
http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  if (url.pathname === '/search') {
    const query = url.searchParams.get('q') || '';
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const offset = parseInt(url.searchParams.get('offset')) || 0;
    
    // Simula ricerca
    const results = [
      { id: 1, title: `Risultato per: ${query}` },
      { id: 2, title: `Altro risultato: ${query}` }
    ].slice(offset, offset + limit);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      query,
      total: 2,
      limit,
      offset,
      results
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});
```

---

## Parsing Body

### Parsing JSON Body

```javascript
function parseJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = body ? JSON.parse(body) : {};
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
    
    req.on('error', reject);
  });
}

// Uso
http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/users') {
    try {
      const body = await parseJSONBody(req);
      
      console.log('Dati ricevuti:', body);
      
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: body }));
      
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});
```

### Parsing con Limite di Dimensione

```javascript
function parseJSONBody(req, maxSize = 1024 * 1024) { // 1MB default
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    
    req.on('data', chunk => {
      size += chunk.length;
      
      if (size > maxSize) {
        req.connection.destroy();
        reject(new Error('Body troppo grande'));
        return;
      }
      
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = body ? JSON.parse(body) : {};
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}
```

---

## Headers e CORS

### Impostare Headers Comuni

```javascript
http.createServer((req, res) => {
  // Content-Type
  res.setHeader('Content-Type', 'application/json');
  
  // Cache
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  res.end(JSON.stringify({ ok: true }));
});
```

### CORS (Cross-Origin Resource Sharing)

```javascript
http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // Normale risposta
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'CORS enabled' }));
});
```

### CORS con Dominio Specifico

```javascript
const ALLOWED_ORIGINS = [
  'https://w4s-3001.filippobilardo.it',
  'http://localhost:8080',
  'https://miodominio.com'
];

http.createServer((req, res) => {
  const origin = req.headers.origin;
  
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  res.end('OK');
});
```

---

## Metodi HTTP

### GET - Leggere Risorse

```javascript
if (req.method === 'GET' && req.url === '/users') {
  const users = [{ id: 1, name: 'Mario' }];
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}
```

### POST - Creare Risorse

```javascript
if (req.method === 'POST' && req.url === '/users') {
  const body = await parseJSONBody(req);
  
  const newUser = {
    id: Date.now(),
    name: body.name,
    createdAt: new Date().toISOString()
  };
  
  // Salva in database...
  
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newUser));
}
```

### PUT - Aggiornare Completo

```javascript
const match = req.url.match(/^\/users\/(\d+)$/);
if (req.method === 'PUT' && match) {
  const id = parseInt(match[1]);
  const body = await parseJSONBody(req);
  
  const updatedUser = {
    id,
    name: body.name,
    email: body.email,
    updatedAt: new Date().toISOString()
  };
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(updatedUser));
}
```

### PATCH - Aggiornare Parziale

```javascript
const match = req.url.match(/^\/users\/(\d+)$/);
if (req.method === 'PATCH' && match) {
  const id = parseInt(match[1]);
  const body = await parseJSONBody(req);
  
  // Aggiorna solo i campi forniti
  const user = { id, name: 'Mario', email: 'mario@example.com' };
  const updated = { ...user, ...body };
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(updated));
}
```

### DELETE - Eliminare

```javascript
const match = req.url.match(/^\/users\/(\d+)$/);
if (req.method === 'DELETE' && match) {
  const id = parseInt(match[1]);
  
  // Elimina dal database...
  
  // 204 No Content (senza body)
  res.writeHead(204);
  res.end();
}
```

---

## Status Codes

### Status Codes Comuni

```javascript
// 2xx Success
res.writeHead(200); // OK
res.writeHead(201); // Created
res.writeHead(204); // No Content

// 3xx Redirection
res.writeHead(301, { 'Location': '/new-url' }); // Moved Permanently
res.writeHead(302, { 'Location': '/temp-url' }); // Found (temporary)

// 4xx Client Errors
res.writeHead(400); // Bad Request
res.writeHead(401); // Unauthorized
res.writeHead(403); // Forbidden
res.writeHead(404); // Not Found
res.writeHead(409); // Conflict

// 5xx Server Errors
res.writeHead(500); // Internal Server Error
res.writeHead(503); // Service Unavailable
```

### Helper per Risposte

```javascript
function sendSuccess(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function sendCreated(res, data) {
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function sendNoContent(res) {
  res.writeHead(204);
  res.end();
}

function sendBadRequest(res, message) {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
}

function sendNotFound(res, message = 'Not Found') {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
}

function sendServerError(res, message = 'Internal Server Error') {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
}
```

---

## Gestione Errori

### Try-Catch Globale

```javascript
http.createServer(async (req, res) => {
  try {
    await router(req, res);
  } catch (error) {
    console.error('Errore:', error);
    
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal Server Error',
      message: error.message
    }));
  }
});
```

### Validazione Input

```javascript
async function handleCreateUser(req, res) {
  try {
    const body = await parseJSONBody(req);
    
    // Validazione
    if (!body.name || typeof body.name !== 'string') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Nome obbligatorio' }));
      return;
    }
    
    if (body.name.length < 3) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Nome troppo corto' }));
      return;
    }
    
    // Crea user...
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ created: true }));
    
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
}
```

---

## Best Practices

### 1. Logging

```javascript
http.createServer((req, res) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  
  router(req, res);
});
```

### 2. Timeout

```javascript
const server = http.createServer((req, res) => {
  // Timeout richiesta (30 secondi)
  req.setTimeout(30000, () => {
    res.writeHead(408, { 'Content-Type': 'text/plain' });
    res.end('Request Timeout');
  });
  
  router(req, res);
});

// Timeout server
server.setTimeout(60000);
```

### 3. Graceful Shutdown

```javascript
const server = http.createServer(router);

process.on('SIGTERM', () => {
  console.log('SIGTERM ricevuto, chiusura server...');
  
  server.close(() => {
    console.log('Server chiuso');
    process.exit(0);
  });
});
```

---

## Esempi Pratici

### API REST Completa (Todo List)

Vedi il file `../server/server.js` per un esempio completo di REST API con:
- GET /todos
- POST /todos
- PATCH /todos/:id/toggle
- DELETE /todos/:id
- GET /stats

---

## Risorse Aggiuntive

### Documentazione Ufficiale
- [Node.js HTTP Module](https://nodejs.org/api/http.html)
- [Node.js URL API](https://nodejs.org/api/url.html)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

### Tutorial
- [Node.js HTTP Tutorial](https://nodejs.dev/learn/the-nodejs-http-module)
- [MDN: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)

---

**Buono studio!** 🚀
