# 3. Strutture dati complesse

## Oggetti annidati

Gli oggetti JSON possono contenere altri oggetti:

```json
{
  "persona": {
    "nome": "Mario",
    "cognome": "Rossi",
    "indirizzo": {
      "via": "Via Roma 1",
      "città": "Milano",
      "cap": "20100"
    }
  }
}
```

## Array di oggetti

Gli array possono contenere oggetti:

```json
{
  "studenti": [
    {
      "nome": "Mario",
      "età": 20,
      "voti": [28, 30, 27]
    },
    {
      "nome": "Luigi",
      "età": 22,
      "voti": [25, 26, 29]
    }
  ]
}
```

## Combinazioni di array e oggetti

Strutture complesse che combinano array e oggetti:

```json
{
  "azienda": "TechCorp",
  "dipendenti": [
    {
      "nome": "Anna",
      "ruolo": "Developer",
      "competenze": ["JavaScript", "Python", "SQL"]
    },
    {
      "nome": "Marco",
      "ruolo": "Designer",
      "competenze": ["Photoshop", "Figma", "CSS"]
    }
  ],
  "progetti": [
    {
      "titolo": "Progetto A",
      "team": ["Anna", "Marco"],
      "stato": "in corso"
    }
  ]
}
```

## Best practices per strutture complesse

1. **Mantenere la profondità gestibile**: evitare troppi livelli di annidamento
2. **Usare nomi significativi**: chiavi descrittive e coerenti
3. **Struttura coerente**: oggetti simili dovrebbero avere la stessa struttura
4. **Evitare ridondanze**: normalizzare i dati quando possibile
5. **Documentare la struttura**: utilizzare JSON Schema per definire la struttura

### Esempio di struttura ben organizzata

```json
{
  "corso": {
    "id": 101,
    "titolo": "Introduzione a JSON",
    "docente": {
      "id": 1,
      "nome": "Prof. Bianchi"
    },
    "moduli": [
      {
        "numero": 1,
        "titolo": "Sintassi base",
        "ore": 4
      },
      {
        "numero": 2,
        "titolo": "Strutture complesse",
        "ore": 6
      }
    ]
  }
}
```
