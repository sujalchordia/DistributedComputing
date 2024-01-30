import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.Map;

public interface BloodBankInterface extends Remote {
    Map<String, Integer> getBloodInventory() throws RemoteException;
    void addBlood(String type, int quantity) throws RemoteException;
    void updateBlood(String type, int quantity) throws RemoteException;
    void removeBlood(String type) throws RemoteException;
}
