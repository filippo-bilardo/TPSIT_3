# Guida all'Utilizzo del Codespace TPSIT_3

Questo documento fornisce istruzioni dettagliate su come utilizzare e sfruttare al meglio l'ambiente di sviluppo Codespace configurato per il corso TPSIT_3.

## Caratteristiche dell'Ambiente

- **Java Development Kit (JDK)**: Versione 17 preinstallata
- **Apache Tomcat**: Versione 10.1.40 preconfigurata
- **Server VNC**: Accesso desktop remoto tramite VNC (porta 5901)
- **Ambiente Desktop**: XFCE4 leggero e funzionale
- **Estensioni VS Code**: Set completo di estensioni per sviluppo Java/JSP

## Accesso ai Servizi

Dopo l'avvio del Codespace, i seguenti servizi saranno disponibili:

1. **Apache Tomcat**: Accessibile su http://localhost:8080
   - Visualizzabile nella scheda "Porte" di VS Code
   - Utilizzabile per il deployment di applicazioni web Java

2. **Server VNC**: Accessibile sulla porta 5901
   - Visualizzabile nella scheda "Porte" di VS Code
   - Utilizzabile con qualsiasi client VNC (password predefinita: "password")
   - Per maggiore sicurezza, configura un secret GitHub chiamato `VNC_PASSWORD`

## Script di Utilità

Sono disponibili i seguenti script per semplificare le operazioni comuni:

- **~/restart-tomcat.sh**: Riavvia il server Tomcat
- **~/restart-vnc.sh**: Riavvia il server VNC

## Configurazione Sicura

### Impostare una Password VNC Sicura

1. Vai nelle impostazioni del repository su GitHub
2. Seleziona "Secrets and variables" → "Codespaces"
3. Crea un nuovo secret chiamato `VNC_PASSWORD`
4. Inserisci la password desiderata

Al prossimo avvio del Codespace, questa password verrà utilizzata automaticamente per il server VNC.

## Sviluppo di Applicazioni Web

### Deployment su Tomcat

1. Crea la tua applicazione web nella directory del progetto
2. Compila i file Java e crea la struttura WAR
3. Copia l'applicazione nella directory `${TOMCAT_HOME}/webapps/`
4. Accedi all'applicazione tramite http://localhost:8080/nome-applicazione

### Utilizzo dell'Ambiente Desktop VNC

1. Apri la porta 5901 dalla scheda "Porte" di VS Code
2. Connettiti con un client VNC usando l'URL fornito
3. Utilizza l'ambiente desktop XFCE4 per testare applicazioni con GUI

## Estensioni VS Code Incluse

- **Java Pack**: Supporto completo per sviluppo Java
- **Tomcat Connector**: Gestione server Tomcat
- **Live Server**: Server per sviluppo web
- **XML/YAML Support**: Supporto per file di configurazione
- **Git Tools**: Strumenti avanzati per gestione Git
- **Live Share**: Collaborazione in tempo reale

## Risoluzione Problemi

### Server VNC non si avvia

```bash
~/restart-vnc.sh
```

### Tomcat non risponde

```bash
~/restart-tomcat.sh
```

### Problemi di permessi

```bash
chmod +x ~/restart-vnc.sh ~/restart-tomcat.sh
```

## Personalizzazione Avanzata

Per personalizzare ulteriormente l'ambiente, puoi modificare i seguenti file:

- **.devcontainer/devcontainer.json**: Configurazione del container
- **.devcontainer/Dockerfile**: Definizione dell'immagine Docker
- **.devcontainer/post-start.sh**: Script eseguito all'avvio

---

Per ulteriori informazioni, consulta la [documentazione ufficiale di GitHub Codespaces](https://docs.github.com/en/codespaces).