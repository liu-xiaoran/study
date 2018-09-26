import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.Calendar;

public class Job_Schedule_Test1 {
    public static void main(String[] args) {
        new JobThread().start();
    }
}

class JobThread extends Thread {
    public void run() {
        while (true) {
            System.out.println("Test: " + Calendar.getInstance().getTime());

            try {
                // sleep方法不会释放锁
                Thread.sleep(1000);
            } catch (Exception e) {
            }
        }
    }
}