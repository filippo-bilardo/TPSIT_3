# ES01b - TodoList con Node.js (Modulo HTTP)

## 📋 Descrizione

Versione **semplificata** della TodoList usando **solo il modulo HTTP nativo** di Node.js, senza framework esterni.

Questa esercitazione ti permette di comprendere i **fondamenti del server HTTP** prima di passare a framework come Express.

---

## 🎯 Obiettivi

- Comprendere il modulo `http` di Node.js
- Gestire richieste HTTP manualmente (parsing URL, body, headers)
- Creare una REST API minimale senza framework
- Persistenza dati con file JSON
- Client con Fetch API

---

## 🏗️ Architettura

```
┌─────────────┐         HTTP         ┌─────────────┐         File I/O     ┌─────────────┐
│   Browser   │ ◄──────────────────► │   Server    │ ◄──────────────────► │  data.json  │
│  (Client)   │    Fetch API         │ (Node.js)   │    fs.promises       │  (Storage)  │
└─────────────┘                      └─────────────┘                      └─────────────┘
```

**Differenze con ES01c:**
- ❌ Nessun framework (no Express)
- ✅ Solo modulo `http` nativo
- ✅ Parsing manuale URL e body
- ✅ Codice più verboso ma educativo
- ⭐ Ideale per capire come funziona HTTP

---

## 📁 Struttura

```
ES01b-TodoList-Nodejs/
├── README.md              # Questa guida
├── QUICKSTART.md          # Avvio rapido
├── server/
│   ├── server.js          # Server HTTP nativo (~200 righe)
│   └── data.json          # Database JSON
├── client/
│   ├── index.html         # Interfaccia web
│   ├── app.js             # Logica client (Fetch API)
│   └── style.css          # Stili
└── docs/
    └── http-module.md     # Guida modulo HTTP completa
```

---

## 🚀 Quick Start

### 1. Avvia il Server

```bash
cd server
node server.js
```

Output:
```
Server HTTP in ascolto su https://w4s-3001.filippobilardo.it/
```

### 2. Apri il Client

Apri il file `client/index.html` nel browser (doppio click o `open index.html`)

Oppure usa Live Server (VS Code) per il reload automatico.

### 3. Testa

- ✅ Verifica status: "Server connesso" (pallino verde)
- ✅ Aggiungi un todo dal form
- ✅ Spunta un todo (✓)
- ✅ Elimina un todo (🗑️)

---

## 🔌 API Endpoints

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/todos` | Ottieni tutti i todo |
| POST | `/todos` | Crea nuovo todo |
| PATCH | `/todos/:id/toggle` | Cambia stato completed |
| DELETE | `/todos/:id` | Elimina todo |
| GET | `/stats` | Statistiche |

**Nota:** Versione semplificata, solo 5 endpoint essenziali.

---

## 📚 Concetti Chiave

### 1. Modulo HTTP Nativo

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Gestisci richiesta
  console.log(`${req.method} ${req.url}`);
  
  // Invia risposta
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'OK' }));
});

server.listen(3000);
```

### 2. Parsing URL

