function filterDate() {
    var picked_day = document.getElementById("picked_day").value;
    picked_day = picked_day.split('-').join('/');

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


            var obj_list2 = document.getElementById("json2");
            var content2 = obj_list2.innerHTML;
            console.log(content2);
            var json = JSON.parse(content2);
            console.log(json);

            for (var i = 0; i < json.length;i++)
            {
                console.log(json[i]) ;
            }

            // console.log(content2);


            // console.log(data);
        }
    );
    console.log("FETCHED");
}


function visualization()
{

}

//var SubmitButton = document.getElementById("Submit");
//SubmitButton.addEventListener('click', filterDate());