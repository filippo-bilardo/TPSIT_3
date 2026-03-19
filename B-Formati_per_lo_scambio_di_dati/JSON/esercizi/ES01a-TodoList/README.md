# 🎓 ESERCITAZIONE: Todo List Application con JSON

> *Verifica delle competenze sui formati JSON e Web Storage - TPSIT 3*

---

## 📋 **INFORMAZIONI GENERALI**

**Materia:** Tecnologie e Progettazione di Sistemi Informatici e di Telecomunicazioni  
**Argomento:** JSON, LocalStorage, DOM Manipulation  
**Tempo stimato:** 3-4 ore  
**Difficoltà:** ⭐ (Facile)  
**Modalità:** Individuale  

---

## 🎯 **OBIETTIVI DIDATTICI**

Al termine di questa esercitazione lo studente sarà in grado di:

- ✅ **Creare** e manipolare oggetti JavaScript
- ✅ **Serializzare** oggetti in formato JSON
- ✅ **Deserializzare** stringhe JSON in oggetti
- ✅ **Utilizzare** localStorage per la persistenza dati
- ✅ **Validare** dati JSON
- ✅ **Gestire** eventi DOM
- ✅ **Implementare** operazioni CRUD (Create, Read, Update, Delete)
- ✅ **Strutturare** dati in formato JSON appropriato

---

## 📚 **PREREQUISITI**

### Conoscenze Teoriche Richieste:
- 📝 **JavaScript base:** Variabili, array, oggetti, funzioni
- 🎨 **HTML/CSS:** Struttura pagina, stili base
- 🔄 **DOM Manipulation:** `querySelector`, `createElement`, event listeners
- 💾 **Web Storage API:** `localStorage.setItem()`, `localStorage.getItem()`
- 📊 **JSON:** `JSON.stringify()`, `JSON.parse()`

### Strumenti Necessari:
- 🌐 **Browser moderno** (Chrome, Firefox, Edge)
- 💻 **Editor di testo** (VS Code, Sublime Text, Notepad++)
- 🔧 **DevTools** del browser (Console, Storage Inspector)

---

## 📖 **TRACCIA DELL'ESERCIZIO**

### 🚀 **Applicazione: "My Todo List"**

Realizzare un'applicazione web per la gestione di una lista di task (to-do list) dove:

1. **REQUISITI FUNZIONALI:**
   - Aggiungere nuove task con titolo e descrizione
   - Visualizzare tutte le task in una lista
   - Marcare task come completate/non completate
   - Modificare task esistenti (opzionale)
   - Eliminare task
   - Filtrare task (tutte, attive, completate)
   - Contatore task attive

2. **REQUISITI TECNICI:**
   - Dati salvati in **localStorage** in formato **JSON**
   - Ogni task ha: `id`, `title`, `description`, `completed`, `createdAt`
   - Validazione input (titolo obbligatorio)
   - Interfaccia responsive e user-friendly
   - Persistenza dati tra sessioni

### 📐 **Struttura Dati JSON:**

```json
{
  "todos": [
    {
      "id": 1,
      "title": "Studiare JSON",
      "description": "Completare il capitolo 5 sul parsing JSON",
      "completed": false,
      "createdAt": "2024-03-14T10:30:00.000Z"
    },
    {
      "id": 2,
      "title": "Fare esercizi",
      "description": "Risolvere gli esercizi del capitolo 4",
      "completed": true,
      "createdAt": "2024-03-14T09:15:00.000Z"
    }
  ],
  "nextId": 3
}
```

### 🎨 **Mockup Interfaccia:**

```
┌─────────────────────────────────────────────┐
│           📝 My Todo List                   │
├─────────────────────────────────────────────┤
│ [________________] [Add Task]               │
│                                             │
│ Filters: [All] [Active] [Completed]         │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ ☐ Studiare JSON                         │ │
│ │   Completare il capitolo 5              │ │
│ │   [Edit] [Delete]                       │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ ☑ Fare esercizi                         │ │
│ │   Risolvere gli esercizi capitolo 4     │ │
│ │   [Edit] [Delete]                       │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ 1 task attive                               │
└─────────────────────────────────────────────┘
```

---

## 🛠️ **PASSAGGI DA SEGUIRE**

### 📝 **STEP 1: Analisi e Progettazione (20-30 minuti)**

#### 1.1 Analizza i Requisiti
- Identifica le **entità**: Todo (task)
- Definisci la **struttura dati JSON**
- Elenca le **operazioni CRUD**:
  - **C**reate: Aggiungi nuova task
  - **R**ead: Visualizza task
  - **U**pdate: Modifica task, toggle completed
  - **D**elete: Elimina task

#### 1.2 Schema dell'Applicazione
```
┌──────────────────────────────────────────┐
│           HTML (index.html)              │
│  - Form input                            │
│  - Lista task                            │
│  - Filtri                                │
└──────────────────────────────────────────┘
           ▼
┌──────────────────────────────────────────┐
│        JavaScript (app.js)               │
│  - Gestione eventi                       │
│  - Manipolazione DOM                     │
│  - Operazioni CRUD                       │
│  - Serializzazione JSON                  │
└──────────────────────────────────────────┘
           ▼
┌──────────────────────────────────────────┐
│      LocalStorage (browser)              │
│  - Persistenza dati JSON                 │
│  - Key: "todoListData"                   │
└──────────────────────────────────────────┘
```

#### 1.3 Pianifica le Funzioni JavaScript
- `loadTodos()` - Carica dati da localStorage
- `saveTodos()` - Salva dati in localStorage
- `addTodo(title, description)` - Aggiunge task
- `deleteTodo(id)` - Elimina task
- `toggleTodo(id)` - Cambia stato completed
- `updateTodo(id, title, description)` - Modifica task (opzionale)
- `renderTodos(filter)` - Visualizza task filtrate
- `getActiveTodosCount()` - Conta task attive

---

### 🎨 **STEP 2: Implementazione HTML (30 minuti)**

#### 2.1 Crea la Struttura Base

**File: `index.html`**

Utilizza il **file fornito** (`index.html`) come base. Il file include già:
- ✅ Struttura HTML5 completa
- ✅ Form per input task
- ✅ Pulsanti filtro
- ✅ Container lista task
- ✅ Footer con contatore
- ✅ Link a CSS e JavaScript

**IMPORTANTE:** Il file è già completo e funzionante. Studia i commenti per capire ogni sezione.

#### 2.2 Struttura HTML Principale

L'HTML è organizzato in 5 sezioni principali:

```
1. HEADER (h1)
   └─ Titolo applicazione

2. FORM (add-todo-form)
   ├─ Input titolo (id="todoTitle")
   ├─ Textarea descrizione (id="todoDescription")
   └─ Button aggiungi (id="addBtn")

3. FILTRI (filters)
   ├─ Button "Tutte" (data-filter="all")
   ├─ Button "Attive" (data-filter="active")
   └─ Button "Completate" (data-filter="completed")

4. LISTA TASK (id="todoList")
   └─ Task renderizzate dinamicamente da JavaScript

5. FOOTER
   └─ Contatore (id="activeCount")
```

