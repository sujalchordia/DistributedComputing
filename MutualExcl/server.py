from flask import Flask, request, jsonify
from threading import Lock
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize empty inventory
inventory = {}

# Lock dictionary to handle concurrent access
inventory_lock = Lock()

@app.route('/inventory', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_inventory():
    blood_type = request.json['blood_type']
    operation = request.json['operation']

    if operation == 'read':
        with inventory_lock:
            if blood_type in inventory:
                return jsonify({'success': True, 'quantity': inventory[blood_type]})
            else:
                return jsonify({'success': False, 'message': 'Blood type not found'}), 404

    elif operation in ['add', 'update', 'delete']:
        exclusive_access = request.json.get('exclusive_access', False)

        with inventory_lock:
            if exclusive_access and inventory.get(blood_type):
                return jsonify({'success': False, 'message': 'Another client is accessing, please wait'}), 409
            else:
                # Perform the operation
                if operation == 'add':
                    quantity = request.json['quantity']
                    inventory[blood_type] = quantity
                elif operation == 'update':
                    quantity = request.json['quantity']
                    inventory[blood_type] = quantity
                elif operation == 'delete':
                    del inventory[blood_type]
                
                return jsonify({'success': True, 'message': f'{operation.capitalize()} successful'})

if __name__ == '__main__':
    app.run(debug=True)
