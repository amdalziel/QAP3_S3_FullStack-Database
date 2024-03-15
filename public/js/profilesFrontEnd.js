window.addEventListener("DOMContentLoaded", function() {

// Background color for .user-profile

let userProfile = this.document.querySelectorAll(".user-profile"); 

let userDestination = this.document.querySelectorAll(".user-destination"); 
let userDestinationImg = this.document.querySelectorAll(".user-destinationImg"); 


userDestination.forEach((destination, i) => {
    switch (destination.innerHTML) {
        case 'London':
            destination.parentElement.parentElement.style.backgroundColor = 'rgba(72, 77, 26, 0.3)'; 
            userDestinationImg[i].src = '/images/londonImg1.jpg'; 
            break;
        case 'Paris':
            destination.parentElement.parentElement.style.backgroundColor = 'rgba(220, 199, 200, 0.3)'; 
            userDestinationImg[i].src = '/images/parisImg1.jpg'; 
            break;
        case 'Berlin':
            destination.parentElement.parentElement.style.backgroundColor = 'rgba(139, 129, 161, 0.3)'; 
            userDestinationImg[i].src = '/images/berlinImg1.jpg'; 
            break;
        case 'Barcelona':
        destination.parentElement.parentElement.style.backgroundColor = 'rgba(165, 181, 117, 0.3)';
        userDestinationImg[i].src = '/images/barcelonaImg1.jpg';  
            break;
        case 'Dubrovnik':
        destination.parentElement.parentElement.style.backgroundColor = 'rgba(217, 208, 193, 0.3)';
        userDestinationImg[i].src = '/images/dubrovnikImg1.jpg';  
            break;
        case 'Reykjavík':
        destination.parentElement.parentElement.style.backgroundColor = 'rgba(113, 102, 137, 0.3)';
        userDestinationImg[i].src = '/images/reykjavíkImg1.jpg';  
            break;
        case 'Amsterdam':
            destination.parentElement.parentElement.style.backgroundColor = 'rgba(129, 161, 155, 0.3)'; 
            userDestinationImg[i].src = '/images/amsterdamImg1.jpg'; 
                break;
        case 'Venice':
        destination.parentElement.parentElement.style.backgroundColor = 'rgba(161, 129, 135, 0.3)'; 
        userDestinationImg[i].src = '/images/veniceImg1.jpg'; 
            break;
        default:
            break;
    }
    // console.log(destination.innerHTML);


    // Hide the "heart" icon if hobbies array is null 
    
    let userHobbies = this.document.querySelectorAll(".user-hobbies"); 
   userHobbies.forEach((hobby) => {
    let hobbyContent = hobby.innerHTML; 
    if(hobbyContent === "") {
        hobby.parentElement.style.display = 'none'; 
    }
   }); 

   

    
        
    
});



}
)