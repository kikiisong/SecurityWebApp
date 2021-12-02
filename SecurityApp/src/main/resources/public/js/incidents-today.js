function filterDate() {
    const picked_day = document.getElementById("picked_day").value;
    fetch('https://security-jhu-app.herokuapp.com/incidents-today?&picked_day=' + picked_day, {
            method: 'GET',
        }
    ).then(res => window.location.reload = window.location.reload(true));
}

var SubmitButton = document.getElementById("Submit");
SubmitButton.addEventListener('click', filterDate());