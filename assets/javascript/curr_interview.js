// Getting elements

const studentMails = document.getElementsByClassName("student-interview-result-email");
const statusBox = document.getElementById("curr-interview-result");

// adding event listeners

for(student of studentMails) {
    student.addEventListener('click', showStatus);
}

// function

function showStatus() {
    let studentStatus = this.getAttribute("student-result");
    statusBox.innerText = studentStatus; 
}