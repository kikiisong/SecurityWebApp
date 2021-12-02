
var data = [];

function filterDate() {

    var picked_day = document.getElementById("picked_day").value;
    picked_day = picked_day.split('-').join('/');

    fetch('https://security-jhu-app.herokuapp.com/incidents-today?' + "&picked_day=" + picked_day, {
        method: 'POST',
    }).then(res => window.location.reload = window.location.reload(true));

    /*console.log(date);

    fetch('https://security-jhu-app.herokuapp.com/incidents-today?'+ "&date=" + date ,{
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
    console.log("FETCHED");*/
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
            // console.log(content2);
            // console.log(data);
        }
    );
}



function visualization()
{
        'use strict'
        feather.replace({ 'aria-hidden': 'true' })
        // Graphs
        var ctx = document.getElementById('myChart')
        // eslint-disable-next-line no-unused-vars
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'Murder',
                    'Rape',
                    'Robbery',
                    'Assault',
                    'Burglary',
                    'Larceny',
                    'Auto Theft',
                    'Arson',
                    'Shooting'
                ],
                datasets: [{
                    data: [
                        parseInt(document.getElementById('type1').innerText),
                        21345,
                        parseInt(document.getElementById('type3').innerText),
                        parseInt(document.getElementById('type4').innerText),
                        23489,
                        24092,
                        12034
                    ],
                    lineTension: 0,
                    backgroundColor: 'transparent',
                    borderColor: '#007bff',
                    borderWidth: 4,
                    pointBackgroundColor: '#007bff'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        })
}

//var SubmitButton = document.getElementById("Submit");
//SubmitButton.addEventListener('click', filterDate());