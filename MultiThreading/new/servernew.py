import threading
import time
from xmlrpc.server import SimpleXMLRPCServer

class BloodBankInventory:
    def __init__(self):
        self.inventory = {}
        self.lock = threading.Lock()

    def add_blood_units(self, blood_type, quantity):
        with self.lock:
            if blood_type not in self.inventory:
                self.inventory[blood_type] = 0
            self.inventory[blood_type] += quantity
            print(f"{quantity} units of blood type {blood_type} added.")
            print(f"Current inventory: {self.inventory}")
            time.sleep(1)  # Simulate processing time
            return f"Added {quantity} units of blood type {blood_type}."

    def remove_blood_units(self, blood_type, quantity):
        with self.lock:
            if blood_type in self.inventory:
                if self.inventory[blood_type] >= quantity:
                    self.inventory[blood_type] -= quantity
                    print(f"{quantity} units of blood type {blood_type} removed.")
                    print(f"Current inventory: {self.inventory}")
                    return f"Removed {quantity} units of blood type {blood_type}."
                else:
                    return f"Insufficient inventory of blood type {blood_type}."
            else:
                return f"Blood type {blood_type} not found in inventory."

    def update_blood_units(self, blood_type, quantity):
        with self.lock:
            self.inventory[blood_type] = quantity
            return f"Updated inventory of blood type {blood_type} to {quantity} units."

    def get_inventory(self):
        with self.lock:
            return self.inventory

def server_thread(blood_bank):
    server = SimpleXMLRPCServer(('localhost', 8000))
    server.register_instance(blood_bank)
    print("Server is running...")
    server.serve_forever()

def main():
    blood_bank = BloodBankInventory()
    server_thread_func = threading.Thread(target=server_thread, args=(blood_bank,))
    server_thread_func.start()

if __name__ == "__main__":
    main()
