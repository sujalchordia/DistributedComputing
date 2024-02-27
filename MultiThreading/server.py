from xmlrpc.server import SimpleXMLRPCServer
from xmlrpc.server import SimpleXMLRPCRequestHandler
import threading
import time

# Restrict to a particular path.
class RequestHandler(SimpleXMLRPCRequestHandler):
    rpc_paths = ('/RPC2',)

# Blood bank system class
class BloodBankSystem:
    def __init__(self):
        self.inventory = {}
        self.lock = threading.Lock()

    def add_inventory(self, blood_type, quantity):
        with self.lock:
            print(f"Handling add_inventory request for blood type {blood_type} with quantity {quantity}")
            time.sleep(5)
            if blood_type in self.inventory:
                self.inventory[blood_type] += quantity
            else:
                self.inventory[blood_type] = quantity
            print("Inventory after add_inventory:", self.inventory)
            return True

    def remove_inventory(self, blood_type, quantity):
        with self.lock:
            print(f"Handling remove_inventory request for blood type {blood_type} with quantity {quantity}")
            if blood_type in self.inventory:
                if self.inventory[blood_type] >= quantity:
                    self.inventory[blood_type] -= quantity
                    return True
                else:
                    return False  # Insufficient inventory
            else:
                return False  # Blood type not found

    def update_inventory(self, blood_type, quantity):
        with self.lock:
            print(f"Handling update_inventory request for blood type {blood_type} with quantity {quantity}")
            if blood_type in self.inventory:
                self.inventory[blood_type] = quantity
                return True
            else:
                return False  # Blood type not found

    def get_inventory(self):
        with self.lock:
            print("Handling view_inventory request")
            return self.inventory

def serve_client(client, blood_bank, method, *args):
    method_func = getattr(blood_bank, method)
    return method_func(*args)

def serve_forever(server, blood_bank):
    server.serve_forever()

if __name__ == '__main__':
    blood_bank = BloodBankSystem()

    # Create server
    with SimpleXMLRPCServer(('localhost', 8000),
                            requestHandler=RequestHandler) as server:
        server.register_introspection_functions()
        server.register_instance(blood_bank)
        
        # Run the server's main loop in a separate thread
        server_thread = threading.Thread(target=serve_forever, args=(server, blood_bank))
        server_thread.start()
        print("Blood bank server is running...")

        # Wait for the server thread to finish
        server_thread.join()
