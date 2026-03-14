# 11. Ottimizzazione e performance

## Minimizzazione

La minimizzazione rimuove spazi bianchi, newline e indentazione per ridurre la dimensione del file.

### Esempio

```javascript
// JSON formattato (156 byte)
{
  "nome": "Mario",
  "cognome": "Rossi",
  "età": 30,
  "città": "Roma"
}

// JSON minimizzato (54 byte - 65% più piccolo)
{"nome":"Mario","cognome":"Rossi","età":30,"città":"Roma"}
```

### Minimizzazione in JavaScript

```javascript
// Senza spazi
const minified = JSON.stringify(data);

// Con formattazione leggibile
const formatted = JSON.stringify(data, null, 2);
```

### Tool online
- **JSON Minifier** (jsonminifier.com)
- **JSONLint** (con opzione minify)

### Build tools

```javascript
// Webpack - json-loader minimizza automaticamente in produzione
// Gulp
const gulp = require('gulp');
const jsonminify = require('gulp-jsonminify');

gulp.task('minify-json', () => {
  return gulp.src('src/**/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest('dist'));
});
```

## Compressione

### Gzip compression (HTTP)

```javascript
// Express.js
const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression()); // Abilita gzip per tutte le risposte

app.get('/api/data', (req, res) => {
  res.json(largeDataObject);
  // Automaticamente compresso con gzip
});
```

### Brotli compression (più efficiente)

```javascript
const express = require('express');
const shrinkRay = require('shrink-ray-current');

const app = express();
app.use(shrinkRay()); // Usa Brotli quando supportato

// Risultato: ~20-30% più piccolo di gzip
```

### Confronto dimensioni

```
Dati originali:     1.2 MB
Minimizzato:        800 KB  (-33%)
Gzip:              150 KB  (-87.5%)
Brotli:            120 KB  (-90%)
```

## Streaming JSON

Per dati molto grandi, lo streaming evita di caricare tutto in memoria.

### Node.js - Streaming write

```javascript
const fs = require('fs');
const { Readable } = require('stream');

// Scrive JSON in stream
const writeStream = fs.createWriteStream('large-data.json');

writeStream.write('[\n');

for (let i = 0; i < 1000000; i++) {
  const obj = { id: i, value: Math.random() };
  writeStream.write(JSON.stringify(obj));
  
  if (i < 999999) {
    writeStream.write(',\n');
  }
}

writeStream.write('\n]');
writeStream.end();
```

### Streaming parse

```javascript
const fs = require('fs');
const StreamArray = require('stream-json/streamers/StreamArray');

// Legge array JSON in stream
fs.createReadStream('large-data.json')
  .pipe(StreamArray.withParser())
  .on('data', ({ key, value }) => {
    console.log(`Item ${key}:`, value);
    // Processa un elemento alla volta
  })
  .on('end', () => {
    console.log('Parsing completato');
  });
```

### Librerie per streaming

1. **stream-json** (Node.js)
   ```javascript
   const { parser } = require('stream-json');
   const { streamArray } = require('stream-json/streamers/StreamArray');
   
   pipeline.pipe(parser()).pipe(streamArray());
   ```

2. **oboe.js** (Browser e Node.js)
   ```javascript
   oboe('http://api.esempio.com/large-data.json')
     .node('items.*', item => {
       console.log('Item ricevuto:', item);
     })
     .done(data => {
       console.log('Completato');
     });
   ```

## JSON binari (BSON, MessagePack)

### BSON (Binary JSON)

Usato da MongoDB, supporta tipi aggiuntivi e è più efficiente per alcuni dati.

```javascript
const BSON = require('bson');

// Serializzazione
const data = { nome: "Mario", età: 30, data: new Date() };
const bsonData = BSON.serialize(data);

// Deserializzazione
const parsed = BSON.deserialize(bsonData);

// Vantaggi:
// - Supporta Date, Binary, ObjectId
// - Parsing più veloce per alcuni tipi
// - Dimensione variabile (a volte più grande di JSON)
```

