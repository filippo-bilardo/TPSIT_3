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