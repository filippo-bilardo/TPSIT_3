# ES02c - Autenticazione Avanzata con JWT

## 📋 Descrizione

Sistema di autenticazione **avanzato** con **JWT** (JSON Web Tokens), **refresh tokens** e **role-based access control** (RBAC). Standard per applicazioni moderne.

## 🎯 Obiettivi

- Implementare autenticazione **stateless** con JWT
- Gestire **access token** e **refresh token**
- Implementare **RBAC** (Role-Based Access Control)
- Middleware avanzati per autorizzazione
- Best practices di sicurezza JWT

## 🛠️ Tecnologie

**Backend:**
- Node.js
- Express.js
- **jsonwebtoken** (JWT)
- **bcrypt** (hashing password)
- **express-validator**

**Frontend:**
- HTML5, CSS3, JavaScript ES6+
- JWT storage e gestione
- Auto-refresh token

## 📁 Struttura

```
ES02c-UserLogin/
├── README.md
├── QUICKSTART.md
├── server/
│   ├── server.js
│   ├── middleware/
│   │   ├── auth.js         # JWT verification
│   │   └── rbac.js         # Role-based access
│   ├── config/
│   │   └── jwt.config.js   # JWT configuration
│   ├── users.json
│   ├── refresh-tokens.json # Token whitelist
│   └── package.json
└── client/
    ├── index.html
    ├── app.js              # JWT management
    └── style.css
```

## 🚀 Avvio Rapido

```bash
cd server
npm install
node server.js
```

Server su: **https://w4s-3001.filippobilardo.it**

## 📡 API Endpoints

### POST /register

**Request:**
```json
{
  "username": "admin",
  "password": "AdminPass123!",
  "role": "admin"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Utente registrato",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

**Ruoli:**
- `user` (default) - Utente normale
- `admin` - Amministratore

### POST /login

**Request:**
```json
{
  "username": "admin",
  "password": "AdminPass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login effettuato",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

**Token Info:**
- **Access Token**: Valido 15 minuti
- **Refresh Token**: Valido 7 giorni

### POST /refresh

Rinnova access token usando refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /logout

Invalida refresh token.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "refreshToken": "..."
}
```

### GET /me

Route protetta - richiede JWT valido.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "id": 1,
  "username": "admin",
  "role": "admin",
  "createdAt": "2024-03-15T10:30:00.000Z"
}
```

### GET /users

Route protetta - richiede JWT valido.

### GET /admin/stats

**Route ADMIN-ONLY** - richiede role `admin`.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "totalUsers": 10,
  "totalAdmins": 2,
  "recentUsers": [...]
}
```

## 🔐 JWT Authentication Flow

```
1. LOGIN
   Client → POST /login → Server
   Server ← { accessToken, refreshToken } ← Server
   
2. RICHIESTA PROTETTA
   Client → GET /me (+ Authorization header) → Server
   Server verifica JWT → Response
   
3. TOKEN SCADUTO
   Client → Riceve 401
   Client → POST /refresh (+ refreshToken)
   Server → { nuovo accessToken }
   Client → Riprova richiesta originale

4. LOGOUT
   Client → POST /logout (+ refreshToken)
   Server → Rimuove refresh token da whitelist
```

## 💡 Concetti Chiave

### 1. JWT Structure

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9  ← Header (Base64)
.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ  ← Payload (Base64)
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← Signature (HMAC-SHA256)
```

**Payload Example:**
```json
{
  "userId": 1,
  "username": "admin",
  "role": "admin",
  "iat": 1710500000,
  "exp": 1710500900
}
```

### 2. Token Generation

```javascript
const jwt = require('jsonwebtoken');

// Access Token (short-lived)
const accessToken = jwt.sign(
  { userId: user.id, username: user.username, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// Refresh Token (long-lived)
const refreshToken = jwt.sign(
  { userId: user.id },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: '7d' }
);
```

### 3. Token Verification Middleware

```javascript
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token mancante' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token non valido' });
    }
    req.user = decoded;
    next();
  });
}
```

### 4. Role-Based Access Control

