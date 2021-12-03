

var arrMarkers = []
var geocoder;
var map;

function openForm(){
    document.getElementById("myForm").style.display = "block";

}
function closeForm(){
    document.getElementById("myForm").style.display = "none";
}

// Initialize google map interface
function initMap() {

    // The location of Johns Hopkins
    console.log("init map");
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    console.log(findimage(3));

    const hopkins = { lat: 39.329903, lng: -76.620522 };

    // The map, centered at Johns Hopkins
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: hopkins,
    });

    // The marker, positioned at Johns Hopkins
    const marker = new google.maps.Marker({
        position: hopkins,
        map: map,
    });
}

// create markers based on the address provided by user
function codeAddress() {
    if (!checkIfLoggedIn()){
        alert("please log in");
    }
    else{
        console.log("codeAddress1");
        var address = document.getElementById('address').value;
        var description = document.getElementById('description').value;

        console.log("calling code address function");

        // Adding description box for marker
        const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            "<p2> Incident </p2>"+
            '<div id="bodyContent">' +
            "<p2> Location of the incident: </p2>" +"<p5>" + address+  "</p5>"  +"<p></p>"+
            "<p3> Description of the incident: </p3>"+ "<p6>" + description + "</p6>"
        "</div>" + "</div>";

        // Finding latitude and longitude based on location
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == 'OK') {
                const latitude = results[0].geometry.location.lat();
                const longitude = results[0].geometry.location.lng();
                const position = { lat:latitude, lng: longitude };
                const crimecode = predictCrimeCode();
                console.log(crimecode);
                const image = findimage(crimecode);

                const infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });

                const marker = new google.maps.Marker({
                    map: map,
                    position: position,
                    icon:image,
                    title:"incident"
                });
                marker.addListener("click", () => {
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                });
                arrMarkers.push(marker);

                const firstName = document.getElementById("firstName").value;
                const lastName = document.getElementById("lastName").value;
                const description = document.getElementById("description").value;
                const date = document.getElementById("date").value;
                const address = document.getElementById("address").value;

                // Sending data to backend
                fetch('https://security-jhu-app.herokuapp.com/mainpage?'+ "&firstName" + firstName +"&lastName"+ lastName + "&date=" + date + "&description=" + description + "&address=" + address + "&latitude=" + latitude+ "&longitude=" + longitude+ "&crimecode=" + crimecode, {
                        method: 'POST',
                    }
                ).then();
                console.log("FETCHED");
                console.log(arrMarkers);
                const imagePath = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m";
                new MarkerClusterer( map, arrMarkers,{imagePath: imagePath} );

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });

    }
    document.getElementById("myForm").style.display = "none";


}

function loadData() {


    /*fetch('https://security-jhu-app.herokuapp.com/incidents-today?' +"&picked_day=" + picked_day)
        .then(res => res.json())
        .then(console.log)
        .then(console.log("start processing data"))*/

    fetch('https://security-jhu-app.herokuapp.com/' ,{
            method: 'GET',
        }
    ).then(
        function(data){

            var incidents = [];
            var obj_list2 = document.getElementById("json");
            var content2 = obj_list2.innerHTML;
            console.log(content2);
            var json = JSON.parse(content2);
            console.log(json);

            for (var i = 0; i < json.length;i++) {
                console.log(json[i]);
                const obj = json[i];
                const incident = {
                    lat: obj.latitude,
                    lng: obj.longtitude,
                    address: obj.location,
                    description: obj.description,
                    crimecode: obj.crimeCode,
                };

                    const contentString =
                        '<div id="content">' +
                        '<div id="siteNotice">' +
                        "</div>" +
                        // '<h1 id="firstHeading" class="firstHeading">Incident</h1>' +
                        "<p2> Incident </p2>" +
                        '<div id="bodyContent">' +
                        "<p2> Location of the incident: </p2>" + "<p5>" + obj.location + "</p5>" + "<p></p>" +
                        "<p3> Description of the incident: </p3>" + "<p6>" + obj.description + "</p6>"
                    "</div>" + "</div>";
                    console.log(obj.latitude);
                    console.log(obj.longtitude);
                    const position = {lat: obj.latitude, lng: obj.longtitude};
                    const image = findimage(obj.crimeCode);

                    const infowindow = new google.maps.InfoWindow({
                        content: contentString,
                    });
                    console.log("adding markers");
                    const marker = new google.maps.Marker({
                        map: map,
                        position: position,
                        icon: image,
                        title: "incident"
                    });
                    marker.addListener("click", () => {
                        infowindow.open({
                            anchor: marker,
                            map,
                            shouldFocus: false,
                        });
                    });
                    incidents.push(incident);
                    arrMarkers.push(marker);
                }

            console.log("calling marker cluster");
            console.log("arrmarkers",arrMarkers);
            const imagePath = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m";
            var cluster = new MarkerClusterer( map, arrMarkers,{imagePath: imagePath} );
            // console.log(cluster);

            // c
            }

    );
    console.log("FETCHED");
}

