from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to read inventory from file
def read_inventory_from_file():
    try:
        with open('inventory.txt', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}  # Return empty inventory if file doesn't exist

# Function to write inventory to file
def write_inventory_to_file(inventory):
    with open('inventory.txt', 'w') as file:
        json.dump(inventory, file)

# Initialize inventory from file
inventory = read_inventory_from_file()

# Function to update inventory
def update_inventory(blood_type, quantity):
    global inventory
    if blood_type in inventory:
        inventory[blood_type] += quantity
        # Ensure inventory doesn't go below 0
        if inventory[blood_type] < 0:
            inventory[blood_type] = 0
    else:
        inventory[blood_type] = max(quantity, 0)  # Ensure quantity is not negative
    write_inventory_to_file(inventory)  # Write inventory to file after update

# Function to get current server time
def get_server_time():
    return int(time.time())

# API endpoint for adding blood
@app.route('/add_blood', methods=['POST'])
def add_blood():
    data = request.json
    blood_type = data['blood_type']
    quantity = data['quantity']
    update_inventory(blood_type, quantity)
    return jsonify({'message': 'Blood added successfully', 'server_time': get_server_time()})

# API endpoint for removing blood
@app.route('/remove_blood', methods=['POST'])
def remove_blood():
    data = request.json
    blood_type = data['blood_type']
    quantity = data['quantity']
    if blood_type in inventory and inventory[blood_type] >= quantity:
        update_inventory(blood_type, -quantity)
        return jsonify({'message': 'Blood removed successfully', 'server_time': get_server_time()})
    else:
        return jsonify({'error': 'Not enough units available'}), 400

# API endpoint for updating blood inventory
@app.route('/inventory', methods=['GET'])
def get_inventory():
    return jsonify({'inventory': inventory, 'server_time': get_server_time()})

# Start Flask server
if __name__ == '__main__':
    app.run(debug=True)
