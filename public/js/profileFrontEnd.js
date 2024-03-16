window.addEventListener("DOMContentLoaded", function() {

    // Background color for .user-profile
    
    let userProfile = this.document.querySelector(".user-profile"); 
    
    let userDestination = this.document.querySelector(".user-destination"); 
    let userDestinationImg = this.document.querySelector(".user-destinationImg"); 
    
    
        switch (userDestination.innerHTML) {
            case 'London':
                userDestination.parentElement.parentElement.style.backgroundColor = 'rgba(72, 77, 26, 0.3)'; 
                userDestinationImg.src = '/images/londonImg1.jpg'; 
                break;
            case 'Paris':
                userDestination.parentElement.parentElement.style.backgroundColor = 'rgba(220, 199, 200, 0.3)'; 
                userDestinationImg.src = '/images/parisImg1.jpg'; 
                break;
            case 'Berlin':
                userDestination.parentElement.parentElement.style.backgroundColor = 'rgba(139, 129, 161, 0.3)'; 
                userDestinationImg.src = '/images/berlinImg1.jpg'; 
                break;
            case 'Barcelona':
                userDestination.parentElement.parentElement.style.backgroundColor = 'rgba(165, 181, 117, 0.3)';
            userDestinationImg.src = '/images/barcelonaImg1.jpg';  
                break;
            case 'Dubrovnik':
                userDestination.parentElement.parentElement.style.backgroundColor = 'rgba(217, 208, 193, 0.3)';
            userDestinationImg.src = '/images/dubrovnikImg1.jpg';  
                break;
            case 'Reykjavik':
                userDestination.parentElement.parentElement.style.backgroundColor = 'rgba(113, 102, 137, 0.3)';
            userDestinationImg.src = '/images/reykjavíkImg1.jpg';  
                break;
            case 'Amsterdam':
                userDestination.parentElement.parentElement.style.backgroundColor = 'rgba(129, 161, 155, 0.3)'; 
                userDestinationImg.src = '/images/amsterdamImg1.jpg'; 
                    break;
            case 'Venice':
                userDestination.parentElement.parentElement.style.backgroundColor = 'rgba(161, 129, 135, 0.3)'; 
            userDestinationImg.src = '/images/veniceImg1.jpg'; 
                break;
            default:
                break;
        }
        console.log(userDestination.innerHTML);
    
    
        // Hide the "heart" icon if hobbies array is null 
        
        let userHobbies = this.document.querySelector(".user-hobbies"); 
       
        let hobbyContent = hobby.innerHTML; 
        if(hobbyContent === "") {
            hobby.parentElement.style.display = 'none'; 
        }

    
       
        
    });
    

    
