# 🚀 Quick Start - ES02b

## Installazione

```bash
cd server
npm install
```

## Avvio Server

```bash
node server.js
```

## Test

1. Apri browser: https://w4s-3001.filippobilardo.it
2. Registra nuovo utente (password robusta richiesta)
3. Accedi con credenziali
4. Visualizza dashboard

## Differenze da ES02a

- ✅ Password hashate con bcrypt
- ✅ Sessioni server-side con express-session
- ✅ Cookie HTTP-only
- ✅ Validazione avanzata
- ✅ Route protette con middleware

## Comandi Utili

```bash
# Development con auto-reload
npm run dev

# Verificare sessioni attive
# (In MemoryStore vengono perse al restart)
```