#### 2.3 Elementi HTML Importanti

**A) Form Input - Attributi Chiave:**
```html
<input type="text" id="todoTitle" placeholder="..." required>
```
- `id="todoTitle"` → Usato da JavaScript per recuperare il valore
- `required` → HTML5 validation (opzionale, validazione in JS)
- `placeholder` → Testo di aiuto per l'utente

**B) Pulsanti Filtro - Data Attributes:**
```html
<button class="filter-btn active" data-filter="all">Tutte</button>
```
- `data-filter="all"` → Custom attribute per identificare il tipo di filtro
- `class="active"` → Classe CSS per il filtro attivo

**C) Container Lista:**
```html
<div id="todoList" class="todo-list">
    <!-- Task verranno aggiunte qui da JavaScript -->
</div>
```

#### 2.4 Checklist HTML:
- [ ] File `index.html` creato (da template)
- [ ] Form con input id corretto (`todoTitle`, `todoDescription`)
- [ ] Button aggiungi con id corretto (`addBtn`)
- [ ] Tre pulsanti filtro con data-filter appropriati
- [ ] Div lista task con id corretto (`todoList`)
- [ ] Span contatore con id corretto (`activeCount`)
- [ ] Link a `style.css` e `app.js` presenti
- [ ] Validazione HTML5 (https://validator.w3.org/)

---

### 🎨 **STEP 3: Implementazione CSS (30-45 minuti)**

#### 3.1 Crea gli Stili

**File: `style.css`**

Utilizza il **file fornito** (`style.css`) come base. Il file include già:
- ✅ Reset CSS e variabili
- ✅ Layout container principale
- ✅ Stili base per tutti gli elementi
- ✅ Design responsive

**IMPORTANTE:** Il file è già completo. Puoi personalizzare colori e stili modificando le variabili CSS.

#### 3.2 Variabili CSS

Il template usa variabili CSS per facilitare la personalizzazione:

```css
:root {
    --primary-color: #667eea;      /* Colore principale */
    --secondary-color: #764ba2;    /* Colore secondario */
    --success-color: #48bb78;      /* Verde per successo */
    --danger-color: #f56565;       /* Rosso per eliminazione */
    --text-color: #2d3748;         /* Colore testo */
    --bg-color: #f7fafc;           /* Sfondo chiaro */
}
```

**Puoi cambiare questi valori** per personalizzare il tema dell'applicazione!

#### 3.3 Classi CSS Importanti

**A) Stati delle Task:**
```css
.todo-item              /* Task normale */
.todo-item.completed    /* Task completata (barrata) */
.todo-item:hover        /* Task al passaggio mouse */
```

**B) Pulsanti Filtro:**
```css
.filter-btn             /* Pulsante normale */
.filter-btn.active      /* Pulsante filtro attivo */
.filter-btn:hover       /* Pulsante al passaggio mouse */
```

**C) Form e Input:**
```css
.add-todo-form input:focus    /* Input quando è selezionato */
.add-todo-form button:hover   /* Pulsante aggiungi al passaggio mouse */
```

#### 3.4 Checklist CSS:
- [ ] File `style.css` creato (da template)
- [ ] Variabili CSS personalizzate
- [ ] Layout responsive funzionante
- [ ] Stili form e pulsanti
- [ ] Stili todo items
- [ ] Stato hover su elementi interattivi
- [ ] Classe `.completed` per task completate
- [ ] Design gradevole e professionale

---

### 💻 **STEP 4: Implementazione JavaScript (60-90 minuti)**

#### 4.1 Crea la Logica dell'Applicazione

**File: `app.js`**

Questo è lo step più importante! Dovrai creare da zero il file JavaScript seguendo questa guida dettagliata.

---

#### 4.2 📊 Diagramma di Flusso Applicazione

Prima di iniziare a scrivere codice, comprendi il flusso completo:

```
┌────────────────────────────────────────────────────────┐
│                   AVVIO APPLICAZIONE                   │
│                                                        │
│  1. Browser carica index.html                          │
│  2. Browser carica style.css                           │
│  3. Browser carica app.js                              │
│  4. DOMContentLoaded event → chiama init()             │
└───────────────────┬────────────────────────────────────┘
                    ▼
┌────────────────────────────────────────────────────────┐
│                    INIZIALIZZAZIONE                    │
│                     init()                             │
│  1. loadTodos() → Carica dati da localStorage          │
│  2. setupEventListeners() → Attiva pulsanti/form       │
│  3. renderTodos() → Visualizza task                    │
└───────────────────┬────────────────────────────────────┘
                    ▼
┌────────────────────────────────────────────────────────┐
│                  UTENTE INTERAGISCE                    │
│                                                        │
│  ┌─────────────────┬──────────────────┬──────────────┐ │
│  │ Aggiungi Task   │  Cambia Filtro   │  Toggle/Del  │ │
│  │  handleAddTodo()│handleFilterChange│ checkbox/btn │ │
│  └────────┬────────┴────────┬─────────┴──────┬───────┘ │
└───────────┼─────────────────┼────────────────┼─────────┘
            ▼                 ▼                ▼
   ┌────────────────┐ ┌─────────────┐ ┌──────────────┐
   │   addTodo()    │ │currentFilter│ │ toggleTodo() │
   │  ↓             │ │    ↓        │ │ deleteTodo() │
   │ saveTodos()    │ │renderTodos()│ │      ↓       │
   │  ↓             │ └─────────────┘ │ saveTodos()  │
   │ renderTodos()  │                 │      ↓       │
   └────────────────┘                 │ renderTodos()│
                                      └──────────────┘
```

---

#### 4.3 🏗️ Struttura Base del File JavaScript

Inizia creando il file `app.js` con questa struttura:

```javascript
// ============================================
// COSTANTI E CONFIGURAZIONE
// ============================================
// 💡 Usa const per valori che non cambiano mai
const STORAGE_KEY = 'todoListData';  // Chiave per localStorage

// ============================================
// STATO APPLICAZIONE (Dati)
// ============================================
// 💡 Questi sono i dati "in memoria" dell'applicazione
let todosData = {
    todos: [],      // Array di oggetti task
    nextId: 1       // Prossimo ID da assegnare
};

let currentFilter = 'all'; // Filtro attivo: 'all', 'active', 'completed'

// ============================================
// INIZIALIZZAZIONE
// ============================================
// 💡 Aspetta che tutto l'HTML sia caricato
document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('🚀 Applicazione avviata');
    
    // STEP 1: Carica dati salvati
    loadTodos();
    
    // STEP 2: Attiva pulsanti e form
    setupEventListeners();
    
    // STEP 3: Mostra task (se ce ne sono)
    renderTodos();
}

// ============================================
// FUNZIONI DA IMPLEMENTARE
// ============================================

// TODO: Implementa tutte le funzioni qui sotto
```

**💡 Spiegazione Struttura:**

