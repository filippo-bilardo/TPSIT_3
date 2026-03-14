# 8. Strumenti e risorse

## Editor JSON

### Online
1. **JSON Editor Online** (jsoneditoronline.org)
   - Editor visuale e testuale
   - Tree view e code view
   - Validazione in tempo reale
   - Import/export

2. **JSON Crack** (jsoncrack.com)
   - Visualizzazione grafica dei dati
   - Esplora strutture complesse
   - Download come immagine

3. **CodeBeautify JSON Editor** (codebeautify.org/jsonviewer)
   - Editor e viewer
   - Conversione in altri formati
   - Minificazione

### Desktop & IDE

1. **Visual Studio Code**
   - Syntax highlighting nativo
   - Validazione automatica
   - Formattazione (Shift+Alt+F)
   - Estensioni consigliate:
     - JSON Tools
     - Paste JSON as Code
     - JSON to TS

2. **JetBrains IDEs** (WebStorm, IntelliJ IDEA)
   - JSON Schema validation
   - Auto-completion
   - Refactoring

3. **Sublime Text**
   - Package: Pretty JSON
   - Syntax highlighting
   - Shortcuts per formattazione

## Formatter e validator online

### Formatter

1. **JSONLint** (jsonlint.com)
   - Validazione e formattazione
   - Interfaccia semplice
   - Messaggi di errore chiari

2. **JSON Formatter** (jsonformatter.org)
   - Formattazione
   - Minificazione
   - Conversione in CSV, XML

3. **Prettier Playground** (prettier.io/playground)
   - Formattazione configurabile
   - Preview in tempo reale

### Validator

1. **JSON Schema Validator** (www.jsonschemavalidator.net)
   - Validazione con schema
   - Test multipli
   - Errori dettagliati

2. **JSON Validator** (jsonvalidator.net)
   - Validazione sintattica
   - Comparazione JSON
   - API per validazione automatica

## Browser extensions

### Chrome/Edge

1. **JSON Formatter**
   - Formattazione automatica
   - Syntax highlighting
   - Collapsible nodes

2. **JSON Viewer**
   - Tree view
   - Ricerca
   - Export

3. **JSONView**
   - Rendering JSON in browser
   - Collegamenti cliccabili
   - Copia path

### Firefox

1. **JSON Lite**
   - Viewer leggero
   - Formattazione
   - Ricerca

2. **JSONovich**
   - Rendering nativo
   - Customizzabile

## Librerie e framework

### JavaScript/Node.js

```javascript
// Parsing e stringifying nativo
JSON.parse() / JSON.stringify()

// Librerie aggiuntive
const jp = require('jsonpath');           // Query JSON
const ajv = require('ajv');               // Validazione Schema
const jsonfile = require('jsonfile');     // Read/Write file
const flatted = require('flatted');       // Circular reference
```

### Python

```python
import json                    # Modulo standard
import jsonschema             # Validazione
import jsonpickle             # Oggetti complessi
from jsonpath_ng import parse # Query JSON
```

### Java

```java
// Jackson
import com.fasterxml.jackson.databind.ObjectMapper;

// Gson
import com.google.gson.Gson;

// JSON-P (Java EE)
import javax.json.Json;
```

### PHP

```php
json_encode()         // Serializzazione
json_decode()         // Deserializzazione
json_last_error()     // Gestione errori
```

## Tools da linea di comando

### jq (JSON processor)

```bash
# Pretty print
cat file.json | jq '.'

# Estrai campo
cat file.json | jq '.nome'

# Filtra array
cat file.json | jq '.utenti[] | select(.età > 18)'

# Mappa valori
cat file.json | jq '.utenti[].nome'
```

### jsonlint (Node.js)

```bash
# Installa
npm install -g jsonlint

# Valida file
jsonlint file.json

# Formatta
jsonlint -p file.json
```

### Python json.tool

```bash
# Formatta JSON
python -m json.tool input.json output.json

# Pretty print
cat file.json | python -m json.tool
```

## Convertitori

1. **JSON to CSV** (convertcsv.com/json-to-csv.htm)
2. **JSON to XML** (codebeautify.org/json-to-xml-converter)
3. **JSON to YAML** (www.json2yaml.com)
4. **JSON to TypeScript** (quicktype.io)
5. **JSON to Class** (json2csharp.com)

## API Testing Tools

1. **Postman**
   - Test API REST
   - Visualizzazione JSON
   - Collections

2. **Insomnia**
   - Client REST/GraphQL
   - Formattazione automatica
   - Variabili d'ambiente

3. **HTTPie**
   - Client da terminale
   - Syntax highlighting
   - JSON di default

```bash
# Esempio HTTPie
http POST https://api.esempio.com/utenti nome="Mario" età:=30
```

## Risorse per sviluppatori

- **JSON.org** - Specifiche ufficiali
- **RFC 7159** - Standard IETF
- **MDN Web Docs** - Documentazione JSON in JavaScript
- **JSON Schema** - json-schema.org
