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