| Sezione | Scopo | Tipo Variabile |
|---------|-------|----------------|
| **COSTANTI** | Valori fissi (chiavi, configurazioni) | `const` |
| **STATO** | Dati dinamici dell'applicazione | `let` |
| **INIZIALIZZAZIONE** | Avvio automatico al caricamento | Event listener |
| **FUNZIONI** | Logica dell'applicazione | `function` |

---

#### 4.4 📚 Funzioni da Implementare (in ordine logico)

Implementa le funzioni seguendo questo ordine logico:

---

#### 🔷 GRUPPO 1: Gestione LocalStorage (Fondamentali)

Queste funzioni gestiscono la **persistenza** dei dati nel browser.

---

**📥 FUNZIONE 1: `loadTodos()` - Carica dati da localStorage**

```javascript
/**
 * Carica i dati salvati da localStorage e li deserializza
 * Viene chiamata all'avvio dell'applicazione
 */
function loadTodos() {
    try {
        // STEP 1: Recupera stringa JSON da localStorage
        const jsonString = localStorage.getItem(STORAGE_KEY);
        // localStorage.getItem() ritorna:
        // - stringa JSON se chiave exists
        // - null se chiave non esiste
        
        console.log('📖 Lettura localStorage:', jsonString ? 'Dati trovati' : 'Nessun dato');
        
        // STEP 2: Se esistono dati, deserializza JSON
        if (jsonString) {
            todosData = JSON.parse(jsonString);
            // JSON.parse() converte:
            // '{"todos":[],"nextId":1}' → { todos: [], nextId: 1 }
            
            console.log('✅ Dati caricati:', todosData.todos.length + ' task');
        } else {
            console.log('ℹ️ Nessun dato salvato, uso dati vuoti');
            // Prima apertura app → todosData resta { todos: [], nextId: 1 }
        }
    } catch (error) {
        // STEP 3: Gestisci errori (es. JSON corrotto)
        console.error('❌ Errore caricamento:', error);
        alert('⚠️ Errore nel caricamento dei dati. Verrà creata una nuova lista.');
        
        // Reset a dati vuoti
        todosData = { todos: [], nextId: 1 };
    }
}
```

**💡 Esempio Pratico:**

Immagina che localStorage contenga:
```json
{
  "todos": [
    {
      "id": 1,
      "title": "Studiare JSON",
      "description": "",
      "completed": false,
      "createdAt": "2024-03-14T10:00:00.000Z"
    }
  ],
  "nextId": 2
}
```

**Cosa succede:**
1. `localStorage.getItem('todoListData')` → Ritorna la stringa JSON sopra
2. `JSON.parse(...)` → Converte in oggetto JavaScript
3. `todosData` ora contiene l'oggetto con 1 task

**Errori Comuni:**
- ❌ Dimenticare `try-catch` → App crasha se JSON è corrotto
- ❌ Non controllare `if (jsonString)` → `JSON.parse(null)` genera errore

---

**💾 FUNZIONE 2: `saveTodos()` - Salva dati in localStorage**

```javascript
/**
 * Serializza i dati e li salva in localStorage
 * Viene chiamata dopo ogni modifica (add, delete, toggle)
 */
function saveTodos() {
    try {
        // STEP 1: Serializza oggetto in stringa JSON
        const jsonString = JSON.stringify(todosData);
        // JSON.stringify() converte:
        // { todos: [], nextId: 1 } → '{"todos":[],"nextId":1}'
        
        // STEP 2: Salva in localStorage
        localStorage.setItem(STORAGE_KEY, jsonString);
        // localStorage.setItem(key, value) salva:
        // key: 'todoListData'
        // value: la stringa JSON
        
        console.log('💾 Dati salvati (' + jsonString.length + ' caratteri)');
    } catch (error) {
        // STEP 3: Gestisci errori (es. quota superata ~5-10MB)
        console.error('❌ Errore salvataggio:', error);
        alert('⚠️ Errore nel salvataggio dei dati! Lo storage potrebbe essere pieno.');
    }
}
```

**💡 Esempio Pratico:**

Dopo aver aggiunto una task:
```javascript
// todosData in memoria:
todosData = {
    todos: [
        { id: 1, title: "Studiare", completed: false, ... }
    ],
    nextId: 2
};

// saveTodos() fa:
// 1. JSON.stringify(todosData) → stringa JSON
// 2. localStorage.setItem(...) → salva nel browser
```

**📊 Verifica nel Browser:**
1. Apri DevTools (F12)
2. Application → Local Storage
3. Seleziona tuo dominio
4. Vedi: `todoListData` con valore JSON

**Errori Comuni:**
- ❌ Salvare senza `JSON.stringify()` → `[object Object]` invece di JSON
- ❌ Non chiamare `saveTodos()` dopo modifiche → Dati non persistono

---

#### 🔷 GRUPPO 2: Operazioni CRUD (Create, Read, Update, Delete)

Queste funzioni **modificano** i dati dell'applicazione.

---

**➕ FUNZIONE 3: `addTodo()` - Aggiunge una nuova task**
```javascript
/**
 * Aggiunge una nuova task alla lista
 * @param {string} title - Titolo task (obbligatorio)
 * @param {string} description - Descrizione task (opzionale)
 * @returns {boolean} true se aggiunta con successo, false se errore
 */
function addTodo(title, description = '') {
    // STEP 1: VALIDAZIONE input
    // Controlla che il titolo non sia vuoto o solo spazi
    if (!title || title.trim() === '') {
        alert('⚠️ Il titolo è obbligatorio!');
        return false; // Blocca esecuzione
    }
    
    // STEP 2: CREA nuovo oggetto task
    const newTodo = {
        id: todosData.nextId,              // ID univoco incrementale (1, 2, 3, ...)
        title: title.trim(),                // Rimuovi spazi inizio/fine
        description: description.trim(),    // Opzionale
        completed: false,                   // Inizialmente NON completata
        createdAt: new Date().toISOString() // Data/ora ISO: "2024-03-14T10:30:00.000Z"
    };
    
    console.log('➕ Creando task:', newTodo);
    
    // STEP 3: AGGIUNGI all'array todos
    todosData.todos.push(newTodo);
    // push() aggiunge elemento alla fine dell'array
    
    // STEP 4: INCREMENTA ID per prossima task
    todosData.nextId++;
    // Così ogni task ha ID univoco: 1, 2, 3, 4, ...
    
    // STEP 5: SALVA in localStorage
    saveTodos();
    // IMPORTANTE: Sempre salvare dopo modifiche!
    
    // STEP 6: AGGIORNA interfaccia
    renderTodos();
    // Rigenera HTML per mostrare nuova task
    
    console.log('✅ Task aggiunta! Totale:', todosData.todos.length);
    return true; // Successo
}
```

**💡 Esempio Pratico:**

**Prima dell'aggiunta:**
```javascript
todosData = {
    todos: [],
    nextId: 1
};
```

