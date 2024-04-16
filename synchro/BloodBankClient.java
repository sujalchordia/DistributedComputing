import java.io.*;
import java.net.*;

public class BloodBankClient {
    private static final String SERVER_ADDRESS = "localhost";
    private static final int PORT = 12345;

    public static void main(String[] args) {
        try (
            Socket socket = new Socket(SERVER_ADDRESS, PORT);
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader serverReader = new BufferedReader(new InputStreamReader(socket.getInputStream()))
        ) {
            System.out.println("Connected to server.");

            String userInput;
            while ((userInput = reader.readLine()) != null) {
                writer.println(userInput);
                System.out.println("Server response: " + serverReader.readLine());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