### MessagePack

Formato binario più compatto di JSON.

```javascript
const msgpack = require('msgpack-lite');

// Encoding
const data = { nome: "Mario", età: 30, tags: ["a", "b", "c"] };
const packed = msgpack.encode(data);

// Decoding
const unpacked = msgpack.decode(packed);

// Confronto dimensioni:
// JSON:        {"nome":"Mario","età":30} → 27 byte
// MessagePack: [packed binary]           → 18 byte (~33% più piccolo)
```

### Quando usare formati binari

**Usa JSON quando:**
- Leggibilità è importante
- Debugging frequente
- Compatibilità universale necessaria
- HTTP/REST API pubbliche

**Usa formati binari quando:**
- Performance critica
- Banda limitata (mobile, IoT)
- Comunicazione interna tra microservizi
- Dati molto grandi

### Confronto prestazioni

```javascript
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const data = { /* oggetto complesso */ };

suite
  .add('JSON stringify', () => {
    JSON.stringify(data);
  })
  .add('MessagePack encode', () => {
    msgpack.encode(data);
  })
  .add('BSON serialize', () => {
    BSON.serialize(data);
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .run();

// Risultati tipici (ops/sec):
// JSON stringify:      100,000
// MessagePack encode:  150,000 (+50%)
// BSON serialize:       80,000 (-20%)
```

## Ottimizzazioni varie

### 1. Evitare ridondanze

```javascript
// INEFFICIENTE - dati ripetuti
{
  "ordini": [
    {
      "id": 1,
      "cliente": { "id": 1, "nome": "Mario", "email": "mario@ex.com" },
      "prodotto": "Laptop"
    },
    {
      "id": 2,
      "cliente": { "id": 1, "nome": "Mario", "email": "mario@ex.com" },
      "prodotto": "Mouse"
    }
  ]
}

// EFFICIENTE - normalizzato
{
  "clienti": {
    "1": { "id": 1, "nome": "Mario", "email": "mario@ex.com" }
  },
  "ordini": [
    { "id": 1, "cliente_id": 1, "prodotto": "Laptop" },
    { "id": 2, "cliente_id": 1, "prodotto": "Mouse" }
  ]
}
```

### 2. Usare abbreviazioni per chiavi ripetute

```javascript
// Prima (200 KB)
[
  { "timestamp": 123, "temperature": 25, "humidity": 60 },
  { "timestamp": 124, "temperature": 26, "humidity": 61 },
  // ... migliaia di record
]

// Dopo (120 KB) - 40% più piccolo
[
  { "ts": 123, "t": 25, "h": 60 },
  { "ts": 124, "t": 26, "h": 61 },
  // ... migliaia di record
]
```

### 3. Paginazione per dataset grandi

```javascript
// Invece di restituire tutti i dati
{
  "data": [ /* 10,000 elementi */ ],
  "total": 10000
}

// Usa paginazione
{
  "data": [ /* 20 elementi */ ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 10000,
    "total_pages": 500
  },
  "links": {
    "next": "/api/data?page=2",
    "prev": null
  }
}
```

### 4. Caching

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minuti

app.get('/api/data', async (req, res) => {
  const cacheKey = 'api-data';
  
  // Controlla cache
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  
  // Recupera da DB
  const data = await db.getData();
  
  // Salva in cache
  cache.set(cacheKey, data);
  
  res.json(data);
});
```

### 5. Lazy loading / On-demand

```javascript
// Invece di caricare tutto
{
  "articolo": {
    "titolo": "...",
    "contenuto": "...",
    "autore": { /* dati completi */ },
    "commenti": [ /* 1000 commenti */ ]
  }
}

// Carica solo necessario, il resto on-demand
{
  "articolo": {
    "titolo": "...",
    "contenuto": "...",
    "autore_id": 123,
    "commenti_count": 1000,
    "_links": {
      "autore": "/api/utenti/123",
      "commenti": "/api/articoli/1/commenti"
    }
  }
}
```
