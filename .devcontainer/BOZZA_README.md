# Guida per configurare Tomcat con VNC su GitHub Codespaces

Questa guida ti mostrerà come configurare un ambiente di sviluppo completo su GitHub Codespaces che include sia Apache Tomcat che un server VNC per l'accesso al desktop remoto. Questo approccio ti permetterà di sviluppare, testare e visualizzare applicazioni web Java in un ambiente cloud completamente accessibile dal browser.

## Indice
1. Creazione del repository e configurazione di base
2. Configurazione del devcontainer per Tomcat
3. Installazione e configurazione del server VNC
4. Avvio e test dell'ambiente
5. Best practices e suggerimenti avanzati

## 1. Creazione del repository e configurazione di base
Iniziamo creando un nuovo repository e configurando la struttura di base:

1. Accedi al tuo account GitHub e crea un nuovo repository
2. Clona il repository in locale o inizializzalo direttamente su GitHub
3. Crea una cartella `.devcontainer` nella root del repository
4. All'interno di questa cartella, creiamo due file fondamentali:
   - `devcontainer.json`: per configurare l'ambiente Codespaces
   - `Dockerfile`: per definire l'immagine Docker personalizzata

Vediamo come strutturare questi file:

### File devcontainer.json

```json
{
  "name": "Tomcat VNC Development Environment",
  "build": {
    "dockerfile": "Dockerfile",
    "args": {
      "TOMCAT_VERSION": "9.0.73",
      "JAVA_VERSION": "11"
    }
  },
  "forwardPorts": [8080, 5901, 6080],
  "portsAttributes": {
    "8080": {
      "label": "Tomcat",
      "onAutoForward": "notify"
    },
    "5901": {
      "label": "VNC Server",
      "onAutoForward": "silent"
    },
    "6080": {
      "label": "noVNC Web Client",
      "onAutoForward": "openBrowser"
    }
  },
  "features": {
    "ghcr.io/devcontainers/features/java:1": {
      "version": "11",
      "installMaven": true,
      "mavenVersion": "3.8.6"
    },
    "ghcr.io/devcontainers/features/git:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "vscjava.vscode-java-pack",
        "redhat.vscode-xml",
        "adashen.vscode-tomcat"
      ],
      "settings": {
        "java.server.launchMode": "Standard",
        "java.configuration.updateBuildConfiguration": "automatic"
      }
    }
  },
  "remoteUser": "vscode",
  "postCreateCommand": "bash ./.devcontainer/setup.sh"
}

```

### File Dockerfile

```dockerfile
FROM mcr.microsoft.com/devcontainers/base:ubuntu

ARG TOMCAT_VERSION=9.0.73
ARG JAVA_VERSION=11
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Installazione dei pacchetti necessari
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    wget \
    unzip \
    xfce4 \
    xfce4-terminal \
    tigervnc-standalone-server \
    tigervnc-common \
    novnc \
    net-tools \
    websockify \
    firefox \
    dbus-x11 \
    libnotify4 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Configurazione Tomcat
RUN mkdir -p /opt/tomcat \
    && wget -q https://dlcdn.apache.org/tomcat/tomcat-9/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz -P /tmp \
    && tar -xf /tmp/apache-tomcat-${TOMCAT_VERSION}.tar.gz -C /opt/tomcat --strip-components=1 \
    && rm -f /tmp/apache-tomcat-${TOMCAT_VERSION}.tar.gz \
    && chmod +x /opt/tomcat/bin/*.sh

# Configurazione dell'ambiente
ENV CATALINA_HOME=/opt/tomcat
ENV PATH=$CATALINA_HOME/bin:$PATH
ENV DISPLAY=:1

# Configurazione VNC
RUN mkdir -p /home/${USERNAME}/.vnc
COPY vnc-config/xstartup /home/${USERNAME}/.vnc/xstartup
COPY vnc-config/config /home/${USERNAME}/.vnc/config
RUN chmod +x /home/${USERNAME}/.vnc/xstartup \
    && chown -R ${USERNAME}:${USERNAME} /home/${USERNAME}/.vnc

# Configurazione noVNC
RUN mkdir -p /usr/share/novnc/utils \
    && ln -s /usr/share/novnc/vnc.html /usr/share/novnc/index.html \
    && chown -R ${USERNAME}:${USERNAME} /opt/tomcat

USER ${USERNAME}

```

## 2. Configurazione aggiuntiva per Tomcat e VNC

Ora dobbiamo creare alcuni file di configurazione aggiuntivi:

1. Crea una directory `.devcontainer/vnc-config/`
2. Aggiungi i seguenti file:

### File xstartup

