Security App SRS Document

**Problem Statement:** A few sentences to describe the problem you are trying to solve, i.e., justify why this software is needed.

Public safety has always been a concern for JHU faculty and students, especially who live in bad neighborhoods. The problem is that the current email alert system isn’t hooked up with users well, alerts either be made too late or left unreported. Users need an accurate and precise way to score and report incidents they meet, and view other incidents occur near them.

**Potential Clients:** Who are influenced by this problem and would benefit from the proposed solution? (i.e. the potential users)

JHU faculty and students would benefit the most, other residents who are outdoor active (dog walk, commute, exercise) will also be potential users.

**Proposed Solution:** Write a few sentences that describe how a software solution will solve the problem described above.

A security alert web app with functions to view, score, and report incidents in near neighborhoods. The app will also have social functions for users to discuss incidents and watch over each other.

**Functional Requirements:** List the (functional) requirements that software needs to have in order to solve the problem stated above. It is useful to try to group the requirements into those that are essential (must have), and those which are non-essential (but nice to have).

**Must have:**
  
As a user, I want to:  
**Iteration 3:**
- **view all incidents so that I know what has happened before on the map using a marker.**
- **view the newly reported incident on the map with a marker distinguished by color.**
- **Be able to determine areas which are safe, moderately safe and unsafe.**

**TO DO in later iterations:**
- post an incident at a specific location on map (for example, drop-down menu giving users an option) so that I can report a new incident without entering location information.
- click a location to send SMS alert text messages to my contacts so that they’ll get notified about the neighborhood. 
- report an issue to the campus security so that I don’t have to learn how to report to campus security. 
- rate the level of severity of an incident so that a more accurate score can be calculated. 
- receive a notification of incidents and its details so that I know more about real-time danger. 
- sign-up and login (provide details) to use social components so that I could explore more about the app. 

**Done:**
 - view a map interface so that I am familiar with the environment in the neighborhood.
 - user able to report a new incident.
 - marker pops up on the map when an icident is reported.
 - user able to view previously reported incidents.

**Nice to have:**

As a user, I want to:
- view real time alert on browser so that I know the most recent dangers. 
- have different colored pins for different dangerous/safety levels on the map so that it's easier to read the map. 
- plan routes based on the level of safety and time so that I can find the safest route to travel. 
- ask follow-up questions for an incident so that I know details about the case. 
- comment on a report regarding the incident so that I can interact with other users. 
- upload photos/videos of neighborhoods. 
- watch live updates about ongoing incidents so that I can learn more information 3D.

**Software Architecture:**
1.	As an incident report system, I want an incident scale system to score incidents to different severity so that low-risk and high-risk incidents can be differentiated. (3rd party crime report can be used)
2.	As a social component of the web app, I want an authentication system so that only authorized users can interact with posts and comments.
3.	As a front end, I want a map API so that I can visualize data on a map.
