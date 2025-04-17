#!/bin/bash
# .devcontainer/post-start.sh

echo "Esecuzione dello script post-start..."

# --- Configurazione e Avvio VNC ---
# Imposta la password VNC (ATTENZIONE ALLA SICUREZZA!)
# Metodo 1: Password fissa (Meno sicuro, ok per test rapidi)
# Sostituisci 'password' con una password desiderata.
VNC_PASSWORD="password"
echo "Impostazione password VNC..."
mkdir -p $HOME/.vnc
echo "$VNC_PASSWORD" | vncpasswd -f > $HOME/.vnc/passwd
chmod 600 $HOME/.vnc/passwd # Rendi il file leggibile solo dall'utente

# Metodo 2: Usare GitHub Codespaces Secrets (Più sicuro)
# 1. Vai nelle Impostazioni del tuo repository -> Secrets and variables -> Codespaces -> New repository secret.
# 2. Crea un segreto chiamato VNC_PASSWORD con la tua password sicura.
# 3. Decommenta la riga seguente e commenta il Metodo 1 sopra:
# if [ -n "$VNC_PASSWORD" ]; then
#   echo "Impostazione password VNC da Secrets..."
#   mkdir -p $HOME/.vnc
#   echo "$VNC_PASSWORD" | vncpasswd -f > $HOME/.vnc/passwd
#   chmod 600 $HOME/.vnc/passwd
# else
#   echo "ERRORE: La variabile segreta VNC_PASSWORD non è impostata!" >&2
#   # Potresti voler impedire l'avvio del server VNC o usare una password di default qui
# fi

# Avvia il server VNC sul display :1, accessibile dall'esterno del localhost del container,
# con una geometria specifica e profondità di colore. Esegui in background.
echo "Avvio del server VNC sul display :1 (Porta 5901)..."
vncserver :1 -localhost no -geometry 1280x800 -depth 24 -fg &
# `-localhost no` è cruciale per permettere la connessione tramite la porta inoltrata
# `-fg` mantiene il processo in foreground, ma l'& lo manda in background nel contesto dello script

# Dai tempo al server VNC di avviarsi
sleep 5

# --- Avvio Tomcat ---
echo "Avvio di Apache Tomcat..."
# Esegui lo script di avvio di Tomcat in background
sh ${TOMCAT_HOME}/bin/startup.sh &

echo "Script post-start completato."
echo "Tomcat dovrebbe essere accessibile su http://localhost:8080 (nella scheda Porte)."
echo "Il server VNC dovrebbe essere accessibile sulla porta 5901 (nella scheda Porte)."

# Mantieni lo script in esecuzione se necessario (di solito non serve con postStartCommand)
# sleep infinity