# 10. Sicurezza

## JSON Injection

JSON Injection è una vulnerabilità simile a SQL Injection che si verifica quando dati non validati vengono inseriti in strutture JSON.

### Esempio di vulnerabilità

```javascript
// VULNERABILE - Non fare così!
const userInput = req.body.nome; // Input: Mario", "admin": true, "ruolo": "
const jsonString = `{"nome": "${userInput}", "ruolo": "user"}`;
const user = JSON.parse(jsonString);

// Risultato:
// {"nome": "Mario", "admin": true, "ruolo": "", "ruolo": "user"}
```

### Soluzione corretta

```javascript
// SICURO - Usa JSON.stringify
const userInput = req.body.nome;
const user = {
  nome: userInput,
  ruolo: "user"
};
const jsonString = JSON.stringify(user);
```

## Validazione input

### Validazione base

```javascript
function validaEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validaEtà(età) {
  return Number.isInteger(età) && età >= 0 && età <= 150;
}

// Validazione prima del parsing
function parseUserInput(input) {
  try {
    const data = JSON.parse(input);
    
    if (!validaEmail(data.email)) {
      throw new Error("Email non valida");
    }
    
    if (!validaEtà(data.età)) {
      throw new Error("Età non valida");
    }
    
    return data;
  } catch (error) {
    console.error("Errore validazione:", error);
    return null;
  }
}
```

### Validazione con JSON Schema

```javascript
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    nome: {
      type: "string",
      minLength: 2,
      maxLength: 50,
      pattern: "^[a-zA-Z ]+$"
    },
    email: {
      type: "string",
      format: "email"
    },
    età: {
      type: "integer",
      minimum: 0,
      maximum: 150
    }
  },
  required: ["nome", "email"],
  additionalProperties: false
};

const validate = ajv.compile(schema);

function validaDati(data) {
  const valid = validate(data);
  if (!valid) {
    console.error("Errori di validazione:", validate.errors);
    return false;
  }
  return true;
}
```

### Whitelist di campi

```javascript
// Accetta solo campi specifici
function sanitizeUser(input) {
  const allowedFields = ['nome', 'email', 'età'];
  const sanitized = {};
  
  allowedFields.forEach(field => {
    if (input.hasOwnProperty(field)) {
      sanitized[field] = input[field];
    }
  });
  
  return sanitized;
}

// Utilizzo
const userInput = JSON.parse(requestBody);
const safeUser = sanitizeUser(userInput);
```

## Best practices di sicurezza

### 1. Non fidarsi mai dell'input utente

```javascript
// MAI fare questo
app.post('/api/user', (req, res) => {
  const user = req.body; // Input direttamente dal client
  db.save(user); // PERICOLOSO!
});

// SEMPRE validare
app.post('/api/user', (req, res) => {
  const input = req.body;
  
  if (!validaDati(input)) {
    return res.status(400).json({ error: "Dati non validi" });
  }
  
  const user = sanitizeUser(input);
  db.save(user);
});
```

### 2. Limitare dimensione del payload

```javascript
const express = require('express');
const app = express();

// Limita dimensione JSON a 100KB
app.use(express.json({ limit: '100kb' }));

// Gestione errore payload troppo grande
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: "Payload troppo grande" });
  }
  next(err);
});
```

### 3. Gestire errori di parsing in modo sicuro

```javascript
function parseJSONSafe(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    // NON esporre dettagli interni
    console.error("Errore parsing JSON:", error);
    throw new Error("Formato JSON non valido");
  }
}
```

### 4. Proteggere dati sensibili

```javascript
// Rimuovi campi sensibili prima di inviare
function sanitizeUserOutput(user) {
  const { password, ssn, creditCard, ...safeData } = user;
  return safeData;
}

// Con JSON.stringify replacer
const jsonOutput = JSON.stringify(user, (key, value) => {
  const sensitiveFields = ['password', 'ssn', 'creditCard'];
  if (sensitiveFields.includes(key)) {
    return undefined; // Rimuove il campo
  }
  return value;
});
```

### 5. Content-Type validation

```javascript
app.post('/api/data', (req, res) => {
  // Verifica Content-Type
  if (!req.is('application/json')) {
    return res.status(415).json({ 
      error: "Content-Type deve essere application/json" 
    });
  }
  
  // Processa dati...
});
```

## Sanitizzazione dati

### Escape di caratteri speciali

```javascript
function escapeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;'
  };
  return str.replace(/[&<>"'\/]/g, m => map[m]);
}

// Sanitizza stringe prima di usarle in HTML
function sanitizeForDisplay(data) {
  return {
    ...data,
    nome: escapeHTML(data.nome),
    descrizione: escapeHTML(data.descrizione)
  };
}
```

### Rimozione di script/codice

```javascript
function removeScripts(str) {
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}
```

### Librerie di sanitizzazione

```javascript
// DOMPurify (browser)
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(dirty);

// validator.js (Node.js)
const validator = require('validator');
const isEmail = validator.isEmail('test@example.com');
const escaped = validator.escape('<script>alert("xss")</script>');
```

## Prevenzione attacchi comuni

### Cross-Site Scripting (XSS)

```javascript
// Sanitizza output quando rendering in HTML
app.get('/api/user/:id', async (req, res) => {
  const user = await db.getUser(req.params.id);
  
  // NON fare questo direttamente in HTML
  // <div>${user.bio}</div>
  
  // Sanitizza prima
  const sanitized = escapeHTML(user.bio);
  res.json({ ...user, bio: sanitized });
});
```

### Mass Assignment

```javascript
// Vulnerabile
app.post('/api/user', (req, res) => {
  const user = new User(req.body); // Potrebbe includere "isAdmin: true"
  user.save();
});

// Sicuro - whitelist esplicita
app.post('/api/user', (req, res) => {
  const user = new User({
    nome: req.body.nome,
    email: req.body.email,
    età: req.body.età
    // isAdmin NON è incluso
  });
  user.save();
});
```

### Denial of Service (DoS)

```javascript
// Protezione contro JSON deeply nested
function validateDepth(obj, maxDepth = 5, currentDepth = 0) {
  if (currentDepth > maxDepth) {
    throw new Error("Struttura JSON troppo profonda");
  }
  
  if (typeof obj === 'object' && obj !== null) {
    for (let key in obj) {
      validateDepth(obj[key], maxDepth, currentDepth + 1);
    }
  }
}

// Utilizzo
try {
  const data = JSON.parse(input);
  validateDepth(data);
} catch (error) {
  console.error("JSON non valido:", error);
}
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100, // Max 100 richieste per IP
  message: { error: "Troppo richieste, riprova più tardi" }
});

app.use('/api/', apiLimiter);
```
