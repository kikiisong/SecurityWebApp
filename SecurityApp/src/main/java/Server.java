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
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

import static spark.Spark.port;
import static spark.Spark.get;

public class Server {

//    private static Dao getIncidentORMLiteDao() throws SQLException {
//        final String URI = "jdbc:sqlite:./SecurityApp.db";  // change to postgres later
//        ConnectionSource connectionSource = new JdbcConnectionSource(URI);
//        TableUtils.createTableIfNotExists(connectionSource, Incident.class);
//        return DaoManager.createDao(connectionSource, Incident.class);
//    }

    private static void addIncident(float longitude, float latitude, String descriptions, int crimeCode, String date1, String location ) {
        String sql= "";
        try (Connection conn = getConnection()) {
            //Statement st = conn.createStatement();
            PreparedStatement st = conn.prepareStatement("INSERT INTO incidents(longitude,latitude,description,crimeCode,dateAndTime, location,user_id) VALUES(?,?,?,?,?,?,?);");
            st.setFloat(1, longitude);
            st.setFloat(2, latitude);
            st.setString(3, descriptions);
            st.setInt(4, crimeCode);
            st.setString(5, date1);
            st.setString(6, location);
            st.setInt(7, 1);
            st.executeUpdate();

            /*sql = "INSERT INTO incidents(longitude, latitude,description, crimeCode, dateAndTime, location,)" +
                    " VALUES ('"+ longitude+"','" +latitude+"','"+ descriptions+"',"+ crimeCode+",'"+date1+"','" +location+"');";
            st.execute(sql);*/

        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
    }
    private static ResultSet showIncident() {
        String sql= "";
        ResultSet incident=null;
        try (Connection conn = getConnection()) {
            //Statement st = conn.createStatement();
            PreparedStatement st = conn.prepareStatement("SELECT * FROM incidents;");
            st.execute();
            incident = st.getResultSet();


            /*sqlx = "INSERT INTO incidents(longitude, latitude,description, crimeCode, dateAndTime, location,)" +
                    " VALUES ('"+ longitude+"','" +latitude+"','"+ descriptions+"',"+ crimeCode+",'"+date1+"','" +location+"');";
            st.execute(sql);*/


        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
        return incident;
    }

    public static void importDatafromCSV() {
        List<Incident> ls = null;

        if (ls == null) {
            try (BufferedReader br = new BufferedReader(new FileReader("/Part1_Crime_data.csv"))) {
                String line = br.readLine();
                int i = 0;

                SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss", Locale.US);
                formatter.setTimeZone(TimeZone.getTimeZone("America/New_York"));

                // reads the latest 500 incidents from .csv file
                while ((line = br.readLine()) != null && i <= 500) {
                    String[] values = line.split(",");
                    float longitude = Float.valueOf(values[13]);
                    float latitude = Float.valueOf(values[12]);
                    String dateAndTime = String.valueOf(values[3]);
                    String description = values[6];
                    String location = values[5];
                    int crimeCode = Integer.parseInt(values[0]);


//                    Incident incident = new Incident(longitude, latitude, description, 0, dateAndTime, location, 2);
                    addIncident( longitude,  latitude,  description,  crimeCode, dateAndTime, location);

                    i++;

                }
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    static int PORT = 7000;
    private static int getPort() {
        String herokuPort = System.getenv("PORT");
        if (herokuPort != null) {
            PORT = Integer.parseInt(herokuPort);
        }
        return PORT;
    }

    public static void main(String[] args) {

        port(getPort());
        workWithDatabase();
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

            ResultSet rs=showIncident();
            List<Incident> ls = new ArrayList<Incident>();
            while (rs.next()) {
                ls.add(new Incident(rs.getFloat(2),rs.getFloat(3),rs.getString(4),rs.getInt(5),rs.getString(6),rs.getString(7),rs.getInt(8)));
            }
            model.put("incidents", ls);
            return new ModelAndView(model, "public/newpage.vm");
        }, new VelocityTemplateEngine());

        Spark.get("/account", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/account.vm");
        }, new VelocityTemplateEngine());

        Spark.get("/newpage", (req, res) -> {
            ResultSet rs=showIncident();
            List<Incident> ls = new ArrayList<Incident>();

            while (rs.next()) {
                ls.add(new Incident(rs.getFloat(2),rs.getFloat(3),rs.getString(4),rs.getInt(5),rs.getString(6),rs.getString(7),rs.getInt(8)));
            }
            String json = new Gson().toJson(ls);
            res.type("application/json");
            return ls;
        });
        // CHANGE THIS
        // need to use the correct element id
        Spark.post("/newpage", (req, res) -> {
            String firstName = req.queryParams("firstName");
            String lastName = req.queryParams("lastName");
            String longitude = req.queryParams("latitude");
            String latitude = req.queryParams("longitude");
            String description = req.queryParams("description");
            String location = req.queryParams("address");
            String crimecode = req.queryParams("crimecode");
            String date=req.queryParams("date");
            String name = firstName + lastName;
            // Date date1 = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss").parse(date);
            // User user = new User(name);
            addIncident(Float.parseFloat(latitude),Float.parseFloat(longitude),description,Integer.valueOf(crimecode), date,location);
            //getIncidentORMLiteDao().create(incident);
            //System.out.println(incident);
            res.status(201);
            res.type("application/json");
            return 1;
        });

        importDatafromCSV();
    }
    private static void workWithDatabase(){
        try (Connection conn = getConnection()) {
            String sql_inc = "";
            String sql_user = "";

//            if ("SQLite".equalsIgnoreCase(conn.getMetaData().getDatabaseProductName())) { // running locally
//                sql_inc = "CREATE TABLE IF NOT EXISTS incidents (id SERIAL PRIMARY KEY, " +
//                        "longitude DECIMAL NOT NULL, latitude DECIMAL NOT NULL, description VARCHAR(10000), " +
//                        "crimeCode INTEGER NOT NULL, dateAndTime VARCHAR(100) NOT NULL, location VARCHAR(100) NOT NULL, " +
//                        //"user_id INTEGER FOREIGN KEY);";
//                        "user_id INTEGER NOT NULL);";
//                sql_user = "CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, name VARCHAR(100));";
//            }
//            else {
            sql_inc = "CREATE TABLE IF NOT EXISTS incidents (id SERIAL PRIMARY KEY, " +
                    "longitude DECIMAL NOT NULL, latitude DECIMAL NOT NULL, description VARCHAR(10000), " +
                    "crimeCode INTEGER NOT NULL, dateAndTime VARCHAR(100) NOT NULL, location VARCHAR(100) NOT NULL, " +
                    // "user_id INTEGER FOREIGN KEY);";
                    "user_id INTEGER NOT NULL);";
            sql_user = "CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, name VARCHAR(100));";
        // }

            Statement st = conn.createStatement();
            st.execute(sql_inc);
            st.execute(sql_user);

            //sql_inc = "INSERT INTO incidents(id, longitude, latitude, description, crimeCode, dateAndTime, location, user_id)" +
              //      " VALUES (1, 39.3299, 76.6205, 'Robbery', 3,'1999-01-08 04:05:06', 'Johns Hopkins University', 100);";
            //st.execute(sql_inc);
             //st.execute(sql_user);

        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
    }
    private static Connection getConnection() throws URISyntaxException, SQLException {
        String databaseUrl = System.getenv("DATABASE_URL" +
                "");
        if (databaseUrl == null) {
            // Not on Heroku, so use SQLite
            return DriverManager.getConnection("jdbc:sqlite:./SecurityApp.db");
        }

        URI dbUri = new URI(databaseUrl);

        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':'
                + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

        return DriverManager.getConnection(dbUrl, username, password);
    }
}
