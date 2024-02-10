import java.rmi.Naming;
import java.util.Map;
import java.util.Scanner;

public class BloodBankClient {
    public static void main(String[] args) {
        try {
            BloodBankInterface bloodBank = (BloodBankInterface) Naming.lookup("rmi://localhost/BloodBankService");

            Scanner scanner = new Scanner(System.in);
            while (true) {
                System.out.println("Blood Bank System Menu:");
                System.out.println("1. View Blood Inventory");
                System.out.println("2. Add Blood");
                System.out.println("3. Update Blood");
                System.out.println("4. Remove Blood");
                System.out.println("5. Exit");
                System.out.print("Enter your choice: ");
                int choice = scanner.nextInt();
                scanner.nextLine(); // Consume newline

                switch (choice) {
                    case 1:
                        viewBloodInventory(bloodBank);
                        break;
                    case 2:
                        addBlood(scanner, bloodBank);
                        break;
                    case 3:
                        updateBlood(scanner, bloodBank);
                        break;
                    case 4:
                        removeBlood(scanner, bloodBank);
                        break;
                    case 5:
                        System.out.println("Exiting Blood Bank System...");
                        System.exit(0);
                    default:
                        System.out.println("Invalid choice. Please enter a number from 1 to 5.");
                }
                System.out.println(); 
            }
        } catch (Exception e) {
            System.err.println("Client exception: " + e.toString());
            e.printStackTrace();
        }
    }

    private static void viewBloodInventory(BloodBankInterface bloodBank) throws Exception {
        Map<String, Integer> inventory = bloodBank.getBloodInventory();
        System.out.println("Blood Inventory:");
        for (Map.Entry<String, Integer> entry : inventory.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue() + " units");
        }
        System.out.println(); 
    }

    private static void addBlood(Scanner scanner, BloodBankInterface bloodBank) throws Exception {
        System.out.print("Enter blood type: ");
        String type = scanner.nextLine();
        System.out.print("Enter quantity: ");
        int quantity = scanner.nextInt();
        scanner.nextLine(); 
        bloodBank.addBlood(type, quantity);
        System.out.println(quantity + " units of " + type + " blood added successfully.");
        System.out.println(); 
    }

    private static void updateBlood(Scanner scanner, BloodBankInterface bloodBank) throws Exception {
        System.out.print("Enter blood type to update: ");
        String type = scanner.nextLine();
        System.out.print("Enter new quantity: ");
        int quantity = scanner.nextInt();
        scanner.nextLine(); 
        bloodBank.updateBlood(type, quantity);
        System.out.println("Blood type " + type + " updated to " + quantity + " units.");
        System.out.println(); 
    }

    private static void removeBlood(Scanner scanner, BloodBankInterface bloodBank) throws Exception {
        System.out.print("Enter blood type to remove: ");
        String type = scanner.nextLine();
        bloodBank.removeBlood(type);
        System.out.println("Blood type " + type + " removed from inventory.");
        System.out.println(); 
    }
}
