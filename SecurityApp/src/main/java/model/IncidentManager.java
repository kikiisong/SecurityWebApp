package model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
}
