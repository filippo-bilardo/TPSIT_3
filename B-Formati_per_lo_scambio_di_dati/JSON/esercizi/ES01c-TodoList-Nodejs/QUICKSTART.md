# 🚀 AVVIO RAPIDO

## 1. Installazione Dipendenze

```bash
cd server
npm install
```

## 2. Avvio Server

```bash
npm start
```

Output atteso:
```
╔════════════════════════════════════════════════╗
║   🚀 TODO LIST API SERVER AVVIATO             ║
╚════════════════════════════════════════════════╝

📡 Server in ascolto su https://w4s-3001.filippobilardo.it
```

## 3. Avvio Client

**Opzione A: Aprire direttamente il file**
```bash
# Apri client/index.html nel browser
```

**Opzione B: Usare un server HTTP locale (consigliato)**
```bash
cd client
python3 -m http.server 8000

# Poi apri: http://localhost:8000
```

## 4. Test

1. ✅ Verifica indicatore "Connesso al server" (verde)
2. ✅ Aggiungi una task
3. ✅ Ricarica pagina → task rimane (salvata su server!)
4. ✅ Toggle checkbox
5. ✅ Elimina task

## 🐛 Problemi Comuni

**Server non si avvia:**
```bash
# Verifica che Node.js sia installato
node --version

# Reinstalla dipendenze
cd server
rm -rf node_modules
npm install
```

**Client non si connette:**
- Verifica che il server sia avviato
- Controlla che la porta 3000 sia libera
- Apri DevTools (F12) e controlla Console per errori

**Porta 3000 occupata:**
```bash
# Cambia porta in server/server.js
const PORT = 3001;

# E in client/app.js
const API_BASE_URL = 'http://localhost:3001/api';
```

## 📚 File Importanti

- `server/server.js` - Server Express con API
- `server/data.json` - Database JSON (creato automaticamente)
- `client/app.js` - Logica client con Fetch API
- `client/index.html` - Interfaccia utente

## 💡 Test API con curl

```bash
# Lista task
curl https://w4s-3001.filippobilardo.it/api/todos

# Crea task
curl -X POST https://w4s-3001.filippobilardo.it/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Prova"}'

# Toggle task (id=1)
curl -X PATCH https://w4s-3001.filippobilardo.it/api/todos/1/toggle

# Elimina task (id=1)
curl -X DELETE https://w4s-3001.filippobilardo.it/api/todos/1

# Statistiche
curl https://w4s-3001.filippobilardo.it/api/stats
```

## 🎓 Prossimi Passi

Leggi il `README.md` completo per:
- Spiegazione dettagliata dell'architettura
- Documentazione API completa
- Criteri di valutazione
- Funzionalità extra opzionali
