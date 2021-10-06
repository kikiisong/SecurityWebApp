# Security Web Application
## Application Background
Public safety has always been a concern for citizens, especially who live in bad neighborhoods.
We aim to provide users an precise way to view, report, and analyze security incidents. Our clients would mainly be Baltimore citizens, especially JHU students and faculty.
## Final Expected Functions
A security alert web app where users can view, score, and report incidents in near neighborhoods. The app will also have social functions for users to discuss incidents and watch lives.
## Iteration 1 (due 10/05 11PM)
1. Documentation: We finished software spesification (SRS) document, unified modeling language (UML) design, and project planning on 09/28. We then refined them before 10/05. 
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
1. Switch to iteration-1 branch and clone the repo to local. 
2. Change directory to project directory.
3. Run "cd frontend" to change directory to frontend.
4. Use your installed browser to open "frontend.html", you should see a map interface with post form.