**Utente clicca "Aggiungi" con titolo "Studiare JSON":**
```javascript
addTodo("Studiare JSON", "Leggere capitolo 1-5");

// Cosa succede:
// 1. Validazione: "Studiare JSON" non è vuoto ✅
// 2. Crea oggetto:
newTodo = {
    id: 1,
    title: "Studiare JSON",
    description: "Leggere capitolo 1-5",
    completed: false,
    createdAt: "2024-03-14T10:30:00.000Z"
};
// 3. todosData.todos.push(newTodo) → array ora ha 1 elemento
// 4. todosData.nextId++ → diventa 2
// 5. saveTodos() → salva in localStorage
// 6. renderTodos() → mostra task nell'HTML
```

**Dopo l'aggiunta:**
```javascript
todosData = {
    todos: [
        {
            id: 1,
            title: "Studiare JSON",
            description: "Leggere capitolo 1-5",
            completed: false,
            createdAt: "2024-03-14T10:30:00.000Z"
        }
    ],
    nextId: 2  // Pronto per prossima task
};
```

**Concetti Chiave:**
- **`.trim()`**: Rimuove spazi - `"  hello  "` diventa `"hello"`
- **`description = ''`**: Parametro opzionale con valore default
- **`new Date().toISOString()`**: Data standard internazionale
- **`return false`**: Interrompe funzione se validazione fallisce

**Errori Comuni:**
- ❌ Non incrementare `nextId` → ID duplicati!
- ❌ Non chiamare `saveTodos()` → Dati persi al refresh
- ❌ Non chiamare `renderTodos()` → UI non aggiornata

---

**🗑️ FUNZIONE 4: `deleteTodo()` - Elimina una task**

```javascript
/**
 * Elimina una task dall'array
 * @param {number} id - ID della task da eliminare
 */
function deleteTodo(id) {
    // STEP 1: CONFERMA eliminazione (UX migliore)
    if (!confirm('🗑️ Sei sicuro di voler eliminare questa task?')) {
        console.log('❌ Eliminazione annullata');
        return; // Utente ha cliccato "Annulla"
    }
    
    console.log('🗑️ Eliminando task con id:', id);
    
    // STEP 2: RIMUOVI task dall'array
    // filter() crea nuovo array escludendo elementi che non rispettano condizione
    const lengthBefore = todosData.todos.length;
    
    todosData.todos = todosData.todos.filter(todo => todo.id !== id);
    // Tiene SOLO le task con id DIVERSO da quello da eliminare
    
    const lengthAfter = todosData.todos.length;
    console.log(`📊 Task eliminate: ${lengthBefore - lengthAfter}`);
    
    // STEP 3: SALVA e AGGIORNA UI
    saveTodos();
    renderTodos();
    
    console.log('✅ Task eliminata, rimanenti:', todosData.todos.length);
}
```

**💡 Come funziona `filter()`:**

**Prima:**
```javascript
todosData.todos = [
    { id: 1, title: "Task A" },
    { id: 2, title: "Task B" },  ← Voglio eliminare questa (id=2)
    { id: 3, title: "Task C" }
];
```

**Eseguo:**
```javascript
deleteTodo(2);

// filter() itera su ogni elemento:
// todo.id=1 → 1 !== 2 ? true → MANTIENI
// todo.id=2 → 2 !== 2 ? false → ELIMINA ❌
// todo.id=3 → 3 !== 2 ? true → MANTIENI
```

**Dopo:**
```javascript
todosData.todos = [
    { id: 1, title: "Task A" },
    { id: 3, title: "Task C" }
];
```

**Metodi Alternativi (meno consigliati):**

```javascript
// ❌ Metodo 1: splice() con findIndex()
const index = todosData.todos.findIndex(t => t.id === id);
if (index !== -1) {
    todosData.todos.splice(index, 1);
}

// ✅ Metodo 2: filter() (CONSIGLIATO - più sicuro)
todosData.todos = todosData.todos.filter(t => t.id !== id);
```

**Perché `filter()` è meglio:**
- ✅ Non modifica array originale
- ✅ Più sicuro (non serve controllare index)
- ✅ Più leggibile
- ✅ Funzionale (stile moderno JavaScript)

---

**✅ FUNZIONE 5: `toggleTodo()` - Cambia stato completed**

```javascript
/**
 * Inverte lo stato completed di una task (true ↔ false)
 * @param {number} id - ID della task da modificare
 */
function toggleTodo(id) {
    console.log('🔄 Toggle task id:', id);
    
    // STEP 1: TROVA task nell'array
    const todo = todosData.todos.find(t => t.id === id);
    // find() ritorna:
    // - primo elemento che rispetta condizione
    // - undefined se nessun elemento trovato
    
    // STEP 2: Se trovata, INVERTI stato completed
    if (todo) {
        // Operatore NOT (!) inverte booleano
        todo.completed = !todo.completed;
        // false → true (diventa completata)
        // true  → false (diventa attiva)
        
        console.log(`✓ Task ${id} → ${todo.completed ? 'COMPLETATA ✅' : 'ATTIVA ⏳'}`);
        
        // STEP 3: SALVA e AGGIORNA UI
        saveTodos();
        renderTodos();
    } else {
        console.warn('⚠️ Task non trovata:', id);
    }
}
```

**💡 Esempio Pratico:**

**Stato Iniziale:**
```javascript
todosData.todos = [
    { id: 1, title: "Studiare", completed: false }
];
```

**Utente clicca checkbox:**
```javascript
toggleTodo(1);

// Cosa succede:
// 1. find(t => t.id === 1) → trova oggetto task
// 2. todo.completed = !false → diventa true
// 3. saveTodos() → salva
// 4. renderTodos() → aggiorna UI (checkbox checked, testo barrato)
```

**Dopo Toggle:**
```javascript
todosData.todos = [
    { id: 1, title: "Studiare", completed: true }  // ✅
];
```

**Se utente clicca di nuovo:**
```javascript
toggleTodo(1);
// completed = !true → diventa false
// Task torna attiva
```

**💡 Operatore NOT (`!`):**

```javascript
!true   // → false
!false  // → true

let x = false;
x = !x;  // x ora è true
x = !x;  // x ora è false (toggle)
```

**Concetti Chiave:**
- **`find()`**: Trova primo elemento che rispetta condizione
- **`!`**: Operatore NOT - inverte booleano
- **Modifica diretta**: `todo.completed = ...` modifica oggetto originale nell'array

**Errori Comuni:**
- ❌ `todo.completed = true` → Sempre true, non fa toggle!
- ✅ `todo.completed = !todo.completed` → Corretto toggle

---

#### 🔷 GRUPPO 3: Rendering UI (Visualizzazione)

Queste funzioni **generano l'HTML** dinamicamente.
---

**🎨 FUNZIONE 6: `renderTodos()` - Renderizza lista completa**