//setting color of the marker based on the crime code
function findimage(crimecode){
    var image;
    if (crimecode == 1){
        image =
            "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    }
    else if (crimecode == 2){
        image =
            "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    }
    else if (crimecode ==3) {
        image =
            "http://maps.google.com/mapfiles/ms/icons/pink-dot.png";
    }
    else if (crimecode ==4) {
        image =
            "http://maps.google.com/mapfiles/ms/icons/purple-dot.png";
    }
    else if (crimecode ==5) {
        image =
            "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
    }
    else if (crimecode ==6) {
        image =
            "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
    else if (crimecode ==7) {
        image =
            "../img/grey-dot.png";
    }
    else if (crimecode ==8) {
        image =
            "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    }
    else if (crimecode ==9) {
        image =
            "http://maps.google.com/mapfiles/ms/micons/ltblue-dot.png";
    }
    return image;
}
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    var name = String(profile.getName());
    var email= String(profile.getEmail());

    // Sending user details to backend
    fetch('https://security-jhu-app.herokuapp.com/login?'+ "&name=" + name +"&email="+ email, {
        method: 'POST',
    }).then(
        document.getElementById("ls").innerHTML = "signed in",

    // res=> window.location.href ="https://security-jhu-app.herokuapp.com/"
    );
    document.getElementById("signoutB").style.display = "";

    console.log("FETCHED");



    var myUserEntity = {};
    myUserEntity.Id = profile.getId();
    console.log(myUserEntity.Id);
    myUserEntity.Name = profile.getName();

    //Store the entity object in sessionStorage where it will be accessible from all pages of your site.
    sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));


}
// <a href="#" onclick="signOut();">Sign out</a>
function signOut() {
    console.log("signing out");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        document.getElementById("ls").innerHTML = "Login"
    });
    document.getElementById("signoutB").style.display = "none";

}


//We predict the crime code based on keywords within the description provided by the user
function predictCrimeCode(){
    let description = document.getElementById("description").value;

    if (description.includes("shot") || description.includes("shoot") || description.includes("fired") || description.includes ("gun") || description.includes("bullet"))
    {
        return 9;
    }
    else if (description.includes("murder") || description.includes("homicide") || description.includes("killed") || description.includes("died"))
    {
        return 1;
    }
    else if (description.includes("rape") || description.includes("sexual") || description.includes("inappropriate") ||description.includes("molest") || description.includes("grope"))
    {
        return 2;
    }
    else if ((description.includes("home") || description.includes("house") || description.includes("property") || description.includes("store") || description.includes("office") || description.includes("room")) &&  (description.includes("rob") || description.includes("break")))
    {
        return 5;
    }
    else if (description.includes("set fire") || description.includes("torch") || description.includes("burn") || description.includes("lit"))
    {
        return 8;
    }
    else if (description.includes("bag") || description.includes("wallet") || description.includes("card") ||description.includes("bag") ||description.includes("phone") ||description.includes("snatch") ||description.includes("key") ||description.includes("watch"))
    {
        return 6;
    }
    else if (description.includes("car") || description.includes("bike") || description.includes("van") || description.includes("truck") || description.includes("scooter"))
    {
        return 7;
    }
    else if (description.includes("rob") || description.includes("theft") || description.includes("demand"))
    {
        return 3;
    }
    else if (description.includes("assault") || description.includes("hit") || description.includes("beat") || description.includes("threw") || description.includes("punch") || description.includes("kick"))
    {
        return 4;
    }
    else
    {
        let crimecode = prompt("What was the crime related too? (1. Homicide 2.Rape 3.Robbery 4.Assault 5.Burglary 6.Larceny 7.Auto Theft 8.Arson 9.Shooting","Please enter a number!",10);
        return crimecode;

    }
}

//to check if the user is logged-in
function checkIfLoggedIn()
{
    if(sessionStorage.getItem('myUserEntity') == null){
        //Redirect to login page, no user entity available in sessionStorage
        window.location.href='https://security-jhu-app.herokuapp.com//login';
        return false;
    } else {
        //User already logged in
        var userEntity = {};
        userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
        // window.location.href = "https://security-jhu-app.herokuapp.com/";
        return true;
    }
}

// //to logout the user
// function logout()
// {
//     console.log("logging out");
//
//     //Don't forget to clear sessionStorage when user logs out
//     sessionStorage.clear();
// }
