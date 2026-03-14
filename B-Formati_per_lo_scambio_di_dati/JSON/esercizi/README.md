# Esercizi JSON

Questa cartella contiene esercizi pratici per consolidare le conoscenze su JSON.

## Struttura

- **node/** - Esercizi da eseguire con Node.js
- **browser/** - Esercizi da eseguire nel browser

---

## Esercizi Node.js

### 01 - Lettura e scrittura file JSON
**Difficoltà**: ⭐ Facile  
**File**: `node/01-file-operations.js`  
**Obiettivi**:
- Leggere un file JSON
- Modificare i dati
- Scrivere su file

### 02 - Validazione con JSON Schema
**Difficoltà**: ⭐⭐ Medio  
**File**: `node/02-schema-validation.js`  
**Obiettivi**:
- Definire uno schema JSON
- Validare dati con Ajv
- Gestire errori di validazione

### 03 - API REST Server
**Difficoltà**: ⭐⭐⭐ Avanzato  
**File**: `node/03-rest-api-server.js`  
**Obiettivi**:
- Creare server Express
- Implementare endpoint CRUD
- Gestire richieste/risposte JSON

### 04 - Parsing e trasformazione dati
**Difficoltà**: ⭐⭐ Medio  
**File**: `node/04-data-transformation.js`  
**Obiettivi**:
- Parsing JSON complesso
- Trasformazione dati
- Aggregazione e filtraggio

### 05 - Streaming JSON grandi file
**Difficoltà**: ⭐⭐⭐ Avanzato  
**File**: `node/05-streaming-json.js`  
**Obiettivi**:
- Leggere file JSON in streaming
- Processare dati incrementalmente
- Gestione memoria efficiente

### 06 - JSON Web Token (JWT)
**Difficoltà**: ⭐⭐⭐ Avanzato  
**File**: `node/06-jwt-authentication.js`  
**Obiettivi**:
- Creare e firmare JWT
- Verificare token
- Implementare autenticazione

### 07 - Conversione formati
**Difficoltà**: ⭐⭐ Medio  
**File**: `node/07-format-conversion.js`  
**Obiettivi**:
- JSON to CSV
- JSON to XML
- CSV to JSON

### 08 - Database MongoDB
**Difficoltà**: ⭐⭐⭐ Avanzato  
**File**: `node/08-mongodb-operations.js`  
**Obiettivi**:
- CRUD con MongoDB
- Query su documenti JSON
- Aggregation pipeline

### 09 - API Meteo (Node.js)
**Difficoltà**: ⭐⭐ Medio  
**File**: `node/09-weather-api.js`  
**Obiettivi**:
- Chiamare API meteo (OpenWeatherMap)
- Parsing dati JSON meteo
- Salvataggio storico su file JSON

---

## Esercizi Browser

### 01 - Fetch API e JSON
**Difficoltà**: ⭐ Facile  
**File**: `browser/01-fetch-api.html`  
**Obiettivi**:
- Chiamare API pubbliche
- Parsing risposta JSON
- Visualizzare dati in HTML

### 02 - Form to JSON
**Difficoltà**: ⭐ Facile  
**File**: `browser/02-form-to-json.html`  
**Obiettivi**:
- Raccogliere dati da form
- Convertire in JSON
- Inviare con POST

### 03 - LocalStorage con JSON
**Difficoltà**: ⭐⭐ Medio  
**File**: `browser/03-localstorage-json.html`  
**Obiettivi**:
- Salvare oggetti in localStorage
- Recuperare e parsare dati
- Gestire persistenza

### 04 - JSON Viewer interattivo
**Difficoltà**: ⭐⭐ Medio  
**File**: `browser/04-json-viewer.html`  
**Obiettivi**:
- Tree view di JSON
- Collapsible nodes
- Syntax highlighting

### 05 - JSON Editor
**Difficoltà**: ⭐⭐⭐ Avanzato  
**File**: `browser/05-json-editor.html`  
**Obiettivi**:
- Editor JSON con validazione
- Real-time error checking
- Pretty print e minify

### 06 - Data Visualization
**Difficoltà**: ⭐⭐ Medio  
**File**: `browser/06-data-visualization.html`  
**Obiettivi**:
- Caricare dati JSON
- Creare grafici (Chart.js)
- Interattività

### 07 - REST API Client
**Difficoltà**: ⭐⭐⭐ Avanzato  
**File**: `browser/07-api-client.html`  
**Obiettivi**:
- Client per testare API
- CRUD operations
- Error handling

### 08 - Real-time con WebSocket
**Difficoltà**: ⭐⭐⭐ Avanzato  
**File**: `browser/08-websocket-json.html`  
**Obiettivi**:
- Comunicazione WebSocket
- Scambio messaggi JSON
- Real-time updates

### 09 - Open Food Facts API
**Difficoltà**: ⭐⭐ Medio  
**File**: `browser/09-openfoodfacts.html`  
**Obiettivi**:
- Ricerca prodotti alimentari
- Parsing dati nutrizionali JSON
- Visualizzazione informazioni prodotto

### 10 - Weather Dashboard
**Difficoltà**: ⭐⭐ Medio  
**File**: `browser/10-weather-dashboard.html`  
**Obiettivi**:
- Recuperare dati meteo da API
- Visualizzare previsioni meteo
- Gestire geolocalizzazione

---

## Come eseguire gli esercizi

### Node.js

1. Assicurati di avere Node.js installato:
   ```bash
   node --version
   ```

2. Installa le dipendenze (se necessario):
   ```bash
   cd node
   npm install
   ```

3. Esegui un esercizio:
   ```bash
   node 01-file-operations.js
   ```

### Browser

1. Apri il file HTML nel browser:
   ```bash
   # Linux/Mac
   open browser/01-fetch-api.html
   
   # Windows
   start browser/01-fetch-api.html
   ```

2. Oppure usa un server locale:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx http-server
   ```

3. Apri `http://localhost:8000` nel browser

---

## Suggerimenti

- Completa gli esercizi in ordine di difficoltà
- Leggi i commenti nel codice per le istruzioni
- Prova a modificare gli esercizi per sperimentare
- Consulta la documentazione dei capitoli del corso
- Confronta le tue soluzioni con quelle fornite

## Risorse utili

- **MDN Web Docs**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
- **Node.js Docs**: https://nodejs.org/api/fs.html
- **JSON.org**: https://www.json.org/
- **JSONPlaceholder** (API di test): https://jsonplaceholder.typicode.com/

## Progetti bonus

Dopo aver completato gli esercizi, prova questi progetti:

1. **Todo List Full Stack**: API Node.js + Frontend
2. **Blog System**: CRUD completo con MongoDB
3. **Weather Dashboard**: Integrazione API meteo
4. **Chat Application**: Real-time con WebSocket
5. **Data Analytics**: Analisi e visualizzazione dati JSON

---

**Buon lavoro! 🚀**
