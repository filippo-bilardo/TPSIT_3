# 7. API REST e JSON

## JSON come formato di scambio dati

JSON è il formato più utilizzato nelle API REST moderne per:
- Semplicità e leggibilità
- Supporto nativo nei browser (JavaScript)
- Dimensione ridotta del payload
- Facilità di parsing in tutti i linguaggi

## Request e Response JSON

### Esempio di Request (POST)

```http
POST /api/utenti HTTP/1.1
Host: esempio.com
Content-Type: application/json

{
  "nome": "Mario",
  "email": "mario@esempio.com",
  "età": 30
}
```

### Esempio di Response (200 OK)

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "nome": "Mario",
  "email": "mario@esempio.com",
  "età": 30,
  "creato_il": "2024-01-15T10:30:00Z"
}
```

### GET Request con Response JSON

```http
GET /api/utenti/123 HTTP/1.1
Host: esempio.com
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "nome": "Mario",
  "email": "mario@esempio.com"
}
```

### Response con array (lista di risorse)

```json
{
  "data": [
    {
      "id": 1,
      "nome": "Mario"
    },
    {
      "id": 2,
      "nome": "Luigi"
    }
  ],
  "total": 2,
  "page": 1,
  "per_page": 10
}
```

## Headers HTTP

### Content-Type

Indica il tipo di contenuto inviato:

```http
Content-Type: application/json
```

Varianti:
- `application/json` - Standard
- `application/json; charset=utf-8` - Con encoding
- `application/problem+json` - Per errori (RFC 7807)

### Accept

Indica il tipo di contenuto accettato dal client:

```http
Accept: application/json
```

### Altri header comuni

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Length: 156
Cache-Control: no-cache
```

## Status codes

### Success (2xx)

```json
// 200 OK - Richiesta riuscita
{
  "status": "success",
  "data": { "id": 123 }
}

// 201 Created - Risorsa creata
{
  "status": "created",
  "data": { "id": 124 },
  "message": "Utente creato con successo"
}

// 204 No Content - Operazione riuscita senza contenuto
// (Nessun body JSON)
```

### Client Errors (4xx)

```json
// 400 Bad Request - Dati non validi
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dati non validi",
    "details": [
      {
        "field": "email",
        "message": "Email non valida"
      }
    ]
  }
}

// 401 Unauthorized - Non autenticato
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token di autenticazione mancante o non valido"
  }
}

// 404 Not Found - Risorsa non trovata
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Utente non trovato",
    "resource_id": 123
  }
}

// 409 Conflict - Conflitto
{
  "error": {
    "code": "CONFLICT",
    "message": "Email già esistente"
  }
}
```

### Server Errors (5xx)

```json
// 500 Internal Server Error
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Errore interno del server",
    "request_id": "abc-123-def"
  }
}

// 503 Service Unavailable
{
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "Servizio temporaneamente non disponibile",
    "retry_after": 60
  }
}
```

## Esempi pratici con Fetch API (JavaScript)

### GET Request

```javascript
fetch('https://api.esempio.com/utenti/123', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Errore:', error));
```

### POST Request

```javascript
fetch('https://api.esempio.com/utenti', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    nome: 'Mario',
    email: 'mario@esempio.com'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Errore:', error));
```

### Gestione errori

```javascript
async function fetchUtente(id) {
  try {
    const response = await fetch(`https://api.esempio.com/utenti/${id}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Errore nella richiesta');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Errore:', error.message);
    throw error;
  }
}
```
