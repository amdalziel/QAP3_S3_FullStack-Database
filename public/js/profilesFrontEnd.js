window.addEventListener("DOMContentLoaded", function() {

// Background color for .user-profile

let userProfile = this.document.querySelectorAll(".user-profile"); 

let userDestination = this.document.querySelectorAll(".user-destination"); 

userDestination.forEach(destination => {
    switch (destination.innerHTML) {
        case 'London':
            destination.parentElement.style.backgroundColor = 'rgba(72, 77, 26, 0.3)'; 
            break;
        case 'Paris':
            destination.parentElement.style.backgroundColor = 'rgba(220, 199, 200, 0.3)'; 
            break;
        case 'Berlin':
            destination.parentElement.style.backgroundColor = 'rgba(139, 129, 161, 0.3)'; 
            break;
        case 'Barcelona':
        destination.parentElement.style.backgroundColor = 'rgba(165, 181, 117, 0.3)'; 
            break;
        case 'Dubrovnik':
        destination.parentElement.style.backgroundColor = 'rgba(217, 208, 193, 0.3)'; 
            break;
        case 'Reykjavík':
        destination.parentElement.style.backgroundColor = 'rgba(113, 102, 137, 0.3)'; 
            break;
        case 'Amsterdam':
            destination.parentElement.style.backgroundColor = 'rgba(129, 161, 155, 0.3)'; 
                break;
        case 'Venice':
        destination.parentElement.style.backgroundColor = 'rgba(161, 129, 135, 0.3)'; 
            break;
        default:
            break;
    }
    console.log(destination.innerHTML);
});

// switch (userDestination) {
//     case value:
        
//         break;

//     default:
//         break;
// }






}
)