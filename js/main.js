// change link color when scroll
const navLinks = document.querySelectorAll("nav ul li a");

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  //  Check any section on the page now
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// menu bar
let menubar = document.getElementById("bars");
let nav = document.querySelector("header nav");
let ulLinks = document.querySelector("header nav ul");

menubar.onclick = (e) => {
  e.stopPropagation();
  menubar.classList.toggle("fa-times");
  nav.classList.toggle("active");
  ulLinks.classList.toggle("active");
};
ulLinks.onclick = (e) => {
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  if (e.target !== menubar && e.target !== ulLinks) {
    if (ulLinks.classList.contains("active")) {
      menubar.classList.toggle("fa-times");
      nav.classList.toggle("active");
      ulLinks.classList.toggle("active");
    }
  }
});

// change imgs
const centerImg = document.querySelector(".center-img");
const otherImages = document.querySelectorAll(".other-img img");

otherImages.forEach((image) => {
  image.addEventListener("click", (imgtarget) => {
    otherImages.forEach((img) => {
      img.classList.remove("active");
    });
    centerImg.style.transform = "scale(0.9)";
    setTimeout(() => {
      centerImg.src = image.src;
      centerImg.style.transform = "scale(1.2)";
    }, 300);
    imgtarget.currentTarget.classList.add("active");
  });
});

//*********** start form *******************
let sign_inBtn = document.getElementById("btn-signin");
let sign_upBtn = document.getElementById("btn-signup");
let signup_Div = document.querySelector(".sign-up");
let closeBtn = document.getElementById("close-form");
let coverform = document.querySelector(".cover-form");
let containerform = document.querySelector(".container-form ");
let user = document.getElementById("user");

sign_upBtn.onclick = () => {
  signup_Div.classList.add("active");
};
sign_inBtn.onclick = () => {
  signup_Div.classList.remove("active");
};

user.onclick = () => {
  coverform.classList.add("active");
  containerform.classList.add("active");
};
closeBtn.onclick = () => {
  coverform.classList.remove("active");
  containerform.classList.remove("active");
};

// ***** Function to create welcome popup ***************
function createWelcomePopup(username) {
  let popapWelcome = document.createElement("div");
  popapWelcome.className = "popapwelcome";

  let popapwelcomText = document.createTextNode(`Welcome ${username}`);
  popapWelcome.appendChild(popapwelcomText);

  let closeSpan = document.createElement("span");
  closeSpan.textContent = "X";
  closeSpan.className = "closebtn";
  popapWelcome.append(closeSpan);

  popapWelcome.style.top = "50%";
  document.body.appendChild(popapWelcome);

  // Add event to close popup when clicking "X"
  closeSpan.addEventListener("click", () => {
    popapWelcome.style.top = "-1000%";
  });
}

// ***** Login ***************
let signInEmail = document.getElementById("sign-in-email");
let signInPassword = document.getElementById("sign-in-password");
let signInSubmit = document.getElementById("sign-in-submit");
let username = localStorage.getItem("username");

signInSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  // get data from localStorage
  let email = localStorage.getItem("email");
  let password = localStorage.getItem("password");

  if (signInEmail.value === "" || signInPassword.value === "") {
    alert("Please complete the required fields.");
  } else {
    if (email === signInEmail.value && password === signInPassword.value) {
      // show WelcomePopup
      setTimeout(() => {
        createWelcomePopup(username);
      }, 3000);

      setTimeout(() => {
        window.location = "index.html";
      }, 1000);
    } else {
      alert("Your email or password does not match.");
    }
  }
});

// ***** Register ***************
let signUpName = document.getElementById("sign-up-name");
let signUpEmail = document.getElementById("sign-up-email");
let signUpPassword = document.getElementById("sign-up-password");
let signUpSubmit = document.getElementById("sign-up-submit");

signUpSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  // save data in localStorage
  if (
    signUpName.value === "" ||
    signUpEmail.value === "" ||
    signUpPassword.value === ""
  ) {
    alert("Please complete the required fields.");
  } else {
    localStorage.setItem("username", signUpName.value);
    localStorage.setItem("email", signUpEmail.value);
    localStorage.setItem("password", signUpPassword.value);
  }
  setTimeout(() => {
    signup_Div.classList.remove("active");
  }, 1000);
});

// *********** Display user initials if logged in ********************
if (username) {
  let initials = username
    .split(" ")
    .map((name) => name[0])
    .join(".")
    .toUpperCase();

  // Change user icon content
  let userIcon = document.getElementById("user");
  userIcon.className = "";
  userIcon.textContent = initials;
  userIcon.style.fontSize = "18px";
} else {
  console.log("No username found in localStorage.");
}

//**********  End form *******************

// start change mode
let modeIcon = document.getElementById("mode");
let getBody = document.querySelector("body");
let footer = document.querySelector('footer')
let footerText = document.querySelector('footer .text')

console.log(footerText);

if (modeIcon.classList.contains("fa-sun")) {
  getBody.style.backgroundColor = "black";
  footer.style.backgroundColor = '#fafafa';
  footerText.style.color = '#000';
  
} else {
  getBody.style.backgroundColor = "white";
  footer.style.backgroundColor = 'black';
  footerText.style.color = 'white';
  
}

modeIcon.addEventListener("click", () => {
  modeIcon.classList.toggle("fa-sun");

  if (modeIcon.classList.contains("fa-sun")) {
    getBody.style.backgroundColor = "black";
    footer.style.backgroundColor = '#fafafa';
    footerText.style.color = '#000';
    console.log("Mode: Dark");
  } else {
    getBody.style.backgroundColor = "white";
    footer.style.backgroundColor = 'black';
    footerText.style.color = 'white';
    console.log("Mode: Light");
    
  }
});

// End change mode
