function filterDate() {

    var picked_day = document.getElementById("picked_day").value;
    picked_day = picked_day.split('-').join('/');

    fetch('https://security-jhu-app.herokuapp.com/incidents-today?' + "&picked_day=" + picked_day, {
        method: 'POST',
    }).then(res => window.location.reload = window.location.reload(true));

}

function loadVisData()
{
    var picked_day = document.getElementById("picked_day").value;
    picked_day = picked_day.split('-').join('/');

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
        }
    );
}

