# 🎓 ESERCITAZIONE: Todo List - Client/Server con Node.js

> *Applicazione Todo List con architettura client-server, API REST e Fetch API - TPSIT 3*

---

## 📋 **INFORMAZIONI GENERALI**

**Materia:** Tecnologie e Progettazione di Sistemi Informatici e di Telecomunicazioni  
**Argomento:** API REST, Node.js, Express, Fetch API, JSON  
**Tempo stimato:** 5-6 ore  
**Difficoltà:** ⭐⭐ (Media)  
**Modalità:** Individuale  
**Prerequisito:** ES01-TodoList completato

---

## 🎯 **OBIETTIVI DIDATTICI**

### Lato Server (Backend) - Node.js
- ✅ Installare e configurare Node.js e Express
- ✅ Creare server HTTP con Express
- ✅ Implementare API REST (GET, POST, PUT, PATCH, DELETE)
- ✅ Gestire dati JSON su file
- ✅ Validare richieste HTTP
- ✅ Configurare CORS

### Lato Client (Frontend)
- ✅ Utilizzare Fetch API per chiamate HTTP
- ✅ Gestire risposte asincrone con async/await
- ✅ Implementare gestione errori di rete
- ✅ Mostrare loading e stati connessione

---

## 🏗️ **ARCHITETTURA**

```
CLIENT (Browser)                    SERVER (Node.js)
┌──────────────┐                   ┌────────────────┐
│ index.html   │                   │  server.js     │
│ app.js       │◄──── HTTP/JSON ──►│  (Express)     │
│ style.css    │                   │                │
└──────────────┘                   └────────┬───────┘
                                            │
                                   ┌────────▼───────┐
                                   │   data.json    │
                                   └────────────────┘

Comunicazione:
- GET /api/todos → Lista task
- POST /api/todos → Crea task
- PATCH /api/todos/:id/toggle → Toggle
- DELETE /api/todos/:id → Elimina
```

---

## 📂 **STRUTTURA PROGETTO**

```
ES01b-TodoList-Nodejs/
├── README.md
├── server/
│   ├── package.json
│   ├── server.js
│   └── data.json
└── client/
    ├── index.html
    ├── style.css
    └── app.js
```

---

## 🚀 **GUIDA RAPIDA**

### Setup Iniziale

1. **Crea cartelle:**
```bash
mkdir -p server client
```

2. **Inizializza server:**
```bash
cd server
npm init -y
npm install express cors
```

3. **Copia i file** forniti in questa cartella

4. **Avvia server:**
```bash
npm start
```

5. **Apri client:** Apri `client/index.html` nel browser

---

## 📝 **FILE DA CREARE**

### ✅ File Obbligatori

I file completi sono nella documentazione completa più sotto.

**Server:**
- `server/package.json` - Configurazione npm
- `server/server.js` - Server Express con API
- `server/data.json` - Storage dati (creato automaticamente)

**Client:**  
- `client/index.html` - Interfaccia utente
- `client/style.css` - Stili (copia da ES01 + aggiunte)
- `client/app.js` - Logica client con Fetch

---

## 🔍 **DIFFERENZE CON ES01**

| Aspetto | ES01 (localStorage) | ES01b (Client-Server) |
|---------|---------------------|----------------------|
| Storage | Browser localStorage | File JSON su server |
| API | Nessuna | REST API completa |
| Comunicazione | Nessuna | HTTP + fetch() |
| Multi-utente | No | Sì (dati condivisi) |
| Tecnologie | Solo JavaScript | JS + Node.js + Express |

---

## 📊 **API ENDPOINTS**

### GET /api/todos
Recupera tutte le task

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Studiare JSON",
      "description": "...",
      "completed": false,
      "createdAt": "2024-03-14T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

### POST /api/todos
Crea nuova task

**Request Body:**
```json
{
  "title": "Nuova task",
  "description": "Opzionale"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "data": { /* task creata */ },
  "message": "Task creata con successo"
}
```

### PATCH /api/todos/:id/toggle
Cambia stato completed

**Response:**
```json
{
  "success": true,
  "data": { /* task aggiornata */ },
  "message": "Task completata"
}
```

