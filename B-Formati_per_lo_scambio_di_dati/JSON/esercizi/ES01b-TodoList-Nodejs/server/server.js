const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

// === UTILITY: Gestione File JSON ===

async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Se il file non esiste, ritorna dati iniziali
    return { todos: [], nextId: 1 };
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// === UTILITY: Parsing Body ===

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = body ? JSON.parse(body) : {};
        resolve(data);
      } catch (error) {
        reject(new Error('JSON non valido'));
      }
    });
    
    req.on('error', reject);
  });
}

// === UTILITY: Risposta JSON ===

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(data));
}

function sendError(res, statusCode, message) {
  sendJSON(res, statusCode, { error: message });
}

// === HANDLERS ===

async function handleGetTodos(req, res) {
  const data = await readData();
  sendJSON(res, 200, data.todos);
}

async function handleCreateTodo(req, res) {
  const body = await parseBody(req);
  const { title, description } = body;
  
  // Validazione
  if (!title || title.trim() === '') {
    return sendError(res, 400, 'Titolo obbligatorio');
  }
  
  const data = await readData();
  
  const newTodo = {
    id: data.nextId++,
    title: title.trim(),
    description: description?.trim() || '',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  data.todos.push(newTodo);
  await writeData(data);
  
  sendJSON(res, 201, newTodo);
}

async function handleToggleTodo(req, res, id) {
  const data = await readData();
  const todo = data.todos.find(t => t.id === id);
  
  if (!todo) {
    return sendError(res, 404, 'Todo non trovato');
  }
  
  todo.completed = !todo.completed;
  todo.updatedAt = new Date().toISOString();
  
  await writeData(data);
  sendJSON(res, 200, todo);
}

async function handleDeleteTodo(req, res, id) {
  const data = await readData();
  const initialLength = data.todos.length;
  
  data.todos = data.todos.filter(t => t.id !== id);
  
  if (data.todos.length === initialLength) {
    return sendError(res, 404, 'Todo non trovato');
  }
  
  await writeData(data);
  
  // 204 No Content
  res.writeHead(204, {
    'Access-Control-Allow-Origin': '*'
  });
  res.end();
}

async function handleGetStats(req, res) {
  const data = await readData();
  
  const stats = {
    total: data.todos.length,
    completed: data.todos.filter(t => t.completed).length,
    active: data.todos.filter(t => !t.completed).length
  };
  
  sendJSON(res, 200, stats);
}

// === ROUTER ===

async function router(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const method = req.method;
  
  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }
  
  try {
    // GET /todos
    if (method === 'GET' && pathname === '/todos') {
      return await handleGetTodos(req, res);
    }
    
    // POST /todos
    if (method === 'POST' && pathname === '/todos') {
      return await handleCreateTodo(req, res);
    }
    
    // PATCH /todos/:id/toggle
    const toggleMatch = pathname.match(/^\/todos\/(\d+)\/toggle$/);
    if (method === 'PATCH' && toggleMatch) {
      const id = parseInt(toggleMatch[1]);
      return await handleToggleTodo(req, res, id);
    }
    
    // DELETE /todos/:id
    const deleteMatch = pathname.match(/^\/todos\/(\d+)$/);
    if (method === 'DELETE' && deleteMatch) {
      const id = parseInt(deleteMatch[1]);
      return await handleDeleteTodo(req, res, id);
    }
    
    // GET /stats
    if (method === 'GET' && pathname === '/stats') {
      return await handleGetStats(req, res);
    }
    
    // 404 - Not Found
    sendError(res, 404, 'Endpoint non trovato');
    
  } catch (error) {
    console.error('Errore:', error);
    sendError(res, 500, 'Errore interno del server');
  }
}

// === SERVER ===

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Server HTTP in ascolto su http://localhost:${PORT}`);
});
