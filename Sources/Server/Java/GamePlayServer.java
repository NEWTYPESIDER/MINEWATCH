
import java.util.*;
import java.io.*;
import java.net.*;
import java.text.SimpleDateFormat;

public class GamePlayServer {
    HashMap clients;

    GamePlayServer(int number) {
        clients = new HashMap();
        Collections.synchronizedMap(clients);

        System.out.printf("Server Started At: [ %s :: %d ] ! \n", Information.IP, Information.Port);
    }

    ServerSocket socket = null;

    public void start() {
        try {
            Socket socket = new ServerSocket(Information.Port);

            System.out.println("Server Is Now Ready!");
            System.out.println("--------------------------------------------------");

            while(socket != null) {
                try {
                    System.out.println("Waiting for Client Join...");
    
                    Socket client = socket.accept();
                    System.out.printf("Client Joined at [ %s :: %d ] ! \n", client.getInetAddress(), client.getPort() );
    
                    IOReceiver receiver = new IOReceiver(client);
                    receiver.start();
                } catch(IOException error) {
                    error.printStackTrace();
    
                    socket.close();
                    socket = null;
                }
            }
        } catch(IOException error) {
            error.printStackTrace();
        }
    }

    public void relayData(String data) {
        Iterator iterator = clients.keySet().iterator();

        while(iterator.hasNext() ) {
            try {
                DataOutputStream output = (DataOutputStream) clients.get(iterator.next() );
                output.writeUTF(data);
            } catch(IOException error) { }
        }
    }

    public static void main(String[] arguments) {
        new IOServer().start();
    }

    class IOReceiver extends Thread {
        Socket client;
    
        DataInputStream input;
        DataOutputStream output;
    
        IOReceiver(Socket socket) {
            this.client = socket;
    
            try {
                input = new DataInputStream(socket.getInputStream() );
                output = new DataOutputStream(socket.getOutputStream() );
            } catch(IOException error) {
                error.printStackTrace();
            }
        }
    
        public void run() {
            String nickname = "";
    
            try {
                nickname = (String) input.readUTF();
                relayData(nickname + " Joined The Server!");
                
                clients.put(nickname, output);
                relayData("Spawn Player: " + nickname);
    
                Iterator iterator = clients.keySet().iterator();
            
                while(iterator.hasNext() ) {
                    try {
                        if(clients.size() > 1) {
                            DataOutputStream output = (DataOutputStream) clients.get(nickname);
                            output.writeUTF("Spawn Player: " + iterator.next() );
                        } else break;
                    } catch(IOException error) { }
                };
                
                while(input != null) {
                    try {
                        relayData(input.readUTF() );
                    } catch(Exception error) { }
                }
            } catch(IOException error) {
                error.printStackTrace();
            } finally {
                relayData(nickname + " Left the Server...");
                
                clients.remove(nickname);
                System.out.println("[ " + client.getInetAddress() + " :: " + client.getPort() + " ] Left the Server...");
            }
        }
    }
}

class Information {
    static public String IP = "127.0.0.1";
    static public int Port = 7000;
}