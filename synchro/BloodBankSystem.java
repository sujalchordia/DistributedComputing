import java.util.HashMap;
import java.util.Map;

public class BloodBankSystem {
    private Map<String, Integer> inventory;

    public BloodBankSystem() {
        this.inventory = new HashMap<>();
    }

    public synchronized void addItem(String item, int quantity) {
        // Add item to inventory
        if (inventory.containsKey(item)) {
            inventory.put(item, inventory.get(item) + quantity);
        } else {
            inventory.put(item, quantity);
        }
    }

    public synchronized void removeItem(String item, int quantity) {
        // Remove item from inventory
        if (inventory.containsKey(item)) {
            int currentQuantity = inventory.get(item);
            if (currentQuantity >= quantity) {
                inventory.put(item, currentQuantity - quantity);
            } else {
                System.out.println("Insufficient quantity of " + item);
            }
        } else {
            System.out.println("Item not found: " + item);
        }
    }

    public synchronized void editItem(String item, int newQuantity) {
        // Edit item in inventory
        if (inventory.containsKey(item)) {
            inventory.put(item, newQuantity);
        } else {
            System.out.println("Item not found: " + item);
        }
    }
}
