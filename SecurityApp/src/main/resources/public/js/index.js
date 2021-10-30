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
  console.log("calling code address function");
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      var latitude = results[0].geometry.location.lat();

      var longitude = results[0].geometry.location.lng();
      const position = { lat:latitude, lng: longitude };

      // map.setCenter(results[0].geometry.location);
      // console.log(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: position
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

