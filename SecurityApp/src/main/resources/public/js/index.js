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
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);

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
function codeAddress() {
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
      '<h1 id="firstHeading" class="firstHeading">Incident</h1>' +
      '<div id="bodyContent">' +
      "<h2> Location of the incident </h2>" + address +"<p></p>"+
      "<h3> Description of the incident </h3>"+  description +
      "</div>" + "</div>";
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      var latitude = results[0].geometry.location.lat();

      var longitude = results[0].geometry.location.lng();
      const position = { lat:latitude, lng: longitude };

      // map.setCenter(results[0].geometry.location);
      // console.log(results[0].geometry.location);
      // get type from db
      // db number -> switch case
      // "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      // "http://maps.google.com/mapfiles/ms/icons/grey-dot.png"
      // "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
      // "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
      // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      // "http://maps.google.com/mapfiles/ms/icons/white-dot.png"
      // "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
      // "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      // "http://maps.google.com/mapfiles/ms/icons/brown-dot.png";


      const image =
      "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      var marker = new google.maps.Marker({
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
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const description = document.getElementById("description").value;
      const date = document.getElementById("date").value;
      const address = document.getElementById("address").value;
      const crimecode = predictCrimeCode();


      fetch('http://localhost:7000/newpage?'+ "&firstName" + firstName +"&lastName"+ lastName + "&date=" + date + "&description=" + description + "&address=" + address + "&latitude=" + latitude+ "&longitude=" + longitude+ "&crimecode=" + crimecode, {
            method: 'POST',
          }
      ).then();
      console.log("FETCHED");

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  document.getElementById("myForm").style.display = "none";
  //alert("Successfully added your incident! Check map to see incident marker")


}

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
// document.getElementById("addButton").addEventListener("click", codeAddress);



// import MarkerClusterer, { MarkerClustererOptions } from '@google/markerclustererplus'

