# 2. Sintassi di base

## Struttura dei dati JSON

JSON è costruito su due strutture fondamentali:
1. **Oggetti**: collezioni di coppie chiave-valore
2. **Array**: liste ordinate di valori

## Tipi di dati supportati

JSON supporta sei tipi di dati:

1. **String (stringhe)**: testo racchiuso tra doppi apici
   ```json
   "Ciao mondo"
   ```

2. **Number (numeri)**: interi o decimali
   ```json
   42
   3.14
   ```

3. **Boolean (booleani)**: true o false
   ```json
   true
   false
   ```

4. **Null**: valore nullo
   ```json
   null
   ```

5. **Object (oggetti)**: racchiusi tra graffe {}
6. **Array**: racchiusi tra parentesi quadre []

## Oggetti JSON

```json
{
  "nome": "Mario",
  "cognome": "Rossi",
  "età": 30,
  "attivo": true
}
```

## Array JSON

```json
[
  "mela",
  "banana",
  "arancia"
]
```

```json
[1, 2, 3, 4, 5]
```

## Regole di formattazione

- Le chiavi devono essere stringhe racchiuse tra doppi apici
- I valori stringa devono usare doppi apici (non singoli)
- Non sono ammessi commenti
- Non sono ammesse virgole finali
- Caratteri speciali devono essere escaped (\n, \t, \\, \", ecc.)

## Case sensitivity

JSON è **case-sensitive**: `"Nome"` e `"nome"` sono chiavi diverse.

```json
{
  "Nome": "Mario",
  "nome": "Luigi"
}
```
