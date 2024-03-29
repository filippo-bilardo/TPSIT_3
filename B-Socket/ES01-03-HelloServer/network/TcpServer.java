/**
 * Lettura dati multi riga provenienti dal client
 * 
 * cd /home/git-projects/TPSIT_3/B-ES01-03-HelloServer
 * from network/..
 * javac network/TcpServer.java
 * java network.TcpServer 
 */
package network;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class TcpServer {
	public static void main(String[] args) throws Exception {
		
		int severPort=7770;
		String clientMsg = "";
		
		try {			 
			// Creazione del socket sul server e ascolto sulla porta
			ServerSocket serverSocket = new ServerSocket(severPort);
			System.out.println("Server: in ascolto sulla porta " + severPort);

			// Attesa della connessione con il client
			System.out.println("Attesa ricezione dati dal client ....................... \n");
			Socket clientSocket = serverSocket.accept();
			
			// Create output stream to write data
            PrintWriter outStream = new PrintWriter(clientSocket.getOutputStream(), true);   
			// Create input stream to read data from socket
			BufferedReader inStream = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

            // Ciclo di ricezione dal client e echo
			//Lettura dati dal client un righa alla volta    
            while ((clientMsg=inStream.readLine()) != null) {
				//Riga di dati ricevuta dal client
				System.out.println(clientMsg);	
				
				//Invio echo dati su stream di rete
				//System.out.println("Server: invio messaggio "    + clientMsg );
                outStream.println(clientMsg);    
			}  

			System.out.println("\n....................... Fine ricezione dati\n");

			// Close resources
			serverSocket.close();
			clientSocket.close();
			inStream.close();
			outStream.close();

		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