```javascript
const url = new URL(req.url, `http://${req.headers.host}`);
const pathname = url.pathname;    // "/todos"
const searchParams = url.searchParams; // ?filter=completed
```

### 3. Parsing Body

```javascript
function parseBody(req) {
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
        reject(new Error('JSON non valido'));
      }
    });
  });
}
```

### 4. CORS Manuale

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

### 5. Routing con RegEx

```javascript
// PATCH /todos/123/toggle
const match = pathname.match(/^\/todos\/(\d+)\/toggle$/);
if (method === 'PATCH' && match) {
  const id = parseInt(match[1]);
  // Gestisci toggle...
}
```

---

## 💡 Differenze vs Express (ES01c)

| Aspetto | ES01b (http) | ES01c (Express) |
|---------|--------------|-----------------|
| Framework | ❌ Nessuno | ✅ Express.js |
| Parsing body | 🔧 Manuale | ✅ Automatico (`express.json()`) |
| Routing | 🔧 if/switch/regex | ✅ `app.get()`, `app.post()` |
| Middleware | ❌ Non supportato | ✅ `app.use()` |
| CORS | 🔧 Manuale | ✅ Middleware `cors` |
| Codice | 📝 ~200 righe | 📝 ~150 righe |
| Complessità | 🔴 Alta | 🟢 Bassa |
| Educativo | ✅ Massimo | ⚠️ Nasconde dettagli |

**Quando usare ES01b:**
- Vuoi capire HTTP a basso livello
- Progetto semplicissimo (1-5 endpoint)
- Non vuoi dipendenze esterne
- Scopo educativo

**Quando usare ES01c:**
- API complesse (10+ endpoint)
- Serve middleware (auth, logging, validazione)
- Produzione
- Sviluppo veloce

---

## 🎓 Percorso di Apprendimento

1. **ES01a** - TodoList client-side (localStorage)
   - Impara: JavaScript, DOM, localStorage, JSON

2. **ES01b** - TodoList con modulo HTTP ← **SEI QUI**
   - Impara: Node.js, HTTP, server base, REST API

3. **ES01c** - TodoList con Express
   - Impara: Framework, middleware, best practices

---

## 📖 Guide Disponibili

- [docs/http-module.md](docs/http-module.md) - Guida completa modulo HTTP (21KB)
  - Creare server
  - Request/Response object
  - Routing manuale
  - Parsing URL e body
  - Headers e CORS
  - Metodi HTTP
  - Status codes
  - Gestione errori
  - Best practices

---

## ✅ Prerequisiti

- **Node.js** installato (v14+)
- Conoscenza base JavaScript
- Aver completato **ES01a** (TodoList client-side)

---

## 🔧 Sviluppo

### Test API con curl

```bash
# GET tutti i todo
curl https://w4s-3001.filippobilardo.it/todos

# POST crea todo
curl -X POST https://w4s-3001.filippobilardo.it/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "Descrizione test"}'

# PATCH toggle completed (cambia ID)
curl -X PATCH https://w4s-3001.filippobilardo.it/todos/1/toggle

# DELETE todo (cambia ID)
curl -X DELETE https://w4s-3001.filippobilardo.it/todos/1

# GET statistiche
curl https://w4s-3001.filippobilardo.it/stats
```

### Debug

Aggiungi log nel server per capire cosa succede:

```javascript
console.log('Method:', req.method);
console.log('URL:', req.url);
console.log('Headers:', req.headers);
console.log('Body:', body);
```

---

## 🐛 Troubleshooting

### CORS Error nel browser

**Problema:** `Access to fetch has been blocked by CORS policy`

**Soluzione:** Il server già gestisce CORS. Assicurati che:
1. Il server sia in esecuzione
2. Stai usando `http://` (non `file://`)

### Cannot GET /

**Problema:** Nessuna risposta dal server

**Soluzione:** 
1. Verifica che il server sia avviato (`node server.js`)
2. Controlla la porta (default: 3000)
3. Testa con curl: `curl https://w4s-3001.filippobilardo.it/todos`

### SyntaxError: Unexpected token

**Problema:** Body JSON malformato

**Soluzione:** 
1. Verifica che il client invii `Content-Type: application/json`
2. Controlla il JSON inviato con curl
3. Guarda i log del server per vedere cosa riceve

### Server già in uso

**Problema:** `Error: listen EADDRINUSE: address already in use :::3000`

