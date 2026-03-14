# 5. JSON in JavaScript

## Metodi JSON.parse()

Converte una stringa JSON in un oggetto JavaScript.

### Sintassi base

```javascript
const jsonString = '{"nome": "Mario", "età": 30}';
const oggetto = JSON.parse(jsonString);

console.log(oggetto.nome); // Output: Mario
console.log(oggetto.età);  // Output: 30
```

### Con array

```javascript
const jsonArray = '[1, 2, 3, 4, 5]';
const array = JSON.parse(jsonArray);

console.log(array[0]); // Output: 1
```

### Reviver function

La funzione reviver permette di trasformare i valori durante il parsing:

```javascript
const jsonString = '{"data": "2024-01-15"}';
const oggetto = JSON.parse(jsonString, (key, value) => {
  if (key === "data") {
    return new Date(value);
  }
  return value;
});

console.log(oggetto.data instanceof Date); // true
```

## Metodi JSON.stringify()

Converte un oggetto JavaScript in una stringa JSON.

### Sintassi base

```javascript
const oggetto = {
  nome: "Mario",
  età: 30,
  città: "Roma"
};

const jsonString = JSON.stringify(oggetto);
console.log(jsonString);
// Output: {"nome":"Mario","età":30,"città":"Roma"}
```

### Formattazione leggibile

```javascript
const jsonString = JSON.stringify(oggetto, null, 2);
console.log(jsonString);
/* Output:
{
  "nome": "Mario",
  "età": 30,
  "città": "Roma"
}
*/
```

### Replacer function

```javascript
const oggetto = {
  nome: "Mario",
  password: "secret123",
  età: 30
};

const jsonString = JSON.stringify(oggetto, (key, value) => {
  if (key === "password") {
    return undefined; // Esclude il campo
  }
  return value;
});

console.log(jsonString);
// Output: {"nome":"Mario","età":30}
```

### Replacer array

```javascript
const jsonString = JSON.stringify(oggetto, ["nome", "età"]);
// Include solo i campi specificati
```

## Gestione delle eccezioni

### Try-catch per JSON.parse()

```javascript
try {
  const oggetto = JSON.parse('{"nome": non valido}');
} catch (error) {
  console.error("Errore di parsing:", error.message);
}
```

### Validazione prima del parsing

```javascript
function parseJSONSafe(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("JSON non valido:", error);
    return null;
  }
}
```

## Conversione da/verso oggetti JavaScript

### Limitazioni di JSON.stringify()

Alcuni valori JavaScript non sono serializzabili in JSON:

```javascript
const oggetto = {
  funzione: function() {},  // Viene ignorato
  simbolo: Symbol("sym"),   // Viene ignorato
  undefined: undefined,     // Viene ignorato
  data: new Date(),         // Convertito in stringa
  numero: NaN,              // Convertito in null
  infinito: Infinity        // Convertito in null
};

console.log(JSON.stringify(oggetto));
// Output: {"data":"2024-01-15T..."}
```

### Gestione di Date

```javascript
// Serializzazione
const obj = { data: new Date() };
const json = JSON.stringify(obj);

// Deserializzazione con reviver
const parsed = JSON.parse(json, (key, value) => {
  if (key === "data") return new Date(value);
  return value;
});
```

### Deep cloning con JSON

```javascript
const originale = { a: 1, b: { c: 2 } };
const clone = JSON.parse(JSON.stringify(originale));

// Attenzione: metodo semplice ma con limitazioni
// (perde funzioni, Date, ecc.)
```