```javascript
/**
 * Renderizza (visualizza) la lista di task filtrate
 * Viene chiamata ogni volta che i dati cambiano o il filtro cambia
 */
function renderTodos() {
    console.log('🎨 Rendering task, filtro:', currentFilter);
    
    // STEP 1: RECUPERA container dal DOM
    const todoList = document.getElementById('todoList');
    // getElementById() trova elemento con id="todoList"
    
    // STEP 2: PULISCI contenuto precedente
    todoList.innerHTML = '';
    // Svuota completamente il container
    // IMPORTANTE: Rimuove tutti gli elementi HTML dentro
    
    // STEP 3: FILTRA task in base al filtro attivo
    const filteredTodos = getFilteredTodos();
    // Ritorna array filtrato (all/active/completed)
    
    console.log(`📊 Mostrando ${filteredTodos.length} di ${todosData.todos.length} task`);
    
    // STEP 4: Controlla se lista è vuota
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<p class="empty-message">📝 Nessuna task da visualizzare</p>';
        updateCounter();
        return; // STOP - non c'è nient'altro da fare
    }
    
    // STEP 5: CREA elemento DOM per ogni task
    filteredTodos.forEach((todo, index) => {
        const todoElement = createTodoElement(todo);
        // createTodoElement() genera <div> completo della task
        
        todoList.appendChild(todoElement);
        // appendChild() aggiunge elemento come figlio
        
        console.log(`  ${index + 1}. Task renderizzata: ${todo.title}`);
    });
    
    // STEP 6: AGGIORNA contatore task attive
    updateCounter();
}
```

**💡 Diagramma Flusso Rendering:**

```
┌─────────────────────────────────────┐
│      renderTodos() chiamata         │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│ todoList.innerHTML = ''             │ ← Svuota container
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│ filteredTodos = getFilteredTodos()  │ ← Filtra array
└──────────────┬──────────────────────┘
               ▼
         ┌─────────┐
         │ Vuoto?  │
         └────┬────┘
         NO   │   SÌ → Mostra "Nessuna task"
              ▼
┌─────────────────────────────────────┐
│ forEach(todo => ...)                │
│   ├─ createTodoElement(todo)        │ ← Per ogni task
│   └─ appendChild(element)           │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│ updateCounter()                     │ ← Aggiorna "X task attive"
└─────────────────────────────────────┘
```

**💡 Esempio Pratico:**

**Situazione:**
```javascript
todosData.todos = [
    { id: 1, title: "Studiare", completed: false },
    { id: 2, title: "Fare spesa", completed: true },
    { id: 3, title: "Palestra", completed: false }
];
currentFilter = 'active'; // Mostra solo attive
```

**Esecuzione:**
```javascript
renderTodos();

// STEP 3: getFilteredTodos() ritorna:
filteredTodos = [
    { id: 1, title: "Studiare", completed: false },
    { id: 3, title: "Palestra", completed: false }
];
// "Fare spesa" esclusa perché completed=true

// STEP 5: forEach() crea HTML per ogni task:
// Iterazione 1: createTodoElement(task id=1) → <div>...</div>
// Iterazione 2: createTodoElement(task id=3) → <div>...</div>
```

**HTML Risultante:**
```html
<div id="todoList" class="todo-list">
    <!-- Task 1 -->
    <div class="todo-item" data-id="1">...</div>
    <!-- Task 3 -->
    <div class="todo-item" data-id="3">...</div>
</div>
```

**Concetti Chiave:**
- **`innerHTML = ''`**: Svuota container (rimuove tutto)
- **`forEach()`**: Itera su array (esegue funzione per ogni elemento)
- **`appendChild()`**: Aggiunge elemento HTML come figlio

---

**🏗️ FUNZIONE 7: `createTodoElement()` - Genera HTML singola task**

Questa è la funzione più complessa - crea l'HTML di una task.

```javascript
/**
 * Crea elemento DOM HTML per una singola task
 * @param {Object} todo - Oggetto task da visualizzare
 * @returns {HTMLElement} Elemento <div> della task
 */
function createTodoElement(todo) {
    // STEP 1: CREA elemento div container
    const div = document.createElement('div');
    // createElement('div') → <div></div>
    
    // STEP 2: AGGIUNGI classi CSS
    div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    // Se completed=true: class="todo-item completed"
    // Se completed=false: class="todo-item"
    
    // STEP 3: SALVA ID come data attribute
    div.dataset.id = todo.id;
    // dataset.id → <div data-id="1">
    // Utile per identificare task negli event handler
    
    // STEP 4: COSTRUISCI HTML interno con template literal
    div.innerHTML = `
        <!-- Checkbox per completare/riattivare -->
        <input type="checkbox" 
               class="todo-checkbox" 
               ${todo.completed ? 'checked' : ''}>
        
        <!-- Contenuto task -->
        <div class="todo-content">
            <h3 class="todo-title">${escapeHtml(todo.title)}</h3>
            ${todo.description ? `<p class="todo-description">${escapeHtml(todo.description)}</p>` : ''}
            <small class="todo-date">${formatDate(todo.createdAt)}</small>
        </div>
        
        <!-- Pulsante elimina -->
        <div class="todo-actions">
            <button class="btn-delete">🗑️ Elimina</button>
        </div>
    `;
    
    // STEP 5: AGGIUNGI event listeners agli elementi
    
    // Event: Checkbox cliccata
    const checkbox = div.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => {
        console.log(`☑️ Checkbox cliccata per task ${todo.id}`);
        toggleTodo(todo.id);
    });
    
    // Event: Pulsante elimina cliccato
    const btnDelete = div.querySelector('.btn-delete');
    btnDelete.addEventListener('click', () => {
        console.log(`🗑️ Elimina cliccato per task ${todo.id}`);
        deleteTodo(todo.id);
    });
    
    return div; // Ritorna elemento completo
}
```

**💡 Spiegazione Template Literal:**

