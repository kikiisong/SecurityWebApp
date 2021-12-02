function filterDate() {
    const date = document.getElementById("picked_day").value;
    fetch('http://localhost:7000/employers?date=' + date, {
            method: 'POST',
        }
    ).then(res => window.location.reload = window.location.reload(true));
}

var SubmitButton = document.getElementById("Submit");
SubmitButton.addEventListener('click', filterDate());