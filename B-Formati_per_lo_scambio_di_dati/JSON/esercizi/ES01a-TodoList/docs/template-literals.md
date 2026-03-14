# 📝 Guida Completa ai Template Literals (Template Strings)

## Indice

1. [Introduzione](#introduzione)
2. [Sintassi Base](#sintassi-base)
3. [Interpolazione di Variabili](#interpolazione-di-variabili)
4. [Espressioni JavaScript](#espressioni-javascript)
5. [Stringhe Multilinea](#stringhe-multilinea)
6. [Generazione HTML Dinamico](#generazione-html-dinamico)
7. [Tagged Templates (Avanzato)](#tagged-templates-avanzato)
8. [Best Practices](#best-practices)
9. [Esempi Pratici](#esempi-pratici)

---

## Introduzione

I **Template Literals** (o Template Strings) sono una funzionalità di ES6 (ECMAScript 2015) che rivoluziona il modo di lavorare con le stringhe in JavaScript.

### Prima di ES6 (Vecchio Modo)

```javascript
// Concatenazione con +
var name = "Mario";
var message = "Ciao, " + name + "!";

// Stringhe multilinea con \n
var html = "<div>\n" +
           "  <p>" + text + "</p>\n" +
           "</div>";
```

### Con ES6 (Nuovo Modo)

```javascript
// Template literal con backtick `
const name = "Mario";
const message = `Ciao, ${name}!`;

// Stringhe multilinea naturali
const html = `
  <div>
    <p>${text}</p>
  </div>
`;
```

---

## Sintassi Base

### Carattere Backtick: \`

I template literals usano il **backtick** (\`) invece delle virgolette normali:

```javascript
// ❌ Virgolette normali (stringa classica)
const str1 = "Ciao";
const str2 = 'Ciao';

// ✅ Backtick (template literal)
const str3 = `Ciao`;
```

**Dove trovare il backtick sulla tastiera:**
- **Windows/Linux**: Tasto sotto `ESC`, a sinistra del tasto `1`
- **Mac**: Alt + 9 oppure tasto a sinistra di `Z`

---

## Interpolazione di Variabili

### Sintassi: ${variabile}

```javascript
const name = "Mario";
const age = 25;

// ❌ VECCHIO - Concatenazione
const message1 = "Mi chiamo " + name + " e ho " + age + " anni";

// ✅ NUOVO - Template literal
const message2 = `Mi chiamo ${name} e ho ${age} anni`;

console.log(message2);
// Output: "Mi chiamo Mario e ho 25 anni"
```

### Funziona con Qualsiasi Tipo

```javascript
const number = 42;
const boolean = true;
const array = [1, 2, 3];
const object = { x: 10 };

const str = `
  Numero: ${number}
  Booleano: ${boolean}
  Array: ${array}
  Oggetto: ${object}
`;

console.log(str);
// Output:
// Numero: 42
// Booleano: true
// Array: 1,2,3
// Oggetto: [object Object]
```

**⚠️ Nota:** Gli oggetti vengono convertiti in `[object Object]`. Usa `JSON.stringify()` per visualizzarli:

```javascript
const user = { name: "Mario", age: 25 };

// ❌ Non leggibile
console.log(`User: ${user}`);
// Output: "User: [object Object]"

// ✅ Leggibile
console.log(`User: ${JSON.stringify(user)}`);
// Output: 'User: {"name":"Mario","age":25}'
```

---

## Espressioni JavaScript

Dentro `${}` puoi inserire **qualsiasi espressione JavaScript**:

### Operazioni Matematiche

```javascript
const a = 10;
const b = 5;

console.log(`Somma: ${a + b}`);        // "Somma: 15"
console.log(`Prodotto: ${a * b}`);     // "Prodotto: 50"
console.log(`Potenza: ${a ** b}`);     // "Potenza: 100000"
console.log(`Resto: ${a % 3}`);        // "Resto: 1"
```

### Operatore Ternario

```javascript
const age = 18;
const status = `Sei ${age >= 18 ? 'maggiorenne' : 'minorenne'}`;
console.log(status); // "Sei maggiorenne"

const score = 75;
const result = `Esame: ${score >= 60 ? 'PROMOSSO ✅' : 'BOCCIATO ❌'}`;
console.log(result); // "Esame: PROMOSSO ✅"
```

### Chiamate a Funzioni

```javascript
function getGreeting(name) {
    return `Ciao, ${name}!`;
}

const message = `${getGreeting('Mario')} Come stai?`;
console.log(message);
// Output: "Ciao, Mario! Come stai?"

// Arrow function inline
const double = x => x * 2;
console.log(`Il doppio di 5 è ${double(5)}`);
// Output: "Il doppio di 5 è 10"
```

### Metodi di Stringa

```javascript
const name = "mario rossi";

const formatted = `Nome: ${name.toUpperCase()}`;
console.log(formatted); // "Nome: MARIO ROSSI"

const email = "mario@example.com";
const domain = `Dominio: ${email.split('@')[1]}`;
console.log(domain); // "Dominio: example.com"
```

### Proprietà di Oggetti

```javascript
const user = {
    name: "Mario",
    age: 25,
    city: "Roma"
};

const bio = `${user.name}, ${user.age} anni, vive a ${user.city}`;
console.log(bio); // "Mario, 25 anni, vive a Roma"

// Accesso annidato
const data = {
    user: {
        profile: {
            name: "Mario"
        }
    }
};

console.log(`Nome: ${data.user.profile.name}`);
// Output: "Nome: Mario"
```

### Array e Metodi

```javascript
const numbers = [1, 2, 3, 4, 5];

console.log(`Primo: ${numbers[0]}`);                    // "Primo: 1"
console.log(`Ultimo: ${numbers[numbers.length - 1]}`);  // "Ultimo: 5"
console.log(`Somma: ${numbers.reduce((a,b) => a+b)}`);  // "Somma: 15"
console.log(`Doppi: ${numbers.map(n => n*2)}`);        // "Doppi: 2,4,6,8,10"
```

---

## Stringhe Multilinea

Una delle funzionalità più utili: stringhe su più righe senza `\n` o `+`!

### Testo Multilinea

```javascript
// ❌ VECCHIO - Scomodo
const poem1 = "Roses are red,\n" +
              "Violets are blue,\n" +
              "JavaScript is awesome,\n" +
              "And so are you!";

// ✅ NUOVO - Naturale
const poem2 = `
Roses are red,
Violets are blue,
JavaScript is awesome,
And so are you!
`;

console.log(poem2);
```

### Indentazione

**⚠️ Attenzione:** Gli spazi e le tabulazioni vengono preservati!

```javascript
const code = `
    function hello() {
        console.log("Hello!");
    }
`;

// Include gli spazi iniziali!
console.log(code);
// Output:
//     function hello() {
//         console.log("Hello!");
//     }
```

**Soluzione 1: Allinea a sinistra**

```javascript
const code = `
function hello() {
    console.log("Hello!");
}
`.trim(); // trim() rimuove spazi inizio/fine
```

**Soluzione 2: Usa libreria dedent**

```javascript
// Richiede libreria esterna
import dedent from 'dedent';

const code = dedent`
    function hello() {
        console.log("Hello!");
    }
`;
```

---

## Generazione HTML Dinamico

I template literals sono **perfetti** per generare HTML!

### Esempio Base

```javascript
const title = "My Todo List";
const count = 5;

const html = `
  <header>
    <h1>${title}</h1>
    <p>Hai ${count} task da completare</p>
  </header>
`;

document.body.innerHTML = html;
```

### Generazione Lista

```javascript
const tasks = [
    { id: 1, title: "Studiare JavaScript", completed: false },
    { id: 2, title: "Fare esercizi", completed: true },
    { id: 3, title: "Leggere documentazione", completed: false }
];

// Genera HTML per ogni task
const taskHTML = tasks.map(task => `
  <div class="task ${task.completed ? 'completed' : ''}">
    <input type="checkbox" ${task.completed ? 'checked' : ''}>
    <span>${task.title}</span>
  </div>
`).join('');

// Inserisci in container
const container = `
  <div class="task-list">
    ${taskHTML}
  </div>
`;

document.getElementById('app').innerHTML = container;
```

### Conditional Rendering

```javascript
const user = {
    name: "Mario",
    avatar: "avatar.jpg",
    isAdmin: true
};

const userCard = `
  <div class="user-card">
    <img src="${user.avatar}" alt="${user.name}">
    <h2>${user.name}</h2>
    ${user.isAdmin ? '<span class="badge">Admin</span>' : ''}
  </div>
`;
```

### Escape HTML (Sicurezza XSS)

**⚠️ IMPORTANTE:** Non inserire mai dati utente senza escape!

```javascript
// ❌ PERICOLOSO - Vulnerabile a XSS
const userInput = '<script>alert("HACKED!")</script>';
const html = `<div>${userInput}</div>`;
// Lo script viene ESEGUITO!

// ✅ SICURO - Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const safe = `<div>${escapeHtml(userInput)}</div>`;
// Mostra testo innocuo: <script>alert("HACKED!")</script>
```

---

## Template Literals nella Todo List App

### Esempio: createTodoElement()

```javascript
function createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    // Template literal per generare HTML
    div.innerHTML = `
        <input type="checkbox" 
               class="todo-checkbox" 
               ${todo.completed ? 'checked' : ''}>
        
        <div class="todo-content">
            <h3 class="todo-title">${escapeHtml(todo.title)}</h3>
            
            ${todo.description ? 
                `<p class="todo-description">${escapeHtml(todo.description)}</p>` 
                : ''
            }
            
            <small class="todo-date">${formatDate(todo.createdAt)}</small>
        </div>
        
        <div class="todo-actions">
            <button class="btn-delete">🗑️ Elimina</button>
        </div>
    `;
    
    return div;
}
```

**Analisi del codice:**

1. **Classe condizionale:**
   ```javascript
   className = `todo-item ${todo.completed ? 'completed' : ''}`
   // Se completed=true: "todo-item completed"
   // Se completed=false: "todo-item "
   ```

2. **Attributo condizionale:**
   ```javascript
   ${todo.completed ? 'checked' : ''}
   // Se true: aggiunge attributo "checked"
   // Se false: non aggiunge nulla
   ```

3. **Conditional rendering:**
   ```javascript
   ${todo.description ? `<p>...</p>` : ''}
   // Se description esiste: mostra <p>
   // Se description è vuota: non mostra nulla
   ```

4. **Escape per sicurezza:**
   ```javascript
   ${escapeHtml(todo.title)}
   // Previene attacchi XSS
   ```

5. **Chiamata a funzione:**
   ```javascript
   ${formatDate(todo.createdAt)}
   // Esegue funzione e inserisce risultato
   ```

---

## Tagged Templates (Avanzato)

I **tagged templates** permettono di processare template literals con funzioni personalizzate.

### Sintassi Base

```javascript
function myTag(strings, ...values) {
    console.log('Strings:', strings);
    console.log('Values:', values);
}

const name = "Mario";
const age = 25;

myTag`Hello ${name}, you are ${age} years old`;

// Output:
// Strings: ["Hello ", ", you are ", " years old"]
// Values: ["Mario", 25]
```

### Esempio: Highlight

```javascript
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i] ? `<strong>${values[i]}</strong>` : '';
        return result + str + value;
    }, '');
}

const name = "Mario";
const score = 95;

const message = highlight`Studente ${name} ha ottenuto ${score} punti!`;
console.log(message);
// Output: "Studente <strong>Mario</strong> ha ottenuto <strong>95</strong> punti!"
```

### Esempio: SQL Query Builder (Sicuro)

```javascript
function sql(strings, ...values) {
    // Escape valori per prevenire SQL injection
    const escaped = values.map(val => {
        if (typeof val === 'string') {
            return "'" + val.replace(/'/g, "''") + "'";
        }
        return val;
    });
    
    return strings.reduce((query, str, i) => {
        return query + str + (escaped[i] || '');
    }, '');
}

const username = "mario";
const userId = 123;

const query = sql`SELECT * FROM users WHERE name = ${username} AND id = ${userId}`;
console.log(query);
// Output: "SELECT * FROM users WHERE name = 'mario' AND id = 123"
```

---

## Best Practices

### ✅ DO - Buone Pratiche

**1. Usa template literals per stringhe con variabili**

```javascript
// ✅ CORRETTO - Leggibile
const message = `Ciao, ${name}!`;

// ❌ EVITA - Scomodo
const message = "Ciao, " + name + "!";
```

**2. Usa per HTML multi-linea**

```javascript
// ✅ CORRETTO
const html = `
  <div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
  </div>
`;

// ❌ SCOMODO
const html = "<div class=\"card\">" +
             "<h2>" + title + "</h2>" +
             "<p>" + description + "</p>" +
             "</div>";
```

**3. Escape dati utente**

```javascript
// ✅ SICURO
div.innerHTML = `<p>${escapeHtml(userInput)}</p>`;

// ❌ PERICOLOSO
div.innerHTML = `<p>${userInput}</p>`;
```

**4. Usa per debugging**

```javascript
// ✅ Comodo per log
console.log(`User ${user.id}: ${user.name} (${user.email})`);

// ✅ Debug oggetti
console.log(`Response: ${JSON.stringify(data, null, 2)}`);
```

---

### ❌ DON'T - Pratiche da Evitare

**1. Non usare per stringhe semplici**

```javascript
// ❌ Inutile - Nessuna interpolazione
const str = `Hello`;

// ✅ Usa virgolette normali
const str = "Hello";
```

**2. Non annidare troppo**

```javascript
// ❌ Difficile da leggere
const html = `<div>${items.map(i => `<span>${i.name}</span>`).join('')}</div>`;

// ✅ Separa logica
const spans = items.map(i => `<span>${i.name}</span>`).join('');
const html = `<div>${spans}</div>`;
```

**3. Non dimenticare escape con dati utente**

```javascript
// ❌ VULNERABILE
const html = `<div>${userComment}</div>`;

// ✅ SICURO
const html = `<div>${escapeHtml(userComment)}</div>`;
```

---

## Esempi Pratici

### Esempio 1: Messaggio di Benvenuto

```javascript
const user = {
    name: "Mario Rossi",
    lastLogin: new Date(),
    unreadMessages: 5
};

const welcome = `
  👋 Benvenuto, ${user.name}!
  
  📅 Ultimo accesso: ${user.lastLogin.toLocaleDateString('it-IT')}
  ${user.unreadMessages > 0 ? 
    `📬 Hai ${user.unreadMessages} messaggi non letti` : 
    '✅ Nessun nuovo messaggio'
  }
`;

console.log(welcome);
```

### Esempio 2: Tabella HTML

```javascript
const students = [
    { name: "Mario", grade: 85 },
    { name: "Luigi", grade: 92 },
    { name: "Peach", grade: 78 }
];

const table = `
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Voto</th>
        <th>Stato</th>
      </tr>
    </thead>
    <tbody>
      ${students.map(s => `
        <tr>
          <td>${s.name}</td>
          <td>${s.grade}</td>
          <td>${s.grade >= 60 ? '✅ Promosso' : '❌ Bocciato'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

document.body.innerHTML = table;
```

### Esempio 3: URL Builder

```javascript
function buildUrl(base, params) {
    const query = Object.entries(params)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');
    
    return `${base}?${query}`;
}

const url = buildUrl('https://api.example.com/search', {
    q: 'javascript tutorial',
    lang: 'it',
    page: 1
});

console.log(url);
// Output: "https://api.example.com/search?q=javascript%20tutorial&lang=it&page=1"
```

### Esempio 4: Error Message Builder

```javascript
function createErrorMessage(type, details) {
    const icons = {
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        success: '✅'
    };
    
    return `
      <div class="alert alert-${type}">
        ${icons[type]} <strong>${type.toUpperCase()}</strong>
        <p>${details}</p>
        <small>${new Date().toLocaleString('it-IT')}</small>
      </div>
    `;
}

const error = createErrorMessage('error', 'File non trovato');
const success = createErrorMessage('success', 'Operazione completata');
```

---

## 🎯 Conclusioni

I **Template Literals** sono uno strumento potentissimo che:

✅ Rendono il codice più leggibile  
✅ Semplificano la generazione di HTML  
✅ Facilitano l'interpolazione di variabili  
✅ Supportano espressioni complesse  
✅ Eliminano la concatenazione con `+`  

**Usali sempre quando possibile!**

---

## 📚 Risorse Aggiuntive

- [MDN - Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [JavaScript.info - Template Strings](https://javascript.info/string#template-strings)
- [ES6 Features](http://es6-features.org/#StringInterpolation)

---

**💡 Ricorda:** I template literals sono supportati da tutti i browser moderni (ES6+). Se devi supportare browser molto vecchi (IE11), usa Babel per transpilare il codice.