Template literal (backtick \`) permette:
- ✅ Stringhe multilinea
- ✅ Interpolazione variabili con `${...}`
- ✅ Espressioni JavaScript inline

**Esempio:**
```javascript
const name = "Mario";
const age = 25;

// ❌ Concatenazione vecchio stile
const html1 = '<p>Nome: ' + name + ', Età: ' + age + '</p>';

// ✅ Template literal moderno
const html2 = `<p>Nome: ${name}, Età: ${age}</p>`;

// ✅ Con espressioni condizionali
const html3 = `<p>${age >= 18 ? 'Maggiorenne' : 'Minorenne'}</p>`;
```

**💡 Conditional Rendering:**

```javascript
// Se description esiste → mostra <p>
// Se description è vuota → non mostrare nulla
${todo.description ? `<p>${todo.description}</p>` : ''}

// Equivalente a:
let descriptionHtml = '';
if (todo.description) {
    descriptionHtml = `<p>${todo.description}</p>`;
}
```

**💡 Event Listeners:**

```javascript
// querySelector() trova PRIMO elemento con classe
const checkbox = div.querySelector('.todo-checkbox');

// addEventListener() ascolta eventi
checkbox.addEventListener('change', () => {
    // Arrow function - eseguita quando checkbox cambia
    toggleTodo(todo.id);
});
```

**HTML Generato Esempio:**

Per task: `{ id: 1, title: "Studiare", description: "Cap 1-5", completed: false }`

```html
<div class="todo-item" data-id="1">
    <input type="checkbox" class="todo-checkbox">
    <div class="todo-content">
        <h3 class="todo-title">Studiare</h3>
        <p class="todo-description">Cap 1-5</p>
        <small class="todo-date">14/03/2024, 10:30</small>
    </div>
    <div class="todo-actions">
        <button class="btn-delete">🗑️ Elimina</button>
    </div>
</div>
```

---

#### 🔷 GRUPPO 4: Funzioni Utilità

Funzioni di supporto per filtri, contatore, sicurezza.

---

**🔍 FUNZIONE 8: `getFilteredTodos()` - Filtra array task**
```javascript
/**
 * Filtra array task in base al filtro corrente
 * @returns {Array} Array di task filtrate
 */
function getFilteredTodos() {
    // Usa switch per gestire 3 casi
    switch (currentFilter) {
        case 'active':
            // Ritorna SOLO task NON completate
            return todosData.todos.filter(t => !t.completed);
            // !t.completed → true se completed=false
            
        case 'completed':
            // Ritorna SOLO task completate
            return todosData.todos.filter(t => t.completed);
            // t.completed → true se completed=true
            
        default: // 'all'
            // Ritorna TUTTE le task
            return todosData.todos;
    }
}
```

**💡 Esempio Pratico:**

**Dati:**
```javascript
todosData.todos = [
    { id: 1, title: "Studiare", completed: false },
    { id: 2, title: "Spesa", completed: true },
    { id: 3, title: "Palestra", completed: false }
];
```

**Filtro "all":**
```javascript
currentFilter = 'all';
getFilteredTodos(); 
// → [task1, task2, task3] (tutte e 3)
```

**Filtro "active":**
```javascript
currentFilter = 'active';
getFilteredTodos(); 
// → [task1, task3] (solo le 2 non completate)
```

**Filtro "completed":**
```javascript
currentFilter = 'completed';
getFilteredTodos(); 
// → [task2] (solo la 1 completata)
```

---

**🔢 FUNZIONE 9: `updateCounter()` - Aggiorna contatore task attive**

```javascript
/**
 * Aggiorna il contatore delle task attive nel footer
 */
function updateCounter() {
    // STEP 1: CONTA task attive (completed=false)
    const activeCount = todosData.todos.filter(t => !t.completed).length;
    // filter().length → conta elementi che rispettano condizione
    
    // STEP 2: TROVA elemento contatore
    const countElement = document.getElementById('activeCount');
    
    // STEP 3: AGGIORNA testo
    // Usa singolare/plurale corretto
    countElement.textContent = `${activeCount} task ${activeCount === 1 ? 'attiva' : 'attive'}`;
    // activeCount=1 → "1 task attiva"
    // activeCount!=1 → "N task attive"
    
    console.log(`📊 Contatore aggiornato: ${activeCount} attive`);
}
```

**💡 Esempi Output:**

```javascript
// 0 task → "0 task attive"
// 1 task → "1 task attiva"
// 5 task → "5 task attive"
```

**Operatore Ternario:**
```javascript
// Sintassi: condizione ? valore_se_true : valore_se_false
activeCount === 1 ? 'attiva' : 'attive'

// Equivalente a:
let word;
if (activeCount === 1) {
    word = 'attiva';
} else {
    word = 'attive';
}
```

---

**🛡️ FUNZIONE 10: `escapeHtml()` - Previene attacchi XSS**

⚠️ **IMPORTANTISSIMO PER SICUREZZA!**

```javascript
/**
 * Escape HTML per prevenire XSS (Cross-Site Scripting)
 * Converte caratteri speciali HTML in entità sicure
 * @param {string} text - Testo da rendere sicuro
 * @returns {string} Testo con caratteri HTML escapati
 */
function escapeHtml(text) {
    // TRICK: Usa textContent per escape automatico
    const div = document.createElement('div');
    div.textContent = text; // textContent NON interpreta HTML
    return div.innerHTML;   // innerHTML ritorna HTML escapato
}
```

**💡 Perché è FONDAMENTALE:**

**❌ SENZA escapeHtml() - VULNERABILE:**
```javascript
const userInput = '<script>alert("HACKED!")</script>';
div.innerHTML = `<h3>${userInput}</h3>`;
// RISULTATO: Lo script viene ESEGUITO! 💀
```

**✅ CON escapeHtml() - SICURO:**
```javascript
const userInput = '<script>alert("HACKED!")</script>';
div.innerHTML = `<h3>${escapeHtml(userInput)}</h3>`;
// RISULTATO: Mostra testo innocuo: "<script>alert("HACKED!")</script>"
```

**Come Funziona:**

```javascript
// Input
const dangerous = '<script>alert("XSS")</script>';

// STEP 1: textContent esegue escape
div.textContent = dangerous;
// Contenuto div: (nodo di testo)

// STEP 2: innerHTML legge HTML escapato
div.innerHTML
// Output: '&lt;script&gt;alert("XSS")&lt;/script&gt;'

// Conversioni:
// < → &lt;
// > → &gt;
// & → &amp;
// " → &quot;
// ' → &#39;
```

**Nel Browser:**
```html
<!-- Senza escape -->
<h3><script>alert("XSS")</script></h3>
<!-- Script ESEGUITO! 💀 -->

<!-- Con escape -->
<h3>&lt;script&gt;alert("XSS")&lt;/script&gt;</h3>
<!-- Mostra testo: <script>alert("XSS")</script> ✅ -->
```

**Regola d'oro:**
> **MAI usare `innerHTML` con dati utente senza `escapeHtml()`!**

---

**📅 FUNZIONE 11: `formatDate()` - Formatta data ISO**

```javascript
/**
 * Formatta data ISO in formato leggibile italiano
 * @param {string} isoString - Data ISO (es. "2024-03-14T10:30:00.000Z")
 * @returns {string} Data formattata (es. "14/03/2024, 10:30")
 */
function formatDate(isoString) {
    // STEP 1: Crea oggetto Date da stringa ISO
    const date = new Date(isoString);
    // "2024-03-14T10:30:00.000Z" → Date object
    
    // STEP 2: Formatta data in italiano
    const dateStr = date.toLocaleDateString('it-IT');
    // → "14/03/2024"
    
    // STEP 3: Formatta ora in italiano
    const timeStr = date.toLocaleTimeString('it-IT', {
        hour: '2-digit',   // 2 cifre per ora (01, 02, ..., 23)
        minute: '2-digit'  // 2 cifre per minuti
    });
    // → "10:30"
    
    // STEP 4: Combina data + ora
    return `${dateStr}, ${timeStr}`;
    // → "14/03/2024, 10:30"
}
```

**💡 Esempi:**

```javascript
formatDate("2024-03-14T10:30:00.000Z")
// → "14/03/2024, 10:30"

formatDate("2024-12-25T18:45:30.000Z")
// → "25/12/2024, 18:45"
```

**💡 Opzioni `toLocaleDateString()`:**

```javascript
// Formato corto (default)
date.toLocaleDateString('it-IT')
// → "14/03/2024"

// Formato lungo
date.toLocaleDateString('it-IT', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
})
// → "giovedì 14 marzo 2024"
```

---

#### 🔷 GRUPPO 5: Event Listeners (Interazioni Utente)

Queste funzioni **gestiscono i click** e input dell'utente.

---

**🎮 FUNZIONE 12: `setupEventListeners()` - Configura tutti gli eventi**

```javascript
/**
 * Configura tutti gli event listeners dell'applicazione
 * Viene chiamata una sola volta all'inizializzazione
 */
