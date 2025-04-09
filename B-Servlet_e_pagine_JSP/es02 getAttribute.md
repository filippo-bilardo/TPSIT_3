Il metodo `getAttribute` è un metodo della classe `ServletContext`, ed è fondamentale quando vuoi **condividere informazioni tra diverse servlet** o tra diverse chiamate alla stessa servlet durante il ciclo di vita dell'applicazione web.

---

## 🔍 Sintassi:
```java
Object value = context.getAttribute("nomeVariabile");
```

---

## 📌 Cos'è `ServletContext`?

- È **l’oggetto che rappresenta il contesto dell’intera applicazione web**.
- Esiste **una sola istanza per tutta l’applicazione**.
- È creato **automaticamente** dal servlet container (es. Tomcat) quando l'applicazione viene avviata.

---

## 🔁 A cosa serve `getAttribute(String name)`?

- Serve per **recuperare un oggetto condiviso** che è stato precedentemente memorizzato tramite:
  ```java
  context.setAttribute("nomeVariabile", valore);
  ```

- Se il valore associato al nome esiste, lo restituisce; se **non esiste**, restituisce `null`.

---

## ✅ Esempio pratico — conteggio accessi:

```java
public void init(ServletConfig config) throws ServletException {
    super.init(config);
    ServletContext context = getServletContext();
    if (context.getAttribute("countx") == null) {
        context.setAttribute("countx", 1);
    }
}
```

Qui stai dicendo:

- “All’avvio, se **l’attributo `countx` non esiste** ancora, lo inizializzo a 1”.

Poi nel `doGet` puoi fare:
```java
ServletContext context = getServletContext();
int count = (int) context.getAttribute("countx");  // ← leggi il valore
count++;
context.setAttribute("countx", count);             // ← aggiorna il valore
```

---

## 🧠 Differenza con `request.getAttribute()` e `session.getAttribute()`

| Metodo | Ambito | Durata | Usato per |
|--------|--------|--------|-----------|
| `request.getAttribute()` | Solo per la **richiesta corrente** | Fino alla fine della request | Passaggio dati tra servlet durante un `forward()` |
| `session.getAttribute()` | Per uno **specifico utente** | Finché la sessione è attiva | Dati utente (es. login) |
| `context.getAttribute()` | Per **tutta l'applicazione** | Finché l'app è in esecuzione | Dati condivisi tra tutte le servlet |

---

## 🛠 Tipica applicazione di `context.getAttribute`:
- Conteggio accessi
- Cache condivisa
- Oggetti globali (es. connessioni a DB singleton)
- Impostazioni comuni all’applicazione
