// Getting elements and declearing variables

const showListBtn = document.getElementById("show-list");
const addInterviewBtn = document.getElementById("add-interview");
const addInterviewContainer = document.getElementById("add-interview-container");
const interviewListContainer = document.getElementById("interview-list-container");
let checkButton = addInterviewBtn;

// the functions

(() => {
    interviewListContainer.style.display = "none";
})();

function changeTask() { //TO changee the task the user is doing
    if(this == checkButton) return;
    checkButton = this;
    switch(this) {
        case addInterviewBtn: 
            addInterviewContainer.style.display = "inline-block";
            interviewListContainer.style.display = "none";
            break;
        case showListBtn:
            addInterviewContainer.style.display = "none";
            interviewListContainer.style.display = "inline-block"
            break;
    }
}

// running the functions

addInterviewBtn.addEventListener('click', changeTask);
showListBtn.addEventListener('click', changeTask);