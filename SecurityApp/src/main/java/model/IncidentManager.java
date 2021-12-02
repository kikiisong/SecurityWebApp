package model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class IncidentManager {
    static SimpleDateFormat inputDateFormatter = new SimpleDateFormat("yyyy-mm-dd");
    static SimpleDateFormat outputDateFormatter = new SimpleDateFormat("yyyy/mm/dd");
    public static String selectedDay = "2021/09/22";

    public static void setSelectedDay(String inputDate){
        try {
            Date dateParsed = inputDateFormatter.parse(inputDate);
            selectedDay = outputDateFormatter.format(dateParsed);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

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
