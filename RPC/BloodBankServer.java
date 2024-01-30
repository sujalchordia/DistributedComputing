import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;

public class BloodBankServer {
    public static void main(String[] args) {
        try {
            BloodBankImpl bloodBank = new BloodBankImpl();
            LocateRegistry.createRegistry(1095); // default RMI registry port
            Naming.rebind("rmi://localhost/BloodBankService", bloodBank);
            System.out.println("Blood Bank Server is ready.");
        } catch (Exception e) {
            System.err.println("Server exception: " + e.toString());
            e.printStackTrace();
        }
    }
}
