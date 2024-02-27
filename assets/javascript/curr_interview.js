// Getting elements

const studentMails = document.getElementById("interview-student-email");
const statusBox = document.getElementById("curr-interview-result");

// adding event listeners

studentMails.addEventListener('change', showStatus);

// function

function showStatus() {
    let selectedOption = this.options[this.selectedIndex];
    let studentStatus = selectedOption.getAttribute("student-result");
    statusBox.innerText = studentStatus; 
}