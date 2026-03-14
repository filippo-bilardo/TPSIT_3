// ============================================
// TODO LIST CLIENT - app.js
// Client con Fetch API per comunicazione con server
// ============================================

// ══════════════════════════════════════════
// CONFIGURAZIONE
// ══════════════════════════════════════════

const API_BASE_URL = 'http://localhost:3000/api';
const SERVER_URL = 'http://localhost:3000';

// ══════════════════════════════════════════
// STATO APPLICAZIONE
// ══════════════════════════════════════════

let todosData = [];
let currentFilter = 'all';
let isConnected = false;

// ══════════════════════════════════════════
// INIZIALIZZAZIONE
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', init);

async function init() {
    console.log('🚀 Client TODO LIST avviato');
    console.log(`📡 Server configurato: ${SERVER_URL}`);
    
    setupEventListeners();
    await loadTodosFromServer();
    checkServerConnection();
}

// ══════════════════════════════════════════
// API CALLS - Comunicazione con Server
// ══════════════════════════════════════════

/**
 * Carica tutte le task dal server
 */
async function loadTodosFromServer() {
    showLoading(true);
    
    try {
        console.log('📥 Caricamento task dal server...');
        
        const response = await fetch(`${API_BASE_URL}/todos`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            todosData = result.data;
            console.log(`✅ Caricate ${todosData.length} task dal server`);
            
            renderTodos();
            updateStats();
            updateConnectionStatus(true);
        } else {
            throw new Error(result.error || 'Errore sconosciuto');
        }
    } catch (error) {
        console.error('❌ Errore caricamento task:', error);
        showError(`
            <p>⚠️ Impossibile connettersi al server</p>
            <p><small>${error.message}</small></p>
            <p><strong>Verifica che il server sia avviato:</strong></p>
            <code>cd server && npm start</code>
        `);
        updateConnectionStatus(false);
    } finally {
        showLoading(false);
    }
}

/**
 * Aggiunge nuova task al server
 * @param {string} title - Titolo task
 * @param {string} description - Descrizione task
 * @returns {Promise<boolean>} true se successo
 */
