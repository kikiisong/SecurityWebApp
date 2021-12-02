function filterDate() {
    const picked_day = document.getElementById("picked_day").value;
    fetch('https://security-jhu-app.herokuapp.com/incidents-today?' + "&picked_day=" + picked_day, {
            method: 'GET',
        }
    ).then(console.log("test"));
}

var SubmitButton = document.getElementById("Submit");
SubmitButton.addEventListener('click', filterDate());