### DELETE /api/todos/:id
Elimina task

**Response:**
```json
{
  "success": true,
  "message": "Task eliminata con successo"
}
```

---

## 💻 **ESEMPIO CODICE FETCH**

```javascript
// GET - Carica task
async function loadTodos() {
    const response = await fetch('https://w4s-3001.filippobilardo.it/api/todos');
    const result = await response.json();
    return result.data;
}

// POST - Crea task
async function createTodo(title, description) {
    const response = await fetch('https://w4s-3001.filippobilardo.it/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });
    return await response.json();
}

// DELETE - Elimina task
async function deleteTodo(id) {
    const response = await fetch(`https://w4s-3001.filippobilardo.it/api/todos/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
}
```

---

## ✅ **CHECKLIST TEST**

Prima di consegnare, verifica:

**Server:**
- [ ] Server si avvia senza errori
- [ ] File `data.json` viene creato
- [ ] Tutte le API rispondono correttamente
- [ ] Validazione input funziona
- [ ] CORS configurato

**Client:**
- [ ] Si connette al server
- [ ] Mostra task dal server
- [ ] Aggiungi task funziona
- [ ] Toggle completed funziona
- [ ] Elimina task funziona
- [ ] Filtri funzionano
- [ ] Statistiche corrette
- [ ] Gestione errori visualizzata

**Testing:**
- [ ] Ricarica pagina → dati persistono
- [ ] Ferma server → client mostra errore
- [ ] Riavvia server → client si riconnette

---

## 🐛 **TROUBLESHOOTING**

**Errore: "Cannot find module 'express'"**
```bash
cd server
npm install
```

**Errore: "Port 3000 already in use"**
```bash
# Cambia PORT in server.js
const PORT = 3001;
```

**Errore CORS**
```
Access to fetch has been blocked by CORS policy
```
→ Verifica `app.use(cors())` in server.js

**Client non si connette**
- Verifica che server sia avviato (`npm start`)
- Controlla `API_BASE_URL` in app.js
- Apri Console (F12) per vedere errori

---

## 📚 **RISORSE UTILI**

- [Express.js Documentation](https://expressjs.com/)
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [async/await Tutorial](https://javascript.info/async-await)
- [REST API Guide](https://restfulapi.net/)

---

## 🎯 **VALUTAZIONE**

- **Funzionalità (60%)**: Tutte le API funzionanti, CRUD completo
- **Qualità Codice (20%)**: Commenti, gestione errori, async/await
- **UI/UX (10%)**: Loading, stati, feedback utente
- **Documentazione (10%)**: README, commenti, chiarezza

---

---

## 📝 Esercizi Proposti

### Base ⭐
1. ✅ Testa tutti gli endpoint con curl o Postman
2. ✅ Aggiungi log per ogni richiesta ricevuta
3. ✅ Modifica la porta del server (usa variabile ambiente)
4. ✅ Aggiungi validazione lunghezza titolo (min 3, max 100)

### Intermedio ⭐⭐
5. Aggiungi campo `priority` ai todo (low, medium, high)
6. Implementa filtro query `?completed=true` per GET /todos
7. Aggiungi endpoint GET /todos/:id per singolo todo
8. Implementa ordinamento `?sort=createdAt` o `?sort=title`

### Avanzato ⭐⭐⭐
9. Implementa autenticazione con JWT
10. Aggiungi rate limiting (express-rate-limit)
11. Migra da file JSON a database (MongoDB/SQLite)
12. Aggiungi test con Jest o Mocha

---

## 🐛 Troubleshooting

### Server non parte

**Problema:** `Error: listen EADDRINUSE :::3000`

**Soluzione:** Porta già in uso
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS Error

**Problema:** `Access to fetch has been blocked by CORS policy`

**Soluzione:** Verifica che il middleware CORS sia attivo
```javascript
// server.js
const cors = require('cors');
app.use(cors());
```

### Cannot POST /todos

**Problema:** `Cannot POST /todos`

**Soluzione:** Verifica che `express.json()` sia configurato
```javascript
app.use(express.json());
```

### Data non persistente

**Problema:** I dati si perdono al riavvio

**Soluzione:** Verifica che `writeData()` venga chiamato dopo ogni modifica

---

## 💻 Analisi del Codice Server

### Struttura server.js

**1. Setup e Middleware (righe 1-20)**
```javascript
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());                    // CORS
app.use(express.json());            // Parse JSON body
app.use(express.static('../client')); // Serve file statici
```

**2. Utility Functions (righe 21-45)**
- `readData()` - Legge data.json (async)
- `writeData()` - Salva su data.json (async)
- `validateTodo()` - Valida input middleware

**3. API Endpoints (righe 46-200)**
- GET /todos - Lista tutti
- GET /todos/:id - Singolo todo
- POST /todos - Crea
- PUT /todos/:id - Aggiorna completo
- PATCH /todos/:id/toggle - Toggle completed
- DELETE /todos/:id - Elimina
- GET /stats - Statistiche

**4. Error Handlers (righe 201-220)**
- 404 handler
- Global error handler

**5. Server Start (righe 221-225)**
```javascript
app.listen(PORT, () => {
  console.log(`Server su http://localhost:${PORT}`);
});
```

---

## 🎨 Analisi del Codice Client

### Funzioni Principali (app.js)

**1. API Calls**
```javascript
async function loadTodos()        // GET /todos
async function addTodo()          // POST /todos
async function toggleTodo(id)     // PATCH /todos/:id/toggle
async function deleteTodo(id)     // DELETE /todos/:id
async function loadStats()        // GET /stats
```

**2. Event Handlers**
```javascript
handleAddTodo(event)              // Submit form
handleToggleTodo(id)              // Click checkbox
handleDeleteTodo(id)              // Click delete
```

**3. Rendering**
```javascript
renderTodos()                     // Aggiorna lista UI
setConnectionStatus(connected)    // Aggiorna indicatore
```

**4. Utility**
```javascript
escapeHtml(text)                  // Previene XSS
showError(message)                // Mostra errori
```

---

## 📊 Confronto Varianti TodoList

| Caratteristica | ES01a | ES01b | ES01c |
|----------------|-------|-------|-------|
| **Storage** | localStorage | File JSON | File JSON |
| **Server** | ❌ No | ✅ HTTP module | ✅ Express |
| **Framework** | ❌ | ❌ | ✅ Express |
| **Dependencies** | 0 | 0 | 2 (express, cors) |
| **Complessità Server** | - | 🔴 Alta | 🟢 Bassa |
| **Linee Codice Server** | - | ~200 | ~150 |
| **Routing** | - | Manuale | Automatico |
| **Middleware** | - | ❌ | ✅ |
| **Produzione** | ❌ | ⚠️ | ✅ |
| **Educativo HTTP** | - | ⭐⭐⭐ | ⭐ |
| **Educativo REST** | - | ⭐⭐ | ⭐⭐⭐ |

**Percorso consigliato:** ES01a → ES01b → ES01c

---

## 🚀 Estensioni Possibili

### Funzionalità Aggiuntive

1. **Categorie/Tag**
   - Aggiungi campo `category` o `tags[]`
   - Filtro per categoria

2. **Due Date**
   - Campo `dueDate`
   - Ordinamento per scadenza
   - Evidenzia scaduti

3. **Ricerca**
   - Endpoint GET /todos/search?q=termine
   - Ricerca in title e description

4. **Utenti Multi-User**
   - Autenticazione
   - Ogni user vede solo suoi todo
   - Condivisione todo

5. **File Upload**
   - Allegati ai todo
   - Multer per upload
   - Storage file

### Miglioramenti Tecnici

1. **Database**
   - MongoDB con Mongoose
   - PostgreSQL con Sequelize
   - SQLite per semplicità

2. **Validazione Avanzata**
   - express-validator
   - Joi
   - Zod

3. **Logging**
   - Morgan per HTTP logs
   - Winston per application logs
   - File rotation

4. **Testing**
   - Jest per unit test
   - Supertest per API test
   - Coverage con nyc

5. **Deploy**
   - Docker container
   - Heroku/Railway
   - Vercel/Netlify (client)

---

## 📚 Risorse per Approfondire

### Documentazione Ufficiale
- [Express.js Docs](https://expressjs.com/) - Framework documentation
- [Node.js Docs](https://nodejs.org/docs/) - Runtime documentation
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Client API

### Tutorial
- [Express.js Tutorial - MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [Node.js + Express Tutorial](https://www.javascripttutorial.net/nodejs-tutorial/express/)
- [REST API Tutorial](https://restfulapi.net/)

### Video
- [Node.js Crash Course](https://www.youtube.com/results?search_query=nodejs+crash+course)
- [Express.js Tutorial](https://www.youtube.com/results?search_query=express+js+tutorial)
- [REST API with Node.js](https://www.youtube.com/results?search_query=rest+api+nodejs)

### Libri
- "Node.js Design Patterns" - Mario Casciaro
- "Express in Action" - Evan Hahn
- "Node.js Web Development" - David Herron

---

## 🎓 Checklist Completamento

Prima di considerare l'esercitazione completa, verifica:

### Server
- [ ] Server si avvia senza errori
- [ ] Tutti gli endpoint funzionano
- [ ] Dati persistenti su file
- [ ] Validazione input
- [ ] CORS configurato
- [ ] Error handling
- [ ] Log delle richieste

### Client
- [ ] UI carica correttamente
- [ ] Tutti i pulsanti funzionano
- [ ] Loading states visibili
- [ ] Errori gestiti con feedback
- [ ] Connessione server monitorata
- [ ] Nessun errore console

### Testing
- [ ] Testato con curl/Postman
- [ ] Testato nel browser
- [ ] Testato scenari errore
- [ ] Testato riavvio server
- [ ] Verificata persistenza dati

### Documentazione
- [ ] README.md compilato
- [ ] Commenti nel codice
- [ ] API documentate
- [ ] Setup istruzioni chiare

---

## 💡 Suggerimenti Finali

### Best Practices

1. **Separazione Concerns**
   - Route in file separati
   - Controller per logica
   - Model per dati
   - Middleware per validazione

2. **Environment Variables**
   ```javascript
   const PORT = process.env.PORT || 3000;
   const NODE_ENV = process.env.NODE_ENV || 'development';
   ```

3. **Error Handling Consistente**
   - Try-catch in ogni route async
   - Status code appropriati
   - Messaggi errore chiari

4. **Security Headers**
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

5. **Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minuti
     max: 100 // max 100 richieste
   });
   app.use('/api/', limiter);
   ```

