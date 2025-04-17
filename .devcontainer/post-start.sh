#!/bin/bash
# .devcontainer/post-start.sh

echo "Esecuzione dello script post-start..."

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

echo "Script post-start completato."
echo "✅ Tomcat è accessibile su http://localhost:8080 (nella scheda Porte)."
echo "✅ Script di utilità creato: ~/restart-tomcat.sh"

# Mantieni lo script in esecuzione se necessario (di solito non serve con postStartCommand)
# sleep infinity