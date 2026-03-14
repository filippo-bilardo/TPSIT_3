# 6. JSON in altri linguaggi

## Python (json module)

### Import del modulo

```python
import json
```

### Parsing JSON (deserializzazione)

```python
# Da stringa a oggetto Python
json_string = '{"nome": "Mario", "età": 30}'
dati = json.loads(json_string)

print(dati["nome"])  # Output: Mario

# Da file
with open('dati.json', 'r') as file:
    dati = json.load(file)
```

### Creazione JSON (serializzazione)

```python
# Da oggetto Python a stringa
dati = {
    "nome": "Mario",
    "età": 30,
    "attivo": True
}

json_string = json.dumps(dati)
print(json_string)

# Con indentazione
json_string = json.dumps(dati, indent=2)

# Su file
with open('output.json', 'w') as file:
    json.dump(dati, file, indent=2)
```

### Gestione tipi Python

```python
import json
from datetime import datetime

# Custom encoder
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

dati = {"data": datetime.now()}
json_string = json.dumps(dati, cls=DateEncoder)
```

## Java (Jackson, Gson)

### Jackson

```java
import com.fasterxml.jackson.databind.ObjectMapper;

// Parsing JSON
ObjectMapper mapper = new ObjectMapper();
String jsonString = "{\"nome\":\"Mario\",\"età\":30}";
Persona persona = mapper.readValue(jsonString, Persona.class);

// Creazione JSON
Persona persona = new Persona("Mario", 30);
String json = mapper.writeValueAsString(persona);

// Con formattazione
String jsonFormatted = mapper.writerWithDefaultPrettyPrinter()
                             .writeValueAsString(persona);
```

### Gson

```java
import com.google.gson.Gson;

// Parsing JSON
Gson gson = new Gson();
String jsonString = "{\"nome\":\"Mario\",\"età\":30}";
Persona persona = gson.fromJson(jsonString, Persona.class);

// Creazione JSON
Persona persona = new Persona("Mario", 30);
String json = gson.toJson(persona);

// Con formattazione
Gson gsonPretty = new GsonBuilder().setPrettyPrinting().create();
String jsonFormatted = gsonPretty.toJson(persona);
```

## PHP

### Parsing JSON

```php
<?php
$json_string = '{"nome": "Mario", "età": 30}';
$dati = json_decode($json_string, true); // true per array associativo

echo $dati['nome']; // Output: Mario

// Come oggetto
$obj = json_decode($json_string);
echo $obj->nome; // Output: Mario
?>
```

### Creazione JSON

```php
<?php
$dati = array(
    "nome" => "Mario",
    "età" => 30,
    "attivo" => true
);

$json_string = json_encode($dati);
echo $json_string;

// Con formattazione
$json_formatted = json_encode($dati, JSON_PRETTY_PRINT);

// Gestione caratteri Unicode
$json_unicode = json_encode($dati, JSON_UNESCAPED_UNICODE);
?>
```

### Gestione errori

```php
<?php
$json_string = '{"nome": non valido}';
$dati = json_decode($json_string);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo "Errore: " . json_last_error_msg();
}
?>
```

## C#

### System.Text.Json (moderno, incluso in .NET)

```csharp
using System.Text.Json;

// Parsing JSON
string jsonString = "{\"nome\":\"Mario\",\"età\":30}";
Persona persona = JsonSerializer.Deserialize<Persona>(jsonString);

// Creazione JSON
Persona persona = new Persona { Nome = "Mario", Età = 30 };
string json = JsonSerializer.Serialize(persona);

// Con formattazione
var options = new JsonSerializerOptions { WriteIndented = true };
string jsonFormatted = JsonSerializer.Serialize(persona, options);
```

### Newtonsoft.Json (Json.NET)

```csharp
using Newtonsoft.Json;

// Parsing JSON
string jsonString = "{\"nome\":\"Mario\",\"età\":30}";
Persona persona = JsonConvert.DeserializeObject<Persona>(jsonString);

// Creazione JSON
Persona persona = new Persona { Nome = "Mario", Età = 30 };
string json = JsonConvert.SerializeObject(persona);

// Con formattazione
string jsonFormatted = JsonConvert.SerializeObject(persona, Formatting.Indented);
```

### Gestione proprietà

```csharp
using System.Text.Json.Serialization;

public class Persona
{
    [JsonPropertyName("nome")]
    public string Nome { get; set; }
    
    [JsonPropertyName("età")]
    public int Età { get; set; }
    
    [JsonIgnore]
    public string Password { get; set; } // Escluso dalla serializzazione
}
```
