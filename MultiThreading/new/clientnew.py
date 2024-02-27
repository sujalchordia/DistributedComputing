import xmlrpc.client
import threading

lock = threading.Lock()

def main():
    proxy = xmlrpc.client.ServerProxy('http://localhost:8000')

    while True:
        operation = input("\nEnter operation (add/remove/update/view/exit): ").lower()

        if operation == 'exit':
            print("Exiting...")
            break
        elif operation in ['add', 'remove', 'update']:
            blood_type = input("Enter blood type: ")
            quantity = int(input("Enter quantity: "))
            with lock:
                result = getattr(proxy, f"{operation}_blood_units")(blood_type, quantity)
            if result is not None:
                print(result)
            else:
                print("Server returned None.")
        elif operation == 'view':
            with lock:
                inventory = proxy.get_inventory()
            if inventory is not None:
                print("Current Inventory:")
                for blood_type, quantity in inventory.items():
                    print(f"{blood_type}: {quantity} units")
            else:
                print("Server returned None.")
        else:
            print("Invalid operation. Please try again.")

if __name__ == "__main__":
    main()
