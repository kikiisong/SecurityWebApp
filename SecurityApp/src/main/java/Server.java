import model.User;
import model.Incident;

import spark.ModelAndView;
import spark.Spark;
import spark.template.velocity.VelocityTemplateEngine;
import com.google.gson.Gson;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.table.TableUtils;
import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.support.ConnectionSource;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.DriverManager;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class Server {

    private static Dao getIncidentORMLiteDao() throws SQLException {
        final String URI = "jdbc:sqlite:./SecurityApp.db";  // change to postgres later
        ConnectionSource connectionSource = new JdbcConnectionSource(URI);
        TableUtils.createTableIfNotExists(connectionSource, Incident.class);
        return DaoManager.createDao(connectionSource, Incident.class);
    }

    public static void importDatafromCSV() {
        List<Incident> ls = null;
        try {
            ls = getIncidentORMLiteDao().queryForAll();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        if (ls.isEmpty()) {
            try (BufferedReader br = new BufferedReader(new FileReader("resources/Part1_Crime_data.csv"))) {
                String line = br.readLine();
                int i = 0;

                SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss", Locale.US);
                formatter.setTimeZone(TimeZone.getTimeZone("America/New_York"));

                // reads the latest 500 incidents from .csv file
                while ((line = br.readLine()) != null && i <= 500) {
                    String[] values = line.split(",");
                    float longtitude = Float.valueOf(values[13]);
                    float latitude = Float.valueOf(values[12]);
                    Date dateAndTime = formatter.parse(values[3]);
                    System.out.println(dateAndTime.toString());
                    String description = values[6];
                    String location = values[5];

                    Incident incident = new Incident(longtitude, latitude, description, 1, dateAndTime, location, null);
                    getIncidentORMLiteDao().create(incident);

                    i++;

                }
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
    }


    public static void main(String[] args) {


        importDatafromCSV();

        final int PORT_NUM = 7000;
        Spark.port(PORT_NUM);
        Spark.staticFiles.location("/public");


        // render and return homepage
        Spark.get("/", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/mainpage.vm");
        }, new VelocityTemplateEngine());
        Spark.get("/intro", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/intro.vm");
        }, new VelocityTemplateEngine());
        Spark.get("/login", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/login.vm");
        }, new VelocityTemplateEngine());
        Spark.get("/signup", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/signup.vm");
        }, new VelocityTemplateEngine());
        Spark.get("/contact", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/contact.vm");
        }, new VelocityTemplateEngine());
        /*Spark.get("/newpage", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/newpage.vm");
        }, new VelocityTemplateEngine());*/
        Spark.get("/newpage", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            List<Incident> ls = getIncidentORMLiteDao().queryForAll();
            model.put("incidents", ls);
            return new ModelAndView(model, "public/newpage.vm");
        }, new VelocityTemplateEngine());

        Spark.get("/account", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/account.vm");
        }, new VelocityTemplateEngine());


        // CHANGE THIS
        // need to use the correct element id
        Spark.post("/newpage", (req, res) -> {
            String firstName = req.queryParams("firstName");
            String lastName = req.queryParams("lastName");
            String longitude = req.queryParams("longitude");
            String latitude = req.queryParams("latitude");
            String description = req.queryParams("description");
            String location = req.queryParams("address");
            String crimecode = req.queryParams("crimecode");
            String name = firstName + lastName;
            User user = new User(name);
            Incident incident = new Incident(Float.parseFloat(latitude),Float.parseFloat(longitude),description,Integer.valueOf(crimecode), null,location,user);
            getIncidentORMLiteDao().create(incident);
            System.out.println(incident);
            res.status(201);
            res.type("application/json");
            return new Gson().toJson(incident.toString());
        });


    }
}
