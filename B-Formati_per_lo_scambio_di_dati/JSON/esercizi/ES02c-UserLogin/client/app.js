// === CONFIGURAZIONE ===
const API_URL = 'https://w4s-3001.filippobilardo.it';

// === STATE (in-memory, not localStorage for security) ===
let accessToken = null;
let refreshToken = null;
let currentUser = null;

// === ELEMENTI DOM ===
const authScreen = document.getElementById('auth-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const connectionStatus = document.getElementById('connection-status');

const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');

const userName = document.getElementById('user-name');
const userId = document.getElementById('user-id');
const userRole = document.getElementById('user-role');
const userCreated = document.getElementById('user-created');
const logoutBtn = document.getElementById('logout-btn');
const refreshUsersBtn = document.getElementById('refresh-users-btn');
const usersList = document.getElementById('users-list');

const adminPanel = document.getElementById('admin-panel');
const loadStatsBtn = document.getElementById('load-stats-btn');
const adminStats = document.getElementById('admin-stats');

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  checkConnection();
  attachEventListeners();
  showAuth();
});

// === CONNECTION ===
async function checkConnection() {
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}
    });
    showStatus('online', '✓ Server connesso');
  } catch (error) {
    showStatus('offline', '✗ Server offline');
  }
}

function showStatus(status, text) {
  connectionStatus.textContent = text;
  connectionStatus.className = `status ${status}`;
}

// === EVENT LISTENERS ===
function attachEventListeners() {
  tabLogin.addEventListener('click', () => switchTab('login'));
  tabRegister.addEventListener('click', () => switchTab('register'));
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  logoutBtn.addEventListener('click', handleLogout);
  refreshUsersBtn.addEventListener('click', loadAllUsers);
  loadStatsBtn.addEventListener('click', loadAdminStats);
}

// === TABS ===
function switchTab(tab) {
  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    clearMessages();
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    clearMessages();
  }
}

function clearMessages() {
  loginMessage.classList.remove('show');
  registerMessage.classList.remove('show');
}

// === REGISTRATION ===
async function handleRegister(e) {
  e.preventDefault();

  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value;
  const confirm = document.getElementById('register-confirm').value;
  const role = document.getElementById('register-role').value;

  if (password !== confirm) {
    showMessage(registerMessage, 'error', 'Le password non corrispondono');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(registerMessage, 'success', data.message);
      registerForm.reset();
      setTimeout(() => switchTab('login'), 2000);
    } else {
      showMessage(registerMessage, 'error', data.error || 'Errore registrazione');
    }
  } catch (error) {
    console.error('Errore registrazione:', error);
    showMessage(registerMessage, 'error', 'Errore di connessione al server');
  }
}

// === LOGIN ===
async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  if (!username || !password) {
    showMessage(loginMessage, 'error', 'Inserisci username e password');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Salva token in memoria
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
      currentUser = data.user;
      
      showDashboard();
      loginForm.reset();
    } else {
      showMessage(loginMessage, 'error', data.error || 'Credenziali non valide');
    }
  } catch (error) {
    console.error('Errore login:', error);
    showMessage(loginMessage, 'error', 'Errore di connessione al server');
  }
}

// === LOGOUT ===
async function handleLogout() {
  try {
    await fetchWithAuth(`${API_URL}/logout`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    });
  } catch (error) {
    console.error('Errore logout:', error);
  } finally {
    // Clear tokens
    accessToken = null;
    refreshToken = null;
    currentUser = null;
    
    showAuth();
    loginForm.reset();
    registerForm.reset();
    clearMessages();
  }
}

// === FETCH WITH AUTH (auto-refresh) ===
async function fetchWithAuth(url, options = {}) {
  // Aggiungi Authorization header
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  let response = await fetch(url, {
    ...options,
    headers
  });

  // Se 401 e abbiamo refresh token, prova refresh
  if (response.status === 401 && refreshToken) {
    const refreshed = await tryRefreshToken();
    
    if (refreshed) {
      // Riprova richiesta con nuovo token
      headers['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(url, {
        ...options,
        headers
      });
    } else {
      // Refresh fallito, logout
      handleLogout();
      throw new Error('Sessione scaduta');
    }
  }

  return response;
}

