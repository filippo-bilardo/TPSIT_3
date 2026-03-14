# 4. Validazione e Schema

## JSON Schema

JSON Schema è uno standard per descrivere e validare la struttura di documenti JSON.

### Esempio di JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "nome": {
      "type": "string",
      "minLength": 1
    },
    "età": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["nome", "email"]
}
```

### Vantaggi di JSON Schema

- Validazione automatica dei dati
- Documentazione della struttura attesa
- Generazione automatica di codice
- Supporto per validazioni complesse

## Validatori online

Strumenti online per validare JSON:

1. **JSONLint** (jsonlint.com)
   - Validatore semplice e veloce
   - Evidenzia errori di sintassi

2. **JSON Schema Validator** (www.jsonschemavalidator.net)
   - Validazione con JSON Schema
   - Visualizzazione errori dettagliata

3. **JSON Formatter** (jsonformatter.org)
   - Validazione e formattazione
   - Tree view per strutture complesse

## Strumenti per la validazione

### Librerie per linguaggi di programmazione

**JavaScript/Node.js:**
```javascript
const Ajv = require("ajv");
const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate(data);
```

**Python:**
```python
import jsonschema
from jsonschema import validate

validate(instance=data, schema=schema)
```

**Java:**
```java
JsonSchemaFactory factory = JsonSchemaFactory.getInstance(SpecVersion.VersionFlag.V7);
JsonSchema schema = factory.getSchema(schemaJson);
Set<ValidationMessage> errors = schema.validate(jsonNode);
```

## Gestione degli errori

### Errori comuni di sintassi

1. **Virgola mancante o extra**
   ```json
   // ERRATO
   {"a": 1 "b": 2}
   {"a": 1, "b": 2,}
   
   // CORRETTO
   {"a": 1, "b": 2}
   ```

2. **Apici sbagliati**
   ```json
   // ERRATO
   {'nome': 'Mario'}
   
   // CORRETTO
   {"nome": "Mario"}
   ```

3. **Valori non validi**
   ```json
   // ERRATO
   {"attivo": undefined}
   
   // CORRETTO
   {"attivo": null}
   ```

### Best practices per la validazione

- Validare sempre i dati in input
- Fornire messaggi di errore chiari
- Usare JSON Schema per API pubbliche
- Implementare validazione sia client-side che server-side
