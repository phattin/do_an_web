// ---------------------------------- top menu ---------------------------------
document.getElementById("logo").addEventListener("click", function () {
  window.location.href = "index.html"; // Thay đổi "index.html" thành đường dẫn của trang chủ của bạn
});
const search = document.querySelector(".search");
const searchbtn = document.querySelector("#search-btn");
const input = document.querySelector(".search-box");
searchbtn.addEventListener("click", () => {
  search.classList.toggle("active");
  input.focus();
});

// ---------------------------------- hero slide show ---------------------------------
const listImg = document.querySelector(".list-hero");
const imgs = document.querySelectorAll(".hero-img");
const nextHero = document.querySelector(".hero-btn-next");
const prevHero = document.querySelector(".hero-btn-prev");
const dotList = document.querySelector("#dots-list");
let dots = document.querySelectorAll(".dot-item");
const lengthImgs = imgs.length;
let currentImg = 0;
let widthImg = imgs[0].offsetWidth;
slideShownext = () => {
  if (currentImg == lengthImgs - 1) {
    currentImg = 0;
  } else {
    currentImg++;
  }
  listImg.style.transform = `translateX(${widthImg * -1 * currentImg}px)`;
  document.querySelector(".dot-item.active").classList.remove("active");
  dots[currentImg].classList.add("active");
};
let slideShowauto = setInterval(slideShownext, 4000);
nextHero.addEventListener("click", () => {
  clearInterval(slideShowauto);
  slideShownext();
  slideShowauto = setInterval(slideShownext, 4000);
});
prevHero.addEventListener("click", () => {
  clearInterval(slideShowauto);
  if (currentImg == 0) {
    currentImg = lengthImgs - 1;
  } else {
    currentImg--;
  }
  listImg.style.transform = `translateX(${widthImg * -1 * currentImg}px)`;
  slideShowauto = setInterval(slideShownext, 4000);
  document.querySelector(".dot-item.active").classList.remove("active");
  dots[currentImg].classList.add("active");
});
// ---------------------------------- Phan trang ---------------------------------
let thisPage = 1;
let limit = 8;
let list = document.querySelectorAll(".product");

function loadItem() {
  let beginGet = limit * (thisPage - 1);
  let endGet = limit * thisPage - 1;
  list.forEach((item, key) => {
    if (key >= beginGet && key <= endGet) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  listPage();
}
loadItem();
function listPage() {
  let count = Math.ceil(list.length / limit);
  document.querySelector(".listPage").innerHTML = "";
  if (thisPage != 1) {
    let prev = document.createElement("li");
    prev.innerText = "PREV";
    prev.setAttribute("onclick", "changePage(" + (thisPage - 1) + ")");
    document.querySelector(".listPage").appendChild(prev);
  }
  for (i = 1; i <= count; i++) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    if (thisPage == i) {
      newPage.classList.add("active");
    }
    newPage.setAttribute("onclick", "changePage (" + i + ")");
    document.querySelector(".listPage").appendChild(newPage);
  }
  if (thisPage != count) {
    let next = document.createElement("li");
    next.innerText = "NEXT";
    next.setAttribute("onclick", "changePage(" + (thisPage + 1) + ")");
    document.querySelector(".listPage").appendChild(next);
  }
}
function changePage(i) {
  thisPage = i;
  loadItem();
}
// --------------------------------------------- Login Page-----------------------------------
const homePage = document.querySelector(".home-page");
const loginPage = document.querySelector(".login-page");
const registerPage = document.querySelector(".register-page");

const loginbtn = document.querySelectorAll(".login-btn");
loginbtn.forEach((login) => {
  login.addEventListener("click", () => {
    homePage.style.display = "none";
    registerPage.style.display = "none";
    loginPage.style.display = "block";
    document.getElementById('email-login').focus();
  });
});
// --------------------------------------------- Login funtion-----------------------------------

// --------------------------------------------- Register -----------------------------------
const registerbtn = document.querySelectorAll(".register-btn");
registerbtn.forEach((register) => {
  register.addEventListener("click", () => {
    homePage.style.display = "none";
    registerPage.style.display = "block";
    loginPage.style.display = "none";
    document.getElementById('name-register').focus();
  });
});
// --------------------------------------------- Register funtion -----------------------------------