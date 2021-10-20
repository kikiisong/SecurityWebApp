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

import java.sql.SQLException;
import java.sql.Connection;
import java.sql.DriverManager;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Server {

    private static Dao getIncidentORMLiteDao() throws SQLException {
        final String URI = "jdbc:sqlite:./SecurityApp.db";  // implement later
        ConnectionSource connectionSource = new JdbcConnectionSource(URI);
        TableUtils.createTableIfNotExists(connectionSource, Incident.class);
        return DaoManager.createDao(connectionSource, Incident.class);
    }



    public static void main(String[] args) {

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
            float longtitude = 100.00F;
            float latitude = 200.000F;
            String description = req.queryParams("description");
            String location = req.queryParams("address");;
            String name = firstName + lastName;
            User user = new User(name);
            Incident incident = new Incident(longtitude,latitude,description, null,location,user);
            getIncidentORMLiteDao().create(incident);
            System.out.println(incident);
            res.status(201);
            res.type("application/json");
            return new Gson().toJson(incident.toString());
        });


    }
}