// === REFRESH TOKEN ===
async function tryRefreshToken() {
  try {
    const response = await fetch(`${API_URL}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (response.ok) {
      const data = await response.json();
      accessToken = data.accessToken;
      return true;
    }
    return false;
  } catch (error) {
    console.error('Errore refresh token:', error);
    return false;
  }
}

// === DASHBOARD ===
function showDashboard() {
  authScreen.classList.remove('active');
  dashboardScreen.classList.add('active');

  userName.textContent = currentUser.username;
  userId.textContent = currentUser.id;
  userCreated.textContent = formatDate(currentUser.createdAt);
  
  userRole.textContent = currentUser.role === 'admin' ? 'Admin' : 'Utente';
  userRole.className = `badge ${currentUser.role}`;

  // Mostra admin panel se admin
  if (currentUser.role === 'admin') {
    adminPanel.style.display = 'block';
  } else {
    adminPanel.style.display = 'none';
  }

  loadAllUsers();
}

function showAuth() {
  dashboardScreen.classList.remove('active');
  authScreen.classList.add('active');
  switchTab('login');
}

// === USERS LIST ===
async function loadAllUsers() {
  try {
    const response = await fetchWithAuth(`${API_URL}/users`);
    
    if (!response.ok) {
      throw new Error('Errore caricamento utenti');
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error('Errore:', error);
    usersList.innerHTML = `
      <div class="no-users">
        <p>❌ Errore nel caricamento degli utenti</p>
      </div>
    `;
  }
}

function displayUsers(users) {
  if (users.length === 0) {
    usersList.innerHTML = `
      <div class="no-users">
        <p>Nessun utente registrato</p>
      </div>
    `;
    return;
  }

  usersList.innerHTML = users.map(user => `
    <div class="user-item">
      <strong>${escapeHtml(user.username)}</strong>
      <span class="badge ${user.role}">${user.role === 'admin' ? 'Admin' : 'User'}</span>
      ${user.id === currentUser.id ? '<span style="color: var(--primary);"> (Tu)</span>' : ''}
      <div class="user-meta">
        ID: ${user.id} • Registrato: ${formatDate(user.createdAt)}
      </div>
    </div>
  `).join('');
}

// === ADMIN STATS ===
async function loadAdminStats() {
  try {
    const response = await fetchWithAuth(`${API_URL}/admin/stats`);

    if (response.status === 403) {
      adminStats.innerHTML = `<p style="color: var(--danger);">❌ Accesso negato - Solo per admin</p>`;
      return;
    }

    if (!response.ok) {
      throw new Error('Errore caricamento stats');
    }

    const stats = await response.json();
    displayStats(stats);
  } catch (error) {
    console.error('Errore stats:', error);
    adminStats.innerHTML = `<p style="color: var(--danger);">❌ Errore caricamento statistiche</p>`;
  }
}

function displayStats(stats) {
  adminStats.innerHTML = `
    <div class="stat-item">
      <strong>${stats.totalUsers}</strong>
      <p>Totale Utenti</p>
    </div>
    <div class="stat-item">
      <strong>${stats.totalAdmins}</strong>
      <p>Admin</p>
    </div>
    <div class="stat-item">
      <strong>${stats.totalRegularUsers}</strong>
      <p>Utenti Normali</p>
    </div>
    <h4 style="margin-top: 1.5rem;">Ultimi Registrati:</h4>
    ${stats.recentUsers.map(user => `
      <div class="user-item">
        <strong>${escapeHtml(user.username)}</strong>
        <span class="badge ${user.role}">${user.role}</span>
        <div class="user-meta">
          ID: ${user.id} • ${formatDate(user.createdAt)}
        </div>
      </div>
    `).join('')}
  `;
}

// === UTILITY ===
function showMessage(element, type, text) {
  element.textContent = text;
  element.className = `message show ${type}`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
