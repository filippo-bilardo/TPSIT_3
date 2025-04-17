# Il Linguaggio XML

## Introduzione a XML

- **XML (eXtensible Markup Language)** è un metalinguaggio di markup che aiuta a definire altri linguaggi di markup.
- Non ha tag predefiniti, ma una sintassi specifica per rappresentare strutture di dati e documenti.
- Le specifiche di XML sono definite dal W3C (World Wide Web Consortium).
- È utilizzato in vari contesti grazie alla sua flessibilità e compatibilità con diversi dispositivi hardware e software.

## Caratteristiche di XML

- **Separazione dei dati dalla loro rappresentazione**: XML consente di separare i dati dalla loro visualizzazione.
- **Regole comuni per contesti diversi**: Utilizza un insieme di regole comuni per vari contesti.
- **Tag identificativi**: I tag identificano immediatamente il tipo di dato, come `<nome>`.
- **Compatibilità con HTML**: Può essere associato a file HTML per rendere la rappresentazione indipendente dai dati.
- **Interoperabilità**: Può rendere compatibili tra loro formati dati di diversi database.

---

# Struttura di un Documento XML

## Prologo e Corpo

Un documento XML è composto da un prologo e un corpo. Ha una struttura gerarchica ad albero, simile all'HTML.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
    <book category="cooking">
        <title lang="en">Everyday Italian</title>
        <author>Giada De Laurentiis</author>
        <year>2005</year>
        <price>30.00</price>
    </book>
    <book category="children">
        <title lang="en">Harry Potter</title>
        <author>J.K. Rowling</author>
        <year>2005</year>
        <price>29.88</price>
    </book>
</bookstore>
```

## Esempio di Gerarchia

```
Root element: <bookstore>
    Parent: <book>
        Element: <title>
        Element: <author>
        Element: <year>
        Element: <price>
```

---

# Regole Sintattiche e Semantiche

## Documenti Well-Formed e Valid

- **Well-Formed**: Rispetta le regole sintattiche.
- **Valid**: Rispetta sia le regole sintattiche che quelle semantiche.

### Regole Sintattiche

- Dichiarazione corretta.
- Un unico elemento radice.
- Ogni elemento deve avere un tag di apertura e chiusura.
- Nidificazione corretta dei tag.
- XML è case-sensitive.
- I nomi dei tag non possono iniziare con underscore o numero e non devono avere spazi.
- I valori degli attributi devono essere chiusi tra virgolette.

---

# DTD (Document Type Definition)

## Validazione di XML

- **DTD**: Linguaggio più utilizzato per descrivere XML 1.0.
- Fornisce uno strumento per la validazione dei documenti XML.
- Definisce gli elementi e gli attributi del documento XML.
- Non può imporre vincoli sul tipo di contenuto.

### Esempio di DTD

```xml
<!DOCTYPE posta SYSTEM "posta.dtd">
<posta>
    <messaggio>
        <mittente>Romeo</mittente>
        <destinatario>Giulietta</destinatario>
        <intestazione>Appuntamento</intestazione>
        <testo>Ricordati che stasera verrò sotto il tuo balcone!</testo>
    </messaggio>
</posta>
```

---

# XPath (XML Path Language)

## Estrazione di Nodi

- **XPath**: Linguaggio specifico per estrarre particolari nodi di informazioni all'interno di un documento XML.
- Consente di navigare nella struttura ad albero di XML.
- Utilizzato in XQuery, XSLT, e W3C XML Schema.

### Esempio di XPath

```xml
//bookstore/book/title
```

---

# JSON (JavaScript Object Notation)

## Introduzione a JSON

- **JSON**: Formato di file semplice utilizzato per immagazzinare e scambiare informazioni tra applicazioni.
- Più leggero di XML e privo di schemi.
- Utilizzato in molti linguaggi di programmazione e database.

### Esempio di JSON

```json
{
    "name": "John Doe",
    "age": 30,
    "email": "johndoe@example.com"
}
```

---

# Confronto tra XML e JSON

## Differenze Principali

- **XML**: Più verboso, con una struttura gerarchica esplicita.
- **JSON**: Più leggero e facile da leggere, basato su coppie chiave-valore.
- **Utilizzo**: XML è spesso usato per documenti complessi, mentre JSON è preferito per lo scambio di dati tra applicazioni web.

---

Certo, continuerò a riorganizzare e semplificare il contenuto delle pagine successive:

---

# Il Linguaggio XML

## Esempio di Creazione di un Elemento di Rubrica

```xml
<?xml version="1.0" encoding="UTF-8"?>
<RUBRICA>
    <PERSONA qualifica="operaio">
        <NOME>Paolo</NOME>
        <COGNOME>Rossi</COGNOME>
        <QUALIFICA>Operaio</QUALIFICA>
    </PERSONA>
    <PERSONA>
        <NOME>Mario Bianchi</NOME>
        <COGNOME>Rossi</COGNOME>
    </PERSONA>
