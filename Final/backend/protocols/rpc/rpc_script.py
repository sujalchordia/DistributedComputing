import sys
import json

# File path for inventory data
INVENTORY_FILE = 'inventory.txt'

# Helper function to read inventory data from file
def read_inventory_from_file():
    try:
        with open(INVENTORY_FILE, 'r') as file:
            inventory = json.load(file)
        return inventory
    except FileNotFoundError:
        print(f"Inventory file '{INVENTORY_FILE}' not found.")
        return []

# Helper function to write inventory data to file
def write_inventory_to_file(inventory):
    try:
        with open(INVENTORY_FILE, 'w') as file:
            json.dump(inventory, file, indent=4)
    except Exception as e:
        print(f"Error writing to inventory file: {e}")

# Sample inventory data (replace with your actual data source)
inventory = read_inventory_from_file()

def add_inventory(new_item):
    new_item["id"] = max(item["id"] for item in inventory) + 1
    inventory.append(new_item)
    write_inventory_to_file(inventory)
    return new_item

def update_inventory(item_name, updated_item):
    for item in inventory:
        if item["bloodGroup"] == item_name:
            item.update(updated_item)
            write_inventory_to_file(inventory)
            return item
    return None

def delete_inventory(item_name):
    global inventory
    inventory = [item for item in inventory if item["bloodGroup"] != item_name]
    write_inventory_to_file(inventory)

# Main function
def main():
    method = sys.argv[1]
    args = sys.argv[2]

    if method == "addInventory":
        args = json.loads(args)
        result = add_inventory(args)
    elif method == "updateInventory":
        item_name, updated_item = json.loads(args)["bloodGroup"], json.loads(args)
        result = update_inventory(item_name, updated_item)
    elif method == "deleteInventory":
        item_name = args
        result = delete_inventory(item_name)
    else:
        print("Invalid method.")

    # Print the result as JSON
    print(json.dumps(result))

if __name__ == "__main__":
    main()
