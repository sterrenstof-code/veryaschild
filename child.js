//header
$(window).on("scroll", function () {
  if ($(window).scrollTop() > 83) {
    $(".header").addClass("active");
    $(".header").css("background-color", "rgb(63, 69, 54)");
    $(".title a").css("color", "white");
    $("#cart").css("color", "white");
    $(".header-left a").css("color", "white");
    $(".header").css("border-bottom", "1px solid rgb(255, 251, 252)");
  } else {
    //remove the background property so it comes transparent again (defined in your css)
    $(".header").removeClass("active");
  }
});

// slide in menu

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

function scrollAppear() {
  var introText = document.querySelectorAll(".intro-content");
  var screenPosition = window.innerHeight;
  for (let i = 0; i < introText.length; i++) {
    if (introText[i].getBoundingClientRect().top < screenPosition) {
      introText[i].classList.add("intro-appear");
    }
  }
}

window.addEventListener("scroll", scrollAppear);

// filter page
const productsDoms = document.getElementById("products-dom");

const getProducts = async () => {
  let products = await fetch("products.json");
  products = await products.json();
  products = JSON.stringify(products);
  products = JSON.parse(products);
  products = products.items;
  products = products.map((item) => {
    const{ category, desc, page } = item;
    const { title, price } = item.fields;
    const image = item.fields.image.fields.file.url;
    const id = item.sys.id;
    return { category, title, price, image, id, desc, page };
  });
  return products;
};

const displayProducts = (products) => {
  let result = document.createElement("div");
  result.classList.add("products-dom__container");
  if (productsDoms) {
    productsDoms.innerHTML = "";
  }
  products.forEach((product) => {
    result.innerHTML += `
    <article class="product">
    <div class="info-container">
    <h2>${product.title}</h2>
    <p> ${product.price}</p>
    <p>${product.desc}</p>
    <div class="vertical-line"></div>
    <p class="category">${product.category}&Tab;&middot;</p>
    </div>
    <div class="vertical-line see-through"></div>
    <div class="img-container">
      <a href="${product.page}">
        <img src="${product.image}" alt="product" class="product-img" />
      </a>
    </div>
    <button class="atc" data-id="${product.id}">
     Add to your cart - €${product.price}
    </button>
  </article>
          `;
  });
  if (productsDoms) {
    productsDoms.appendChild(result);
  }
};

let productsDisplayed = [];
const priceOption = document.querySelector(".price-btn");

const filterBtnInit = () => {
  const btnContainer = document.querySelector(".btn-container");
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", async function (e) {
      // for every button that is pushed, determine the target category
      const category = e.currentTarget.dataset.id;
      let event = priceOption;
      console.log(event);
      // get all the products.
      await getProducts().then((products) => {
        // filter out the products that do not match the category
        const productCategory = products.filter(function (product) {
          if (product.category === category) {
            return product;
          }
        });
        // the productCategory now holds all the product that have the right category
        if (category === "all") {
          filterPrice(event, products)
          productsDisplayed = products;
        } else {
          filterPrice(event, productCategory)
          productsDisplayed = products;
        }
        getBagButtons();
      });
    });
  });
};


async function filterPrice(event, products) {
  const value = event.value;
  if(!products){
    products = productsDisplayed;
  }
    if (value === "all") {
      displayProducts(products);
      return;
    }
    if (value === "true") {
      products.sort((a, b) => (a.price > b.price ? 1 : -1));
      displayProducts(products);
    } else {
      products.sort((a, b) => (a.price < b.price ? 1 : -1));
      displayProducts(products);
    }
    getBagButtons();
}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

const searchByValue = async (value, products) => {
  let event = priceOption;
  if(!products){
    products = await getProducts().then();
  }
    const valueSearched = products.filter(function (product) {
      const foundTitle = product.title.includes(value);
      if (foundTitle) {
        return product;
      }
    });
    // the valueSearched now holds all the product that have the right category
    if (valueSearched.length != 0) {
      filterPrice(event, valueSearched)
    } else {
      let result = document.createElement("div");
      result.innerHTML += `
        <h2>there are no search results for "${value}"</h2>
          `;
      productsDoms.appendChild(result);
    }
  };

