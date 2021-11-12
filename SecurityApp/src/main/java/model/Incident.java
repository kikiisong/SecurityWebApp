package model;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

import java.util.Date;
import java.util.Locale;
import java.util.Objects;

@DatabaseTable(tableName = "incidents")
public class Incident {
    @DatabaseField(generatedId = true, columnName = "id")
    private Integer id;
    @DatabaseField//(canBeNull = false)
    private Float longtitude;
    @DatabaseField//(canBeNull = false)
    private Float latitude;
    @DatabaseField//(canBeNull = false)
    private String description;
    @DatabaseField//(canBeNull = false)
    private int crimeCode;
    @DatabaseField//(canBeNull = false)
    private String dateAndTime; //TODO later: should date be from java.util or java.sql?
    @DatabaseField//(canBeNull = false)
    private String location;
    @DatabaseField(foreign = true)
    private int userid;

    public Incident() {
    }

    public Incident(Float longtitude, Float latitude, String description, int crimeCode, String dateAndTime, String location, int userid) {
        this.longtitude = longtitude;
        this.latitude = latitude;
        this.description = description;
        if(crimeCode == 0)
            this.crimeCode = getCrimeCode(description);
        else
            this.crimeCode=crimeCode;
        this.dateAndTime = dateAndTime;
        this.location = location;
        this.userid = userid;
    }

    private int getCrimeCode(String description)
    {
        description = description.toLowerCase();
        if (description.contains("shot") || description.contains("shoot") || description.contains("fired") || description.contains ("gun") || description.contains("bullet"))
        {
            return 9;
        }
        else if (description.contains("murder") || description.contains("homicide") || description.contains("killed") || description.contains("died"))
        {
            return 1;
        }
        else if (description.contains("rape") || description.contains("sexual") || description.contains("inappropriate") ||description.contains("molest") || description.contains("grope"))
        {
            return 2;
        }
        else if ((description.contains("home") || description.contains("house") || description.contains("property") || description.contains("store") || description.contains("office") || description.contains("room")) &&  (description.contains("rob") || description.contains("break")))
        {
            return 5;
        }
        else if (description.contains("set fire") || description.contains("torch") || description.contains("burn") || description.contains("lit"))
        {
            return 8;
        }
        else if (description.contains("bag") || description.contains("wallet") || description.contains("card") ||description.contains("bag") ||description.contains("phone") ||description.contains("snatch") ||description.contains("key") ||description.contains("watch"))
        {
            return 6;
        }
        else if (description.contains("car") || description.contains("bike") || description.contains("van") || description.contains("truck") || description.contains("scooter"))
        {
            return 7;
        }
        else if (description.contains("rob") || description.contains("theft") || description.contains("demand") || description.contains("larceny"))
        {
            return 3;
        }
        else if (description.contains("assault") || description.contains("hit") || description.contains("beat") || description.contains("threw") || description.contains("punch") || description.contains("kick"))
        {
            return 4;
        }

        return 1; //TODO: check do we have every type from .csv?
    }

    public Integer getId() {
        return id;
    }

    public Float getLongtitude() {
        return longtitude;
    }

    public Float getLatitude() {
        return latitude;
    }

    public String getDescription() {
        return description;
    }
    public int getCrimeCode() {
        return crimeCode;
    }

    public String getDateAndTime() {
        return dateAndTime;
    }

    public String getLocation() {
        return location;
    }

    public int getUserid() {
        return userid;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setLongtitude(Float longtitude) {
        this.longtitude = longtitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public void setCrimeCode(int crimeCode) {
        this.crimeCode=crimeCode;
    }

    public void setDateAndTime(String dateAndTime) {
        this.dateAndTime = dateAndTime;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setUser(int userid) {
        this.userid = userid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Incident incident = (Incident) o;
        return id == incident.id && longtitude == incident.longtitude && incident.latitude == latitude
                && description.equals(incident.description) && incident.crimeCode==crimeCode && incident.dateAndTime==dateAndTime
                && location.equals(incident.location) && Objects.equals(userid, incident.userid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, longtitude, latitude, description, crimeCode, dateAndTime, location, userid);
    }

    @Override
    public String toString() {
        return "Incident{" +
                "id=" + id +
                ", longtitude=" + longtitude +
                ", latitude=" + latitude +
                ", description='" + description + '\'' +
                ", crimecode='"+crimeCode+'\''+
                ", dateAndTime=" + dateAndTime +
                ", location='" + location + '\'' +
                ", userid=" + userid +
                '}';
    }
}