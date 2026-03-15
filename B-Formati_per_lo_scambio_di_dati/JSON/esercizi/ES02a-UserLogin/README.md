# ES02a - Sistema di Autenticazione Base

## 📋 Descrizione

Sistema di autenticazione base con **registrazione** e **login** utenti. I dati vengono salvati in un file JSON sul server.

⚠️ **ATTENZIONE**: Questa è una versione **SOLO EDUCATIVA**. Le password sono memorizzate **in chiaro** (plaintext) per scopi didattici. **MAI** usare in produzione!

## 🎯 Obiettivi

- Implementare un sistema di registrazione utenti
- Gestire login e autenticazione base
- Utilizzare JSON per memorizzare dati utente
- Validare input lato client e server
- Gestire sessioni con localStorage
- Comprendere le basi della sicurezza web

## 🛠️ Tecnologie

**Backend:**
- Node.js
- Express.js
- File system (fs/promises)
- CORS

**Frontend:**
- HTML5
- CSS3 (design moderno)
- JavaScript (ES6+)
- Fetch API
- localStorage

## 📁 Struttura

```
ES02a-UserLogin/
├── README.md
├── QUICKSTART.md
├── server/
│   ├── server.js          # Server Express
│   ├── users.json         # Database utenti
│   └── package.json
└── client/
    ├── index.html         # Interfaccia utente
    ├── app.js             # Logica client
    └── style.css          # Stili
```

## 🚀 Avvio Rapido

### 1. Installazione dipendenze

```bash
cd server
npm install
```

### 2. Avvio server

```bash
node server.js
```

Il server sarà disponibile su: **https://w4s-3001.filippobilardo.it**

### 3. Utilizzo

1. Apri il browser e vai all'URL del server
2. **Registrati** creando un nuovo account
3. **Accedi** con le credenziali create
4. Visualizza la dashboard con la lista di tutti gli utenti

## 📡 API Endpoints

### POST /register

Registra un nuovo utente.

**Request:**
```json
{
  "username": "mario_rossi",
  "password": "password123"
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

**Validazione:**
- Username: 3-20 caratteri, solo lettere, numeri e underscore
- Password: minimo 6 caratteri
- Username deve essere unico

### POST /login

Autentica un utente esistente.

**Request:**
```json
{
  "username": "mario_rossi",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login effettuato con successo",
  "user": {
    "id": 1,
    "username": "mario_rossi",
    "createdAt": "2024-03-15T10:30:00.000Z"
  }
}
```

**Errori:**
- 401: Credenziali non valide
- 400: Dati mancanti

### GET /users

Ottiene la lista di tutti gli utenti registrati (senza password).

**Response (200):**
```json
[
  {
    "id": 1,
    "username": "mario_rossi",
    "createdAt": "2024-03-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "username": "luigi_verdi",
    "createdAt": "2024-03-15T11:00:00.000Z"
  }
]
```

## 🔒 Sicurezza

### ⚠️ Problemi di Questa Versione

Questa versione **ES02a** ha gravi problemi di sicurezza:

1. **Password in chiaro**: Le password sono salvate senza hashing
2. **Nessuna sessione**: Non c'è gestione di sessioni server-side
3. **Nessun token**: Non vengono utilizzati token di autenticazione
4. **Storage locale**: Le credenziali sono in localStorage (non sicuro)

### ✅ Come Risolvere (Versioni Successive)

- **ES02b**: Aggiunge bcrypt per hashing e express-session
- **ES02c**: Aggiunge JWT, refresh tokens e role-based access

## 💡 Concetti Chiave

### 1. Validazione Input

Validazione presente sia lato **client** (UX migliore) che **server** (sicurezza):

```javascript
// Client-side (app.js)
if (password !== confirm) {
  showMessage(registerMessage, 'error', 'Le password non corrispondono');
  return;
}

// Server-side (server.js)
function validateCredentials(username, password) {
  if (!username || username.length < 3 || username.length > 20) {
    return 'Username deve essere tra 3 e 20 caratteri';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username può contenere solo lettere, numeri e underscore';
  }
  return null;
}
```

### 2. Gestione Errori

```javascript
try {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
    // Successo
  } else {
    showMessage(loginMessage, 'error', data.error);
  }
} catch (error) {
  showMessage(loginMessage, 'error', 'Errore di connessione');
}
```

### 3. Persistenza con localStorage

```javascript
// Salva utente dopo login
function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// Carica utente all'avvio
function loadUser() {
  const stored = localStorage.getItem('user');
  if (stored) {
    currentUser = JSON.parse(stored);
    showDashboard();
  }
}
```

### 4. Escape HTML (Prevenzione XSS)

```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

## 🎨 Interfaccia Utente

### Caratteristiche

- Design moderno con gradiente
- Tab per Login/Registrazione
- Validazione real-time
- Messaggi di successo/errore
- Dashboard utente
- Lista utenti registrati
- Responsive design

### Struttura

1. **Auth Screen**: Form login e registrazione
2. **Dashboard Screen**: Info utente e lista utenti
3. **Status Indicator**: Connessione server online/offline

## 📝 Esercizi

### Esercizio 1: Email Validation
Aggiungi un campo email durante la registrazione con validazione.

### Esercizio 2: Profilo Utente
Aggiungi nome completo, data di nascita e avatar URL.

### Esercizio 3: Elimina Account
Aggiungi funzione per eliminare il proprio account.

### Esercizio 4: Cambia Password
Permetti all'utente di modificare la propria password.

### Esercizio 5: Ricerca Utenti
Aggiungi una barra di ricerca per filtrare gli utenti.

## 🐛 Troubleshooting

**Problema**: Server non si avvia
- Verifica che la porta 3001 non sia occupata
- Controlla i log per errori

**Problema**: CORS errors
- Verifica che CORS sia configurato correttamente
- Controlla che l'URL del client sia corretto

**Problema**: Utente non viene trovato
- Controlla `users.json` esista e sia valido
- Verifica username e password

## 📚 Risorse

- [Express.js Documentation](https://expressjs.com/)
- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [localStorage MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [JSON File Storage](https://nodejs.org/api/fs.html)

## 🔄 Prossimi Passi

1. **ES02b**: Implementa hashing password con bcrypt
2. **ES02c**: Aggiungi JWT e role-based access control

## ⚖️ Licenza

Materiale educativo - TPSIT 3