// create search section that displays underneath it
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    productsDoms.innerHTML = "";
    const userInput = searchInput.value;
    value = capitalize(userInput);
    searchByValue(value);
  });
}

// /* shopping cart */

const cartBtn = document.querySelector("#cart");
const closeCartBtn = document.querySelector(".close-cart img");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".header-right-number");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDom = document.querySelector(".products-center");

//show cart when clicked

function showCart() {
  cartOverlay.classList.toggle("transparentBcg");
  cartDOM.classList.toggle("showCart");
  document.body.classList.toggle("fixed");
}

if (closeCartBtn) {
  closeCartBtn.addEventListener("click", showCart);
}

if (cartBtn) {
  cartBtn.addEventListener("click", showCart);
}

// cart
let cart = [];

//buttons
let buttonsDOM = [];

const getBagButtons = () => {
  const buttons = [...document.querySelectorAll(".atc")];
  buttonsDOM = buttons;
  buttons.forEach((button) => {
    //for every button get the id
    let id = button.dataset.id;
    let inCart = cart.find((item) => item.id === id);
    if (inCart) {
      button.innerText = "In Cart";
      button.disabled = true;
    }
    button.addEventListener("click", (event) => {
      btnAnimation();
      event.target.innerText = "In Cart";
      event.target.disabled = true;
      // get product from products
      let cartItem = { ...getProduct(id), amount: 1 };
      // // add product to the cart
      cart = [...cart, cartItem];
      // // save cart in local storage
      saveCart(cart);
      // // set cart values
      setCartValues(cart);
      // // display cart item
      addCartItem(cartItem);
      // // add animation to the cart
    });
  });
};

const btnAnimation = () => {
  cartBtn.classList.add("clicked");
  setTimeout(() => {
    cartBtn.classList.remove("clicked");
  }, 500);
};

const setCartValues = (cart) => {
  let tempTotal = 0;
  let itemsTotal = 0;
  cart.map((item) => {
    tempTotal += item.price * item.amount;
    itemsTotal += item.amount;
  });
  cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
  cartItems.innerText = itemsTotal;
};

function addCartItem(item) {
  const div = document.createElement("div");
  div.classList.add("cart-item");
  div.innerHTML = `<img src=${item.image} alt="product" />
          <div>
            <h4>${item.title} </h4>
            <h5>$${item.price} </h5>
            <span class="remove-item" data-id=${item.id}>remove</span>
          </div>
          <div>
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">
            ${item.amount}
            </p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
          </div>`;
  cartContent.appendChild(div);
}

function showCart() {
  cartOverlay.classList.toggle("transparentBcg");
  cartDOM.classList.toggle("showCart");
}

const saveProducts = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const getProduct = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  return products.find((product) => product.id === id);
};

const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const getCart = () => {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
};

function populateCart(cart) {
  cart.forEach((item) => addCartItem(item));
}

function setupAPP() {
  cart = getCart();
  setCartValues(cart);
  populateCart(cart);
}

function cartLogic() {
  clearCartBtn.addEventListener("click", () => clearCart());
  // cart functionality
  cartContent.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      let removeItemEl = event.target;
      let id = removeItemEl.dataset.id;

      cartContent.removeChild(removeItemEl.parentElement.parentElement);
      removeItem(id);
    } else if (event.target.classList.contains("fa-chevron-up")) {
      let addAmount = event.target;
      let id = addAmount.dataset.id;

      let tempItem = cart.find((item) => item.id === id);
      tempItem.amount = tempItem.amount + 1;
      saveCart(cart);
      setCartValues(cart);
      addAmount.nextElementSibling.innerText = tempItem.amount;
    } else if (event.target.classList.contains("fa-chevron-down")) {
      let lowerAmount = event.target;
      let id = lowerAmount.dataset.id;
      let tempItem = cart.find((item) => item.id === id);
      tempItem.amount = tempItem.amount - 1;
      if (tempItem.amount > 0) {
        saveCart(cart);
        setCartValues(cart);
        lowerAmount.previousElementSibling.innerText = tempItem.amount;
      } else {
        cartContent.removeChild(lowerAmount.parentElement.parentElement);
        removeItem(id);
      }
    }
  });
}