```javascript
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Accesso negato - privilegi insufficienti' 
      });
    }
    next();
  };
}

// Usage
app.get('/admin/stats', authenticateToken, requireRole('admin'), async (req, res) => {
  // Solo admin possono accedere
});
```

### 5. Refresh Token Rotation

```javascript
// Alla refresh, invalida vecchio token e genera nuovo
async function refreshAccessToken(oldRefreshToken) {
  // 1. Verifica vecchio refresh token
  const decoded = jwt.verify(oldRefreshToken, JWT_REFRESH_SECRET);
  
  // 2. Controlla whitelist
  if (!isInWhitelist(oldRefreshToken)) {
    throw new Error('Refresh token invalido');
  }
  
  // 3. Rimuovi vecchio token
  removeFromWhitelist(oldRefreshToken);
  
  // 4. Genera nuovi token
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  
  // 5. Aggiungi nuovo refresh token a whitelist
  addToWhitelist(newRefreshToken);
  
  return { newAccessToken, newRefreshToken };
}
```

## 🎨 Frontend JWT Management

### Storage

```javascript
// ❌ MAI in localStorage (vulnerabile a XSS)
localStorage.setItem('token', accessToken);

// ✅ In memoria (perde al refresh)
let accessToken = null;
let refreshToken = null;

// ⚠️ Compromesso: httpOnly cookie (meglio) o memoria
```

### Auto-Refresh

```javascript
async function fetchWithAuth(url, options = {}) {
  // Aggiungi token alle richieste
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`
    }
  });

  // Se 401, prova refresh
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Riprova richiesta originale
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`
        }
      });
    }
  }

  return response;
}
```

## 📝 Esercizi

### Esercizio 1: Token Blacklist
Implementa blacklist per access token (logout immediato).

### Esercizio 2: Multiple Devices
Permetti utente loggato su più dispositivi.

### Esercizio 3: Email Verification
Aggiungi verifica email con JWT temporaneo.

### Esercizio 4: Password Reset Token
Usa JWT per reset password sicuro.

### Esercizio 5: Audit Log
Traccia tutte le azioni degli admin.

## 🔒 Sicurezza

### Best Practices

1. **Secret Keys**
   ```bash
   # .env
   JWT_SECRET=your-256-bit-secret-here
   JWT_REFRESH_SECRET=another-256-bit-secret
   ```

2. **HTTPS Only**
   - JWT devono viaggiare solo su HTTPS
   - Usa `secure: true` per cookie in produzione

3. **Short-Lived Access Tokens**
   - 15 minuti massimo
   - Refresh token per rinnovo

4. **Refresh Token Rotation**
   - Genera nuovo refresh ad ogni uso
   - Invalida vecchio immediatamente

5. **Token Validation**
   - Verifica sempre firma
   - Controlla expiration
   - Valida issuer e audience

## 🐛 Troubleshooting

**"Token non valido"**
- Verifica secret corretto
- Controlla scadenza token
- Valida formato Authorization header

**"CORS con JWT"**
```javascript
app.use(cors({
  origin: 'https://w4s-3001.filippobilardo.it',
  credentials: true,
  exposedHeaders: ['Authorization']
}));
```

**"Token scade troppo presto"**
- Implementa auto-refresh client-side
- Verifica timer corretti

## 📚 Risorse

- [JWT.io](https://jwt.io/) - Debugger JWT
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - JWT Specification
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [jsonwebtoken npm](https://www.npmjs.com/package/jsonwebtoken)

## 🎓 Confronto Versioni

| Feature | ES02a | ES02b | ES02c |
|---------|-------|-------|-------|
| Password Storage | Plaintext ❌ | Bcrypt ✅ | Bcrypt ✅ |
| Authentication | None ❌ | Sessions ✅ | JWT ✅ |
| Stateless | N/A | No | Yes ✅ |
| Scalability | Low | Medium | High ✅ |
| Mobile-Friendly | No | Partial | Yes ✅ |
| RBAC | No | No | Yes ✅ |
| Token Refresh | No | No | Yes ✅ |

## ⚖️ Licenza

Materiale educativo - TPSIT 3
