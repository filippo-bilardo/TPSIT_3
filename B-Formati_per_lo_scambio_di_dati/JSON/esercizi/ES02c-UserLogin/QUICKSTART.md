# 🚀 Quick Start - ES02c

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

### 1. Registra Admin

Apri browser: https://w4s-3001.filippobilardo.it

Crea account admin:
- Username: admin
- Password: AdminPass123!
- Role: Admin

### 2. Test JWT

Il login restituisce:
- **Access Token** (valido 15 min)
- **Refresh Token** (valido 7 giorni)

### 3. Test RBAC

Prova ad accedere a `/admin/stats`:
- Con utente normale → 403 Forbidden
- Con admin → 200 OK + statistiche

### 4. Test Refresh

Dopo 15 minuti l'access token scade:
- Client rileva 401
- Automaticamente refresha con refresh token
- Riprova richiesta

## Endpoints

| Endpoint | Metodo | Auth | Ruolo |
|----------|--------|------|-------|
| /register | POST | No | - |
| /login | POST | No | - |
| /refresh | POST | No | - |
| /logout | POST | JWT | - |
| /me | GET | JWT | - |
| /users | GET | JWT | - |
| /admin/stats | GET | JWT | Admin |

## Debug JWT

Usa [jwt.io](https://jwt.io) per decodificare i token.

## Features

- ✅ JWT authentication (stateless)
- ✅ Access + Refresh tokens
- ✅ Auto-refresh quando scade access token
- ✅ Role-Based Access Control (RBAC)
- ✅ Password hashate con bcrypt
- ✅ Validazione avanzata
- ✅ Middleware auth e RBAC
