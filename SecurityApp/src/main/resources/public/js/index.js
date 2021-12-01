

// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// const {MarkerClusterer} = require("@googlemaps/markerclusterer");
// const pg = require("pg");
var arrMarkers = []
var geocoder;
var map;
// const {Pool, Client} = require('pg');

function openForm(){
    document.getElementById("myForm").style.display = "block";

}
function closeForm(){
    document.getElementById("myForm").style.display = "none";
}
function initMap() {
    // The location of Uluru
    console.log("init map");
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    console.log(findimage(3));

    const hopkins = { lat: 39.329903, lng: -76.620522 };
    // The map, centered at Uluru
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: hopkins,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: hopkins,
        map: map,
    });
}

function handleSubmit(event) {
    //Write business logic here
}

//create markers based on the address provided by user
function codeAddress() {
    if (!checkIfLoggedIn()){
        alert("please log in");
    }
    else{
        console.log("codeAddress1");
        var address = document.getElementById('address').value;
        var description = document.getElementById('description').value;
        // document.getElementById('address').style.fontSize = "x-large";
        // document.getElementById('description').style.fontSize = "x-large";
        console.log("calling code address function");
        // const contentString = address + "\n" + description;
        const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            // '<h1 id="firstHeading" class="firstHeading">Incident</h1>' +
            "<p2> Incident </p2>"+
            '<div id="bodyContent">' +
            "<p2> Location of the incident: </p2>" +"<p5>" + address+  "</p5>"  +"<p></p>"+
            "<p3> Description of the incident: </p3>"+ "<p6>" + description + "</p6>"
        "</div>" + "</div>";
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == 'OK') {
                var latitude = results[0].geometry.location.lat();

                var longitude = results[0].geometry.location.lng();
                const position = { lat:latitude, lng: longitude };



                const crimecode = predictCrimeCode();
                console.log(crimecode);
                var image = findimage(crimecode);


                const infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });
                var marker = new google.maps.Marker({
                    map: map,
                    position: position,
                    icon:image,
                    title:"incident"
                });
                arrMarkers.push(marker);
                marker.addListener("click", () => {
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                });
                const firstName = document.getElementById("firstName").value;
                const lastName = document.getElementById("lastName").value;
                const description = document.getElementById("description").value;
                const date = document.getElementById("date").value;
                const address = document.getElementById("address").value;



                fetch('https://security-jhu-app.herokuapp.com/mainpage?'+ "&firstName" + firstName +"&lastName"+ lastName + "&date=" + date + "&description=" + description + "&address=" + address + "&latitude=" + latitude+ "&longitude=" + longitude+ "&crimecode=" + crimecode, {
                        method: 'POST',
                    }
                ).then();
                console.log("FETCHED");

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
        //alert("Successfully added your incident! Check map to see incident marker")
    }
    document.getElementById("myForm").style.display = "none";


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
//to logout the user
function logout()
{
    console.log("logging out");

    //Don't forget to clear sessionStorage when user logs out
    sessionStorage.clear();
}
// setInterval(function() {
//     updateTheMarkers();
// }, 5000);
// function removeMarkers(){
//     var i;
//     for(i=0;i<arrMarkers.length;i++){
//         arrMarkers[i].setMap(null);
//     }
//     arrMarkers = [];
//
// }
// function updateTheMarkers(){
//         // var i;
//         // console.log(arrMarkers);
//         // for (i = 0; i < arrMarkers.length;i++){
//         //     console.log(arrMarkers[i]);
//         //
//         // }
//         //
//         // const markerCluster = new MarkerCluster({ arrMarkers, map });
//
//     $.ajax({
//         type: "GET",
//         url: "https://security-jhu-app.herokuapp.com/incidents",
//         success: function (data) {
//             //We remove the old markers
//             removeMarkers();
//             console.log(JSON.stringify(data));
//             // console.log(data);
//             // var jsonObj = $.parseJSON(data),
//             //     i;
//             var obj = JSON.stringify(data);
//             console.log("inside update markers");
//             var myobj = JSON.parse(obj);
//             console.log(myobj);
//             //         // console.log(document.getElementById("id").innerHTML = myobj.longitude);
//             //         // beaches =[];//Erasing the beaches array
//             //
//             //         //Adding the new ones
//             //         // for(i=0;i < jsonObj.beaches.length; i++) {
//             //         //     beaches.push(jsonObj.beaches[i]);
//             //         // }
//             //
//             //         //Adding them to the map
//             //         // setMarkers(map, beaches);
//         }
//     });
//
// }

