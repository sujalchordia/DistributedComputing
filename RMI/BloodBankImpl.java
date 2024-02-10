    import java.rmi.RemoteException;
    import java.rmi.server.UnicastRemoteObject;
    import java.util.HashMap;
    import java.util.Map;
    public class BloodBankImpl extends UnicastRemoteObject implements BloodBankInterface {
        public Map<String, Integer> bloodInventory;

        public BloodBankImpl() throws RemoteException {
            bloodInventory = new HashMap<>();
        }

        @Override
        public Map<String, Integer> getBloodInventory() throws RemoteException {
            return bloodInventory;
        }

        @Override
        public void addBlood(String type, int quantity) throws RemoteException {
            bloodInventory.put(type, quantity);
        }
        
        @Override
        public void updateBlood(String type, int quantity) throws RemoteException {
            bloodInventory.put(type, quantity);
        }

        @Override
        public void removeBlood(String type) throws RemoteException {
            bloodInventory.remove(type);
        }
    }