function clearCart() {
  let cartItems = cart.map((item) => item.id);
  cartItems.forEach((id) => removeItem(id));
  while (cartContent.children.length > 0) {
    cartContent.removeChild(cartContent.children[0]);
  }
  showCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  setCartValues(cart);
  saveCart(cart);
  let button = getSingleButton(id);
  if (button) {
    button.disabled = false;
    button.innerHTML = `Add to your cart again`;
  }
}

function getSingleButton(id) {
  return buttonsDOM.find((button) => button.dataset.id === id);
}

// const cartBtn = document.querySelector("#cart");
// const closeCartBtn = document.querySelector(".close-cart img");
// const clearCartBtn = document.querySelector(".clear-cart");
// const cartDOM = document.querySelector(".cart");
// const cartOverlay =  document.querySelector(".cart-overlay");
// const cartItems = document.querySelector(".header-right-number");
// const cartTotal = document.querySelector(".cart-total");
// const cartContent = document.querySelector(".cart-content");
// const productsDom = document.querySelector(".products-center");

// // cart
// let cart = [];

// //buttons
// let buttonsDOM = [];

// // Responsible for getting the products
// class Products {
//   async getProjects(){
//     try {
//       let result = await fetch("products.json");
//       let data = await result.json();
//       let products = data.items;
//       products  = products.map(item => {
//         const {title,price} = item.fields;
//         const {id} = item.sys;
//         const image = item.fields.image.fields.file.url;
//         const page = item.page;
//         const category = item.category;
//         return {title, price, id, image, page, category};
//       })
//       return products;
//     } catch (error){
//       console.log(error);
//     }
//   }
// }

// class UI {
//   displayProducts(products){
//     let result = "";
//     products.forEach(product => {
//       result += `
//         <article class="product" id="andereOne">
//         <p>${product.title}</p>
//         <p>${product.price}</p>
//         <p>${product.category}</p>
//           <div class="img-container">
//           <a href="${product.page}">
//             <img
//               src=${product.image}
//               alt="product"
//               class="product-img"
//             />
//             </a>
//             <button class="bag-btn" data-id=${product.id}>
//               <i class="fas fa-shopping-cart"></i>
//               add to Cart
//             </button>
//           </div>

//         </article>
//       `
//     ;
//     });

//     if(productsDom){
//       productsDom.innerHTML = result;
//     }
//   }

//   getBagButtons(){
//     const buttons = [...document.querySelectorAll(".bag-btn")];
//     buttonsDOM = buttons;
//     buttons.forEach(button => {
//       let id = button.dataset.id;
//       let inCart = cart.find(item => item.id === id);
//       if(inCart){
//         button.innerText = "In Cart";
//         button.disabled = true;
//       }
//         button.addEventListener("click", (event)=>{

//          event.target.innerText = "In Cart";
//          event.target.disabled = true;
//          // get product from products
//         let cartItem = { ...Storage.getProduct(id), amount: 1};
//          // add product to the cart
//           cart = [...cart, cartItem];
//          // save cart in local storage
//           Storage.saveCart(cart);
//          // set cart values
//           this.setCartValues(cart);
//          // display cart item
//           this.addCartItem(cartItem);
//          // show the cart
//           this.showCart();
//         });
//     });
//   }
//   setCartValues(cart){
//     let tempTotal = 0;
//     let itemsTotal = 0;
//     cart.map(item => {
//       tempTotal += item.price * item.amount;
//       itemsTotal += item.amount;
//     });
//     cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
//     cartItems.innerText = itemsTotal;
//   }
//   addCartItem(item){
//     const div = document.createElement("div");
//     div.classList.add("cart-item");
//     div.innerHTML = ` <img src=${item.image} alt="product" />
//     <div>
//       <h4>${item.title} </h4>
//       <h5>$${item.price} </h5>
//       <span class="remove-item" data-id=${item.id}>remove</span>
//     </div>
//     <div>
//       <i class="fas fa-chevron-up" data-id=${item.id}></i>
//       <p class="item-amount">
//       ${item.amount}
//       </p>
//       <i class="fas fa-chevron-down" data-id=${item.id}></i>
//     </div>`;
//     cartContent.appendChild(div);
//   }

