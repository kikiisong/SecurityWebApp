function filterDate() {
    const picked_day = document.getElementById("picked_day").value;
    console.log(picked_day);
    $.ajax({
        type: "GET",
        url: "https://security-jhu-app.herokuapp.com/incidents-today?" + "&picked_day" + picked_day,
        success: function (data) {
            //We remove the old markers
            console.log(JSON.stringify(data));
            // console.log(data);
            // var jsonObj = $.parseJSON(data),
            //     i;
            var obj = JSON.stringify(data);
            console.log("obj");
            var myobj = JSON.parse(obj);
            console.log(myobj);
            // console.log(document.getElementById("id").innerHTML = myobj.longitude);
            // beaches =[];//Erasing the beaches array

            //Adding the new ones
            // for(i=0;i < jsonObj.beaches.length; i++) {
            //     beaches.push(jsonObj.beaches[i]);
            // }

            //Adding them to the map
            // setMarkers(map, beaches);
        }
    });
    console.log("test")
}


//var SubmitButton = document.getElementById("Submit");
//SubmitButton.addEventListener('click', filterDate());