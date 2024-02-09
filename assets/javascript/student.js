// Getting elements and declearing variables

const message = document.getElementById("message-container");
const showListBtn = document.getElementById("show-list");
const addStudentBtn = document.getElementById("add-student");
const addStudentContainer = document.getElementById("add-student-container");
const studentListContainer = document.getElementById("student-list-container");
let checkButton = addStudentBtn;

// the functions

(() => {
    studentListContainer.style.display = "none";
})();

function viewNotif() { //To change the notification box's visiblity
    if(message.style.opacity == 0) message.style.opacity = 1;
    else message.style.opacity = 0; 
}

function changeTask() { //TO changee the task the user is doing
    if(this == checkButton) return;
    checkButton = this;
    switch(this) {
        case addStudentBtn: 
            addStudentContainer.style.display = "inline-block";
            studentListContainer.style.display = "none";
            break;
        case showListBtn:
            addStudentContainer.style.display = "none";
            studentListContainer.style.display = "inline-block"
            break;
    }
}

// running the functions

setTimeout(viewNotif, 500); //showing the notification function
setTimeout(viewNotif, 4500); //unshowing the notification function

addStudentBtn.addEventListener('click', changeTask);
showListBtn.addEventListener('click', changeTask);