**Soluzione:**
```bash
# Linux/Mac - Trova processo sulla porta 3000
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📝 Esercizi Proposti

### Base ⭐
1. ✅ Testa tutti gli endpoint con curl
2. ✅ Aggiungi log per ogni richiesta ricevuta
3. ✅ Modifica la porta del server (usa 8080)
4. ✅ Aggiungi un nuovo todo via curl e verifica nel client

### Intermedio ⭐⭐
5. Aggiungi endpoint `PUT /todos/:id` per aggiornamento completo
6. Aggiungi filtro query `?completed=true` per GET /todos
7. Valida lunghezza titolo (min 3, max 100 caratteri)
8. Aggiungi campo `priority` ai todo (low, medium, high)

### Avanzato ⭐⭐⭐
9. Implementa autenticazione base con API key
10. Aggiungi rate limiting (max 10 richieste/minuto per IP)
11. Aggiungi logging su file (salva tutte le richieste)
12. Migra il codice server a Express (confronta con ES01c)

---

## 🔗 Risorse

### Documentazione
- [Node.js HTTP Module](https://nodejs.org/api/http.html)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [REST API Tutorial](https://restfulapi.net/)

### Video Tutorial
- [Node.js HTTP Module Tutorial](https://www.youtube.com/results?search_query=nodejs+http+module)
- [Building REST API without Express](https://www.youtube.com/results?search_query=nodejs+rest+api+without+express)

### Libri
- "Node.js Design Patterns" - Capitolo su HTTP
- "Node.js in Action" - Capitolo su server HTTP

---

## 💻 Analisi del Codice

### Server (server/server.js)

**Struttura:**
1. **Utility Functions** (righe 7-47)
   - `readData()` - Legge data.json
   - `writeData()` - Salva su data.json
   - `parseBody()` - Parse JSON body
   - `sendJSON()` / `sendError()` - Helper risposta

2. **Request Handlers** (righe 49-134)
   - `handleGetTodos()` - GET /todos
   - `handleCreateTodo()` - POST /todos
   - `handleToggleTodo()` - PATCH /todos/:id/toggle
   - `handleDeleteTodo()` - DELETE /todos/:id
   - `handleGetStats()` - GET /stats

3. **Router** (righe 136-175)
   - Gestisce CORS preflight (OPTIONS)
   - Match URL con regex
   - Chiama handler appropriato
   - Gestisce 404

4. **Server** (righe 177-185)
   - Crea server HTTP
   - Log richieste
   - Listen su porta 3000

**Pattern usati:**
- ✅ Async/await per I/O
- ✅ Promise per parsing body
- ✅ RegEx per route parameters
- ✅ Try-catch per error handling
- ✅ Helper functions per DRY

---

## 🎨 Client (client/)

**Caratteristiche:**
- Fetch API per chiamate HTTP
- async/await pattern
- Stato locale sincronizzato con server
- Indicatore connessione server
- Statistiche real-time
- Escape HTML per sicurezza XSS

**Funzioni principali:**
- `loadTodos()` - Carica tutti i todo
- `addTodo()` - Crea nuovo todo
- `toggleTodo()` - Cambia stato
- `deleteTodo()` - Elimina todo
- `renderTodos()` - Aggiorna UI

---

## 📊 Confronto con Altre Varianti

| Caratteristica | ES01a | ES01b | ES01c |
|----------------|-------|-------|-------|
| Storage | localStorage | File JSON | File JSON |
| Server | ❌ No | ✅ HTTP module | ✅ Express |
| Framework | ❌ | ❌ | ✅ |
| Complessità | 🟢 Bassa | 🟡 Media | 🟢 Bassa |
| Linee codice | ~400 | ~200 (server) | ~150 (server) |
| Dipendenze | 0 | 0 | 2 (express, cors) |
| Educativo | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Produzione | ❌ | ⚠️ | ✅ |

---

## 🚀 Prossimi Passi

Dopo aver completato ES01b:

1. **Confronta con ES01c**
   - Nota la differenza nel codice
   - Vedi come Express semplifica

2. **Sperimenta**
   - Aggiungi nuovi endpoint
   - Modifica validazione
   - Testa con Postman

3. **Approfondisci**
   - Leggi [docs/http-module.md](docs/http-module.md)
   - Studia Node.js streams
   - Impara Express (ES01c)

---

**Buono studio!** 🚀
