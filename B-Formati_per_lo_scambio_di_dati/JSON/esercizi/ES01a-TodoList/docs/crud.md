# Operazioni CRUD - Guida Completa

## Indice
- [Cos'è CRUD](#cosè-crud)
- [CRUD con Array JavaScript](#crud-con-array-javascript)
- [CRUD con localStorage](#crud-con-localstorage)
- [CRUD Pattern Completo](#crud-pattern-completo)
- [Best Practices](#best-practices)
- [Esempi Pratici](#esempi-pratici)

---

## Cos'è CRUD

**CRUD** è un acronimo che rappresenta le quattro operazioni fondamentali per la gestione dei dati:

- **C**reate (Creare)
- **R**ead (Leggere)
- **U**pdate (Aggiornare)
- **D**elete (Eliminare)

Queste operazioni sono alla base di qualsiasi applicazione che gestisce dati, dalle Todo List ai social network.

---

## CRUD con Array JavaScript

### Create - Creare nuovi elementi

```javascript
// Metodo 1: push() - Aggiunge alla fine
const todos = [];
todos.push({ id: 1, title: 'Studiare JavaScript', completed: false });
todos.push({ id: 2, title: 'Fare esercizi', completed: false });

// Metodo 2: unshift() - Aggiunge all'inizio
todos.unshift({ id: 0, title: 'Pianificare studio', completed: true });

// Metodo 3: spread operator (immutabile)
const newTodo = { id: 3, title: 'Ripassare', completed: false };
const newTodos = [...todos, newTodo];
```

### Read - Leggere elementi

```javascript
// Leggi TUTTI gli elementi
const allTodos = todos; // Riferimento all'array

// Leggi UN elemento per ID
const todo = todos.find(t => t.id === 2);
console.log(todo); // { id: 2, title: 'Fare esercizi', completed: false }

// Leggi elementi FILTRATI
const completedTodos = todos.filter(t => t.completed === true);
const pendingTodos = todos.filter(t => t.completed === false);

// Cerca per testo
const searchResults = todos.filter(t => 
  t.title.toLowerCase().includes('javascript')
);
```

### Update - Aggiornare elementi

```javascript
// Metodo 1: Modifica diretta (dopo find)
const todoToUpdate = todos.find(t => t.id === 2);
if (todoToUpdate) {
  todoToUpdate.completed = true;
  todoToUpdate.title = 'Esercizi completati!';
}

// Metodo 2: map() - Immutabile (crea nuovo array)
const updatedTodos = todos.map(todo => 
  todo.id === 2 
    ? { ...todo, completed: true } 
    : todo
);

// Metodo 3: Object.assign()
const todoIndex = todos.findIndex(t => t.id === 2);
if (todoIndex !== -1) {
  Object.assign(todos[todoIndex], { completed: true });
}

// Toggle completed (inverti stato)
const toggle = (id) => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
```

### Delete - Eliminare elementi

```javascript
// Metodo 1: filter() - Immutabile (preferito)
const todosAfterDelete = todos.filter(t => t.id !== 2);

// Metodo 2: splice() - Mutabile
const indexToDelete = todos.findIndex(t => t.id === 2);
if (indexToDelete !== -1) {
  todos.splice(indexToDelete, 1);
}

// Elimina multipli elementi
const idsToDelete = [1, 2, 3];
const remaining = todos.filter(t => !idsToDelete.includes(t.id));

// Elimina tutti completati
const deleteCompleted = () => {
  return todos.filter(t => !t.completed);
};
```

---

## CRUD con localStorage

### Pattern: Array + localStorage

```javascript
const STORAGE_KEY = 'todos';

// CREATE - Aggiungi e salva
function addTodo(title) {
  const todos = getTodos(); // Leggi dati esistenti
  const newTodo = {
    id: Date.now(),
    title: title,
    completed: false
  };
  todos.push(newTodo);
  saveTodos(todos); // Salva su localStorage
  return newTodo;
}

// READ - Leggi da localStorage
function getTodos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function getTodoById(id) {
  const todos = getTodos();
  return todos.find(t => t.id === id);
}

// UPDATE - Modifica e salva
function updateTodo(id, updates) {
  const todos = getTodos();
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...updates };
    saveTodos(todos);
    return todos[todoIndex];
  }
  return null;
}

function toggleTodo(id) {
  const todos = getTodos();
  const todo = todos.find(t => t.id === id);
  
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
    return todo;
  }
  return null;
}

// DELETE - Elimina e salva
function deleteTodo(id) {
  const todos = getTodos();
  const filtered = todos.filter(t => t.id !== id);
  saveTodos(filtered);
  return filtered.length < todos.length; // true se eliminato
}

// UTILITY - Salva su localStorage
function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
```

---

## CRUD Pattern Completo

### Classe riusabile per gestione CRUD

```javascript
class CRUDManager {
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  // CREATE
  create(item) {
    const items = this.readAll();
    const newItem = {
      id: Date.now(),
      ...item,
      createdAt: new Date().toISOString()
    };
    items.push(newItem);
    this.save(items);
    return newItem;
  }

  // READ
  readAll() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  readById(id) {
    return this.readAll().find(item => item.id === id);
  }

  readWhere(predicate) {
    return this.readAll().filter(predicate);
  }

  // UPDATE
  update(id, updates) {
    const items = this.readAll();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.save(items);
    return items[index];
  }

  // DELETE
  delete(id) {
    const items = this.readAll();
    const filtered = items.filter(item => item.id !== id);
    this.save(filtered);
    return filtered.length < items.length;
  }

  deleteWhere(predicate) {
    const items = this.readAll();
    const filtered = items.filter(item => !predicate(item));
    this.save(filtered);
    return items.length - filtered.length; // Numero di elementi eliminati
  }

  // UTILITY
  save(items) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }

  count() {
    return this.readAll().length;
  }
}

// Utilizzo
const todoManager = new CRUDManager('todos');

// Create
const todo = todoManager.create({ title: 'Studiare', completed: false });

// Read
const allTodos = todoManager.readAll();
const specificTodo = todoManager.readById(todo.id);
const completed = todoManager.readWhere(t => t.completed);

// Update
todoManager.update(todo.id, { completed: true });

// Delete
todoManager.delete(todo.id);
todoManager.deleteWhere(t => t.completed); // Elimina tutti completati
```

---

## Best Practices

### 1. ID Univoci
```javascript
// ✅ BUONO - Usa timestamp o UUID
const id = Date.now();
const id = crypto.randomUUID(); // Browser moderni

// ❌ CATTIVO - Indice array (cambia dopo delete)
const id = todos.length;
```

### 2. Immutabilità (quando possibile)
```javascript
// ✅ BUONO - Non modifica array originale
const newTodos = todos.filter(t => t.id !== deleteId);

// ⚠️ ACCETTABILE - Modifica in-place (più efficiente)
const index = todos.findIndex(t => t.id === deleteId);
todos.splice(index, 1);
```

### 3. Validazione
```javascript
function addTodo(title) {
  // Valida input
  if (!title || title.trim() === '') {
    throw new Error('Il titolo non può essere vuoto');
  }
  
  // Sanitizza
  const sanitizedTitle = title.trim();
  
  // Crea
  const todo = { id: Date.now(), title: sanitizedTitle, completed: false };
  // ...
}
```

### 4. Gestione Errori
```javascript
function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      alert('Spazio localStorage esaurito!');
    } else {
      console.error('Errore salvataggio:', error);
    }
  }
}
```

### 5. Separazione Responsabilità
```javascript
// ✅ BUONO - Funzioni separate
function getTodos() { /* ... */ }
function saveTodos(todos) { /* ... */ }
function addTodo(title) {
  const todos = getTodos();
  todos.push(/* ... */);
  saveTodos(todos);
}

// ❌ CATTIVO - Tutto in una funzione
function addTodo(title) {
  const data = localStorage.getItem('todos');
  const todos = data ? JSON.parse(data) : [];
  todos.push(/* ... */);
  localStorage.setItem('todos', JSON.stringify(todos));
}
```

---

## Esempi Pratici

### Todo List Completa

```javascript
// === SETUP ===
const STORAGE_KEY = 'myTodoList';

// === CREATE ===
function addTodo(title, description = '') {
  const todos = getTodos();
  const newTodo = {
    id: Date.now(),
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  saveTodos(todos);
  return newTodo;
}

// === READ ===
function getTodos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function getActiveTodos() {
  return getTodos().filter(t => !t.completed);
}

function getCompletedTodos() {
  return getTodos().filter(t => t.completed);
}

function searchTodos(query) {
  const lowerQuery = query.toLowerCase();
  return getTodos().filter(t => 
    t.title.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery)
  );
}

// === UPDATE ===
function toggleTodo(id) {
  const todos = getTodos();
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
  }
  return todo;
}

function editTodo(id, newTitle, newDescription) {
  const todos = getTodos();
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.title = newTitle.trim();
    todo.description = newDescription.trim();
    todo.updatedAt = new Date().toISOString();
    saveTodos(todos);
  }
  return todo;
}

// === DELETE ===
function deleteTodo(id) {
  const todos = getTodos();
  const filtered = todos.filter(t => t.id !== id);
  saveTodos(filtered);
}

function deleteCompleted() {
  const todos = getActiveTodos(); // Solo non completati
  saveTodos(todos);
}

function deleteAll() {
  saveTodos([]);
  // O: localStorage.removeItem(STORAGE_KEY);
}

// === UTILITY ===
function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getStats() {
  const todos = getTodos();
  return {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  };
}
```

### Gestione Contatti

```javascript
const contactManager = new CRUDManager('contacts');

// Create
contactManager.create({
  name: 'Mario Rossi',
  email: 'mario@example.com',
  phone: '123-456-7890'
});

// Read
const allContacts = contactManager.readAll();
const marioContact = contactManager.readWhere(c => 
  c.name.includes('Mario')
)[0];

// Update
contactManager.update(marioContact.id, {
  phone: '098-765-4321'
});

// Delete
contactManager.delete(marioContact.id);
```

---

## Risorse Aggiuntive

### Documentazione
- [Array Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [localStorage - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [JSON - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

### Link Utili
- Vedi anche: [localStorage-guida.md](localStorage-guida.md)
- Vedi anche: [guida-template-literals.md](guida-template-literals.md)

---

**Buono studio!** 🚀
