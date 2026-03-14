# 💾 Guida Completa a localStorage

## Indice

1. [Introduzione](#introduzione)
2. [Cos'è localStorage](#cosè-localstorage)
3. [API e Metodi](#api-e-metodi)
4. [Esempi Pratici](#esempi-pratici)
5. [localStorage vs sessionStorage vs Cookies](#localstorage-vs-sessionstorage-vs-cookies)
6. [Limitazioni](#limitazioni)
7. [Best Practices](#best-practices)
8. [Sicurezza](#sicurezza)
9. [JSON e localStorage](#json-e-localstorage)
10. [Casi d'uso Comuni](#casi-duso-comuni)

---

## Introduzione

Il **Web Storage API** fornisce meccanismi per memorizzare dati nel browser in modo persistente o temporaneo. `localStorage` è uno degli strumenti più utilizzati per salvare dati lato client senza dover ricorrere a database o cookie.

### Caratteristiche Principali

✅ **Persistenza**: I dati rimangono anche dopo la chiusura del browser  
✅ **Semplice da usare**: API sincrona con metodi intuitivi  
✅ **Capacità**: ~5-10 MB per dominio (dipende dal browser)  
✅ **No scadenza**: I dati non scadono automaticamente  
✅ **Locale**: I dati NON vengono inviati al server con ogni richiesta HTTP  

---

## Cos'è localStorage

`localStorage` è un oggetto globale disponibile nel browser che permette di salvare coppie **chiave-valore** in formato **stringa**.

### Come Funziona

```javascript
// localStorage è disponibile globalmente
console.log(window.localStorage); // Storage {length: 0}

// Oppure direttamente
console.log(localStorage); // Storage {length: 0}
```

### Quando Usarlo

- ✅ Salvare preferenze utente (tema, lingua, layout)
- ✅ Cache di dati non sensibili
- ✅ Stato dell'applicazione (filtri, ordinamenti)
- ✅ Form draft (bozze di testi)
- ✅ Dati di applicazioni single-page (SPA)

### Quando NON Usarlo

- ❌ Dati sensibili (password, token, informazioni personali)
- ❌ Dati che devono sincronizzarsi tra tab (usa `sessionStorage` o BroadcastChannel)
- ❌ Grandi quantità di dati (>5MB)
- ❌ Dati che devono essere inviati al server ad ogni richiesta

---

## API e Metodi

### 1. `setItem(key, value)`

Salva un valore associato a una chiave.

```javascript
// Sintassi
localStorage.setItem(chiave, valore);

// Esempio
localStorage.setItem('username', 'Mario');
localStorage.setItem('theme', 'dark');
```

**⚠️ IMPORTANTE**: Il valore viene **sempre convertito in stringa**.

```javascript
localStorage.setItem('age', 25);
console.log(typeof localStorage.getItem('age')); // "string"
```

---

### 2. `getItem(key)`

Recupera il valore associato a una chiave.

```javascript
// Sintassi
const valore = localStorage.getItem(chiave);

// Esempio
const username = localStorage.getItem('username'); // "Mario"
const theme = localStorage.getItem('theme'); // "dark"

// Se la chiave non esiste, ritorna null
const missing = localStorage.getItem('nonEsiste'); // null
```

---

### 3. `removeItem(key)`

Rimuove una singola chiave e il suo valore.

```javascript
// Sintassi
localStorage.removeItem(chiave);

// Esempio
localStorage.removeItem('username');
console.log(localStorage.getItem('username')); // null
```

---

### 4. `clear()`

Rimuove **tutte** le chiavi e i valori del dominio corrente.

```javascript
// Sintassi
localStorage.clear();

// Esempio
localStorage.setItem('key1', 'value1');
localStorage.setItem('key2', 'value2');
console.log(localStorage.length); // 2

localStorage.clear();
console.log(localStorage.length); // 0
```

---

### 5. `key(index)`

Ottiene il nome della chiave all'indice specificato.

```javascript
// Sintassi
const chiave = localStorage.key(indice);

// Esempio
localStorage.setItem('username', 'Mario');
localStorage.setItem('theme', 'dark');

console.log(localStorage.key(0)); // "username" (o "theme", ordine non garantito)
console.log(localStorage.key(1)); // "theme" (o "username")
console.log(localStorage.key(2)); // null (non esiste)
```

---

### 6. `length`

Restituisce il numero di chiavi salvate.

```javascript
// Esempio
console.log(localStorage.length); // 0

localStorage.setItem('key1', 'value1');
localStorage.setItem('key2', 'value2');

console.log(localStorage.length); // 2
```

---

## Esempi Pratici

### Esempio 1: Salvare e Recuperare una Stringa

```javascript
// Salvare
localStorage.setItem('message', 'Benvenuto!');

// Recuperare
const message = localStorage.getItem('message');
console.log(message); // "Benvenuto!"

// Rimuovere
localStorage.removeItem('message');
```

---

### Esempio 2: Salvare Numeri e Booleani

```javascript
// ⚠️ PROBLEMA: Tutto viene convertito in stringa
localStorage.setItem('count', 42);
localStorage.setItem('isActive', true);

const count = localStorage.getItem('count');
const isActive = localStorage.getItem('isActive');

console.log(typeof count);    // "string" ❌
console.log(typeof isActive); // "string" ❌

// ✅ SOLUZIONE: Convertire esplicitamente
const countNumber = parseInt(localStorage.getItem('count'), 10);
const isActiveBoolean = localStorage.getItem('isActive') === 'true';

console.log(typeof countNumber);    // "number" ✅
console.log(typeof isActiveBoolean); // "boolean" ✅
```

---

### Esempio 3: Iterare su Tutte le Chiavi

```javascript
// Metodo 1: Usando for loop
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}

// Metodo 2: Usando Object.keys()
Object.keys(localStorage).forEach(key => {
    console.log(`${key}: ${localStorage.getItem(key)}`);
});
```

---

### Esempio 4: Verificare se una Chiave Esiste

```javascript
// Metodo 1: Controllo con getItem
if (localStorage.getItem('username') !== null) {
    console.log('Username esiste');
}

// Metodo 2: Usando l'operatore in
if ('username' in localStorage) {
    console.log('Username esiste');
}

// Metodo 3: Usando hasOwnProperty
if (localStorage.hasOwnProperty('username')) {
    console.log('Username esiste');
}
```

---

## localStorage vs sessionStorage vs Cookies

| Caratteristica | localStorage | sessionStorage | Cookies |
|---------------|--------------|----------------|---------|
| **Persistenza** | Permanente (finché non eliminato) | Solo durante la sessione | Scadenza configurabile |
| **Capacità** | ~5-10 MB | ~5-10 MB | ~4 KB per cookie |
| **Scope** | Tutto il dominio | Solo la tab corrente | Tutto il dominio |
| **Inviato al server** | ❌ No | ❌ No | ✅ Sì (ad ogni richiesta) |
| **API** | Semplice (setItem/getItem) | Semplice (setItem/getItem) | Complessa (document.cookie) |
| **Uso principale** | Dati persistenti lato client | Dati temporanei per sessione | Autenticazione, tracking |

### Esempio Comparativo

```javascript
// localStorage - Persiste anche dopo chiusura browser
localStorage.setItem('theme', 'dark');

// sessionStorage - Viene cancellato alla chiusura tab
sessionStorage.setItem('tempData', 'temporary');

// Cookie - Viene inviato al server ad ogni richiesta
document.cookie = "user=Mario; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/";
```

---

## Limitazioni

### 1. Solo Stringhe

```javascript
// ❌ PROBLEMA: Gli oggetti vengono convertiti in stringa
const user = { name: 'Mario', age: 30 };
localStorage.setItem('user', user);

console.log(localStorage.getItem('user')); // "[object Object]" ❌

// ✅ SOLUZIONE: Usare JSON.stringify()
localStorage.setItem('user', JSON.stringify(user));
console.log(JSON.parse(localStorage.getItem('user'))); // { name: 'Mario', age: 30 } ✅
```

---

### 2. Limite di Capacità

La maggior parte dei browser limita localStorage a **5-10 MB** per dominio.

```javascript
// Funzione per verificare lo spazio disponibile
function getStorageSize() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }
    return (total / 1024).toFixed(2) + ' KB';
}

console.log('Spazio usato:', getStorageSize());
```

---

### 3. Sincronizzazione

localStorage **NON è sincrono** tra diverse tab/finestre dello stesso dominio.

```javascript
// Tab 1
localStorage.setItem('count', '1');

// Tab 2 - NON vede immediatamente il cambiamento
// Serve ascoltare l'evento 'storage' (vedi sotto)
```

**Soluzione**: Usare l'evento `storage` per sincronizzare.

```javascript
// Ascolta i cambiamenti da altre tab
window.addEventListener('storage', (event) => {
    console.log('Chiave modificata:', event.key);
    console.log('Vecchio valore:', event.oldValue);
    console.log('Nuovo valore:', event.newValue);
    console.log('URL origine:', event.url);
    
    // Aggiorna l'UI di conseguenza
    if (event.key === 'theme') {
        applyTheme(event.newValue);
    }
});
```

⚠️ **NOTA**: L'evento `storage` viene lanciato solo nelle **altre** tab, non in quella che ha effettuato la modifica.

---

### 4. Operazioni Sincrone

Le operazioni localStorage sono **sincrone** e bloccanti.

```javascript
// ❌ Può bloccare il thread principale con dati molto grandi
for (let i = 0; i < 10000; i++) {
    localStorage.setItem(`key${i}`, 'value');
}

// ✅ Meglio limitare le operazioni o usare IndexedDB per grandi quantità
```

---

### 5. Scope Limitato al Dominio

I dati sono accessibili solo dallo **stesso dominio** (protocollo + hostname + porta).

```javascript
// http://example.com
localStorage.setItem('data', 'value');

// https://example.com - NON può accedere ai dati (protocollo diverso)
// http://sub.example.com - NON può accedere ai dati (sottodominio diverso)
// http://example.com:8080 - NON può accedere ai dati (porta diversa)
```

---

## Best Practices

### 1. Gestire Errori con Try-Catch

```javascript
function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        // QuotaExceededError - Storage pieno
        // SecurityError - Privacy mode (Safari)
        console.error('Errore localStorage:', error);
        return false;
    }
}

function safeGetItem(key, defaultValue = null) {
    try {
        return localStorage.getItem(key) || defaultValue;
    } catch (error) {
        console.error('Errore localStorage:', error);
        return defaultValue;
    }
}
```

---

### 2. Creare Wrapper Utility

```javascript
// Utility per gestire localStorage con JSON automatico
const storage = {
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('Errore salvataggio:', error);
            return false;
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (error) {
            console.error('Errore lettura:', error);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Errore rimozione:', error);
            return false;
        }
    },
    
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Errore clear:', error);
            return false;
        }
    }
};

// Utilizzo
storage.set('user', { name: 'Mario', age: 30 });
const user = storage.get('user'); // { name: 'Mario', age: 30 }
```

---

### 3. Namespace per Evitare Conflitti

```javascript
// ❌ PROBLEMA: Conflitti tra diversi script sulla stessa pagina
localStorage.setItem('config', '...');

// ✅ SOLUZIONE: Usare prefissi/namespace
const APP_PREFIX = 'myApp_';

function setAppItem(key, value) {
    localStorage.setItem(APP_PREFIX + key, value);
}

function getAppItem(key) {
    return localStorage.getItem(APP_PREFIX + key);
}

setAppItem('config', JSON.stringify({ theme: 'dark' }));
// Salva come: "myApp_config"
```

---

### 4. Versionamento dei Dati

```javascript
const STORAGE_VERSION = '1.0';
const STORAGE_KEY = 'appData';

function saveData(data) {
    const wrapper = {
        version: STORAGE_VERSION,
        timestamp: Date.now(),
        data: data
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wrapper));
}

function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    try {
        const wrapper = JSON.parse(stored);
        
        // Verifica versione
        if (wrapper.version !== STORAGE_VERSION) {
            console.warn('Versione dati obsoleta, migrazione necessaria');
            // Esegui migrazione dati
            return migrateData(wrapper);
        }
        
        return wrapper.data;
    } catch (error) {
        console.error('Errore parsing dati:', error);
        return null;
    }
}
```

---

### 5. Pulizia Automatica (Garbage Collection)

```javascript
// Salva con timestamp per pulizia automatica
function setWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl // ttl in millisecondi
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    // Verifica scadenza
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    
    return item.value;
}

// Esempio: salva per 1 ora
setWithExpiry('tempData', { foo: 'bar' }, 60 * 60 * 1000);
```

---

## Sicurezza

### ⚠️ Rischi di Sicurezza

1. **XSS (Cross-Site Scripting)**: localStorage è vulnerabile a XSS
2. **Nessuna crittografia**: I dati sono in chiaro
3. **Accessibile da JavaScript**: Qualsiasi script può leggere

### 🛡️ Best Practices di Sicurezza

#### 1. NON Salvare Dati Sensibili

```javascript
// ❌ MAI fare questo
localStorage.setItem('password', 'password123');
localStorage.setItem('creditCard', '1234-5678-9012-3456');
localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

// ✅ Salvare solo dati non sensibili
localStorage.setItem('theme', 'dark');
localStorage.setItem('language', 'it');
```

#### 2. Sanitizzare Input

```javascript
// Funzione di escape per prevenire XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Uso
const userInput = '<script>alert("XSS")</script>';
const safe = escapeHtml(userInput);
localStorage.setItem('userNote', safe);
```

#### 3. Validare i Dati in Lettura

```javascript
function validateAndGet(key, validator) {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    
    try {
        const parsed = JSON.parse(value);
        if (validator(parsed)) {
            return parsed;
        } else {
            console.warn('Validazione fallita per:', key);
            return null;
        }
    } catch (error) {
        console.error('Errore parsing:', error);
        return null;
    }
}

// Esempio: validare un oggetto user
const user = validateAndGet('user', (data) => {
    return data && 
           typeof data.name === 'string' && 
           typeof data.age === 'number' &&
           data.age > 0 && data.age < 150;
});
```

---

## JSON e localStorage

### Salvare Oggetti Complessi

```javascript
// Oggetto complesso
const userData = {
    profile: {
        name: 'Mario',
        surname: 'Rossi',
        age: 30
    },
    preferences: {
        theme: 'dark',
        language: 'it',
        notifications: true
    },
    todos: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true }
    ]
};

// Salva
localStorage.setItem('userData', JSON.stringify(userData));

// Recupera
const loaded = JSON.parse(localStorage.getItem('userData'));
console.log(loaded.profile.name); // "Mario"
console.log(loaded.todos[0].title); // "Task 1"
```

---

### Gestire Array

```javascript
// Aggiungere elemento a un array esistente
function addToArray(key, newItem) {
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(newItem);
    localStorage.setItem(key, JSON.stringify(existing));
}

// Rimuovere elemento da array
function removeFromArray(key, predicate) {
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const filtered = existing.filter(predicate);
    localStorage.setItem(key, JSON.stringify(filtered));
}

// Esempio
addToArray('todos', { id: 1, title: 'Studiare JSON' });
addToArray('todos', { id: 2, title: 'Fare esercizi' });

removeFromArray('todos', item => item.id !== 1);
```

---

### Pattern CRUD Completo

```javascript
const TodoStorage = {
    KEY: 'todos',
    
    // CREATE
    add(todo) {
        const todos = this.getAll();
        todos.push({ ...todo, id: Date.now() });
        this.saveAll(todos);
        return todo;
    },
    
    // READ
    getAll() {
        return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    },
    
    getById(id) {
        const todos = this.getAll();
        return todos.find(todo => todo.id === id);
    },
    
    // UPDATE
    update(id, updates) {
        const todos = this.getAll();
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos[index] = { ...todos[index], ...updates };
            this.saveAll(todos);
            return todos[index];
        }
        return null;
    },
    
    // DELETE
    delete(id) {
        const todos = this.getAll();
        const filtered = todos.filter(todo => todo.id !== id);
        this.saveAll(filtered);
    },
    
    // UTILITY
    saveAll(todos) {
        localStorage.setItem(this.KEY, JSON.stringify(todos));
    },
    
    clear() {
        localStorage.removeItem(this.KEY);
    }
};

// Utilizzo
TodoStorage.add({ title: 'Studiare', completed: false });
const all = TodoStorage.getAll();
TodoStorage.update(all[0].id, { completed: true });
TodoStorage.delete(all[0].id);
```

---

## Casi d'uso Comuni

### 1. Salvare Tema Applicazione

```javascript
// Salva tema
function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
}

// Carica tema al refresh
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
}

// Toggle tema
function toggleTheme() {
    const current = localStorage.getItem('theme') || 'light';
    const newTheme = current === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Inizializza al caricamento pagina
document.addEventListener('DOMContentLoaded', loadTheme);
```

---

### 2. Salvare Stato Form (Draft)

```javascript
const DRAFT_KEY = 'formDraft';

// Salva automaticamente ogni 2 secondi
let saveTimeout;
const form = document.getElementById('myForm');

form.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveDraft();
    }, 2000);
});

function saveDraft() {
    const formData = {
        title: form.title.value,
        description: form.description.value,
        timestamp: Date.now()
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    showNotification('Bozza salvata');
}

function loadDraft() {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
        const data = JSON.parse(draft);
        form.title.value = data.title;
        form.description.value = data.description;
        showNotification('Bozza ripristinata');
    }
}

function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
}

// Carica bozza al caricamento
window.addEventListener('DOMContentLoaded', loadDraft);

// Cancella bozza dopo invio riuscito
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // ... invio form ...
    clearDraft();
});
```

---

### 3. Cache di Dati API

```javascript
async function fetchWithCache(url, cacheTime = 5 * 60 * 1000) {
    const cacheKey = `cache_${url}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        if (age < cacheTime) {
            console.log('Usando cache');
            return data;
        }
    }
    
    console.log('Fetching da API');
    const response = await fetch(url);
    const data = await response.json();
    
    localStorage.setItem(cacheKey, JSON.stringify({
        data: data,
        timestamp: Date.now()
    }));
    
    return data;
}

// Uso
const data = await fetchWithCache('https://api.example.com/data', 10 * 60 * 1000);
```

---

### 4. Preferenze Utente

```javascript
const UserPreferences = {
    KEY: 'userPreferences',
    
    defaults: {
        language: 'it',
        theme: 'light',
        notifications: true,
        fontSize: 16,
        autoSave: true
    },
    
    get(key) {
        const prefs = this.getAll();
        return prefs[key];
    },
    
    getAll() {
        const stored = localStorage.getItem(this.KEY);
        if (stored) {
            return { ...this.defaults, ...JSON.parse(stored) };
        }
        return this.defaults;
    },
    
    set(key, value) {
        const prefs = this.getAll();
        prefs[key] = value;
        localStorage.setItem(this.KEY, JSON.stringify(prefs));
    },
    
    reset() {
        localStorage.setItem(this.KEY, JSON.stringify(this.defaults));
    }
};

// Uso
UserPreferences.set('theme', 'dark');
console.log(UserPreferences.get('theme')); // "dark"
console.log(UserPreferences.getAll()); // { language: 'it', theme: 'dark', ... }
```

---

## Debugging e Testing

### Ispezionare localStorage nel Browser

**Chrome/Edge DevTools**:
1. F12 → Application tab
2. Storage → Local Storage
3. Seleziona dominio

**Firefox DevTools**:
1. F12 → Storage tab
2. Local Storage

### Console Utilities

```javascript
// Log di tutto il contenuto
console.table(localStorage);

// Contare elementi
console.log('Elementi:', localStorage.length);

// Spazio utilizzato
let total = 0;
for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length;
    }
}
console.log(`Spazio: ${(total / 1024).toFixed(2)} KB`);

// Export tutti i dati
const exportData = JSON.stringify(localStorage);
console.log(exportData);

// Import dati
const importData = '{"key":"value"}';
const data = JSON.parse(importData);
Object.keys(data).forEach(key => {
    localStorage.setItem(key, data[key]);
});
```

---

## Conclusioni

### ✅ Quando Usare localStorage

- Dati che devono persistere tra sessioni
- Preferenze utente
- Cache di dati non sensibili
- Stato applicazione semplice
- Draft/bozze di form

### ❌ Quando NON Usare localStorage

- Dati sensibili (password, token)
- Grandi quantità di dati (>5MB)
- Dati che devono essere sincronizzati in real-time
- Applicazioni che richiedono query complesse

### 🔄 Alternative

- **sessionStorage**: Per dati temporanei (solo sessione)
- **IndexedDB**: Per grandi quantità di dati strutturati
- **Cookies**: Per autenticazione e tracciamento
- **Cache API**: Per cache di risorse web (PWA)
- **Web SQL** (deprecato): Non usare

---

## Risorse Aggiuntive

### Documentazione Ufficiale

- [MDN - Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN - Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [HTML5 Storage Specification](https://html.spec.whatwg.org/multipage/webstorage.html)

### Browser Compatibility

- ✅ Chrome: 4+
- ✅ Firefox: 3.5+
- ✅ Safari: 4+
- ✅ Edge: Tutte le versioni
- ✅ IE: 8+

### Tools

- [Storage Inspector (DevTools)](https://developer.chrome.com/docs/devtools/storage/localstorage/)
- [localForage](https://github.com/localForage/localForage) - Libreria wrapper con fallback a IndexedDB
- [store.js](https://github.com/marcuswestin/store.js) - Cross-browser storage

---

**📚 Esercitazione Consigliata**: Completa il progetto **ES01-TodoList** per mettere in pratica tutti i concetti!