</RUBRICA>
```

---

# Il Linguaggio XML

## Aggiunta di un Campo Data in un Messaggio

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<messaggio>
    <data>2017-07-12</data>
    <mittente>Mario</mittente>
    <destinatario>Maria</destinatario>
    <oggetto>promemoria</oggetto>
    <testo>Ricordati che siamo d'accordo di vederci venerdì sera</testo>
</messaggio>
```

---

# Il Linguaggio XML

## Spazio dei Nomi (Namespace)

- **Namespace**: Utilizzato per distinguere nomi di tag uguali con significati diversi.
- **URI (Uniform Resource Identifier)**: Utilizzato come prefisso per identificare lo spazio dei nomi.

### Esempio di Namespace

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<ib:libro xmlns:lb="mioSito.com/libri">
    <ib:titolo>Libro di informatica</ib:titolo>
    <ca:capitolo xmlns:ca="mioSito.com/capitoli">
        <ca:titolo>Documento in stile XML</ca:titolo>
        <ca:testo>testo testo testo</ca:testo>
    </ca:capitolo>
</ib:libro>
```

---

# Il Linguaggio XML

## Esempio con XML Notepad

```xml
<?xml version="1.0" encoding="utf-8"?>
<biblioteca>
    <libro>
        <titolo>Libro di esempio 1</titolo>
        <autore>John Doe</autore>
        <anno_pubblicazione>2023</anno_pubblicazione>
    </libro>
    <libro>
        <titolo>Libro di esempio 2</titolo>
        <autore>Jane Smith</autore>
        <anno_pubblicazione>2022</anno_pubblicazione>
    </libro>
</biblioteca>
```

---

# Il Linguaggio XML

## Validazione con DTD

- **DTD**: Document Type Definition, utilizzato per validare i documenti XML.
- **Vincoli**: Definisce gli elementi e gli attributi, ma non il tipo di contenuto.

### Esempio di DTD

```xml
<!ELEMENT posta (messaggio)*>
<!ELEMENT messaggio (mittente, destinatario, intestazione, testo)>
<!ELEMENT mittente (#PCDATA)>
<!ELEMENT destinatario (#PCDATA)>
<!ELEMENT intestazione (#PCDATA)>
<!ELEMENT testo (#PCDATA)>
```

---

# Il Linguaggio XML

## XPath: Elementi e Assi

- **XPath**: Utilizzato per navigare e selezionare nodi in un documento XML.
- **Assi**: Definiscono la direzione di ricerca rispetto al nodo corrente.

### Esempi di Assi

- `child`: Nodi discendenti.
- `parent`: Nodo genitore.
- `descendant`: Tutti i nodi discendenti.
- `ancestor`: Tutti i nodi ascendenti.

---

# Il Linguaggio XML

## Parsing XML con Java

- **JAXP (Java API for XML Processing)**: Utilizzato per il parsing di XML in Java.
- **Approcci**: SAX (Simple API for XML) e DOM (Document Object Model).

### Esempio di Parsing SAX

```java
public class StudentiSAXParser extends DefaultHandler {
    // Metodi per gestire gli eventi di parsing
}
```

---

# Il Linguaggio XML

## Parsing DOM

- **DOM**: Carica l'intero documento XML in memoria.
- **Vantaggi**: Permette di modificare il documento.
- **Svantaggi**: Richiede più memoria.

### Esempio di Parsing DOM

```java
public class StudentDOMParser {
    public static void main(String[] args) {
        // Codice per il parsing DOM
    }
}
```

---

# Il Formato JSON

## Introduzione a JSON

- **JSON**: JavaScript Object Notation, utilizzato per lo scambio di dati.
- **Struttura**: Coppie chiave-valore e array.
- **Utilizzo**: Facile da leggere e scrivere, supportato da molti linguaggi.

### Esempio di JSON

```json
{
    "name": "John",
    "age": 30,
    "city": "New York"
}
```

---

# Il Formato JSON

## JSON e Java

- **Librerie JSON**: Permettono di manipolare i file JSON in Java.
- **Esempio di Libreria**: `json-simple`.

### Esempio di Creazione di un Oggetto JSON

```java
JSONObject mioOggetto = new JSONObject();
mioOggetto.put("cognome", "Verdi");
mioOggetto.put("nome", "Pino");
mioOggetto.put("eta", 40);
```

---

# Il Formato JSON

## JSON e PHP

- **Funzioni JSON in PHP**: `json_encode()` e `json_decode()`.
- **Utilizzo**: Converte tra oggetti PHP e stringhe JSON.

### Esempio di Conversione

```php
<?php
$vettore = array("sequenza", "selezione", "iterazione");
$stringa = json_encode($vettore);
echo $stringa;
?>
```

   