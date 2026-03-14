# 🚀 Quick Start - ES01b TodoList

## Avvio Rapido (2 minuti)

### 1. Avvia il Server

```bash
cd server
node server.js
```

Dovresti vedere:
```
Server HTTP in ascolto su http://localhost:3000
```

### 2. Apri il Client

**Opzione A - Doppio Click**
- Apri il file `client/index.html` nel browser

**Opzione B - Live Server (VS Code)**
```bash
cd client
# Usa l'estensione "Live Server" di VS Code
# Click destro su index.html → "Open with Live Server"
```

**Opzione C - Python HTTP Server**
```bash
cd client
python3 -m http.server 8080
# Apri http://localhost:8080
```

### 3. Testa l'Applicazione

1. ✅ Verifica status: "Server connesso" (pallino verde)
2. ✅ Aggiungi un todo dal form
3. ✅ Spunta un todo (✓)
4. ✅ Elimina un todo (🗑️)

---

## Test API con curl

```bash
# Ottieni tutti i todo
curl http://localhost:3000/todos

# Crea nuovo todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test da curl","description":"Funziona!"}'

# Toggle completed (cambia ID con quello reale)
curl -X PATCH http://localhost:3000/todos/1/toggle

# Elimina todo (cambia ID)
curl -X DELETE http://localhost:3000/todos/1

# Statistiche
curl http://localhost:3000/stats
```

---

## Troubleshooting

### Il server non parte

**Errore:** `Error: listen EADDRINUSE: address already in use :::3000`

**Soluzione:** La porta 3000 è occupata
```bash
# Su Linux/Mac
lsof -ti:3000 | xargs kill

# Su Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Il client non si connette

1. **Verifica che il server sia in esecuzione**
   ```bash
   curl http://localhost:3000/stats
   ```

2. **Controlla la console del browser (F12)**
   - Cerca errori CORS o network

3. **Verifica URL nel file `client/app.js`**
   ```javascript
   const API_BASE_URL = 'http://localhost:3000';
   ```

---

**Buon divertimento!** 🎉
