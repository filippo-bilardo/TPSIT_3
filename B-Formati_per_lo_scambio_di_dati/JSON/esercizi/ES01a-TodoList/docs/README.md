# 📚 Documentazione ES01-TodoList

Questa cartella contiene guide teoriche di supporto per l'esercitazione ES01-TodoList.

---

## 📖 Guide Disponibili

### 1. [localStorage - Guida Completa](localStorage-guida.md)
**Argomento:** Web Storage API, localStorage  
**Dimensione:** ~24 KB  
**Livello:** Principiante → Intermedio

**Contenuti:**
- Introduzione a localStorage
- API e metodi (setItem, getItem, removeItem, clear)
- Esempi pratici
- localStorage vs sessionStorage vs Cookies
- Limitazioni e capacità
- Best Practices
- Sicurezza (XSS, sanitizzazione)
- JSON e localStorage
- Casi d'uso comuni
- Debugging e testing

**Quando leggerla:** Prima di implementare la persistenza dati nella TodoList.

---

### 2. [Operazioni CRUD - Guida Completa](guida-crud.md)
**Argomento:** Create, Read, Update, Delete  
**Dimensione:** ~5.5 KB  
**Livello:** Principiante

**Contenuti:**
- Cosa significa CRUD
- CRUD con Array JavaScript
  - CREATE: push(), unshift()
  - READ: find(), filter(), getAll()
  - UPDATE: Object.assign(), spread operator
  - DELETE: filter(), splice()
- CRUD con localStorage
- Pattern CRUD riusabile (classe)
- Best Practices
- Esempi pratici (Todo List, Contatti)

**Quando leggerla:** Prima di implementare le funzioni addTodo, deleteTodo, toggleTodo, updateTodo.

---

### 3. [Template Literals - Guida Completa](guida-template-literals.md)
**Argomento:** Template Strings (ES6)  
**Dimensione:** ~15.6 KB  
**Livello:** Principiante → Intermedio

**Contenuti:**
- Sintassi base (backtick \`)
- Interpolazione di variabili ${...}
- Espressioni JavaScript
- Stringhe multilinea
- Generazione HTML dinamico
- Conditional rendering
- Escape HTML (sicurezza XSS)
- Tagged templates (avanzato)
- Best Practices
- Esempi pratici per Todo List

**Quando leggerla:** Prima di implementare createTodoElement() e generazione HTML dinamica.

---

## 🎯 Percorso di Studio Consigliato

### Per Principianti

1. **Inizia con:** [guida-crud.md](guida-crud.md)
   - Comprendi le operazioni base per gestire dati
   - Sperimenta con array JavaScript

2. **Poi studia:** [guida-template-literals.md](guida-template-literals.md)
   - Impara a generare HTML dinamicamente
   - Pratica con esempi semplici

3. **Infine approfondisci:** [localStorage-guida.md](localStorage-guida.md)
   - Implementa la persistenza dati
   - Completa l'esercitazione

### Per Studenti Intermedi

1. **Ripassa velocemente:** CRUD e Template Literals
2. **Concentrati su:** localStorage e pattern avanzati
3. **Sperimenta con:** Funzionalità extra (modifica task, statistiche, ricerca)

---

## 💡 Come Usare Queste Guide

### Durante l'Esercitazione

- **Step 1-2 (HTML/CSS):** Non servono guide (usa template forniti)
- **Step 3 (JavaScript):** Leggi tutte e tre le guide
- **Durante implementazione:** Consulta le guide come reference

### Per il Ripasso

- Ogni guida è autoconsistente
- Usa l'indice per trovare argomenti specifici
- Gli esempi sono copiabili e testabili

### Per l'Approfondimento

- Segui i link alle risorse esterne (MDN, JavaScript.info)
- Sperimenta con le varianti degli esempi
- Implementa le funzionalità opzionali suggerite

---

## 📊 Mappa Concettuale

```
ES01-TodoList
    │
    ├─ DATI (Array di oggetti)
    │   └─ CRUD operations ← [guida-crud.md]
    │       ├─ Create (addTodo)
    │       ├─ Read (getTodos, getById)
    │       ├─ Update (updateTodo, toggleTodo)
    │       └─ Delete (deleteTodo)
    │
    ├─ PERSISTENZA (Browser storage)
    │   └─ localStorage ← [localStorage-guida.md]
    │       ├─ setItem (salvare)
    │       ├─ getItem (caricare)
    │       └─ JSON.stringify/parse
    │
    └─ INTERFACCIA (HTML dinamico)
        └─ Template Literals ← [guida-template-literals.md]
            ├─ Interpolazione ${var}
            ├─ HTML multilinea
            ├─ Conditional rendering
            └─ Escape HTML (sicurezza)
```

---

## 🔗 Collegamenti Rapidi

### Concetti Chiave

| Concetto | Dove trovarlo |
|----------|---------------|
| Come salvare dati nel browser | [localStorage-guida.md](localStorage-guida.md#api-e-metodi) |
| Come creare/modificare dati | [guida-crud.md](guida-crud.md#crud-con-array-javascript) |
| Come generare HTML dinamico | [guida-template-literals.md](guida-template-literals.md#generazione-html-dinamico) |
| Sicurezza XSS | [localStorage-guida.md](localStorage-guida.md#sicurezza) + [guida-template-literals.md](guida-template-literals.md#escape-html-sicurezza) |
| Pattern riusabili | [guida-crud.md](guida-crud.md#crud-pattern-completo) |
| Best practices | Tutte le guide hanno sezione dedicata |

### Metodi JavaScript Importanti

| Metodo | Scopo | Guida |
|--------|-------|-------|
| `JSON.stringify()` | Oggetto → Stringa JSON | localStorage-guida |
| `JSON.parse()` | Stringa JSON → Oggetto | localStorage-guida |
| `array.push()` | Aggiungi elemento | guida-crud |
| `array.find()` | Trova elemento | guida-crud |
| `array.filter()` | Filtra array | guida-crud |
| Template literals (\`) | Stringhe dinamiche | guida-template-literals |

---

## 📝 Note

- Tutte le guide sono in **italiano**
- Gli esempi sono **testabili** direttamente nella console del browser
- Il codice è **compatibile ES6+** (browser moderni)
- Ogni guida include sezione **Best Practices**

---

## 🆘 Supporto

Se hai dubbi dopo aver letto le guide:

1. **Rileggi** la sezione specifica
2. **Testa** gli esempi nella console (F12)
3. **Consulta** il README.md principale dell'esercitazione
4. **Chiedi** al docente durante le ore di laboratorio

---

## 📚 Risorse Esterne Consigliate

### Documentazione Ufficiale
- [MDN Web Docs](https://developer.mozilla.org/) - Reference completo JavaScript
- [JavaScript.info](https://javascript.info/) - Tutorial moderno e dettagliato

### Tools
- [Console del Browser](https://developer.chrome.com/docs/devtools/console/) - Per testare codice
- [JSONLint](https://jsonlint.com/) - Validatore JSON online

---

**Buono studio!** 🚀