async function addTodoToServer(title, description) {
    showLoading(true);
    
    try {
        console.log(`📤 Invio nuova task al server: "${title}"`);
        
        const response = await fetch(`${API_BASE_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            const errorMsg = result.errors ? result.errors.join(', ') : result.error;
            throw new Error(errorMsg || 'Errore server');
        }
        
        if (result.success) {
            console.log('✅ Task creata sul server:', result.data);
            await loadTodosFromServer(); // Ricarica lista aggiornata
            return true;
        }
    } catch (error) {
        console.error('❌ Errore creazione task:', error);
        alert('⚠️ Errore durante la creazione della task:\n' + error.message);
        return false;
    } finally {
        showLoading(false);
    }
}

/**
 * Toggle completed di una task sul server
 * @param {number} id - ID della task
 */
async function toggleTodoOnServer(id) {
    showLoading(true);
    
    try {
        console.log(`🔄 Toggle task ${id}...`);
        
        const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
            method: 'PATCH'
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Errore server');
        }
        
        if (result.success) {
            console.log('✅ Task aggiornata:', result.message);
            await loadTodosFromServer();
        }
    } catch (error) {
        console.error('❌ Errore toggle task:', error);
        alert('⚠️ Errore durante l\'aggiornamento:\n' + error.message);
    } finally {
        showLoading(false);
    }
}

/**
 * Elimina task dal server
 * @param {number} id - ID della task da eliminare
 */
async function deleteTodoFromServer(id) {
    if (!confirm('🗑️ Sei sicuro di voler eliminare questa task?')) {
        return;
    }
    
    showLoading(true);
    
    try {
        console.log(`🗑️ Eliminazione task ${id}...`);
        
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Errore server');
        }
        
        if (result.success) {
            console.log('✅ Task eliminata');
            await loadTodosFromServer();
        }
    } catch (error) {
        console.error('❌ Errore eliminazione task:', error);
        alert('⚠️ Errore durante l\'eliminazione:\n' + error.message);
    } finally {
        showLoading(false);
    }
}

/**
 * Verifica connessione al server
 */
async function checkServerConnection() {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'GET',
            signal: AbortSignal.timeout(3000) // Timeout 3 secondi
        });
        
        updateConnectionStatus(response.ok);
    } catch (error) {
        console.warn('⚠️ Server non raggiungibile:', error.message);
        updateConnectionStatus(false);
    }
}

// ══════════════════════════════════════════
// RENDERING UI
// ══════════════════════════════════════════

/**
 * Renderizza lista task filtrata
 */
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        const emptyMessage = currentFilter === 'all' 
            ? '📝 Nessuna task. Aggiungi la tua prima task!'
            : `📝 Nessuna task ${currentFilter === 'active' ? 'attiva' : 'completata'}`;
        
        todoList.innerHTML = `<p class="empty-message">${emptyMessage}</p>`;
        return;
    }
    
    filteredTodos.forEach(todo => {
        const element = createTodoElement(todo);
        todoList.appendChild(element);
    });
    
    console.log(`🎨 Renderizzate ${filteredTodos.length} task (filtro: ${currentFilter})`);
}

/**
 * Crea elemento DOM per una singola task
 * @param {Object} todo - Oggetto task
 * @returns {HTMLElement} Elemento div della task
 */
function createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    div.dataset.id = todo.id;
    
    div.innerHTML = `
        <input type="checkbox" 
               class="todo-checkbox" 
               ${todo.completed ? 'checked' : ''}
               aria-label="Segna come ${todo.completed ? 'non completata' : 'completata'}">
        <div class="todo-content">
            <h3 class="todo-title">${escapeHtml(todo.title)}</h3>
            ${todo.description ? `<p class="todo-description">${escapeHtml(todo.description)}</p>` : ''}
            <small class="todo-date">📅 ${formatDate(todo.createdAt)}</small>
        </div>
        <div class="todo-actions">
            <button class="btn-delete" aria-label="Elimina task">
                🗑️ Elimina
            </button>
        </div>
    `;
    
    // Event listeners
    const checkbox = div.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => toggleTodoOnServer(todo.id));
    
    const btnDelete = div.querySelector('.btn-delete');
    btnDelete.addEventListener('click', () => deleteTodoFromServer(todo.id));
    
    return div;
}

// ══════════════════════════════════════════
// UTILITÀ
// ══════════════════════════════════════════

/**
 * Filtra task in base al filtro corrente
 * @returns {Array} Array task filtrate
 */
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todosData.filter(t => !t.completed);
        case 'completed':
            return todosData.filter(t => t.completed);
        default:
            return todosData;
    }
}

/**
 * Aggiorna statistiche nel footer
 */
function updateStats() {
    const total = todosData.length;
    const completed = todosData.filter(t => t.completed).length;
    const active = total - completed;
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('activeCount').textContent = active;
    
    console.log(`📊 Statistiche: ${active} attive, ${completed} completate, ${total} totali`);
}

/**
 * Escape HTML per prevenire XSS
 * @param {string} text - Testo da rendere sicuro
 * @returns {string} Testo escapato
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Formatta data ISO in formato italiano
 * @param {string} isoString - Data ISO
 * @returns {string} Data formattata
 */
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('it-IT') + ', ' + 
           date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Mostra/nascondi indicatore loading
 * @param {boolean} show - true per mostrare
 */
function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = show ? 'block' : 'none';
}

/**
 * Mostra messaggio di errore
 * @param {string} message - Messaggio HTML da visualizzare
 */
function showError(message) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = `
        <div class="error-message" style="
            text-align: center;
            padding: 40px 20px;
            background: #fff3cd;
            border: 2px solid #ffc107;
            border-radius: 8px;
            margin: 20px 0;
        ">
            ${message}
            <br><br>
            <button onclick="loadTodosFromServer()" class="btn btn-primary">
                🔄 Riprova
            </button>
        </div>
    `;
}

/**
 * Aggiorna indicatore stato connessione
 * @param {boolean} connected - true se connesso
 */
function updateConnectionStatus(connected) {
    isConnected = connected;
    
    const statusElement = document.getElementById('connectionStatus');
    const statusText = document.getElementById('statusText');
    const serverUrl = document.getElementById('serverUrl');
    
    if (connected) {
        statusElement.className = 'connection-status connected';
        statusText.textContent = '✅ Connesso al server';
        if (serverUrl) serverUrl.style.color = '#48bb78';
    } else {
        statusElement.className = 'connection-status disconnected';
        statusText.textContent = '❌ Server non disponibile';
        if (serverUrl) serverUrl.style.color = '#f56565';
    }
}

// ══════════════════════════════════════════
// EVENT HANDLERS
// ══════════════════════════════════════════

/**
 * Configura tutti gli event listeners
 */
function setupEventListeners() {
    // Pulsante aggiungi
    document.getElementById('addBtn').addEventListener('click', handleAddTodo);
    
    // Enter su input titolo
    document.getElementById('todoTitle').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    });
    
    // Pulsanti filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    
    // Pulsante refresh
    document.getElementById('refreshBtn').addEventListener('click', () => {
        console.log('🔄 Ricaricamento manuale richiesto');
        loadTodosFromServer();
    });
    
    console.log('✅ Event listeners configurati');
}

/**
 * Handler: Aggiungi nuova task
 */
async function handleAddTodo() {
    const titleInput = document.getElementById('todoTitle');
    const descInput = document.getElementById('todoDescription');
    
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    
    // Validazione lato client
    if (!title) {
        alert('⚠️ Il titolo è obbligatorio!');
        titleInput.focus();
        return;
    }
    
    // Aggiungi al server
    const success = await addTodoToServer(title, description);
    
    // Se successo, pulisci form
    if (success) {
        titleInput.value = '';
        descInput.value = '';
        titleInput.focus();
    }
}

/**
 * Handler: Cambio filtro
 * @param {Event} e - Event object
 */
function handleFilterChange(e) {
    // Rimuovi active da tutti
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Aggiungi active al cliccato
    e.target.classList.add('active');
    
    // Aggiorna filtro e re-render
    currentFilter = e.target.dataset.filter;
    renderTodos();
    
    console.log(`🔍 Filtro cambiato: ${currentFilter}`);
}

// ══════════════════════════════════════════
// AUTO-REFRESH (opzionale)
// ══════════════════════════════════════════

// Ricarica automatica ogni 30 secondi (commentato - attiva se vuoi)
// setInterval(() => {
//     if (isConnected) {
//         console.log('🔄 Auto-refresh...');
//         loadTodosFromServer();
//     }
// }, 30000);

// ══════════════════════════════════════════
// FINE CLIENT
// ══════════════════════════════════════════

console.log('✅ Script client caricato');
