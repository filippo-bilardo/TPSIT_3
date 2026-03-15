# ES02b - Autenticazione con Hashing e Sessioni

## 📋 Descrizione

Sistema di autenticazione **intermedio** con password hashate usando **bcrypt** e gestione sessioni con **express-session**. Miglioramenti significativi rispetto a ES02a.

## 🎯 Obiettivi

- Utilizzare **bcrypt** per hashing sicuro delle password
- Implementare **express-session** per gestione sessioni
- Cookie HTTP-only per sicurezza
- Validazione avanzata lato server
- Middleware per protezione route
- Comprendere hashing e salt

## 🛠️ Tecnologie

**Backend:**
- Node.js
- Express.js
- **bcrypt** (hashing password)
- **express-session** (gestione sessioni)
- **express-validator** (validazione avanzata)
- CORS

**Frontend:**
- HTML5, CSS3, JavaScript ES6+
- Fetch API con credenziali
- Design migliorato

## 📁 Struttura

```
ES02b-UserLogin/
├── README.md
├── QUICKSTART.md
├── server/
│   ├── server.js          # Server con bcrypt e sessioni
│   ├── middleware/
│   │   └── auth.js        # Middleware autenticazione
│   ├── users.json         # Database (password hashate)
│   └── package.json
└── client/
    ├── index.html
    ├── app.js
    └── style.css
```

## 🚀 Avvio Rapido

### 1. Installazione

```bash
cd server
npm install
```

### 2. Avvio

```bash
node server.js
```

Server su: **https://w4s-3001.filippobilardo.it**

## 📡 API Endpoints

### POST /register

**Request:**
```json
{
  "username": "mario_rossi",
  "password": "MySecurePass123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Utente registrato con successo",
  "user": {
    "id": 1,
    "username": "mario_rossi"
  }
}
```

**Validazione Avanzata:**
- Username: 3-20 caratteri, alfanumerici + underscore
- Password: 8+ caratteri, almeno 1 maiuscola, 1 minuscola, 1 numero

### POST /login

Crea una sessione server-side.

**Request:**
```json
{
  "username": "mario_rossi",
  "password": "MySecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login effettuato",
  "user": {
    "id": 1,
    "username": "mario_rossi"
  }
}
```

**Cookie**: Imposta `connect.sid` (HTTP-only, secure)

### GET /me

Route protetta - richiede sessione attiva.

**Response (200):**
```json
{
  "id": 1,
  "username": "mario_rossi",
  "createdAt": "2024-03-15T10:30:00.000Z"
}
```

### POST /logout

Distrugge la sessione.

**Response (200):**
```json
{
  "success": true,
  "message": "Logout effettuato"
}
```

### GET /users

Lista utenti (route protetta).

## 🔐 Sicurezza

### ✅ Miglioramenti rispetto a ES02a

1. **Password Hashing**
   ```javascript
   const bcrypt = require('bcrypt');
   const SALT_ROUNDS = 10;
   
   // Registrazione
   const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
   
   // Login
   const isValid = await bcrypt.compare(password, user.password);
   ```

2. **Sessioni Server-Side**
   ```javascript
   app.use(session({
     secret: 'your-secret-key-here',
     resave: false,
     saveUninitialized: false,
     cookie: {
       httpOnly: true,
       secure: true,
       maxAge: 24 * 60 * 60 * 1000 // 24 ore
     }
   }));
   ```

3. **Middleware Autenticazione**
   ```javascript
   function requireAuth(req, res, next) {
     if (!req.session.userId) {
       return res.status(401).json({ error: 'Non autenticato' });
     }
     next();
   }
   ```

4. **Validazione Avanzata**
   ```javascript
   const { body, validationResult } = require('express-validator');
   
   app.post('/register', [
     body('username')
       .isLength({ min: 3, max: 20 })
       .matches(/^[a-zA-Z0-9_]+$/),
     body('password')
       .isLength({ min: 8 })
       .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
   ], async (req, res) => { ... });
   ```

## 💡 Concetti Chiave

### 1. Bcrypt Hashing

```javascript
// Generazione hash
const hash = await bcrypt.hash('password123', 10);
// Output: $2b$10$abc123...

// Verifica
const isMatch = await bcrypt.compare('password123', hash);
// Output: true o false
```

**Come funziona:**
- Usa algoritmo Blowfish
- Salt automatico (casuale per ogni password)
- Cost factor (10 = 2^10 = 1024 rounds)
- Resistente a rainbow tables e brute force

### 2. Express Session

```javascript
// Creazione sessione (login)
req.session.userId = user.id;

// Lettura sessione
const userId = req.session.userId;

// Distruzione sessione (logout)
req.session.destroy();
```

**Storage:**
- Default: MemoryStore (solo sviluppo)
- Produzione: Redis, MongoDB, PostgreSQL

### 3. Fetch con Credenziali

```javascript
// Client-side: include cookie nelle richieste
fetch(`${API_URL}/me`, {
  method: 'GET',
  credentials: 'include'  // ← IMPORTANTE!
})
```

## 🎨 Frontend

### Modifiche rispetto a ES02a

1. **Credentials nelle fetch**
   ```javascript
   const response = await fetch(url, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     credentials: 'include',  // Invia/riceve cookie
     body: JSON.stringify(data)
   });
   ```

2. **Niente localStorage**
   - Sessione gestita tramite cookie HTTP-only
   - Più sicuro (JavaScript non può accedere al cookie)

3. **Check sessione all'avvio**
   ```javascript
   async function checkSession() {
     const response = await fetch(`${API_URL}/me`, {
       credentials: 'include'
     });
     if (response.ok) {
       const user = await response.json();
       showDashboard(user);
     }
   }
   ```

## 📝 Esercizi

### Esercizio 1: Remember Me
Aggiungi checkbox "Ricordami" che estende durata cookie a 30 giorni.

### Esercizio 2: Password Reset
Implementa reset password via token temporaneo.

### Esercizio 3: Rate Limiting
Limita tentativi di login (es. max 5 in 15 minuti).

### Esercizio 4: Session Store
Usa Redis invece di MemoryStore.

### Esercizio 5: CSRF Protection
Aggiungi protezione CSRF con csurf middleware.

## 🐛 Troubleshooting

**CORS con credenziali:**
```javascript
app.use(cors({
  origin: 'https://w4s-3001.filippobilardo.it',
  credentials: true
}));
```

**Cookie non impostati:**
- Verifica `credentials: 'include'` nel fetch
- Controlla `sameSite` e `secure` nelle opzioni cookie
- Usa HTTPS in produzione

**Sessione persa:**
- MemoryStore perde dati al restart
- Usa session store persistente (Redis, DB)

## 📚 Risorse

- [bcrypt npm](https://www.npmjs.com/package/bcrypt)
- [express-session](https://www.npmjs.com/package/express-session)
- [express-validator](https://express-validator.github.io/)
- [OWASP Password Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

## 🔄 Prossimi Passi

**ES02c** aggiunge:
- JWT (stateless authentication)
- Refresh tokens
- Role-based access control
- Middleware avanzati

## ⚖️ Licenza

Materiale educativo - TPSIT 3
