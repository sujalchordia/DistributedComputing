import threading
import time
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

def hospital_worker(operation, blood_type, quantity):
    if operation == 'add':
        add_inventory(blood_type, quantity)
    elif operation == 'remove':
        remove_inventory(blood_type, quantity)
    elif operation == 'update':
        update_inventory(blood_type, quantity)

def main():
    hospitals = [
        ("add", "O+", 10),
        ("remove", "AB-", 5),
        ("update", "A+", 15)
    ]

    threads = []
    for operation, blood_type, quantity in hospitals:
        thread = threading.Thread(target=hospital_worker, args=(operation, blood_type, quantity))
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()

if __name__ == "__main__":
    main()
