# .devcontainer/Dockerfile
# Usa un'immagine di base comune per dev container (include user 'vscode', sudo, etc.)
FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

# Argomenti opzionali per rendere le versioni configurabili (possono essere passati da devcontainer.json)
ARG TOMCAT_VERSION=10.1.40
ARG TOMCAT_MAJOR_VERSION=10

# Variabili d'ambiente
ENV TOMCAT_HOME=/opt/tomcat
ENV PATH=$TOMCAT_HOME/bin:$PATH

# Passa a root per installare pacchetti
USER root

# Installa wget, unzip, server VNC, ambiente desktop leggero (XFCE) e net-tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends \
        wget \
        unzip \
        # Server VNC e utilità comuni
        tigervnc-standalone-server \
        tigervnc-common \
        # Ambiente Desktop XFCE e terminale
        xfce4 \
        xfce4-terminal \
        # Utile per debug di rete
        net-tools \
    # Pulisci cache di apt per ridurre la dimensione dell'immagine
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Scarica e installa Tomcat
RUN wget "https://dlcdn.apache.org/tomcat/tomcat-${TOMCAT_MAJOR_VERSION}/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz" -O /tmp/tomcat.tar.gz \
    && mkdir -p ${TOMCAT_HOME} \
    && tar xzf /tmp/tomcat.tar.gz -C ${TOMCAT_HOME} --strip-components=1 \
    && rm /tmp/tomcat.tar.gz

# Concedi i permessi all'utente 'vscode' su Tomcat
# L'utente 'vscode' è già creato nell'immagine base mcr.microsoft.com/devcontainers/base
RUN chown -R vscode:vscode ${TOMCAT_HOME} \
    # Rendi eseguibili gli script di Tomcat
    && chmod +x ${TOMCAT_HOME}/bin/*.sh

# (Opzionale) Installa webapps di esempio di Tomcat (manager, host-manager)
# RUN cp -R ${TOMCAT_HOME}/webapps.dist/* ${TOMCAT_HOME}/webapps/
# ATTENZIONE: Per usare le app manager/host-manager, devi configurare gli utenti in conf/tomcat-users.xml

# Torna all'utente non-root predefinito
USER vscode

# Imposta la directory di lavoro (opzionale)
WORKDIR /home/vscode