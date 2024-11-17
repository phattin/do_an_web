// -------------------------------- hidden Orverlay ------------------------------
const overlayArr = document.querySelectorAll(".overlay");
overlayArr.forEach((overlays) => {
  overlays.addEventListener("click", (event) => {
    if (event.target === overlays) overlays.style.display = "none";
  });
});
const closes = document.querySelectorAll(".close");
closes.forEach((closebtn) => {
  closebtn.addEventListener("click", () => {
    closebtn.parentElement.parentElement.style.display = "none";
  });
});
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

function showCart() {
  document.querySelector(".cart-page").style.display = "block";
}
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
// ---------------------------------- Detail ---------------------------------
const detailbtns = document.querySelectorAll(".more-details");
detailbtns.forEach((detailbtn) => {
  detailbtn.addEventListener("click", () => {
    let section = detailbtn.closest("section");
    let overlay = section.querySelector(".overlay");
    overlay.style.display = "block";
  });
});
function decreaseQuantity(minusElement) {
  var detailQuantity = minusElement.parentElement.querySelector(
    ".detail-quantity-value"
  );
  var quantityValue = Number(detailQuantity.value);
  if (quantityValue > 1) {
    quantityValue--;
    detailQuantity.value = quantityValue;
  }
}
function increaseQuantity(plusElement) {
  var detailQuantity = plusElement.parentElement.querySelector(
    ".detail-quantity-value"
  );
  var quantityValue = Number(detailQuantity.value);
  quantityValue++;
  detailQuantity.value = quantityValue;
}
const detailQuantityList = document.querySelectorAll(".detail-quantity-value");
detailQuantityList.forEach((inputNumber) => {
  inputNumber.addEventListener("input", () => {
    if (inputNumber.value < 1) {
      inputNumber.value = "";
    }
  });
});
const addCartBtns = document.querySelectorAll(".add-cart-btn");
addCartBtns.forEach((addCartbtn) => {
  addCartbtn.addEventListener("click", (event) => {
    var productCB =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement;
    var productValue = event.target.parentElement.parentElement.querySelector(
      ".detail-quantity-value"
    ).value;
    console.log(productValue);
    var productImg = productCB.querySelector(".product-img").src;
    var productName = productCB.querySelector(".product-name").innerText;
    var productPrice = productCB.querySelector(".product-price").innerText;
    addToCart(productImg, productName, productPrice, productValue);
  });
});
// ---------------------------------- Cart ---------------------------------
const cartBox = document.querySelector(".cart-box");
const addCarts = document.querySelectorAll(".add-cart");
addCarts.forEach((addCart) => {
  addCart.addEventListener("click", (event) => {
    var productC = event.target.parentElement;
    var productImg = productC.querySelector(".product-img").src;
    var productName = productC.querySelector(".product-name").innerText;
    var productPrice = productC.querySelector(".product-price").innerText;
    addToCart(productImg, productName, productPrice, 1);
  });
});
var flag = 0;
function addToCart(productImg, productName, productPrice, productValue) {
  var cartNameList = cartBox.querySelectorAll(".order-name");
  for (let i = 0; i < cartNameList.length; i++) {
    if (cartNameList[i].innerText === productName) {
      alert("Sản phẩm này đã có trong giỏ hàng");
      return;
    }
  }
  var addtr = document.createElement("tr");
  var trcontent = `<tr>
    <td>
    <img src="${productImg}" class="order-img">
      <span class="order-name">${productName}</span>
    </td>
    <td><span class="order-price">${productPrice}</span><sup>đ</sup></td>
    <td><input class="order-quantity" type="number" value="${productValue}" min="1"></td>
    <td><button onclick="deleteCart(this)" class="delete-order">Xóa</button></td>
  </tr>`;
  addtr.innerHTML = trcontent;
  var cartTable = document.querySelector(".cart-table tbody");
  cartTable.append(addtr);
  cartTotal();
  checkCartEmpty();
}
function cartTotal() {
  var cartList = document.querySelectorAll(".cart-box tbody tr");
  var totalPrice = 0;
  var totalQuantity = 0;
  for (var i = 0; i < cartList.length; i++) {
    var quantityValue = Number(
      cartList[i].querySelector(".order-quantity").value
    );
    var orderPrice = Number(
      cartList[i].querySelector(".order-price").innerText.replace(/\./g, "")
    );
    totalQuantity = totalQuantity + quantityValue;
    totalPrice = totalPrice + orderPrice * quantityValue;
  }
  if (totalQuantity > 0)
    document.querySelector(".total-quantity-cart").innerText = totalQuantity;
  else document.querySelector(".total-quantity-cart").innerText = "";
  document.querySelector(".cart-table tfoot span").innerText =
    totalPrice.toLocaleString("de-DE");

  quantityChange();
}
function deleteCart(deleteElement) {
  deleteElement.parentElement.parentElement.remove();
  cartTotal();
  checkCartEmpty();
}
function quantityChange() {
  var quantityList = document.querySelectorAll(".order-quantity");
  for (var i = 0; i < quantityList.length; i++)
    quantityList[i].addEventListener("change", () => {
      cartTotal();
    });
}
function checkCartEmpty() {
  const cartTable = document.querySelector(".cart-table");
  const cartEmpty = document.querySelector(".cart-empty");
  var cartLists = document.querySelectorAll(".cart-box tbody tr");
  if (cartLists.length == 0) {
    cartTable.style.display = "none";
    cartEmpty.style.display = "block";
  } else {
    cartTable.style.display = "block";
    cartEmpty.style.display = "none";
  }
}
checkCartEmpty();
// ---------------------------------- Phan trang ---------------------------------
// let thisPage = 1;
// let limit = 8;
// let list = document.querySelectorAll(".product");