//   showCart(){
//     cartOverlay.classList.add("transparentBcg");
//     cartDOM.classList.add("showCart");
//   }

//   setupAPP(){
//     cart = Storage.getCart();
//     this.setCartValues(cart);
//     this.populateCart(cart);
//     cartBtn.addEventListener("click", this.showCart)
//     closeCartBtn.addEventListener("click", this.hideCart)
//   }

//   populateCart(cart){
//     cart.forEach(item => this.addCartItem(item));
//   }
//   hideCart(){
//     cartOverlay.classList.remove("transparentBcg");
//     cartDOM.classList.remove("showCart");
//   }
//   cartLogic(){
//     clearCartBtn.addEventListener("click",() => this.clearCart());
//     // cart functionality
//     cartContent.addEventListener("click", event => {
//       if (event.target.classList.contains("remove-item")){
//         let removeItem = event.target;
//         let id = removeItem.dataset.id;
//         cartContent.removeChild(removeItem.parentElement.parentElement)
//         this.removeItem(id);
//       }
//       else if (event.target.classList.contains("fa-chevron-up")){
//         let addAmount = event.target;
//         let id = addAmount.dataset.id;

//         let tempItem = cart.find(item => item.id === id);
//         tempItem.amount = tempItem.amount + 1;
//         Storage.saveCart(cart);
//         this.setCartValues(cart);
//         addAmount.nextElementSibling.innerText = tempItem.amount;
//       }
//       else if (event.target.classList.contains("fa-chevron-down")){
//         let lowerAmount = event.target;
//         let id = lowerAmount.dataset.id;
//         let tempItem = cart.find(item => item.id ===id);
//         tempItem.amount = tempItem.amount - 1;
//         if(tempItem.amount > 0){
//           Storage.saveCart(cart);
//           this.setCartValues(cart);
//           lowerAmount.previousElementSibling.innerText = tempItem.amount;
//         } else {
//           cartContent.removeChild(lowerAmount.parentElement.parentElement);
//           this.removeItem(id)
//         }
//       }
//     });
//   }
//   clearCart(){
//     let cartItems = cart.map(item => item.id);
//     cartItems.forEach(id => this.removeItem(id));
//     while(cartContent.children.length>0){
//       cartContent.removeChild(cartContent.children[0])
//     }
//     this.hideCart();
//   }
//   removeItem(id){
//     cart = cart.filter(item => item.id !== id);
//     this.setCartValues(cart);
//     Storage.saveCart(cart);
//     let button = this.getSingleButton(id);
//     button.disabled = false;
//     button.innerHTML = `<i class="fas fa-shopping-cart"></i>Add to Cart`;
//   }
//   getSingleButton(id){
//     return buttonsDOM.find(button => button.dataset.id === id);
//   }
// }

// // local storage

// class Storage {
//   static saveProducts(products){
//     localStorage.setItem("products", JSON.stringify(products))
//   }
//   static getProduct(id){
//     let products = JSON.parse(localStorage.getItem("products"))
//     return products.find(product => product.id === id)
//   }
//   static saveCart(cart){
//     localStorage.setItem("cart", JSON.stringify(cart))
//   }
//   static getCart(){
//     return localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]
//   }
// }

// document.addEventListener("DOMContentLoaded", ()=> {
//    const ui = new UI()
//    const products = new Products()
//    // setup application
//    ui.setupAPP();
//    // get all products
//    products.getProjects().then(products => {
//     ui.displayProducts(products);
//     Storage.saveProducts(products);
//    }).then(()=> {
//     ui.getBagButtons();
//     ui.cartLogic()
//    });
// });

document.addEventListener("DOMContentLoaded", async () => {
  setupAPP();
  await getProducts()
    .then((products) => {
      displayProducts(products);
      saveProducts(products);
    })
    .then(() => {
      getBagButtons();
      filterBtnInit();
      cartLogic();
    });
});
