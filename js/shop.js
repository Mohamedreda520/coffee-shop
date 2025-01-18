// ********* Start order *************
// get data from localStorage
let dataURL = JSON.parse(localStorage.getItem("drinks"));
let categoryContainer = document.querySelector(".category-container");

// drow data to page
let drowDrinksUI;
(drowDrinksUI = function (drink = []) {
  categoryContainer.innerHTML = "";
  let drinkloop = drink.map((item) => {
    return `
     <div class="card" onclick = (show(${item.id}))>
            <div class="box-img">
              <img src="${item.img}" alt="img" />
            </div>
            <div class="content-text">
              <h3>${item.title}</h3>
              <p>${
                item.description.length >= 45
                  ? `${item.description.slice(0, 40)}...`
                  : `${item.description}`
              }</p>
            </div>
            <div class="content">
              <span class="price">${item.price}$</span>
              <button id="add-order" onclick = (addToCart(${
                item.id
              }))>order now</button>
            </div>
          </div>
  
  
  `;
  });
  categoryContainer.innerHTML = drinkloop.join("");
})(dataURL);

//*************** search  ********************

function Search(value) {
  // If search value is empty, display all drinks
  if (value.trim() === "") {
    drowDrinksUI(dataURL);
    return;
  }

  const drinkSearch = dataURL.filter((drink) =>
    drink.title.toLowerCase().includes(value.toLowerCase())
  );

  // show massage is no found drinks
  if (drinkSearch.length === 0) {
    categoryContainer.innerHTML = `<p class="no-results">Sorry, we couldn't find any matches for your search.</p>`;
  } else {
    drowDrinksUI(drinkSearch);
  }
}

//********************* filter ****************
// get check input
const filterCheckboxes = document.querySelectorAll(
  ".filter input[type='checkbox']"
);

function applyFilters() {
  // Get checked categories
  const selectedCategories = Array.from(filterCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id.toLowerCase());
  //  if no found input checked return all data
  if (selectedCategories.length === 0) {
    drowDrinksUI(dataURL);
    return;
  }
  // Filter the drinks based on the selected categories
  const filteredDrinks = dataURL.filter((drink) => {
    // Check if the drink title includes any of the selected categories
    return selectedCategories.some((category) =>
      drink.title.toLowerCase().includes(category)
    );
  });

  // If no checkboxs are selected, show all drinks
  if (filteredDrinks.length === 0) {
    categoryContainer.innerHTML = `<p class="no-results">Sorry, we couldn't find any matches for your search.</p>`;
  } else {
    drowDrinksUI(filteredDrinks);
  }
}

// Add event listeners to checkboxes
filterCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});

// شرح الكود بالتفاصيل
// ******** 1 ********
// const selectedCategories = Array.from(filterCheckboxes)
//   .filter((checkbox) => checkbox.checked)
//   .map((checkbox) => checkbox.id.toLowerCase());
// الشرح
// input type="checkbox" id="Coffee" checked>
// <input type="checkbox" id="Tea">
// <input type="checkbox" id="Cappuccino" checked>
// نتيجة الكود:
// Array.from(filterCheckboxes):
// [<input id="Coffee" checked>, <input id="Tea">, <input id="Cappuccino" checked>]
// .filter((checkbox) => checkbox.checked):
// [<input id="Coffee" checked>, <input id="Cappuccino" checked>]
// .map((checkbox) => checkbox.id.toLowerCase()):
// ["coffee", "cappuccino"]
// النتيجة النهائية:
// selectedCategories ستكون:

// ["coffee", "cappuccino"]
// ********* End order *************

// start details

// Creat Popup with the image

function show(id) {
  let imgid = dataURL.find((item) => item.id === id);
  //create overlay Element
  let overlay = document.createElement("div");

  // add class to overlay
  overlay.className = "popup-overlay";

  // add overlay to the Body
  document.body.appendChild(overlay);

  // create tht popup box
  let popupbox = document.createElement("div");

  // add class to popupbox
  popupbox.className = "popup-box";

  // creat the box image
  let boxImag = document.createElement("div");
  boxImag.className = 'boximg'
  // creat the image
  let popupImag = document.createElement("img");

  // set Image source
  popupImag.src = imgid.img;

  boxImag.appendChild(popupImag)
  // add popupImag to popupbox
  popupbox.appendChild(boxImag);
 
  // create title
  let popuptitle = document.createElement('h2')
  popuptitle.textContent = 'Title: ' + imgid.title
  
  // add popuptitle to popupbox
popupbox.appendChild(popuptitle)
  
  // create discdescription
  let popupdescription = document.createElement('p')
  popupdescription.textContent = 'Description: ' + imgid.description

  // add popupdescription to popupbox
popupbox.appendChild(popupdescription)
  // create price
  let popupprice = document.createElement('h4')
  popupprice.textContent = 'price: ' +imgid.price + '$'

  // add popupdescription to popupbox
popupbox.appendChild(popupprice)

  // add popupbox to body
  document.body.appendChild(popupbox);

  // create close span
  let closebutton = document.createElement("span");
  //  create closebutton text
  let closebuttontext = document.createTextNode("X");
  // append text to closebutton
  closebutton.appendChild(closebuttontext);
  // add class to closebutton
  closebutton.className = "closebutton";
  // add closebutton to popupbox
  popupbox.appendChild(closebutton);
}

// close popupbox and popup overlay
document.addEventListener("click", (e) => {
  if (e.target.className == "closebutton") {
    e.target.parentNode.remove();
    // Remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// End details
