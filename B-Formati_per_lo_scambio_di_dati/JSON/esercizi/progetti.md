# Progetti Pratici JSON

Questa sezione contiene progetti completi per mettere in pratica le competenze acquisite sul formato JSON. I progetti sono organizzati per livello di difficoltà e coprono diversi ambiti applicativi.

---

## 📚 Indice per Livello

- [Progetti Principianti](#progetti-principianti) (⭐ Facile)
- [Progetti Intermedi](#progetti-intermedi) (⭐⭐ Medio)
- [Progetti Avanzati](#progetti-avanzati) (⭐⭐⭐ Avanzato)
- [Progetti Esperti](#progetti-esperti) (⭐⭐⭐⭐ Esperto)

---

## Progetti Principianti

### 1. Todo List Application
**Difficoltà**: ⭐ Facile  
**Tecnologie**: HTML, CSS, JavaScript  
**Obiettivi**:
- Creare interfaccia per gestire task
- Salvare dati in localStorage come JSON
- Implementare CRUD completo (Create, Read, Update, Delete)
- Gestire filtri (tutti, completati, da fare)

**Funzionalità**:
- ✅ Aggiungere nuove task
- ✅ Marcare come completate
- ✅ Modificare task esistenti
- ✅ Eliminare task
- ✅ Persistenza dati con localStorage
- ✅ Contatore task attive

---

### 2. Contact Book
**Difficoltà**: ⭐ Facile  
**Tecnologie**: HTML, CSS, JavaScript  
**Obiettivi**:
- Gestire rubrica contatti
- Validazione input (email, telefono)
- Esportazione/importazione JSON
- Ricerca e filtri

**Funzionalità**:
- 📇 Lista contatti con nome, email, telefono
- 🔍 Ricerca per nome
- 💾 Salvataggio in localStorage
- 📥 Importa/Esporta file JSON
- 🗑️ Eliminazione contatti

---

### 3. Recipe Manager
**Difficoltà**: ⭐ Facile  
**Tecnologie**: HTML, CSS, JavaScript  
**Obiettivi**:
- Gestire ricette culinarie
- Struttura JSON complessa (ingredienti, steps)
- Categorie e tags
- Visualizzazione dettagli ricetta

**Struttura JSON esempio**:
```json
{
  "id": 1,
  "nome": "Pasta al pomodoro",
  "categoria": "Primi",
  "tempo": 20,
  "porzioni": 4,
  "ingredienti": [
    { "nome": "Pasta", "quantità": "400g" },
    { "nome": "Pomodoro", "quantità": "500g" }
  ],
  "steps": [
    "Cuocere la pasta",
    "Preparare il sugo"
  ],
  "tags": ["veloce", "vegetariano"]
}
```

---

## Progetti Intermedi

### 4. Weather Dashboard
**Difficoltà**: ⭐⭐ Medio  
**Tecnologie**: HTML, CSS, JavaScript, API esterne  
**Obiettivi**:
- Integrare API meteo (OpenWeatherMap)
- Visualizzare dati con grafici (Chart.js)
- Gestire geolocalizzazione
- Cache e storico meteo

**Funzionalità**:
- 🌤️ Meteo attuale e previsioni 5 giorni
- 📍 Ricerca per città o geolocalizzazione
- 📊 Grafici temperatura/precipitazioni
- 💾 Storico ricerche (localStorage)
- 🌡️ Conversione unità (°C/°F)
- ⭐ Città preferite

---

### 5. Movie Database
**Difficoltà**: ⭐⭐ Medio  
**Tecnologie**: Node.js, Express, JSON file storage  
**Obiettivi**:
- API REST completa
- CRUD su file JSON
- Ricerca e filtri avanzati
- Paginazione risultati

**Endpoints**:
```
GET    /api/movies          - Lista film
GET    /api/movies/:id      - Dettagli film
POST   /api/movies          - Aggiungi film
PUT    /api/movies/:id      - Modifica film
DELETE /api/movies/:id      - Elimina film
GET    /api/movies/search   - Ricerca film
```

**Funzionalità extra**:
- 🎬 Categorie e generi
- ⭐ Sistema di rating
- 🔍 Ricerca avanzata
- 📄 Paginazione
- 🎯 Filtri multipli

---

### 6. Blog System
**Difficoltà**: ⭐⭐ Medio  
**Tecnologie**: Node.js, Express, Frontend  
**Obiettivi**:
- Sistema blog completo
- Gestione post, autori, commenti
- Autenticazione JWT
- Rich text editor

**Struttura dati**:
```json
{
  "post": {
    "id": 1,
    "titolo": "Primo post",
    "slug": "primo-post",
    "contenuto": "...",
    "autore_id": 1,
    "categoria": "Tech",
    "tags": ["javascript", "json"],
    "pubblicato": true,
    "data": "2024-03-14T10:00:00Z",
    "commenti": [...]
  }
}
```

---

### 7. E-commerce Cart
**Difficoltà**: ⭐⭐ Medio  
**Tecnologie**: Frontend + Backend  
**Obiettivi**:
- Carrello shopping completo
- Gestione inventario
- Calcolo totali e sconti
- Persistenza multi-sessione

**Funzionalità**:
- 🛒 Aggiungi/Rimuovi prodotti
- ➕ Modifica quantità
- 💰 Calcolo totale con sconti
- 🎟️ Codici promozionali
- 💾 Salva carrello (localStorage/DB)
- 📦 Gestione stock

---

## Progetti Avanzati

### 8. Real-time Chat Application
**Difficoltà**: ⭐⭐⭐ Avanzato  
**Tecnologie**: Node.js, Socket.io, Express  
**Obiettivi**:
- Chat real-time con WebSocket
- Messaggi JSON strutturati
- Stanze/canali multipli
- Storico messaggi

**Struttura messaggio JSON**:
```json
{
  "id": "msg-123",
  "room": "generale",
  "user": {
    "id": 1,
    "username": "Mario",
    "avatar": "url"
  },
  "tipo": "text",
  "contenuto": "Ciao!",
  "timestamp": "2024-03-14T10:30:00Z",
  "letto": false
}
```

**Funzionalità**:
- 💬 Chat real-time
- 👥 Utenti online
- 🚪 Stanze multiple
- 📎 Condivisione file
- 🔔 Notifiche
- 📜 Storico messaggi

---

### 9. Task Management System (Trello-like)
**Difficoltà**: ⭐⭐⭐ Avanzato  
**Tecnologie**: Full-stack (React/Vue + Node.js)  
**Obiettivi**:
- Board con colonne drag-and-drop
- Gestione progetti e task
- Collaborazione team
- Export/Import JSON

**Funzionalità**:
- 📋 Board multipli
- 📝 Card con dettagli completi
- 🏷️ Labels e categorie
- 👤 Assegnazione membri
- 📅 Scadenze
- 💬 Commenti
- 📎 Allegati
- 📊 Progress tracking

---

### 10. REST API Testing Tool (Postman-like)
**Difficoltà**: ⭐⭐⭐ Avanzato  
**Tecnologie**: Electron o Web App  
**Obiettivi**:
- Client per testare API REST
- Editor JSON avanzato
- Collections di richieste
- Test automatici

**Funzionalità**:
- 🌐 Supporto tutti i metodi HTTP
- 📝 Editor JSON con validazione
- 💾 Salva collections
- 🔑 Gestione headers/auth
- ⚡ Variabili d'ambiente
- ✅ Test automatici
- 📊 Visualizzazione risposte

---

### 11. Data Visualization Dashboard
**Difficoltà**: ⭐⭐⭐ Avanzato  
**Tecnologie**: D3.js / Chart.js, Frontend framework  
**Obiettivi**:
- Dashboard interattiva
- Caricamento dataset JSON
- Grafici multipli
- Export risultati

**Funzionalità**:
- 📊 Grafici multipli (bar, line, pie, scatter)
- 📥 Import JSON/CSV
- 🔄 Trasformazione dati
- 🎨 Customizzazione visuale
- 📱 Responsive design
- 💾 Salva configurazioni
- 📸 Export immagini/PDF

---

## Progetti Esperti

### 12. JSON Database Engine
**Difficoltà**: ⭐⭐⭐⭐ Esperto  
**Tecnologie**: Node.js  
**Obiettivi**:
- Database basato su file JSON
- Query language (simile SQL)
- Indicizzazione
- Transazioni

**Funzionalità**:
- 💾 Storage su file JSON
- 🔍 Query complesse
- 📇 Indici per performance
- 🔒 Transazioni ACID
- 🔗 Relazioni tra collection
- 📊 Aggregazioni
- 🔄 Backup/Restore

---

### 13. API Gateway con Rate Limiting
**Difficoltà**: ⭐⭐⭐⭐ Esperto  
**Tecnologie**: Node.js, Redis  
**Obiettivi**:
- Gateway per multiple API
- Rate limiting
- Caching risposte
- Analytics

**Funzionalità**:
- 🚪 Routing richieste
- ⏱️ Rate limiting per API key
- 💾 Cache Redis
- 📊 Analytics e logging
- 🔑 Gestione API keys
- 🔄 Load balancing
- 📝 Swagger documentation

---

### 14. Microservices Architecture
**Difficoltà**: ⭐⭐⭐⭐ Esperto  
**Tecnologie**: Node.js, Docker, Message Queue  
**Obiettivi**:
- Architettura microservizi
- Comunicazione JSON tra servizi
- Event-driven architecture
- Service discovery

**Servizi**:
- 👤 User Service
- 📦 Product Service
- 🛒 Order Service
- 💳 Payment Service
- 📧 Notification Service

**Comunicazione**:
- REST API (JSON)
- Message Queue (RabbitMQ/Kafka)
- Event streaming

---

### 15. Real-time Analytics Platform
**Difficoltà**: ⭐⭐⭐⭐ Esperto  
**Tecnologie**: Node.js, WebSocket, Database  
**Obiettivi**:
- Analisi dati in tempo reale
- Stream processing
- Dashboard live
- Alerts automatici

**Funzionalità**:
- 📊 Metriche real-time
- 🔔 Alert su soglie
- 📈 Trend analysis
- 💾 Data aggregation
- 🎯 Custom KPI
- 📱 Mobile dashboard
- 📧 Report automatici

---

## 🛠️ Progetti Specializzati

### 16. JSON Schema Generator
**Difficoltà**: ⭐⭐⭐ Avanzato  
**Descrizione**: Tool che genera automaticamente JSON Schema da esempi JSON

### 17. JSON Diff Viewer
**Difficoltà**: ⭐⭐ Medio  
**Descrizione**: Visualizzatore differenze tra due file JSON

### 18. JSON to TypeScript Converter
**Difficoltà**: ⭐⭐⭐ Avanzato  
**Descrizione**: Genera interfacce TypeScript da JSON

### 19. JSON Validator Service
**Difficoltà**: ⭐⭐ Medio  
**Descrizione**: Servizio web per validazione JSON con JSON Schema

### 20. JSON Transformer Pipeline
**Difficoltà**: ⭐⭐⭐ Avanzato  
**Descrizione**: Pipeline per trasformazioni JSON complesse

---

## 📖 Suggerimenti per lo Sviluppo

### Prima di iniziare
1. ✅ Studia i requisiti del progetto
2. ✅ Disegna la struttura JSON dei dati
3. ✅ Crea un JSON Schema se necessario
4. ✅ Pianifica l'architettura dell'applicazione
5. ✅ Setup ambiente di sviluppo

### Durante lo sviluppo
1. 🔍 Valida sempre i dati JSON
2. 🛡️ Implementa gestione errori robusta
3. 💾 Usa backup per dati importanti
4. 🧪 Scrivi test per le funzioni critiche
5. 📝 Documenta la struttura dati

### Testing
1. ✅ Test unitari per parsing/serializzazione
2. ✅ Test integrazione per API
3. ✅ Test con dati edge case
4. ✅ Test performance con dataset grandi
5. ✅ Test sicurezza (injection, validation)

---

## 🎯 Percorsi di Apprendimento Consigliati

### Percorso Frontend
1. Todo List Application
2. Weather Dashboard
3. Recipe Manager
4. Data Visualization Dashboard

### Percorso Backend
1. Contact Book (con API)
2. Movie Database
3. Blog System
4. API Gateway

### Percorso Full-Stack
1. E-commerce Cart
2. Task Management System
3. Real-time Chat
4. Microservices Architecture

### Percorso DevTools
1. JSON Validator Service
2. JSON Diff Viewer
3. REST API Testing Tool
4. JSON Schema Generator

---

## 📚 Risorse Aggiuntive

### Datasets JSON per test
- **JSONPlaceholder**: https://jsonplaceholder.typicode.com/
- **Random User API**: https://randomuser.me/
- **Open Food Facts**: https://world.openfoodfacts.org/
- **REST Countries**: https://restcountries.com/

### Librerie utili
- **Validazione**: Ajv, joi, yup
- **Trasformazione**: jq, JSONPath
- **Grafici**: Chart.js, D3.js
- **Real-time**: Socket.io, WebSocket

### Tool di sviluppo
- **Postman**: Test API
- **Insomnia**: Client REST
- **JSONLint**: Validazione
- **JSON Editor Online**: Editor visuale

---

## 💡 Idee per Progetti Personalizzati

Combina più concetti per creare progetti unici:

- 🎮 **Game Score Tracker** - Gaming + JSON storage
- 📚 **Digital Library** - Books + REST API
- 💰 **Expense Tracker** - Finance + Charts
- 🎵 **Music Playlist Manager** - Media + Metadata
- 🏋️ **Fitness Tracker** - Health + Analytics
- 🍕 **Food Delivery System** - E-commerce + Real-time
- 🎓 **Learning Management System** - Education + Progress tracking
- 🏨 **Hotel Booking System** - Reservations + Calendar

---

**Buon coding! 🚀**

Per domande o suggerimenti su questi progetti, consulta la documentazione del corso o partecipa alle discussioni nella community.