```bash
#!/bin/bash
export XKL_XMODMAP_DISABLE=1
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

# Avvio del desktop environment Xfce
startxfce4 &

# Configurazione di Firefox per sviluppo
if [ ! -d "$HOME/.mozilla" ]; then
  mkdir -p $HOME/.mozilla/firefox/default
  echo 'user_pref("network.websocket.allowInsecureFromHTTPS", true);' > $HOME/.mozilla/firefox/default/prefs.js
fi

# Crea un collegamento a Tomcat sul desktop
if [ ! -f "$HOME/Desktop/tomcat.desktop" ]; then
  mkdir -p $HOME/Desktop
  cat > $HOME/Desktop/tomcat.desktop << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=Tomcat Web App
Comment=Open Tomcat in Browser
Exec=firefox http://localhost:8080
Icon=web-browser
Terminal=false
StartupNotify=true
EOF
  chmod +x $HOME/Desktop/tomcat.desktop
fi

```

### File config

```text
geometry=1280x800
dpi=96

```

### Script di setup

```bash
#!/bin/bash

# Imposta la password VNC in modo sicuro (puoi cambiarla)
echo "vncpassword" | vncpasswd -f > $HOME/.vnc/passwd
chmod 600 $HOME/.vnc/passwd

# Crea script di avvio per VNC e noVNC
cat > $HOME/start-vnc.sh << 'EOF'
#!/bin/bash
vncserver -kill :1 > /dev/null 2>&1 || true
vncserver :1 -depth 24 -geometry 1280x800
websockify -D --web=/usr/share/novnc 6080 localhost:5901
echo "VNC server avviato sulla porta 5901 (diretto) e 6080 (web)"
echo "Per accedere via web: http://localhost:6080/vnc.html"
EOF

chmod +x $HOME/start-vnc.sh

# Crea uno script per avviare Tomcat
cat > $HOME/start-tomcat.sh << 'EOF'
#!/bin/bash
$CATALINA_HOME/bin/shutdown.sh > /dev/null 2>&1 || true
$CATALINA_HOME/bin/startup.sh
echo "Server Tomcat avviato sulla porta 8080"
echo "Per accedere all'applicazione: http://localhost:8080"
EOF

chmod +x $HOME/start-tomcat.sh

# Crea uno script che avvia tutto insieme
cat > $HOME/start-environment.sh << 'EOF'
#!/bin/bash
$HOME/start-vnc.sh
$HOME/start-tomcat.sh
EOF

chmod +x $HOME/start-environment.sh

# Avvia automaticamente alla creazione del container
$HOME/start-environment.sh

# Crea una semplice app web di test
mkdir -p $CATALINA_HOME/webapps/example
cat > $CATALINA_HOME/webapps/example/index.jsp << 'EOF'
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Tomcat con VNC su Codespaces</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #4CAF50; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .info { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #17a2b8; margin-bottom: 20px; }
        code { background-color: #f0f0f0; padding: 2px 5px; border-radius: 3px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Applicazione Tomcat di Test</h1>
        
        <div class="info">
            <p><strong>Data e ora del server:</strong> <%= new java.util.Date() %></p>
            <p><strong>Server Info:</strong> <%= application.getServerInfo() %></p>
            <p><strong>JVM Version:</strong> <%= System.getProperty("java.version") %></p>
        </div>
        
        <h2>Ambienti disponibili:</h2>
        <ul>
            <li>Tomcat: <a href="http://localhost:8080" target="_blank">http://localhost:8080</a></li>
            <li>VNC (web): <a href="http://localhost:6080/vnc.html" target="_blank">http://localhost:6080/vnc.html</a></li>
        </ul>
        
        <h2>Info di sistema:</h2>
        <code>
            <%= System.getProperties() %>
        </code>
    </div>
</body>
</html>
EOF

# Crea un file web.xml di base
mkdir -p $CATALINA_HOME/webapps/example/WEB-INF
cat > $CATALINA_HOME/webapps/example/WEB-INF/web.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <display-name>Tomcat VNC Example</display-name>
    <welcome-file-list>
        <welcome-file>index.jsp</welcome-file>
    </welcome-file-list>
</web-app>
EOF

echo "Setup completato! L'ambiente è pronto."

```

## 3. Utilizzo dell'ambiente

Una volta configurato il repository, ecco come utilizzare l'ambiente:

1. Apri il repository su GitHub
2. Clicca sul pulsante "Code" e seleziona "Open with Codespaces"
3. Crea un nuovo codespace basato sulla configurazione

Quando il codespace è avviato:

1. Apri il terminale in VS Code
2. Se l'ambiente non è già stato avviato, esegui: `~/start-environment.sh`
3. Per accedere a Tomcat: apri il browser e vai a `localhost:8080`
4. Per accedere al desktop VNC via browser: apri `localhost:6080/vnc.html` (la password è "vncpassword")

## 4. Best Practices e Suggerimenti Avanzati

### Sicurezza

- Cambia la password VNC predefinita ("vncpassword") nel file `setup.sh`
- Limita i permessi dei file di configurazione con `chmod`
- Usa variabili d'ambiente per informazioni sensibili invece di memorizzarle nel codice

