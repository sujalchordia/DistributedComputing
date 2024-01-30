import socket

# Define host and port
HOST = '127.0.0.1'
PORT = 65432

# Blood bank inventory
inventory = {}

# Create a socket object
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
    server_socket.bind((HOST, PORT))
    server_socket.listen()

    print("Blood bank server is running...")

    while True:
        # Wait for a connection
        conn, addr = server_socket.accept()
        with conn:
            print('Connected by', addr)
            while True:
                data = conn.recv(1024)
                if not data:
                    break
                message = data.decode()

                if message.startswith("ADD"):
                    _, blood_type, quantity = message.split()
                    if blood_type in inventory:
                        inventory[blood_type] += int(quantity)
                    else:
                        inventory[blood_type] = int(quantity)
                    conn.sendall(b"Inventory updated successfully.")

                elif message.startswith("REMOVE"):
                    _, blood_type, quantity = message.split()
                    if blood_type in inventory and inventory[blood_type] >= int(quantity):
                        inventory[blood_type] -= int(quantity)
                        conn.sendall(b"Inventory updated successfully.")
                    else:
                        conn.sendall(b"Insufficient inventory.")

                elif message.startswith("GET"):
                    response = "\n".join([f"{k}: {v}" for k, v in inventory.items()])
                    conn.sendall(response.encode())

                else:
                    conn.sendall(b"Invalid command")

