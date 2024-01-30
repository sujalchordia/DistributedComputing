# server.py
from xmlrpc.server import SimpleXMLRPCServer
from xmlrpc.server import SimpleXMLRPCRequestHandler

# Restrict to a particular path.
class RequestHandler(SimpleXMLRPCRequestHandler):
    rpc_paths = ('/RPC2',)

# Create server
with SimpleXMLRPCServer(('localhost', 8000),
                        requestHandler=RequestHandler) as server:
    server.register_introspection_functions()

    # Blood bank system class
    class BloodBankSystem:
        def __init__(self):
            self.inventory = {}

        def add_inventory(self, blood_type, quantity):
            if blood_type in self.inventory:
                self.inventory[blood_type] += quantity
            else:
                self.inventory[blood_type] = quantity
            return True

        def remove_inventory(self, blood_type, quantity):
            if blood_type in self.inventory:
                if self.inventory[blood_type] >= quantity:
                    self.inventory[blood_type] -= quantity
                    return True
                else:
                    return False
            else:
                return False

        def update_inventory(self, blood_type, quantity):
            if blood_type in self.inventory:
                self.inventory[blood_type] = quantity
                return True
            else:
                return False

        def get_inventory(self):
            return self.inventory

    # Register instance of BloodBankSystem
    server.register_instance(BloodBankSystem())
    
    # Run the server's main loop
    print("Blood bank server is running...")
    server.serve_forever()
