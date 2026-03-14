// ============================================
// TODO LIST API SERVER - server.js
// Node.js + Express REST API
// ============================================

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

// ══════════════════════════════════════════
// CONFIGURAZIONE
// ══════════════════════════════════════════

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

// ══════════════════════════════════════════
// MIDDLEWARE
// ══════════════════════════════════════════

// CORS - Permette richieste da domini diversi
app.use(cors());

// JSON Parser - Converte body richieste in oggetti JavaScript
app.use(express.json());

// Logger - Log di tutte le richieste HTTP
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// ══════════════════════════════════════════
// FUNZIONI UTILITÀ PER FILE
// ══════════════════════════════════════════

/**
 * Legge dati da file JSON
 * @returns {Promise<Object>} Oggetto con todos[] e nextId
 */
async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Se file non esiste, ritorna struttura vuota
        console.warn('⚠️ File dati non trovato, creo nuovo file');
        return { todos: [], nextId: 1 };
    }
}

/**
 * Scrive dati su file JSON
 * @param {Object} data - Dati da salvare
 */
async function writeData(data) {
    try {
        // JSON.stringify() con indentazione 2 spazi per leggibilità
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        console.log('💾 Dati salvati su file');
    } catch (error) {
        console.error('❌ Errore scrittura file:', error);
        throw error;
    }
}

/**
 * Valida dati task ricevuti dal client
 * @param {Object} todo - Oggetto task da validare
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateTodo(todo) {
    const errors = [];
    
    // Validazione titolo obbligatorio
    if (!todo.title || typeof todo.title !== 'string') {
        errors.push('Il campo "title" è obbligatorio e deve essere una stringa');
    } else if (todo.title.trim() === '') {
        errors.push('Il campo "title" non può essere vuoto');
    } else if (todo.title.length > 100) {
        errors.push('Il campo "title" non può superare 100 caratteri');
    }
    
    // Validazione descrizione opzionale
    if (todo.description !== undefined) {
        if (typeof todo.description !== 'string') {
            errors.push('Il campo "description" deve essere una stringa');
        } else if (todo.description.length > 500) {
            errors.push('Il campo "description" non può superare 500 caratteri');
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ══════════════════════════════════════════
// API ROUTES - REST Endpoints
// ══════════════════════════════════════════

/**
 * GET /api/todos
 * Ritorna tutte le task
 * 
 * Response: {
 *   success: true,
 *   data: [...],
 *   count: number
 * }
 */
app.get('/api/todos', async (req, res) => {
    try {
        const data = await readData();
        
        console.log(`📋 Invio ${data.todos.length} task al client`);
        
        res.json({
            success: true,
            data: data.todos,
            count: data.todos.length
        });
    } catch (error) {
        console.error('❌ Errore GET /api/todos:', error);
        res.status(500).json({
            success: false,
            error: 'Errore interno del server'
        });
    }
});

/**
 * POST /api/todos
 * Crea una nuova task
 * 
 * Request Body: {
 *   title: string (obbligatorio),
 *   description: string (opzionale)
 * }
 * 
 * Response (201): {
 *   success: true,
 *   data: { id, title, description, completed, createdAt },
 *   message: string
 * }
 */
app.post('/api/todos', async (req, res) => {
    try {
        const { title, description = '' } = req.body;
        
        // VALIDAZIONE input
        const validation = validateTodo({ title, description });
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                errors: validation.errors
            });
        }
        
        // Leggi dati esistenti
        const data = await readData();
        
        // Crea nuova task
        const newTodo = {
            id: data.nextId,
            title: title.trim(),
            description: description.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        // Aggiungi all'array e incrementa ID
        data.todos.push(newTodo);
        data.nextId++;
        
        // Salva su file
        await writeData(data);
        
        console.log(`✅ Task creata: "${newTodo.title}" (id: ${newTodo.id})`);
        
        // Risposta con status 201 Created
        res.status(201).json({
            success: true,
            data: newTodo,
            message: 'Task creata con successo'
        });
    } catch (error) {
        console.error('❌ Errore POST /api/todos:', error);
        res.status(500).json({
            success: false,
            error: 'Errore interno del server'
        });
    }
});

/**
 * PUT /api/todos/:id
 * Aggiorna titolo e descrizione di una task esistente
 * 
 * Request Body: {
 *   title: string,
 *   description: string
 * }
 */
app.put('/api/todos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description } = req.body;
        
        // Validazione
        const validation = validateTodo({ title, description });
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                errors: validation.errors
            });
        }
        
        // Leggi dati
        const data = await readData();
        
        // Trova task per ID
        const todoIndex = data.todos.findIndex(t => t.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({
                success: false,
                error: `Task con id ${id} non trovata`
            });
        }
        
        // Aggiorna task
        data.todos[todoIndex].title = title.trim();
        data.todos[todoIndex].description = description.trim();
        
        await writeData(data);
        
        console.log(`✏️ Task aggiornata: id ${id}`);
        
        res.json({
            success: true,
            data: data.todos[todoIndex],
            message: 'Task aggiornata con successo'
        });
    } catch (error) {
        console.error('❌ Errore PUT /api/todos/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Errore interno del server'
        });
    }
});

