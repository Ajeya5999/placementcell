// Getting elements

const message = document.getElementById("error-message-container");

// the animation function

function changeRight() {
    if(message.style.opacity == 0) message.style.opacity = 1;
    else message.style.opacity = 0; 
    console.log(message.style.opacity);
}

// running the function

setTimeout(changeRight, 500);
setTimeout(changeRight, 4500);