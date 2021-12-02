function filterDate() {
    var date = document.getElementById("date").value;
    date = date.split('-').join('/');

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


function visualization()
{
        'use strict'
        feather.replace({ 'aria-hidden': 'true' })
        // Graphs
        var ctx = document.getElementById('myChart')
        // eslint-disable-next-line no-unused-vars
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ],
                datasets: [{
                    data: [
                        parseInt(document.getElementById('test').innerText),
                        21345,
                        18483,
                        24003,
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