// function loadItem() {
//   let beginGet = limit * (thisPage - 1);
//   let endGet = limit * thisPage - 1;
//   list.forEach((item, key) => {
//     if (key >= beginGet && key <= endGet) {
//       item.style.display = "block";
//     } else {
//       item.style.display = "none";
//     }
//   });
//   listPage();
// }
// loadItem();
// function listPage() {
//   let count = Math.ceil(list.length / limit);
//   document.querySelector(".listPage").innerHTML = "";
//   if (thisPage != 1) {
//     let prev = document.createElement("li");
//     prev.innerText = "PREV";
//     prev.setAttribute("onclick", "changePage(" + (thisPage - 1) + ")");
//     document.querySelector(".listPage").appendChild(prev);
//   }
//   for (i = 1; i <= count; i++) {
//     let newPage = document.createElement("li");
//     newPage.innerText = i;
//     if (thisPage == i) {
//       newPage.classList.add("active");
//     }
//     newPage.setAttribute("onclick", "changePage (" + i + ")");
//     document.querySelector(".listPage").appendChild(newPage);
//   }
//   if (thisPage != count) {
//     let next = document.createElement("li");
//     next.innerText = "NEXT";
//     next.setAttribute("onclick", "changePage(" + (thisPage + 1) + ")");
//     document.querySelector(".listPage").appendChild(next);
//   }
// }
// function changePage(i) {
//   thisPage = i;
//   loadItem();
// }

// ----------------------- PHAN TRANG ------------------------
const dell = document.getElementsByClassName("dell");
const asus = document.getElementsByClassName("asus");
const allProduct = document.querySelectorAll(".product");
const listPage = document.querySelector(".listPage");
let thisPage = 1;
const amountProduct1Page = 8;
function createListPage(arr) {
  const amountPage = Math.ceil(arr.length / amountProduct1Page);
  let s = "";
  for (let i = 1; i <= amountPage; i++) {
    let type = "all";
    if (arr === dell) type = "dell";
    else if (arr === asus) type = "asus";

    if (i === thisPage) {
      s += `<button onclick="changePage(${i}, '${type}')" class="numberlist active">${i}</button>`;
    } else {
      s += `<button onclick="changePage(${i}, '${type}')" class="numberlist">${i}</button>`;
    }
  }

  if (listPage) {
    listPage.innerHTML = s;
  } else {
    console.error("Không tìm thấy phần tử `listPage`!");
  }
}