function setupEventListeners() {
    console.log('🎮 Configurazione event listeners');
    
    // ══════════════════════════════════════
    // EVENT 1: Click su pulsante "Aggiungi"
    // ══════════════════════════════════════
    const addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', handleAddTodo);
    console.log('✓ Event listener: Pulsante Aggiungi');
    
    // ══════════════════════════════════════
    // EVENT 2: Tasto ENTER nel campo titolo
    // ══════════════════════════════════════
    const titleInput = document.getElementById('todoTitle');
    titleInput.addEventListener('keypress', (e) => {
        // Controlla se tasto premuto è ENTER
        if (e.key === 'Enter') {
            handleAddTodo(); // Stesso effetto del pulsante
        }
    });
    console.log('✓ Event listener: Enter su titolo');
    
    // ══════════════════════════════════════
    // EVENT 3: Click sui pulsanti filtro
    // ══════════════════════════════════════
    const filterButtons = document.querySelectorAll('.filter-btn');
    // querySelectorAll() trova TUTTI gli elementi con classe
    // Ritorna NodeList (simile ad array)
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    console.log(`✓ Event listener: ${filterButtons.length} pulsanti filtro`);
}
```

**💡 Event Delegation Pattern:**

```javascript
// ❌ METODO SBAGLIATO - Event su ogni task
// (non funziona perché task sono generate dinamicamente)
document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', ...); // Non trova elementi!
});

// ✅ METODO CORRETTO - Event in createTodoElement()
// Aggiungi listener quando crei elemento
const btnDelete = div.querySelector('.btn-delete');
btnDelete.addEventListener('click', () => deleteTodo(todo.id));
```

---

**➕ FUNZIONE 13: `handleAddTodo()` - Handler aggiungi task**

```javascript
/**
 * Handler per aggiungere una nuova task
 * Chiamato da: click pulsante "Aggiungi" OPPURE tasto ENTER
 */
function handleAddTodo() {
    console.log('➕ Handler: Aggiungi task');
    
    // STEP 1: RECUPERA elementi input dal DOM
    const titleInput = document.getElementById('todoTitle');
    const descInput = document.getElementById('todoDescription');
    
    // STEP 2: LEGGI valori
    const title = titleInput.value;
    const description = descInput.value;
    
    console.log(`📝 Tentativo aggiunta: "${title}"`);
    
    // STEP 3: CHIAMA funzione addTodo()
    const success = addTodo(title, description);
    // addTodo() ritorna true se successo, false se errore
    
    // STEP 4: Se successo, PULISCI form
    if (success) {
        titleInput.value = '';     // Svuota campo titolo
        descInput.value = '';      // Svuota campo descrizione
        titleInput.focus();        // Riporta focus su titolo (UX)
        
        console.log('✅ Task aggiunta e form resettato');
    } else {
        // Errore (validazione fallita)
        titleInput.focus(); // Focus su titolo per correzione
        console.log('❌ Aggiunta fallita (validazione)');
    }
}
```

**💡 Focus Management (UX):**

```javascript
titleInput.focus(); // Cursore nel campo titolo
// → Utente può subito digitare senza click!
```

**Flow Completo:**

```
Utente clicca "Aggiungi"
  ↓
handleAddTodo() eseguita
  ↓
Legge titleInput.value e descInput.value
  ↓
Chiama addTodo(title, description)
  ↓
addTodo() valida, crea task, salva, renderizza
  ↓
Se successo: pulisci form + focus titolo
```

---

**🔍 FUNZIONE 14: `handleFilterChange()` - Handler cambio filtro**

```javascript
/**
 * Handler per il cambio di filtro
 * Chiamato quando utente clicca su pulsante filtro
 * @param {Event} e - Oggetto evento del click
 */
function handleFilterChange(e) {
    console.log('🔍 Handler: Cambio filtro');
    
    // STEP 1: RIMUOVI classe 'active' da TUTTI i pulsanti
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Tutti i pulsanti diventano inattivi
    
    // STEP 2: AGGIUNGI classe 'active' al pulsante CLICCATO
    e.target.classList.add('active');
    // e.target → elemento che ha scatenato evento (pulsante cliccato)
    
    // STEP 3: AGGIORNA variabile filtro corrente
    currentFilter = e.target.dataset.filter;
    // dataset.filter legge attributo data-filter
    // <button data-filter="active"> → currentFilter = 'active'
    
    console.log(`🔍 Nuovo filtro: ${currentFilter}`);
    
    // STEP 4: RI-RENDERIZZA lista con nuovo filtro
    renderTodos();
    // renderTodos() chiama getFilteredTodos() che usa currentFilter
}
```

**💡 Come funziona `classList`:**

```javascript
// Aggiungere classe
element.classList.add('active');
// <button> → <button class="active">

// Rimuovere classe
element.classList.remove('active');
// <button class="active"> → <button>

// Toggle classe (aggiungi se non c'è, rimuovi se c'è)
element.classList.toggle('active');

// Controllare se ha classe
if (element.classList.contains('active')) { ... }
```

**💡 Event Object (parametro `e`):**

```javascript
function handleClick(e) {
    e.target       // Elemento cliccato
    e.type         // Tipo evento ('click', 'keypress', ...)
    e.preventDefault()  // Previeni azione default
    e.stopPropagation() // Ferma propagazione evento
}
```

**Flow Visivo:**

```
PRIMA del click:
[Tutte (active)] [Attive] [Completate]
     ^           
   currentFilter = 'all'

Utente clicca "Attive"
     ↓
handleFilterChange() eseguita
     ↓
Rimuove 'active' da tutti
[Tutte] [Attive] [Completate]
     ↓
Aggiunge 'active' a "Attive"
[Tutte] [Attive (active)] [Completate]
     ↓
currentFilter = 'active'
     ↓
