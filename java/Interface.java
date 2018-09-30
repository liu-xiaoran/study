public class Interface {
    public static void main(String[] args) {
        System.out.println(JdbcConfig.username);
    }
}
interface JdbcConfig {
    String driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    String url = "jdbc:sqlserver://192.168.0.34:1433;DatabaseName=SysDBsx";
    String username = "sa";
    String password = "Drp123";
}
// jdbc.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerDriver
// jdbc.url=jdbc:sqlserver://192.168.0.34:1433;DatabaseName=SysDBsx
// jdbc.username=sa
// jdbc.password=Drp123