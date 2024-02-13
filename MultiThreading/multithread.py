import threading
import time

class BloodBankInventory:
    def __init__(self):
        self.inventory = {}
        self.lock = threading.Lock()

    def add_blood_units(self, hospital_id, blood_type, quantity):
        with self.lock:
            if blood_type not in self.inventory:
                self.inventory[blood_type] = 0
            self.inventory[blood_type] += quantity
            print(f"{quantity} units of blood type {blood_type} added by Hospital {hospital_id}.")
            print(f"Current inventory: {self.inventory}")
            time.sleep(1)  # Simulate processing time

def hospital_worker(blood_bank, hospital_id, blood_type, quantity):
    print(f"Hospital {hospital_id} adding {quantity} units of blood type {blood_type}.")
    blood_bank.add_blood_units(hospital_id, blood_type, quantity)
    print(f"Hospital {hospital_id} finished adding blood.")

def main():
    blood_bank = BloodBankInventory()
    hospitals = [("Hospital A", "O+", 10),
                ("Hospital B", "AB-", 5),
                ("Hospital C", "A+", 15)]

    threads = []
    for hospital_id, blood_type, quantity in hospitals:
        thread = threading.Thread(target=hospital_worker, args=(blood_bank, hospital_id, blood_type, quantity))
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()

if __name__ == "__main__":
    main()