function displayProducts(arr) {
  const products = Array.isArray(arr) ? arr : Array.from(arr);
  const start = (thisPage - 1) * amountProduct1Page;
  const end = thisPage * amountProduct1Page;

  allProduct.forEach((item) => {
    item.style.display = "none";
  });
  products.forEach((item, index) => {
    if (index >= start && index < end) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  createListPage(arr);
}

function showDELL(event) {
  event.preventDefault;
  thisPage = 1;
  displayProducts(dell);
}
function showASUS(event) {
  event.preventDefault;
  thisPage = 1;
  displayProducts(asus);
}

function changePage(page, type) {
  thisPage = page;
  if (type === "dell") {
    displayProducts(dell);
  } else if (type === "asus") {
    displayProducts(asus);
  } else {
    displayProducts(allProduct);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts(allProduct);
  createListPage(allProduct);
});
// --------------------------------------------- Login Page-----------------------------------
const homePage = document.querySelector(".home-page");
const loginPage = document.querySelector(".login-page");
const registerPage = document.querySelector(".register-page");

const loginbtn = document.querySelectorAll(".login-btn");
loginbtn.forEach((login) => {
  login.addEventListener("click", (e) => {
    e.preventDefault();
    homePage.style.display = "none";
    registerPage.style.display = "none";
    loginPage.style.display = "block";
    document.getElementById("email-login").focus();
  });
});
// --------------------------------------------- Login funtion-----------------------------------

// --------------------------------------------- Register -----------------------------------
const registerbtn = document.querySelectorAll(".register-btn");
registerbtn.forEach((register) => {
  register.addEventListener("click", (e) => {
    e.preventDefault();
    homePage.style.display = "none";
    registerPage.style.display = "block";
    loginPage.style.display = "none";
    document.getElementById("name-register").focus();
  });
});
// --------------------------------------------- Register funtion -----------------------------------
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const repassword = document.querySelector("#re-password");
const formRegister = document.querySelector(".form-register");

// Lấy dữ liệu từ localStorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

function showError(e, message) {
  let parentInput = e.parentElement;
  let errorText = parentInput.querySelector("p");
  e.classList.add("error");
  errorText.innerText = message;
}
function showSuccess(e) {
  let parentInput = e.parentElement;
  let errorText = parentInput.querySelector("p");
  e.classList.remove("error");
  errorText.innerText = "";
}

function checkEmptyError(input) {
  let isEmptyError = false;
  input.value = input.value.trim();
  if (!input.value) {
    isEmptyError = true;
    showError(input, "Không được để trống");
  } else {
    showSuccess(input);
  }
  return isEmptyError;
}

function checkLengthError(input, min) {
  input.value = input.value.trim();
  let isLengthError = input.value.length < min;
  if (isLengthError) {
    showError(input, `Phải có ít nhất ${min} ký tự`);
  }
  return isLengthError;
}

function checkEmailError(input) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  input.value = input.value.trim();
  let isEmailError = !regexEmail.test(input.value);
  if (!isEmailError) {
    showSuccess(input);
  } else {
    showError(input, "Email không hợp lệ");
  }
  return isEmailError;
}

function checkMatchPasswordError(passwordInput, rePasswordInput) {
  if (passwordInput.value !== rePasswordInput.value)
    showError(rePasswordInput, "Mật khẩu không khớp");
  return passwordInput.value !== rePasswordInput.value;
}
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();

  let isUsernameEmptyError = checkEmptyError(username);
  let isEmailEmptyError = checkEmptyError(email);
  let isPasswordEmptyError = checkEmptyError(password);
  let isRepasswordEmptyError = checkEmptyError(repassword);

  let isUsernameLengthError = true;
  let isEmailError = true;
  let isMatchError = true;
  if (!isUsernameEmptyError) {
    isUsernameLengthError = checkLengthError(username, 5);
  }
  if (!isEmailEmptyError) {
    isEmailError = checkEmailError(email);
  }
  if (!isRepasswordEmptyError) {
    isMatchError = checkMatchPasswordError(password, repassword);
  }
  if (isEmailError || isUsernameLengthError || isMatchError) {
    //do nothing
  } else {
    alert("Đăng ký thành công");
    const user = {
      UserId: Math.ceil(Math.random() * 10000000000),
      UserName: username.value,
      Email: email.value,
      Password: password.value,
    };
    userLocal.push(user);
    localStorage.setItem("users", JSON.stringify(userLocal));
  }
});