### Performance

1. **Caching**
   - Cache GET requests
   - Cache-Control headers
   - ETag support

2. **Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

3. **Database Indexes**
   - Se usi MongoDB/PostgreSQL
   - Index su campi ricerca

---

## 🏆 Obiettivi Raggiunti

Completando questa esercitazione hai imparato:

✅ **Backend Development**
- Creare server Node.js con Express
- Implementare REST API complete
- Gestire persistenza dati
- Validare input utente
- Configurare CORS e middleware

✅ **Frontend Development**
- Fetch API per chiamate HTTP
- async/await per codice asincrono
- Gestione stati (loading, error, success)
- Feedback utente real-time

✅ **Architettura Client-Server**
- Separazione frontend/backend
- Comunicazione HTTP/JSON
- API design
- Error handling end-to-end

✅ **Best Practices**
- Codice modulare e riusabile
- Gestione errori robusta
- Validazione dati
- Security basics (CORS, XSS)

---

## 📞 Supporto

Se hai problemi:

1. **Controlla console** (browser F12, terminal server)
2. **Rileggi documentazione** (README, docs/express.md)
3. **Testa con curl** per isolare problema
4. **Confronta con ES01b** (versione HTTP module)
5. **Chiedi al docente** durante laboratorio

---

**Ottimo lavoro!** 🎉

Hai completato ES01c - TodoList con Express.js!

**Prossimi passi:**
- Sperimenta con le estensioni proposte
- Confronta con ES01b (HTTP module)
- Prova a deployare su Heroku/Railway
- Studia altri progetti nella cartella `esercizi/progetti.md`

---

**Buon coding!** 🚀
