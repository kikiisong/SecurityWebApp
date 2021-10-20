package model;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

import java.util.Date;
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
    private Date dateAndTime; //TODO later: should date be from java.util or java.sql?
    @DatabaseField//(canBeNull = false)
    private String location;
    @DatabaseField(foreign = true)
    private User user;

    public Incident() {
    }

    public Incident(Float longtitude, Float latitude, String description, Date dateAndTime, String location, User user) {
        this.longtitude = longtitude;
        this.latitude = latitude;
        this.description = description;
        this.dateAndTime = dateAndTime;
        this.location = location;
        this.user = user;
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

    public Date getDateAndTime() {
        return dateAndTime;
    }

    public String getLocation() {
        return location;
    }

    public User getUser() {
        return user;
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

    public void setDateAndTime(Date dateAndTime) {
        this.dateAndTime = dateAndTime;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Incident incident = (Incident) o;
        return id == incident.id && longtitude == incident.longtitude && incident.latitude == latitude
                && description.equals(incident.description) && Objects.equals(dateAndTime, incident.dateAndTime)
                && location.equals(incident.location) && Objects.equals(user, incident.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, longtitude, latitude, description, dateAndTime, location, user);
    }

    @Override
    public String toString() {
        return "Incident{" +
                "id=" + id +
                ", longtitude=" + longtitude +
                ", latitude=" + latitude +
                ", description='" + description + '\'' +
                ", dateAndTime=" + dateAndTime +
                ", location='" + location + '\'' +
                ", user=" + user +
                '}';
    }
}