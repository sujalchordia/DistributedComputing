import xmlrpc.client
import threading

def main():
    proxy = xmlrpc.client.ServerProxy('http://localhost:8000')
    lock_dict = {}  # Dictionary to store locks for each blood type

    def acquire_lock(blood_type):
        if blood_type not in lock_dict:
            lock_dict[blood_type] = threading.Lock()
        lock_dict[blood_type].acquire()

    def release_lock(blood_type):
        lock_dict[blood_type].release()

    while True:
        operation = input("\nEnter operation (add/remove/update/view/exit): ").lower()

        if operation == 'exit':
            print("Exiting...")
            break
        elif operation in ['add', 'remove', 'update']:
            blood_type = input("Enter blood type: ")
            quantity = int(input("Enter quantity: "))
            acquire_lock(blood_type)  # Acquire lock for the specific blood type
            try:
                result = getattr(proxy, f"{operation}_blood_units")(blood_type, quantity)
                if result is not None:
                    print(result)
                else:
                    print("Server returned None.")
            finally:
                release_lock(blood_type)  # Release lock after the operation is complete
        elif operation == 'view':
            blood_type = input("Enter blood type: ")  # Input blood type for viewing inventory
            if blood_type in lock_dict:
                with lock_dict[blood_type]:
                    inventory = proxy.get_inventory()
                if inventory is not None:
                    print("Current Inventory:")
                    for blood_type, quantity in inventory.items():
                        print(f"{blood_type}: {quantity} units")
                else:
                    print("Server returned None.")
            else:
                print("Blood type not found.")
        else:
            print("Invalid operation. Please try again.")

if __name__ == "__main__":
    main()