/**
 * PATCH /api/todos/:id/toggle
 * Cambia stato completed di una task (toggle)
 * 
 * Response: {
 *   success: true,
 *   data: { /* task aggiornata * / },
 *   message: string
 * }
 */
app.patch('/api/todos/:id/toggle', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        const data = await readData();
        
        // Trova task
        const todo = data.todos.find(t => t.id === id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                error: `Task con id ${id} non trovata`
            });
        }
        
        // Toggle completed
        todo.completed = !todo.completed;
        
        await writeData(data);
        
        const status = todo.completed ? 'COMPLETATA ✅' : 'ATTIVA ⏳';
        console.log(`✓ Task ${id} → ${status}`);
        
        res.json({
            success: true,
            data: todo,
            message: `Task ${todo.completed ? 'completata' : 'riattivata'}`
        });
    } catch (error) {
        console.error('❌ Errore PATCH /api/todos/:id/toggle:', error);
        res.status(500).json({
            success: false,
            error: 'Errore interno del server'
        });
    }
});

/**
 * DELETE /api/todos/:id
 * Elimina una task
 * 
 * Response: {
 *   success: true,
 *   message: string
 * }
 */
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        const data = await readData();
        
        // Conta task prima della rimozione
        const originalLength = data.todos.length;
        
        // Filtra (rimuovi task con id specificato)
        data.todos = data.todos.filter(t => t.id !== id);
        
        // Controlla se qualcosa è stato eliminato
        if (data.todos.length === originalLength) {
            return res.status(404).json({
                success: false,
                error: `Task con id ${id} non trovata`
            });
        }
        
        await writeData(data);
        
        console.log(`🗑️ Task eliminata: id ${id}`);
        
        res.json({
            success: true,
            message: 'Task eliminata con successo'
        });
    } catch (error) {
        console.error('❌ Errore DELETE /api/todos/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Errore interno del server'
        });
    }
});

/**
 * GET /api/stats
 * Ritorna statistiche sulle task
 * 
 * Response: {
 *   total: number,
 *   completed: number,
 *   active: number,
 *   percentage: number
 * }
 */
app.get('/api/stats', async (req, res) => {
    try {
        const data = await readData();
        
        const total = data.todos.length;
        const completed = data.todos.filter(t => t.completed).length;
        const active = total - completed;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        res.json({
            success: true,
            data: {
                total,
                completed,
                active,
                percentage
            }
        });
    } catch (error) {
        console.error('❌ Errore GET /api/stats:', error);
        res.status(500).json({
            success: false,
            error: 'Errore interno del server'
        });
    }
});

// ══════════════════════════════════════════
// ROUTE DI TEST E INFO
// ══════════════════════════════════════════

/**
 * GET /
 * Homepage API - mostra informazioni e endpoints disponibili
 */
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Todo List API Server',
        version: '1.0.0',
        description: 'REST API per gestione Todo List - TPSIT 3',
        endpoints: {
            'GET /api/todos': 'Recupera tutte le task',
            'POST /api/todos': 'Crea nuova task (body: title, description)',
            'PUT /api/todos/:id': 'Aggiorna task esistente',
            'PATCH /api/todos/:id/toggle': 'Cambia stato completed',
            'DELETE /api/todos/:id': 'Elimina task',
            'GET /api/stats': 'Statistiche task'
        },
        examples: {
            'Crea task': {
                method: 'POST',
                url: '/api/todos',
                body: { title: 'Studiare JSON', description: 'Capitoli 1-5' }
            },
            'Toggle task': {
                method: 'PATCH',
                url: '/api/todos/1/toggle'
            }
        }
    });
});

// 404 Handler - Route non trovata
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint non trovato',
        path: req.path,
        method: req.method
    });
});

// ══════════════════════════════════════════
// AVVIO SERVER
// ══════════════════════════════════════════

app.listen(PORT, () => {
    console.clear();
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║   🚀 TODO LIST API SERVER AVVIATO             ║');
    console.log('╚════════════════════════════════════════════════╝');
    console.log('');
    console.log(`📡 Server in ascolto su http://localhost:${PORT}`);
    console.log('');
    console.log('📋 API Endpoints disponibili:');
    console.log(`   ┌─ GET    http://localhost:${PORT}/api/todos`);
    console.log(`   ├─ POST   http://localhost:${PORT}/api/todos`);
    console.log(`   ├─ PUT    http://localhost:${PORT}/api/todos/:id`);
    console.log(`   ├─ PATCH  http://localhost:${PORT}/api/todos/:id/toggle`);
    console.log(`   ├─ DELETE http://localhost:${PORT}/api/todos/:id`);
    console.log(`   └─ GET    http://localhost:${PORT}/api/stats`);
    console.log('');
    console.log(`📁 File dati: ${DATA_FILE}`);
    console.log('');
    console.log('💡 Test veloce:');
    console.log(`   curl http://localhost:${PORT}/api/todos`);
    console.log('');
    console.log('🛑 Premi CTRL+C per fermare il server');
    console.log('════════════════════════════════════════════════');
    console.log('');
});

// Gestione errori globali
process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Gestione chiusura graceful
process.on('SIGINT', () => {
    console.log('\n\n🛑 Server fermato dall\'utente');
    console.log('👋 Arrivederci!\n');
    process.exit(0);
});
