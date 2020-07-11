
//header 
$(window).on("scroll", function() {
    if($(window).scrollTop() > 43) {
        $(".header").addClass("active");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $(".header").removeClass("active");
    }
});

// progress bar 

document.onscroll = function(){ 
    var pos = getVerticalScrollPercentage(document.body)
    
  };
  
  function getVerticalScrollPercentage( elm ){
      var p = elm.parentNode,
          pos = (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
      document.querySelector(".bar").style.width = Math.round(pos) + "%";
  }


//show divs on scroll

$(document).ready(function() {
    
    /* Every time the window is scrolled ... */
    
    $(window).scroll( function(){
        
        /* Check the location of each desired element */
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object-90){
                
                $(this).animate({'opacity':'1'},700);
                    
            }
            
        }); 
    
    });
    
});

// viewport opacity 

let hideMe = document.querySelector(".hideme");

function isElementOutViewport (el) {
    var rect = el.getBoundingClientRect();
    return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
};

if (isElementOutViewport(hideMe)){
  hideMe.style.opacity = "0.7";
  hideMe.style.animation = 'fadein2 1s';
} else {  
    hideMe.style.opacity = "1";
    hideMe.style.animation = 'fadein 1s';
};




// filter items


       
        const buttonHair = document.querySelector("#hair");
        const buttonBody = document.querySelector("#body");
        const buttonFace = document.querySelector("#face");
        const buttonAll = document.querySelector("#all");



let checkOne= document.querySelector("#bigger");
let checkTwo= document.querySelector("#better");
let checkThree= document.querySelector("#faster");
let face = document.querySelectorAll(".face");
let body = document.querySelectorAll(".body");
let hair = document.querySelectorAll(".hair");


buttonFace.onclick = function() {
for(var i=0; i < face.length; i++){
    if(face[i].style.display !== "none") {
        face[i].style.display = "none";
        buttonFace.style.fontWeight="normal";
        checkOne.style.opacity = "0";

    } else {
        face[i].style.display = "block";
        buttonFace.style.fontWeight="700";
        checkOne.style.opacity = "1";
       
        
    }
}
}

buttonBody.onclick = function() {
    for(var i=0; i < body.length; i++){
        if(body[i].style.display !== "none") {
            body[i].style.display = "none";
            buttonBody.style.fontWeight="normal";
            checkTwo.style.opacity = "0";
    
        } else {
            body[i].style.display = "block";
            buttonBody.style.fontWeight="700";
            checkTwo.style.opacity = "1";
           
        }
    }
    }

    buttonHair.onclick = function() {
        for(var i=0; i < hair.length; i++){
            if(hair[i].style.display !== "none") {
                hair[i].style.display = "none";
                buttonHair.style.fontWeight="normal";
                checkThree.style.opacity = "0";
        
            } else {
                hair[i].style.display = "block";
                buttonHair.style.fontWeight="700";
                checkThree.style.opacity = "1";
                
            }
        }
        };


    //still to do: if you click on anyelement and it is not 
     //   face[i].style.animation = ("fadein");
     //   face[i].style.opacity = ("1");