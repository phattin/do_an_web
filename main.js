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
// --------------------------------------------- Login -----------------------------------
const homePage = document.querySelector(".home-page");
const loginPage = document.querySelector(".login-page");
document.querySelector(".login-btn").addEventListener("click", () => {
  homePage.style.display = "none";
  loginPage.style.display = "block";
});