renderTodos() → mostra solo task attive
```

---

#### 📝 Checklist Implementazione JavaScript

Usa questa checklist per verificare di aver implementato tutto:

**Funzioni Base:**
- [ ] `loadTodos()` - Carica da localStorage con try-catch
- [ ] `saveTodos()` - Salva in localStorage con try-catch
- [ ] `init()` - Inizializza app (load, setup, render)

**CRUD Operations:**
- [ ] `addTodo()` - Validazione, creazione, save, render
- [ ] `deleteTodo()` - Conferma, filter, save, render
- [ ] `toggleTodo()` - Find, toggle, save, render

**Rendering:**
- [ ] `renderTodos()` - Pulisci, filtra, forEach, counter
- [ ] `createTodoElement()` - createElement, innerHTML, events
- [ ] `getFilteredTodos()` - Switch con 3 casi

**Utilità:**
- [ ] `updateCounter()` - Conta, singolare/plurale
- [ ] `escapeHtml()` - Sicurezza XSS
- [ ] `formatDate()` - Data italiana leggibile

**Event Handlers:**
- [ ] `setupEventListeners()` - Tutti gli addEventListener
- [ ] `handleAddTodo()` - Leggi input, add, pulisci
- [ ] `handleFilterChange()` - Toggle active, re-render

**Costanti/Variabili:**
- [ ] `STORAGE_KEY` (const)
- [ ] `todosData` (let con todos[] e nextId)
- [ ] `currentFilter` (let)
- [ ] `DOMContentLoaded` event listener

---

#### 💡 File JavaScript Completo - Template Scheletro

**💡 Spiegazione Event Listeners:**
- `addEventListener('click', function)` → Esegue funzione al click
- `addEventListener('keypress', function)` → Esegue funzione alla pressione tasto
- `e.target` → Elemento che ha scatenato l'evento
- `e.key === 'Enter'` → Verifica se tasto premuto è Enter
- **Handler functions** → Funzioni dedicate per gestire eventi (più pulito)

#### 4.4 Checklist JavaScript Completa:
- [ ] Costanti e stato iniziale definiti
- [ ] Funzione `init()` implementata
- [ ] Funzione `loadTodos()` con try-catch
- [ ] Funzione `saveTodos()` con try-catch
- [ ] Funzione `addTodo()` con validazione
- [ ] Funzione `deleteTodo()` con conferma
- [ ] Funzione `toggleTodo()` implementata
- [ ] Funzione `renderTodos()` implementata
- [ ] Funzione `createTodoElement()` implementata
- [ ] Funzione `getFilteredTodos()` implementata
- [ ] Funzione `updateCounter()` implementata
- [ ] Funzione `escapeHtml()` implementata
- [ ] Funzione `formatDate()` implementata
- [ ] Funzione `setupEventListeners()` implementata
- [ ] Handler `handleAddTodo()` implementato
- [ ] Handler `handleFilterChange()` implementato
- [ ] Nessun errore in console

---

### 🧪 **STEP 5: Testing e Debug (30-45 minuti)**

#### Casi di Test Fondamentali:

| Test | Verifica |
|------|----------|
| Aggiungi task con titolo | ✅ Task aggiunta |
| Aggiungi task senza titolo | ✅ Messaggio errore |
| Completa task | ✅ Checkbox e stile cambiano |
| Elimina task | ✅ Task rimossa |
| Filtro "Attive" | ✅ Solo task incomplete |
| Filtro "Completate" | ✅ Solo task complete |
| Ricarica pagina | ✅ Dati persistono |
| Contatore | ✅ Numero corretto |

#### Verifica LocalStorage:
1. DevTools → Application → Local Storage
2. Cerca chiave `todoListData`
3. Verifica JSON valido e corretto

---

## 📝 **DELIVERABLE RICHIESTI**

### 📁 File da Consegnare:
1. **`index.html`** - Struttura HTML
2. **`style.css`** - Stili CSS  
3. **`app.js`** - Logica JavaScript
4. **`RELAZIONE.md`** - Relazione tecnica
5. **Screenshot** - Funzionamento app
6. **`demo-data.json`** (opzionale) - Dati esempio

### �� Contenuto Relazione:
- Dati studente
- Descrizione applicazione
- Struttura dati JSON
- Funzionalità implementate
- Problemi riscontrati e soluzioni
- Testing effettuato
- Screenshot
- Conclusioni e cosa hai imparato

---

## 🏆 **CRITERI DI VALUTAZIONE**

### 📊 Griglia di Valutazione (Totale: 100 punti)

| Criterio | Punti | Descrizione |
|----------|-------|-------------|
| **Funzionalità CRUD** | 30 | Create, Read, Update, Delete |
| **Gestione JSON** | 20 | Serializzazione/Deserializzazione |
| **Persistenza Dati** | 15 | LocalStorage funzionante |
| **Interfaccia Utente** | 15 | UI responsive e user-friendly |
| **Validazione Input** | 10 | Controlli e gestione errori |
| **Qualità Codice** | 5 | Leggibilità e commenti |
| **Documentazione** | 5 | Relazione completa |

### 🎯 Livelli di Competenza:
- **90-100 punti:** ⭐⭐⭐⭐⭐ **Eccellente**
- **80-89 punti:** ⭐⭐⭐⭐ **Buono**  
- **70-79 punti:** ⭐⭐⭐ **Sufficiente**
- **60-69 punti:** ⭐⭐ **Insufficiente**
- **< 60 punti:** ⭐ **Gravemente insufficiente**

---

## 💡 **SUGGERIMENTI E TRUCCHI**

### 🔧 **Best Practices:**
- ✅ Usa `try-catch` per JSON.parse() e JSON.stringify()
- ✅ Valida sempre gli input utente
- ✅ Escape HTML per prevenire XSS
- ✅ Usa const/let invece di var
- ✅ Commenta le funzioni complesse

### 🚨 **Errori Comuni da Evitare:**
- ❌ Non gestire errori parsing JSON
- ❌ Non validare input vuoti
- ❌ Dimenticare di salvare dopo modifiche
- ❌ Non usare ID univoci per task
- ❌ Non fare escape dell'HTML

### 🎯 **Estensioni Opzionali (+10 punti bonus):**
- ⭐ Modifica task inline
- ⭐ Priorità task (alta, media, bassa)
- ⭐ Categorie/Tags
- ⭐ Deadline con scadenze
- ⭐ Dark mode toggle
- ⭐ Export/Import JSON
- ⭐ Ricerca task
- ⭐ Animazioni CSS

---

## 📚 **RISORSE UTILI**

### 📖 **Documentazione:**
- [JSON - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [LocalStorage - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [DOM Manipulation - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

### 🔍 **Debug Utili:**
```javascript
// Log dati
console.log('Todos:', todosData);

// Visualizza JSON formattato
console.log(JSON.stringify(todosData, null, 2));

// Reset dati
localStorage.clear();
```

### 💬 **FAQ:**

**Q: Come resetto tutti i dati?**  
A: Console: `localStorage.clear()` poi ricarica.

**Q: Dati non vengono salvati**  
A: Verifica che `saveTodos()` sia chiamata dopo modifiche.

**Q: Errore "Unexpected token"**  
A: JSON corrotto. Usa `localStorage.clear()`.

---

## ⏰ **SCADENZE**

- **Consegna:** 1 settimana dall'assegnazione
- **Modalità:** Repository Git o ZIP
- **Include:** Codice + Relazione + Screenshot

---

## 🎉 **CONCLUSIONI**

Questa esercitazione ti permetterà di acquisire competenze su:
- Formato JSON e applicazioni pratiche
- Persistenza dati con Web Storage
- Manipolazione DOM e gestione eventi
- Sviluppo applicazioni web interattive

**Il JSON è fondamentale nello sviluppo web moderno. Buon lavoro! 🚀**

---

*Esercitazione creata per il corso di TPSIT 3 - Anno Scolastico 2025/26*
