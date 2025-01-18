
// ********** start add to cart model **********************
// get Elements
const cartIcon = document.getElementById("cart");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const addOrder = document.getElementById("add-order");
const badge = document.querySelector("#cart span");

// check if order saved in localstorage
let cartItems = window.localStorage.getItem("orders")
  ? JSON.parse(window.localStorage.getItem("orders"))
  : [];
if (cartItems) {
  cartItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
       <img src="${item.img}" alt="">
          <h4 class="title">${item.title.slice(0, 10)}...</h4>
          <span class="price">${item.price} $</span>
         <input type="number" id="quantity" value="${item.quantity}"/>
       
      `;
    cartItemsContainer.appendChild(itemElement);
  });
  badge.innerHTML = cartItems.length;
}

// open cart
cartIcon.addEventListener("click", function () {
  cartModal.style.display = "flex";
  cartModal.style.transition = "all 1s ease-in-out";

  updateCart();
});

// close cart modal
closeCart.addEventListener("click", function () {
  cartModal.style.display = "none"; // إخفاء الـ modal
  cartModal.style.transition = "all 1s ease-in-out";
});

//   updateCart 
function updateCart() {
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
  } else {
    cartItemsContainer.innerHTML = "";

    // add element to cart
    let total = 0;
    cartItems.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
       <img src="${item.img}" alt="">
       <h4 class="title">${item.title.slice(0, 10)}...</h4>
       <span class="price">${item.price} $</span>
       <input type="number" id="quantity-${index}" value="${item.quantity}"  />
      `;
      cartItemsContainer.appendChild(itemElement);

      //Calculate the total
      total += item.price * item.quantity;

      // To update the total manually
      const quantityInput = itemElement.querySelector(`#quantity-${index}`);
      quantityInput.addEventListener("change", (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity > 0) {
          item.quantity = newQuantity; 
          updateTotal();
          localStorage.setItem("orders", JSON.stringify(cartItems)); // تحديث localStorage
        }else if (newQuantity === 0) {
          itemElement.remove()
          cartItems.splice(index,1)
          updateTotal()
          localStorage.setItem("orders", JSON.stringify(cartItems)); 
          badge.innerHTML = cartItems.length
        }
         else {
          e.target.value = item.quantity;
        }

        
      });
    });

   
    totalPrice.textContent = total.toFixed(2);
  }
}

// update total
function updateTotal() {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  totalPrice.textContent = total.toFixed(2);
}

// Add to cart

function addToCart(id) {
  let allDrinks = JSON.parse(localStorage.getItem("drinks"));
  let order = allDrinks.find((item) => item.id === id);
  
  let ifOrderInCart = cartItems.find((item) => item.id === order.id);

  if (ifOrderInCart) {
    cartItems.map((item) => {
      if (item.id === order.id) item.quantity += 1;
    });
  } else {
    cartItems.push({ ...order, quantity: 1 });
  }
  
  updateCart();
  badge.innerHTML = cartItems.length;
  localStorage.setItem("orders", JSON.stringify(cartItems));
}

// ********** End add to cart model **********************
