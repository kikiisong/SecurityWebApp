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

      fetch('http://localhost:7000/newpage?'+ "&firstName" + firstName +"&lastName"+ lastName + "&date=" + date + "&description=" + description + "&address=" + address + "&latitude=" + latitude+ "&longitude=" + longitude, {
            method: 'POST',
          }
      ).then();
      console.log("FETCHED");

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  document.getElementById("myForm").style.display = "none";
  alert("Successfully added your incident! Check map to see incident marker")


}
function addIncident(){
// add to the db
}


// document.getElementById("addButton").addEventListener("click", codeAddress);



// import MarkerClusterer, { MarkerClustererOptions } from '@google/markerclustererplus'

