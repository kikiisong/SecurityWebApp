# Security Web Application
## Application Background
Public safety has always been a concern for citizens, especially for those who live in bad neighborhoods.
We aim to provide users a precise way to view, report and be notified of security incidents. Our intended audience would mainly be Baltimore citizens, especially JHU students and faculty.
## Final Expected Functions
A security alert web app where users can view, score and report incidents in near neighborhoods. The app will also have social functions which allows users to discuss incidents and provide support to each other.
## Iteration 2
1. Documentation: 
    - retrospective: docs/retrospective/it1_retrospective.md
    - srs: docs/srs/srs.md
    - UML: docs/design/it2_class_diagram1.png
    - Project Board updated 
## Iteration 1 (due 10/05 11PM)
1. Documentation: We finished the software spesification (SRS) document, unified modeling language (UML) design, and project planning on 09/28. We then refined them before 10/05. 
2. User Story: In this iteration, we finished one user story that as a user, he/she can view a map interface on a html page so that he/she would know better about neighborhoods. 
3. System Architecture: 
    - We set up branching strategies for the project.
    - We implemented a backend model package with two java classes: User.java and Incident.java
    - We drafted a javaSpark server for hosting web pages in later development.
    - We drafted two JUnit test classes for later testing. 
## Branching and Documents
1. Branching: **main** branch is for bug-free feature release, **iteration-1** branch is the deploy and testing branch in iteration 1, **backend** branch is for backend (server, model and database access) development.
2. Document Tree (for iteration-1 branch): 
    - Old (srs.md) and refined SRS (Iteration-1 User Story.md) are under docs/srs/, old (09/28 Security app UML.png) and refined UML (10/05 Iteration-1-UML.png) is under docs/design/.
    - frontend html page is under frontend/.
    - model package, server and Junit tests are stored under backend/src/.
## Run 
1. Switch to main branch and clone the repo to local. 
2. Go to SecurityApp > src > main > java > Server.java .
3. Run Server.java locally.
4. Use your installed browser to open "localhost:7000", you should be redirected to the user interface of the application.
5. Click on "Report Incident" and fill out the details.
6. Click "Submit"!
7. Marker will be displayed on the map, once the incident is successfully submitted.
8. Go to "Incident History" from the Navigation Bar to see the reported incident.
9. Go to "Contact" from the Navigation Bar to see the contact details of The office of Campus Security.


