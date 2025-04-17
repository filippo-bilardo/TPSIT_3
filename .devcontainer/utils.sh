#!/bin/bash
# .devcontainer/utils.sh
# Script di utilità per l'ambiente di sviluppo Codespace

# Funzione per mostrare l'aiuto
show_help() {
  echo "Utilità per l'ambiente di sviluppo TPSIT_3 Codespace"
  echo ""
  echo "Utilizzo: ./utils.sh [comando]"
  echo ""
  echo "Comandi disponibili:"
  echo "  status       - Mostra lo stato dei servizi (Tomcat, VNC)"
  echo "  restart-all  - Riavvia tutti i servizi"
  echo "  restart-tomcat - Riavvia solo Tomcat"
  echo "  restart-vnc  - Riavvia solo il server VNC"
  echo "  clean-tomcat - Pulisce i log e le applicazioni temporanee di Tomcat"
  echo "  help         - Mostra questo messaggio di aiuto"
  echo ""
}

# Funzione per verificare lo stato dei servizi
check_status() {
  echo "=== Stato dei Servizi ==="
  
  # Verifica Tomcat
  if pgrep -f "org.apache.catalina.startup.Bootstrap" > /dev/null; then
    echo "✅ Tomcat: ATTIVO"
    echo "   URL: http://localhost:8080"
    echo "   Versione: $(${TOMCAT_HOME}/bin/version.sh | grep 'Server version' | cut -d':' -f2 | xargs)"
  else
    echo "❌ Tomcat: NON ATTIVO"
  fi
  
  # Verifica VNC
  if pgrep -f "Xtigervnc" > /dev/null; then
    echo "✅ Server VNC: ATTIVO"
    echo "   Porta: 5901"
  else
    echo "❌ Server VNC: NON ATTIVO"
  fi
  
  echo ""
  echo "Per riavviare tutti i servizi: ./utils.sh restart-all"
}

# Funzione per riavviare Tomcat
restart_tomcat() {
  echo "Riavvio di Tomcat..."
  ${TOMCAT_HOME}/bin/shutdown.sh > /dev/null 2>&1
  sleep 2
  ${TOMCAT_HOME}/bin/startup.sh > /dev/null 2>&1
  sleep 3
  
  if pgrep -f "org.apache.catalina.startup.Bootstrap" > /dev/null; then
    echo "✅ Tomcat riavviato con successo"
    echo "   Accessibile su http://localhost:8080"
  else
    echo "❌ ERRORE: Impossibile riavviare Tomcat"
  fi
}

# Funzione per riavviare VNC
restart_vnc() {
  echo "Riavvio del server VNC..."
  vncserver -kill :1 > /dev/null 2>&1 || true
  sleep 1
  vncserver :1 -localhost no -geometry 1280x800 -depth 24 > /dev/null 2>&1
  sleep 2
  
  if pgrep -f "Xtigervnc" > /dev/null; then
    echo "✅ Server VNC riavviato con successo"
    echo "   Accessibile sulla porta 5901"
  else
    echo "❌ ERRORE: Impossibile riavviare il server VNC"
  fi
}

# Funzione per pulire i log e le applicazioni temporanee di Tomcat
clean_tomcat() {
  echo "Pulizia dei log e delle applicazioni temporanee di Tomcat..."
  
  # Ferma Tomcat prima della pulizia
  ${TOMCAT_HOME}/bin/shutdown.sh > /dev/null 2>&1
  sleep 3
  
  # Pulisci i log
  echo "- Pulizia dei log..."
  rm -f ${TOMCAT_HOME}/logs/*
  
  # Pulisci la directory work
  echo "- Pulizia della directory work..."
  rm -rf ${TOMCAT_HOME}/work/*
  
  # Pulisci la directory temp
  echo "- Pulizia della directory temp..."
  rm -rf ${TOMCAT_HOME}/temp/*
  
  # Riavvia Tomcat
  echo "- Riavvio di Tomcat..."
  ${TOMCAT_HOME}/bin/startup.sh > /dev/null 2>&1
  sleep 3
  
  if pgrep -f "org.apache.catalina.startup.Bootstrap" > /dev/null; then
    echo "✅ Pulizia completata e Tomcat riavviato con successo"
  else
    echo "❌ ATTENZIONE: Pulizia completata ma Tomcat non si è riavviato"
  fi
}

# Gestione dei comandi
case "$1" in
  status)
    check_status
    ;;
  restart-all)
    restart_tomcat
    restart_vnc
    ;;
  restart-tomcat)
    restart_tomcat
    ;;
  restart-vnc)
    restart_vnc
    ;;
  clean-tomcat)
    clean_tomcat
    ;;
  help|--help|-h)
    show_help
    ;;
  *)
    # Se nessun comando è specificato o il comando non è riconosciuto
    show_help
    ;;
esac