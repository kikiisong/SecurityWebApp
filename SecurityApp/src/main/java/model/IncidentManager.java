package model;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class IncidentManager {
    public static String selectedDay = new SimpleDateFormat("yyyy/MM/dd").format(new Date());
    public static String selectedMonth = new SimpleDateFormat("yyyy/MM/dd").format(new Date()).substring(0, 7);
    public static String selectedYear = new SimpleDateFormat("yyyy/MM/dd").format(new Date()).substring(0, 4);


    public static int[] countIncidentsByType(List<Incident> incidents)
    {
        int[] result = new int[9];
        for(Incident inc: incidents)
        {
            if(inc.getCrimeCode() == 1)
                result[0]++;
            else if(inc.getCrimeCode() == 2)
                result[1]++;
            else if(inc.getCrimeCode() == 3)
                result[2]++;
            else if(inc.getCrimeCode() == 4)
                result[3]++;
            else if(inc.getCrimeCode() == 5)
                result[4]++;
            else if(inc.getCrimeCode() == 6)
                result[5]++;
            else if(inc.getCrimeCode() == 7)
                result[6]++;
            else if(inc.getCrimeCode() == 8)
                result[7]++;
            else
                result[8]++;
        }

        return result;
    }
}
