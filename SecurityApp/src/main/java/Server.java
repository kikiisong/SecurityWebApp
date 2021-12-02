import model.User;
import model.Incident;

import spark.ModelAndView;
import spark.Spark;
import spark.template.velocity.VelocityTemplateEngine;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

import static spark.Spark.port;

import com.sun.mail.smtp.SMTPTransport;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class Server {

    //To the add incident from form to the database
    private static void addIncident(float longitude, float latitude, String descriptions, int crimeCode, String date1, String location ) {
        String sql= "";
        try (Connection conn = getConnection()) {
            // Create prepared statement to insert into db
            PreparedStatement st = conn.prepareStatement("INSERT INTO incidents(longitude,latitude,description,crimeCode,dateAndTime, location,user_id) VALUES(?,?,?,?,?,?,?);");
            st.setFloat(1, longitude);
            st.setFloat(2, latitude);
            st.setString(3, descriptions);
            st.setInt(4, crimeCode);
            st.setString(5, date1);
            st.setString(6, location);
            st.setInt(7, 1);
            st.executeUpdate();

            // Notify users of incident reports in real-time
            SendEmailNotification();
        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
    }

    // method to notify all users of incident reports
    private static void SendEmailNotification() throws SQLException {
        // get emails from users table in postgresql database
        ResultSet emails = getUserEmails();
        List<String> rowValues = new ArrayList<String>();
        while (emails.next()) {
            rowValues.add(emails.getString(1));
        }

        // send email notifications
        final String SMTP_SERVER = "smtp server ";
        final String USERNAME = "";
        final String PASSWORD = "csq@4132322";

        final String EMAIL_FROM = "paipipiiya@gmail.com";
        final String EMAIL_TO = "caosiqi1@gmail.com, scao16@jhu.edu";
        final String EMAIL_TO_CC = "";

        final String EMAIL_SUBJECT = "Test Send Email via SMTP";
        final String EMAIL_TEXT = "Hello Java Mail \n ABC123";

        Properties prop = System.getProperties();
        prop.put("mail.smtp.host", SMTP_SERVER); //optional, defined in SMTPTransport
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.port", "25"); // default port 25

        Session session = Session.getInstance(prop, null);
        Message msg = new MimeMessage(session);

        try {

            // from
            msg.setFrom(new InternetAddress(EMAIL_FROM));

            // to
            msg.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(EMAIL_TO, false));

            // cc
            msg.setRecipients(Message.RecipientType.CC,
                    InternetAddress.parse(EMAIL_TO_CC, false));

            // subject
            msg.setSubject(EMAIL_SUBJECT);

            // content
            msg.setText(EMAIL_TEXT);

            msg.setSentDate(new Date());

            // Get SMTPTransport
            SMTPTransport t = (SMTPTransport) session.getTransport("smtp");

            // connect
            t.connect(SMTP_SERVER, USERNAME, PASSWORD);

            // send
            t.sendMessage(msg, msg.getAllRecipients());

            System.out.println("Response: " + t.getLastServerResponse());

            t.close();

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    // Get email info for users
    private static ResultSet getUserEmails() {
        String query = "SELECT email FROM users;";
        ResultSet emails = null;
        try (Connection conn = getConnection()) {
            PreparedStatement st = conn.prepareStatement(query);
            st.execute();
            emails = st.getResultSet();
        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
        return emails;
    }

    //to add a new user to db after google sign-up
    private static void addUser(String name, String email ) {
        try (Connection conn = getConnection()) {
            PreparedStatement st = conn.prepareStatement("INSERT INTO users(name,email) VALUES (?,?);");
            st.setString(1, name);
            st.setString(2, email);
            st.executeUpdate();

        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
    }
    //to get all the incidents within the DB
    private static ResultSet getIncidents() {
        ResultSet incidents = null;
        try (Connection conn = getConnection()) {

            PreparedStatement st = conn.prepareStatement("SELECT * FROM incidents;");
            st.execute();
            incidents = st.getResultSet();

        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
        return incidents;
    }

    //to select Incidents happened today
    private static ResultSet getIncidentsToday() {
        ResultSet incidents = null;
        try (Connection conn = getConnection()) {
            PreparedStatement st = conn.prepareStatement("SELECT * FROM incidents WHERE dateAndTime LIKE '2021/09/22%';");
            st.execute();
            incidents = st.getResultSet();

        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
        return incidents;
    }

    //to select Incidents based on type
    //TODO: select use crimecode
    private static ResultSet getIncidentsByType() {
        ResultSet incidents = null;
        try (Connection conn = getConnection()) {
            PreparedStatement st = conn.prepareStatement("SELECT * FROM incidents WHERE description='LARCENY';");
            st.execute();
            incidents = st.getResultSet();

        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
        return incidents;
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


        Spark.get("/", (req, res) -> {
            Map<String, Object> model = new HashMap<>();

            ResultSet rs = getIncidents();
            List<Incident> ls = new ArrayList<Incident>();
            while (rs.next()) {
                ls.add(new Incident(rs.getFloat(2),rs.getFloat(3),rs.getString(4),rs.getInt(5),rs.getString(6),rs.getString(7),rs.getInt(8)));
            }
            model.put("incidents", ls);
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


        Spark.get("/incidents", (req, res) -> {
            Map<String, Object> model = new HashMap<>();

            ResultSet rs = getIncidents();
            List<Incident> ls = new ArrayList<Incident>();
            while (rs.next()) {
                ls.add(new Incident(rs.getFloat(2),rs.getFloat(3),rs.getString(4),rs.getInt(5),rs.getString(6),rs.getString(7),rs.getInt(8)));
            }
            model.put("incidents", ls);
            return new ModelAndView(model, "public/incidents.vm");
        }, new VelocityTemplateEngine());

        Spark.get("/account", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/account.vm");
        }, new VelocityTemplateEngine());


        Spark.post("/mainpage", (req, res) -> {
            String firstName = req.queryParams("firstName");
            String lastName = req.queryParams("lastName");
            String longitude = req.queryParams("latitude");
            String latitude = req.queryParams("longitude");
            String description = req.queryParams("description");
            String location = req.queryParams("address");
            String crimecode = req.queryParams("crimecode");
            String date=req.queryParams("date");
            String name = firstName + lastName;

            addIncident(Float.parseFloat(latitude),Float.parseFloat(longitude),description,Integer.valueOf(crimecode), date,location);

            res.status(201);
            res.type("application/json");
            return 1;
        });
        Spark.post("/login", (req, res) -> {
            String name = req.queryParams("name");
            String email = req.queryParams("email");
            addUser(name,email);
            res.status(201);
            res.type("application/json");
            return 1;

        });
        Spark.get("/incidents-today", (req, res) -> {
            Map<String, Object> model = new HashMap<>();

            ResultSet rs = getIncidentsToday();
            List<Incident> ls = new ArrayList<Incident>();
            while (rs.next()) {
                ls.add(new Incident(rs.getFloat(2),rs.getFloat(3),rs.getString(4),rs.getInt(5),rs.getString(6),rs.getString(7),rs.getInt(8)));
            }
            model.put("incidents", ls);
            return new ModelAndView(model, "public/incidents-today.vm");
        }, new VelocityTemplateEngine());
        Spark.get("/incidents-this-week", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/incidents-this-week.vm");
        }, new VelocityTemplateEngine());
        Spark.get("/incidents-this-month", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            return new ModelAndView(model, "public/incidents-this-month.vm");
        }, new VelocityTemplateEngine());

    }

    private static void workWithDatabase(){
        try (Connection conn = getConnection()) {
            String sql_inc = "";
            String sql_user = "";

            if ("SQLite".equalsIgnoreCase(conn.getMetaData().getDatabaseProductName())) { // running locally
                sql_inc = "CREATE TABLE IF NOT EXISTS incidents (id SERIAL PRIMARY KEY, " +
                        "longitude DECIMAL NOT NULL, latitude DECIMAL NOT NULL, description VARCHAR(10000), " +
                        "crimeCode INTEGER NOT NULL, dateAndTime VARCHAR(100) NOT NULL, location VARCHAR(100) NOT NULL, " +
                        //"user_id INTEGER FOREIGN KEY);";
                        "user_id INTEGER NOT NULL);";
                sql_user = "CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, name VARCHAR(100));";
            }
            else {
                sql_inc = "CREATE TABLE IF NOT EXISTS incidents (id SERIAL PRIMARY KEY, " +
                        "longitude DECIMAL NOT NULL, latitude DECIMAL NOT NULL, description VARCHAR(10000), " +
                        "crimeCode INTEGER NOT NULL, dateAndTime VARCHAR(100) NOT NULL, location VARCHAR(100) NOT NULL, " +
                        // "user_id INTEGER FOREIGN KEY);";
                        "user_id INTEGER NOT NULL);";
                sql_user = "CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, name VARCHAR(100));";
            }

            Statement st = conn.createStatement();
            st.execute(sql_inc);
            st.execute(sql_user);

        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
    }

    //create connection to DB
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
