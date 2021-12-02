function filterDate() {
    const picked_day = document.getElementById("picked_day").value;
    console.log(picked_day);
    /*fetch('https://security-jhu-app.herokuapp.com/incidents-today?' +"&picked_day=" + picked_day)
        .then(res => res.json())
        .then(console.log)
        .then(console.log("start processing data"))*/

    fetch('https://security-jhu-app.herokuapp.com/incidents-today?'+ "&picked_day=" + picked_day ,{
            method: 'GET',
        }
    ).then(
        function(data){
          /*  console.log(data);
            console.log(JSON.stringify(data));
            //         // console.log(data);
            //         var jsonObj = $.parseJSON(data),
            //             i;
            var obj = JSON.stringify(data);
            console.log(obj);*/
            // console.log(document.getElementById("json").value);


            var obj_list2 = document.getElementById("json2");
            var content2 = obj_list2.innerHTML;
            // content2 = content2.slice(2,content2.length-1);
            // content2 = "'"+ content2 + "'";
            // content2 = JSON.stringify(content2);
            console.log(content2);
            var json = JSON.parse(content2);
            console.log(json);
            // json = json.split("}");
            // console.log(json);
            console.log(typeof json);
            // json = json.slice(2,json.length-1);
            //
            // for (var i = 0; i < json.length;i++)
            // {
            //     console.log(json[i]) ;
            // }

            // console.log(content2);


            // console.log(data);
        }
    );
    console.log("FETCHED");

    // $.ajax({
    //     type: "GET",
    //     url: "https://security-jhu-app.herokuapp.com/incidents-today?" + "&picked_day" + picked_day,
    //     success: function (data) {
    //         //We remove the old markers
    //         console.log(JSON.stringify(data));
    //         // console.log(data);
    //         // var jsonObj = $.parseJSON(data),
    //         //     i;
    //         var obj = JSON.stringify(data);
    //         console.log("obj");
    //         var myobj = JSON.parse(obj);
    //         console.log(myobj);
    //         // console.log(document.getElementById("id").innerHTML = myobj.longitude);
    //         // beaches =[];//Erasing the beaches array
    //
    //         //Adding the new ones
    //         // for(i=0;i < jsonObj.beaches.length; i++) {
    //         //     beaches.push(jsonObj.beaches[i]);
    //         // }
    //
    //         //Adding them to the map
    //         // setMarkers(map, beaches);
    //     }
    // });
    console.log("test")
}


//var SubmitButton = document.getElementById("Submit");
//SubmitButton.addEventListener('click', filterDate());