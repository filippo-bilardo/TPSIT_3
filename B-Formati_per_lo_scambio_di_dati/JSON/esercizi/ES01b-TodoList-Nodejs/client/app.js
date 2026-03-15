// Configurazione
const API_BASE_URL = 'https://w4s-3001.filippobilardo.it';

// Stato
let todos = [];
let isConnected = false;

// === INIZIALIZZAZIONE ===

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  checkConnection();
  loadTodos();
});

function setupEventListeners() {
  const form = document.getElementById('add-todo-form');
  form.addEventListener('submit', handleAddTodo);
}

// === API CALLS ===

async function checkConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (response.ok) {
      setConnectionStatus(true);
    } else {
      setConnectionStatus(false);
    }
  } catch (error) {
    setConnectionStatus(false);
  }
}

async function loadTodos() {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    todos = await response.json();
    renderTodos();
    loadStats();
    
  } catch (error) {
    console.error('Errore caricamento todos:', error);
    showError('Impossibile caricare i todo. Verifica che il server sia avviato.');
    setConnectionStatus(false);
  }
}

async function loadStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    const stats = await response.json();
    
    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-active').textContent = stats.active;
    document.getElementById('stat-completed').textContent = stats.completed;
    
  } catch (error) {
    console.error('Errore caricamento statistiche:', error);
  }
}

async function addTodo(title, description) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Errore creazione todo');
    }
    
    const newTodo = await response.json();
    todos.push(newTodo);
    renderTodos();
    loadStats();
    
    return newTodo;
    
  } catch (error) {
    console.error('Errore aggiunta todo:', error);
    showError(error.message);
    throw error;
  }
}

async function toggleTodo(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
      method: 'PATCH'
    });
    
    if (!response.ok) {
      throw new Error('Errore toggle todo');
    }
    
    const updatedTodo = await response.json();
    
    // Aggiorna nello stato locale
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos[index] = updatedTodo;
    }
    
    renderTodos();
    loadStats();
    
  } catch (error) {
    console.error('Errore toggle todo:', error);
    showError('Impossibile aggiornare il todo');
  }
}

async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Errore eliminazione todo');
    }
    
    // Rimuovi dallo stato locale
    todos = todos.filter(t => t.id !== id);
    
    renderTodos();
    loadStats();
    
  } catch (error) {
    console.error('Errore eliminazione todo:', error);
    showError('Impossibile eliminare il todo');
  }
}

// === EVENT HANDLERS ===

async function handleAddTodo(event) {
  event.preventDefault();
  
  const titleInput = document.getElementById('todo-title');
  const descriptionInput = document.getElementById('todo-description');
  
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  
  if (!title) {
    showError('Il titolo è obbligatorio');
    return;
  }
  
  try {
    await addTodo(title, description);
    
    // Reset form
    titleInput.value = '';
    descriptionInput.value = '';
    titleInput.focus();
    
  } catch (error) {
    // Errore già gestito in addTodo()
  }
}

function handleToggleTodo(id) {
  toggleTodo(id);
}

function handleDeleteTodo(id) {
  if (confirm('Sei sicuro di voler eliminare questo todo?')) {
    deleteTodo(id);
  }
}

// === RENDERING ===

function renderTodos() {
  const container = document.getElementById('todos-container');
  const emptyState = document.getElementById('empty-state');
  
  if (todos.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  container.innerHTML = todos.map(todo => `
    <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
      <div class="todo-content">
        <h3 class="todo-title">${escapeHtml(todo.title)}</h3>
        ${todo.description ? `<p class="todo-description">${escapeHtml(todo.description)}</p>` : ''}
        <div class="todo-meta">
          <span class="todo-date">
            ${new Date(todo.createdAt).toLocaleDateString('it-IT')}
          </span>
        </div>
      </div>
      <div class="todo-actions">
        <button 
          class="btn btn-toggle" 
          onclick="handleToggleTodo(${todo.id})"
          title="${todo.completed ? 'Segna come non completato' : 'Segna come completato'}"
        >
          ${todo.completed ? '↩️' : '✓'}
        </button>
        <button 
          class="btn btn-delete" 
          onclick="handleDeleteTodo(${todo.id})"
          title="Elimina"
        >
          🗑️
        </button>
      </div>
    </div>
  `).join('');
}

// === UTILITY ===

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function setConnectionStatus(connected) {
  isConnected = connected;
  const statusElement = document.getElementById('connection-status');
  
  if (connected) {
    statusElement.textContent = '● Server connesso';
    statusElement.className = 'status connected';
  } else {
    statusElement.textContent = '● Server disconnesso';
    statusElement.className = 'status disconnected';
  }
}

function showError(message) {
  alert(`❌ ${message}`);
}
