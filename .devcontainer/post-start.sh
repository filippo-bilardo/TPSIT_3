#!/bin/bash
# .devcontainer/post-start.sh

echo "Esecuzione dello script post-start..."

# --- Configurazione e Avvio VNC ---
# Gestione sicura della password VNC
echo "Configurazione VNC..."
mkdir -p $HOME/.vnc

# Metodo 1: Usa GitHub Codespaces Secrets (Raccomandato per sicurezza)
# Per configurare: Repository -> Settings -> Secrets and variables -> Codespaces -> New repository secret
# Crea un segreto chiamato VNC_PASSWORD con la tua password sicura
if [ -n "$VNC_PASSWORD" ]; then
  echo "Impostazione password VNC da Secrets..."
  echo "$VNC_PASSWORD" | vncpasswd -f > $HOME/.vnc/passwd
  chmod 600 $HOME/.vnc/passwd
# Metodo 2: Password di fallback (solo per sviluppo)
else
  echo "ATTENZIONE: Usando password VNC predefinita. Per maggiore sicurezza, configura VNC_PASSWORD nei Secrets." >&2
  echo "password" | vncpasswd -f > $HOME/.vnc/passwd
  chmod 600 $HOME/.vnc/passwd
fi

# Termina eventuali sessioni VNC precedenti
vncserver -kill :1 > /dev/null 2>&1 || true

# Avvia il server VNC sul display :1, accessibile dall'esterno del localhost del container
echo "Avvio del server VNC sul display :1 (Porta 5901)..."
vncserver :1 -localhost no -geometry 1280x800 -depth 24 -fg &
# `-localhost no` è cruciale per permettere la connessione tramite la porta inoltrata
# `-fg` mantiene il processo in foreground, ma l'& lo manda in background nel contesto dello script

# Dai tempo al server VNC di avviarsi
sleep 5

# Verifica che il server VNC sia attivo
if pgrep -f "Xtigervnc" > /dev/null; then
  echo "✅ Server VNC avviato correttamente"
else
  echo "❌ ERRORE: Il server VNC non si è avviato correttamente" >&2
fi

# --- Avvio Tomcat ---
echo "Avvio di Apache Tomcat..."
# Esegui lo script di avvio di Tomcat in background
sh ${TOMCAT_HOME}/bin/startup.sh &

# Attendi che Tomcat si avvii
sleep 5

# Verifica che Tomcat sia attivo
if pgrep -f "org.apache.catalina.startup.Bootstrap" > /dev/null; then
  echo "✅ Tomcat avviato correttamente"
else
  echo "❌ ERRORE: Tomcat non si è avviato correttamente" >&2
fi

# --- Crea script di utilità ---
# Script per riavviare Tomcat
cat > $HOME/restart-tomcat.sh << 'EOF'
#!/bin/bash
echo "Riavvio di Tomcat..."
${TOMCAT_HOME}/bin/shutdown.sh
sleep 2
${TOMCAT_HOME}/bin/startup.sh
echo "Tomcat riavviato. Accessibile su http://localhost:8080"
EOF
chmod +x $HOME/restart-tomcat.sh

# Script per riavviare VNC
cat > $HOME/restart-vnc.sh << 'EOF'
#!/bin/bash
echo "Riavvio del server VNC..."
vncserver -kill :1 > /dev/null 2>&1 || true
sleep 1
vncserver :1 -localhost no -geometry 1280x800 -depth 24
echo "Server VNC riavviato. Accessibile sulla porta 5901"
EOF
chmod +x $HOME/restart-vnc.sh

echo "Script post-start completato."
echo "✅ Tomcat è accessibile su http://localhost:8080 (nella scheda Porte)."
echo "✅ Il server VNC è accessibile sulla porta 5901 (nella scheda Porte)."
echo "✅ Script di utilità creati: ~/restart-tomcat.sh e ~/restart-vnc.sh"

# Mantieni lo script in esecuzione se necessario (di solito non serve con postStartCommand)
# sleep infinity