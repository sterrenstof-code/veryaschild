
//header 
$(window).on("scroll", function() {
    if($(window).scrollTop() > 83) {
        $(".header").addClass("active");
        $(".header").css("background-color","rgb(63, 69, 54)");
        $(".title a").css("color","white");
        $(".header-left a").css("color","white");
        $("#cart").css("color","white");
        $(".header").css("border-bottom","1px solid rgb(255, 251, 252)");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $(".header").removeClass("active");
    }
});

// slide in

const shop = document.querySelector("#face");

if(shop){
  shop.addEventListener("click", function () {
    const slider = document.querySelector(".slide");
     if (slider.classList.contains("slided")) {
       slider.classList.remove("slided");
     } else {
       slider.classList.add("slided");
     }
   
   });
}

/*
// progress bar 

document.onscroll = function(){ 
    var pos = getVerticalScrollPercentage(document.body)
  };
  
  function getVerticalScrollPercentage( elm ){
      var p = elm.parentNode,
          pos = (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
      document.querySelector(".bar").style.width = Math.round(pos) + "%";
  }
*/

/*
//show divs on scroll

$(document).ready(function() {
    
    /* Every time the window is scrolled ... 
    
    $(window).scroll( function(){
        
        /* Check the location of each desired element 
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it 
            if( bottom_of_window > bottom_of_object-90){
                
                $(this).animate({'opacity':'1'},700);
                    
            }
            
        }); 
    
    });
    
});

*/

/*
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
*/


// appear main page 

function scrollAppear(){
    var introText = document.querySelectorAll(".intro-content");
    var screenPosition = window.innerHeight;
    for (let i = 0; i < introText.length; i++){
        if (introText[i].getBoundingClientRect().top < screenPosition){
            introText[i].classList.add("intro-appear");
        }
    }
   
};

window.addEventListener("scroll",scrollAppear);

// filter page

let carts = [
    {
      id: 1,
      title: "Face Oil",
      category: "Face",
      price: 15.99,
      img: "one.jpg",
      desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
      id: 2,
      title: "Cleansing Oil",
      category: "Face",
      price: 13.99,
      img: "two.jpg",
      desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
      id: 3,
      title: "Lip Balm",
      category: "Face",
      price: 20.99,
      img: "three.jpg",
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
      id: 4,
      title: "Body Oil",
      category: "Hair & Body",
      price: 18.99,
      img: "four.jpg",
      desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
      id: 5,
      title: "Hair Oil",
      category: "Hair & Body",
      price: 8.99,
      img: "five.jpg",
      desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
      id: 6,
      title: "Shave Oil",
      category: "Hair & Body",
      price: 12.99,
      img: "six.jpg",
      desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
      {
        id: 7,
        title: "Kit for Him",
        category: "Kits",
        price: 16.99,
        img: "seven.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
      },
      {
        id: 8,
        title: "Kit for Her",
        category: "Kits",
        price: 16.99,
        img: "seven.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
      }
  ];

  const sectionCenter = document.querySelector(".section-center");
  const btnContainer = document.querySelector(".btn-container");
  const filterBtns = document.querySelectorAll(".filter-btn");
  
  // display all items when page loads
  window.addEventListener("DOMContentLoaded", function () {
    diplayMenuItems(carts);
  });
  
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // console.log(e.currentTarget.dataset);
      const category = e.currentTarget.dataset.id;
      const menuCategory = carts.filter(function (menuItem) {
        // console.log(menuItem.category);
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        diplayMenuItems(carts);
      } else {
        diplayMenuItems(menuCategory);
      }
    });
  });
  
  function diplayMenuItems(menuItems) {
    let displayMenu = menuItems.map(function (item) {
      // console.log(item);
  
      return `<article class="menu-item">
            <img src=${item.img} alt=${item.title} class="photo" />
            <div class="item-info">
              <header>
                <h4>${item.title}</h4>
                <h4 class="price">$${item.price}</h4>
              </header>
              <p class="item-text">
                ${item.desc}
              </p>
            </div>
          </article>`;
    });
    displayMenu = displayMenu.join("");
    // console.log(displayMenu);
  
    sectionCenter.innerHTML = displayMenu;
  }

/* shopping cart */





