# client.py
import xmlrpc.client

# Create an XML-RPC client
proxy = xmlrpc.client.ServerProxy('http://localhost:8000')

# CRUD operations for the blood bank system
def add_inventory(blood_type, quantity):
    result = proxy.add_inventory(blood_type, quantity)
    if result:
        print(f"Added {quantity} units of {blood_type} blood to inventory.")

def remove_inventory(blood_type, quantity):
    result = proxy.remove_inventory(blood_type, quantity)
    if result:
        print(f"Removed {quantity} units of {blood_type} blood from inventory.")
    else:
        print(f"Insufficient inventory of {blood_type} blood.")

def update_inventory(blood_type, quantity):
    result = proxy.update_inventory(blood_type, quantity)
    if result:
        print(f"Updated inventory of {blood_type} blood to {quantity} units.")
    else:
        print(f"{blood_type} blood type not found in inventory.")

def get_inventory():
    inventory = proxy.get_inventory()
    print("Current Inventory:")
    for blood_type, quantity in inventory.items():
        print(f"{blood_type}: {quantity} units")

if __name__ == "__main__":
    while True:
        print("\nBlood Bank System Menu:")
        print("1. Add inventory")
        print("2. Remove inventory")
        print("3. Update inventory")
        print("4. View inventory")
        print("5. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            blood_type = input("Enter blood type: ")
            quantity = int(input("Enter quantity to add: "))
            add_inventory(blood_type, quantity)
        elif choice == '2':
            blood_type = input("Enter blood type: ")
            quantity = int(input("Enter quantity to remove: "))
            remove_inventory(blood_type, quantity)
        elif choice == '3':
            blood_type = input("Enter blood type: ")
            quantity = int(input("Enter new quantity: "))
            update_inventory(blood_type, quantity)
        elif choice == '4':
            get_inventory()
        elif choice == '5':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please try again.")
