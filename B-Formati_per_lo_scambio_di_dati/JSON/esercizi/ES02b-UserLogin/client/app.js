// === CONFIGURAZIONE ===
const API_URL = 'https://w4s-3001.filippobilardo.it';

// === STATE ===
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
const userCreated = document.getElementById('user-created');
const logoutBtn = document.getElementById('logout-btn');
const refreshUsersBtn = document.getElementById('refresh-users-btn');
const usersList = document.getElementById('users-list');

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  checkConnection();
  checkSession();  // Verifica sessione esistente
  attachEventListeners();
});

// === CONNECTION ===
async function checkConnection() {
  try {
    const response = await fetch(`${API_URL}/users`, {
      credentials: 'include'
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

// === SESSION CHECK ===
async function checkSession() {
  try {
    const response = await fetch(`${API_URL}/me`, {
      credentials: 'include'  // ← Include cookie sessione
    });

    if (response.ok) {
      currentUser = await response.json();
      showDashboard();
    } else {
      showAuth();
    }
  } catch (error) {
    showAuth();
  }
}

// === EVENT LISTENERS ===
function attachEventListeners() {
  tabLogin.addEventListener('click', () => switchTab('login'));
  tabRegister.addEventListener('click', () => switchTab('register'));
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  logoutBtn.addEventListener('click', handleLogout);
  refreshUsersBtn.addEventListener('click', loadAllUsers);
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

  if (password !== confirm) {
    showMessage(registerMessage, 'error', 'Le password non corrispondono');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  // ← Include cookie
      body: JSON.stringify({ username, password })
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
      credentials: 'include',  // ← Riceve cookie sessione
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
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
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'  // ← Include cookie sessione
    });

    if (response.ok) {
      currentUser = null;
      showAuth();
      loginForm.reset();
      registerForm.reset();
      clearMessages();
    }
  } catch (error) {
    console.error('Errore logout:', error);
  }
}

// === DASHBOARD ===
function showDashboard() {
  authScreen.classList.remove('active');
  dashboardScreen.classList.add('active');

  userName.textContent = currentUser.username;
  userId.textContent = currentUser.id;
  userCreated.textContent = formatDate(currentUser.createdAt);

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
    const response = await fetch(`${API_URL}/users`, {
      credentials: 'include'  // ← Route protetta
    });
    
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
      ${user.id === currentUser.id ? '<span style="color: var(--primary);"> (Tu)</span>' : ''}
      <div class="user-meta">
        ID: ${user.id} • Registrato: ${formatDate(user.createdAt)}
      </div>
    </div>
  `).join('');
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
