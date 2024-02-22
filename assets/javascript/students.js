// Getting elements and declearing variables

const showListBtn = document.getElementById("show-list");
const addStudentBtn = document.getElementById("add-student");
const addStudentContainer = document.getElementById("add-student-container");
const studentListContainer = document.getElementById("student-list-container");
let checkButton = addStudentBtn;

// the functions

(() => {
    studentListContainer.style.display = "none";
})();

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

addStudentBtn.addEventListener('click', changeTask);
showListBtn.addEventListener('click', changeTask);