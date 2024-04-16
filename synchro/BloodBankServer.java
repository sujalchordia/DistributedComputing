import java.io.*;
import java.net.*;

public class BloodBankServer {
    private static final int PORT = 12345;

    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Server started. Waiting for clients...");

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected: " + clientSocket);

                // Create a new thread to handle client requests
                Thread clientHandlerThread = new Thread(new ClientHandler(clientSocket));
                clientHandlerThread.start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

class ClientHandler implements Runnable {
    private Socket clientSocket;

    public ClientHandler(Socket clientSocket) {
        this.clientSocket = clientSocket;
    }

    @Override
    public void run() {
        try (
            BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            PrintWriter writer = new PrintWriter(clientSocket.getOutputStream(), true)
        ) {
            String inputLine;
            BloodBankSystem bloodBankSystem = new BloodBankSystem();

            while ((inputLine = reader.readLine()) != null) {
                String[] tokens = inputLine.split(",");
                String command = tokens[0];

                switch (command) {
                    case "ADD":
                        String itemToAdd = tokens[1];
                        int quantityToAdd = Integer.parseInt(tokens[2]);
                        bloodBankSystem.addItem(itemToAdd, quantityToAdd);
                        writer.println("Item added successfully: " + itemToAdd);
                        break;
                    case "REMOVE":
                        String itemToRemove = tokens[1];
                        int quantityToRemove = Integer.parseInt(tokens[2]);
                        bloodBankSystem.removeItem(itemToRemove, quantityToRemove);
                        writer.println("Item removed successfully: " + itemToRemove);
                        break;
                    case "EDIT":
                        String itemToEdit = tokens[1];
                        int newQuantity = Integer.parseInt(tokens[2]);
                        bloodBankSystem.editItem(itemToEdit, newQuantity);
                        writer.println("Item edited successfully: " + itemToEdit);
                        break;
                    default:
                        writer.println("Invalid command: " + command);
                        break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