### Ottimizzazione delle Prestazioni

- Regola le impostazioni di memoria di Tomcat aggiungendo queste linee a `setup.sh`:

```bash
# Ottimizzazione memoria Tomcat
echo 'export CATALINA_OPTS="-Xms256m -Xmx512m"' >> ~/.bashrc
```

- Regola la risoluzione VNC nel file di configurazione per bilanciare qualità visiva e prestazioni

### Sviluppo Avanzato

Per facilitare lo sviluppo di applicazioni Java EE, aggiungi questa struttura al tuo repository:

```
/
├── .devcontainer/       # Configurazione dell'ambiente
├── src/                 # Codice sorgente Java
│   └── main/
│       ├── java/        # Classi Java
│       ├── resources/   # File di configurazione
│       └── webapp/      # File web (HTML, JSP, ecc.)
└── pom.xml              # Configurazione Maven
```

## 5. Automazione del Deployment

Puoi automatizzare il deployment della tua applicazione su Tomcat con questo script:

```bash
#!/bin/bash

# Controlla se è stato specificato un file WAR
if [ $# -ne 1 ]; then
    echo "Utilizzo: $0 <percorso-del-file-war>"
    exit 1
fi

WAR_FILE=$1

# Controlla se il file esiste
if [ ! -f "$WAR_FILE" ]; then
    echo "Errore: Il file $WAR_FILE non esiste"
    exit 1
fi

# Ottieni il nome dell'applicazione dal nome del file WAR
APP_NAME=$(basename "$WAR_FILE" .war)

# Ferma Tomcat se è in esecuzione
$CATALINA_HOME/bin/shutdown.sh 2>/dev/null

# Attendi che Tomcat si fermi
echo "Attesa arresto Tomcat..."
sleep 5

# Rimuovi la vecchia applicazione se esiste
if [ -d "$CATALINA_HOME/webapps/$APP_NAME" ]; then
    echo "Rimozione della versione precedente dell'applicazione..."
    rm -rf "$CATALINA_HOME/webapps/$APP_NAME"
fi
if [ -f "$CATALINA_HOME/webapps/$APP_NAME.war" ]; then
    rm -f "$CATALINA_HOME/webapps/$APP_NAME.war"
fi

# Copia il nuovo file WAR
echo "Installazione della nuova versione dell'applicazione..."
cp "$WAR_FILE" "$CATALINA_HOME/webapps/"

# Avvia Tomcat
echo "Riavvio di Tomcat..."
$CATALINA_HOME/bin/startup.sh

# Attendi che l'applicazione sia dispiegata
echo "Attesa per il deployment dell'applicazione..."
while [ ! -d "$CATALINA_HOME/webapps/$APP_NAME" ]; do
    sleep 1
done

echo "Deployment completato! L'applicazione è disponibile all'indirizzo: http://localhost:8080/$APP_NAME"

```

## Domande di Autovalutazione

1. Quale comando avvia sia il server VNC che Tomcat in un unico passaggio?
   a) `start-tomcat.sh && start-vnc.sh`
   b) `start-environment.sh`
   c) `vncserver && catalina.sh start`
   d) `launch-all.sh`

2. Quale porta viene utilizzata per accedere a Tomcat nel nostro ambiente?
   a) 8080
   b) 8443
   c) 5901
   d) 6080

3. Come viene gestito l'accesso al desktop grafico tramite browser?
   a) Tramite SSH con flag X11
   b) Utilizzando noVNC su porta 6080
   c) Tramite una connessione RDP
   d) Utilizzando un client VNC locale

4. Quale delle seguenti NON è una funzionalità configurata nel nostro ambiente?
   a) Application server Tomcat
   b) Desktop grafico con Xfce
   c) Server di database MySQL
   d) Browser Firefox

5. Quale file contiene la configurazione principale per GitHub Codespaces?
   a) `Dockerfile`
   b) `docker-compose.yml`
   c) `devcontainer.json`
   d) `config.json`

## Risposte Corrette:

1. b) `start-environment.sh` - Questo script è stato creato per avviare sia VNC che Tomcat insieme.
2. a) 8080 - Questa è la porta standard su cui Tomcat viene configurato per rispondere.
3. b) Utilizzando noVNC su porta 6080 - noVNC fornisce un client VNC basato su HTML5 accessibile via browser.
4. c) Server di database MySQL - Non abbiamo incluso MySQL nella configurazione.
5. c) `devcontainer.json` - Questo è il file principale che GitHub Codespaces usa per configurare l'ambiente.

Questa guida dovrebbe permetterti di configurare un ambiente di sviluppo completo con Tomcat e VNC su GitHub Codespaces. Seguendo questi passaggi, avrai un ambiente di sviluppo Java EE accessibile da qualsiasi dispositivo con un browser web, ideale per sviluppare e testare applicazioni web Java.