// anychart.onDocumentRead(function() {
//     var data = [
//         {x: "LARCENY", value: 77073},
//         {x: "COMMON ASSAULT", value: 60450},
//         {x: "BURGLARY", value: 48387},
//         {x: "LARCENY FROM AUTO", value: 45203},
//         {x: "AGG. ASSAULT", value: 40566},
//         {x: "AUTO THEFT", value: 30788},
//         {x: "ROBBERY - STREET", value: 23734},
//         {x: "ROBBERY - COMMERCIAL", value: 6158},
//         {x: "SHOOTING", value: 4680},
//         {x: "ROBBERY - RESIDENCE", value: 3757}
//     ];
//
//
//     // create the chart
//     var chart = anychart.pie();
//
//     // set the chart title
//     chart.title("Population by Race for the United States: 2010 Census");
//
//     // add the data
//     chart.data(data);
//
//     // display the chart in the container
//     chart.container('container');
//     chart.draw();
// });


// start reading the file. When it is done, calls the onload event defined above.

// document.getElementById("addButton").addEventListener("click", codeAddress);



// import MarkerClusterer, { MarkerClustererOptions } from '@google/markerclustererplus'

// function addMarkers() {
//
//     // const contentString = address + "\n" + description;
//
//
//     d3.csv("../js/Part1_Crime_data.csv", function(data) {
//         for (var i  =0; i < 500; i++){
//
//             var latitude = parseFloat(data[i].Latitude);
//             var longitude = parseFloat(data[i].Longitude);
//             var location = data[i].Location;
//             var description = data[i].Description;
//             var crimecodeStr = data[i].CrimeCode.split("");
//             var crimecode =crimecodeStr[0];
//             var date = data[i].CrimeDateTime;
//             console.log(crimecodeStr);
//             console.log(crimecode);
//             fetch('https://security-jhu-app.herokuapp.com/incidents?'+ "&firstName" + firstName +"&lastName"+ lastName + "&date=" + date + "&description=" + description + "&address=" + location + "&latitude=" + latitude+ "&longitude=" + longitude+ "&crimecode=" + crimecode, {
//                     method: 'POST',
//                 }
//             ).then();
//             console.log("FETCHED");
//             var image = findimage(crimecode);
//
//
//             console.log(data[i]);
//             console.log(latitude);
//             console.log(longitude);
//             const position = { lat:latitude, lng: longitude };
//             console.log(position);
//             const contentString =
//                 '<div id="content">' +
//                 '<div id="siteNotice">' +
//                 "</div>" +
//                 // '<h1 id="firstHeading" class="firstHeading">Incident</h1>' +
//                 "<p2> Incident </p2>"+
//                 '<div id="bodyContent">' +
//                 "<p2> Location of the incident: </p2>" +"<p5>" + location+  "</p5>"  +"<p></p>"+
//                 "<p3> Description of the incident: </p3>"+ "<p6>" + description + "</p6>"
//             "</div>" + "</div>";
//
//             var marker = new google.maps.Marker({
//                 map: map,
//                 position: position,
//                 title:"incident",
//                 icon: image,
//
//             });
//             arrMarkers.push(marker);
//             console.log(arrMarkers);
//             const infoWindow = new google.maps.InfoWindow({
//                 content: contentString,
//             });
//              infoWindow.setPosition(position);
//             // console.log(infoWindow);
//             marker.addListener("click", () => {
//                 infoWindow.open({
//                     map,
//                     shouldFocus: false,
//                 });
//             });
//
//         }
//         console.log(data)
//     });
//
//
//
//
//
//     anychart.onDocumentRead(function() {
//         var data = [
//             {x: "LARCENY", value: 77073},
//             {x: "COMMON ASSAULT", value: 60450},
//             {x: "BURGLARY", value: 48387},
//             {x: "LARCENY FROM AUTO", value: 45203},
//             {x: "AGG. ASSAULT", value: 40566},
//             {x: "AUTO THEFT", value: 30788},
//             {x: "ROBBERY - STREET", value: 23734},
//             {x: "ROBBERY - COMMERCIAL", value: 6158},
//             {x: "SHOOTING", value: 4680},
//             {x: "ROBBERY - RESIDENCE", value: 3757}
//         ];
//
//
//         // create the chart
//         var chart = anychart.pie();
//
//         // set the chart title
//         chart.title("Population by Race for the United States: 2010 Census");
//
//         // add the data
//         chart.data(data);
//
//         // display the chart in the container
//         chart.container('container');
//         chart.draw();
//     });
//
// }