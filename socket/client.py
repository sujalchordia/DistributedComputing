import socket

# Define server address and port
SERVER_ADDRESS = '127.0.0.1'
SERVER_PORT = 65432

# Create a socket object
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
    client_socket.connect((SERVER_ADDRESS, SERVER_PORT))
    print("Connected to blood bank server.")

    while True:
        print("\nBlood Bank System Menu:")
        print("1. Add inventory")
        print("2. Remove inventory")
        print("3. View inventory")
        print("4. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            blood_type = input("Enter blood type: ")
            quantity = input("Enter quantity to add: ")
            client_socket.sendall(f"ADD {blood_type} {quantity}".encode())
            print(client_socket.recv(1024).decode())

        elif choice == '2':
            blood_type = input("Enter blood type: ")
            quantity = input("Enter quantity to remove: ")
            client_socket.sendall(f"REMOVE {blood_type} {quantity}".encode())
            print(client_socket.recv(1024).decode())

        elif choice == '3':
            client_socket.sendall(b"GET")
            print("Inventory:")
            print(client_socket.recv(1024).decode())

        elif choice == '4':
            print("Exiting...")
            break

        else:
            print("Invalid choice. Please try again.")
