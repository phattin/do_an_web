// -------------------------------- clear input ------------------------------
function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
    if (input.tagName === "IMG") {
      input.src = "";
    }
  });
}

// -------------------------------- hidden Orverlay ------------------------------
function hideOverlay() {
  const overlayArr = document.querySelectorAll(".overlay");
  overlayArr.forEach((overlays) => {
    overlays.addEventListener("click", (event) => {
      if (event.target === overlays) {
        overlays.style.removeProperty("display");
        overlays.style.display = "none";
      }
    });
  });
  const closes = document.querySelectorAll(".close");
  closes.forEach((closebtn) => {
    closebtn.addEventListener("click", () => {
      closebtn.parentElement.parentElement.style.display = "none";
    });
  });
}
hideOverlay;
//------------------------------- top menu ---------------------------------
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
  checkCartEmpty();
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
function showDetail(detailElement) {
  detailElement.parentElement.querySelector(".overlay").style.display = "block";
}
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
    if (isLogin == false) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }
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
    if (isLogin == false) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }
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
  const submitOrder = document.querySelector(".submit-order");
  var cartLists = document.querySelectorAll(".cart-box tbody tr");
  if (cartLists.length == 0) {
    cartTable.style.display = "none";
    submitOrder.style.display = "none";
    cartEmpty.style.display = "block";
  } else {
    cartTable.style.display = "block";
    submitOrder.style.display = "block";
    cartEmpty.style.display = "none";
  }
}
function submitOrder() {
  const userLocal = JSON.parse(localStorage.getItem("users")) || [];
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
  const cartTable = document.querySelectorAll(".cart-table tbody tr");
  const orders = [];
  cartTable.forEach((cart) => {
    const order = {
      Img: cart.querySelector(".order-img").src,
      Name: cart.querySelector(".order-name").innerText,
      Price: cart.querySelector(".order-price").innerText,
      Quantity: cart.querySelector(".order-quantity").value,
    };
    orders.push(order);
  });
  const Order = {
    orderList: orders,
    totalPrice: document.querySelector(".cart-table .total-price-value")
      .innerText,
    Status: "Đang xử lý",
  };
  userLogin.OrderHistory.push(Order);
  userLocal.forEach((user) => {
    if (user.Email === userLogin.Email) user.OrderHistory.push(Order);
  });
  localStorage.setItem("userLogin", JSON.stringify(userLogin));
  localStorage.setItem("users", JSON.stringify(userLocal));
}
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
// --------------------------------------------- Register Page-----------------------------------
const registerbtn = document.querySelectorAll(".register-btn");
const userLocal = JSON.parse(localStorage.getItem("users")) || [];
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
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const formRegister = document.querySelector(".form-register");

// Lấy dữ liệu từ localStorage
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
  let isEmailSame = false;
  const usersLocal = JSON.parse(localStorage.getItem("users")) || [];
  usersLocal.forEach((user) => {
    if (user.Email === input.value) isEmailSame = true;
  });
  if (!isEmailError && !isEmailSame) {
    showSuccess(input);
  } else {
    if (isEmailError) {
      showError(input, "Email không hợp lệ");
    } else {
      showError(input, "Email này đã được đăng ký");
    }
  }
  return isEmailError || isEmailSame;
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
    setTimeout(
      (document.querySelector(".register-success").style.display = "block"),
      3000
    );
    const user = {
      UserId: Math.ceil(Math.random() * 10000000000),
      UserName: username.value,
      Email: email.value,
      Password: password.value,
      Phone: phone.value,
      Address: address.value,
      OrderHistory: [],
    };
    userLocal.push(user);
    localStorage.setItem("users", JSON.stringify(userLocal));
    clearInput([username, email, password, phone, address]);
  }
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
const adminAccount = {
  UserName: "admin",
  Password: "admin123",
};
const loginSubmit = document.querySelector(".login-submit");
loginSubmit.addEventListener("click", (event) => {
  const userLocalLogin = JSON.parse(localStorage.getItem("users")) || [];
  const emailLogin = document.getElementById("email-login");
  const passwordLogin = document.getElementById("password-login");
  event.preventDefault();
  if (
    adminAccount.UserName === emailLogin.value &&
    adminAccount.Password === passwordLogin.value
  ) {
    setTimeout(
      (document.querySelector(".login-success").style.display = "block"),
      3000
    );
    document.querySelector(".login-error").style.display = "none";
    localStorage.setItem("userLogin", JSON.stringify(adminAccount));
    isLogin = true;
  } else {
    const findUser = userLocalLogin.find(
      (user) =>
        (user.UserName === emailLogin.value ||
          user.Email === emailLogin.value) &&
        user.Password === passwordLogin.value
    );
    if (!findUser) {
      document.querySelector(".login-error").style.display = "block";
    } else {
      const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
      let isLock = false;
      userLock.forEach((user) => {
        if (user === emailLogin.value) isLock = true;
      });
      if (isLock == true) alert("Tài khoản đang bị khóa");
      else {
        setTimeout(
          (document.querySelector(".login-success").style.display = "block"),
          3000
        );
        document.querySelector(".login-error").style.display = "none";
        localStorage.setItem("userLogin", JSON.stringify(findUser));
        clearInput([emailLogin, passwordLogin]);
        isLogin = true;
      }
    }
  }
});
// -------------------------------- home ------------------------------
var adminLoginAccount = JSON.parse(localStorage.getItem("userLogin"));
if (adminLoginAccount)
  var isAdmin =
    adminAccount.UserName === adminLoginAccount.UserName ? true : false;
var isLogin = localStorage.getItem("userLogin") ? true : false;
function reloadPage() {
  window.location.href = "index.html";
}
if (isLogin) {
  document.querySelector(".account-option-item.login-btn").style.display =
    "none";
  document.querySelector(".account-option-item.register-btn").style.display =
    "none";
  if (isAdmin) {
    document.querySelector(".admin-item").style.display = "block";
  }
} else {
  document.querySelector(".account-option-item.info-btn").style.display =
    "none";
  document.querySelector(".account-option-item.logout-btn").style.display =
    "none";
}
function showInfo() {
  document.querySelector(".info-account").style.display = "block";
}
function innerInfo() {
  const infoTable = document.querySelector(".info-table");
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
  if (isAdmin) infoTable.innerHTML = `Bạn đang là Admin`;
  else {
    infoTable.innerHTML = `<tr>
            <td>Tên:</td>
            <td>${userLogin.UserName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>${userLogin.Email}</td>
          </tr>
          <tr>
            <td>Số điện thoại:</td>
            <td>${userLogin.Phone}</td>
          </tr>
          <tr>
            <td>Địa chỉ:</td>
            <td>${userLogin.Address}</td>
          </tr>
          <button class="order-history-btn" onclick="showHistory()">Xem lịch sử đặt hàng</button>`;
  }
}
innerInfo();
function logOut() {
  localStorage.removeItem("userLogin");
  isLogin = false;
  isAdmin = false;
  window.location.href = "index.html";
}
// -------------------------------- OrderHistory ------------------------------
function addToHistory() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const orders = userLogin.OrderHistory;
  const historyTableList = document.querySelector(".history-table-list");
  let tableContent = "";
  orders.forEach((order, index) => {
    let theadcontent = "";
    let tbodycontent = "";
    let tfootcontent = "";
    const addthead = document.createElement("thead");
    const addtbody = document.createElement("tbody");
    const addtfoot = document.createElement("tfoot");
    // ----------------------thead---------------------
    theadcontent = `
          <thead>
          <tr><td colspan="3" class="history-order-id">Đơn hàng ${
            index + 1
          }:</td></tr>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>`;
    addthead.innerHTML = theadcontent;
    // historyBox.append(addthead);
    // ----------------------tbody---------------------
    order.orderList.forEach((item) => {
      tbodycontent =
        tbodycontent +
        `<tr>
              <td>
                <img src="${item.Img}" class="history-order-img">
                <span class="history-order-name">${item.Name}</span>
              </td>
              <td><span class="history-order-price">${item.Price}</span><sup>đ</sup></td>
              <td class="history-order-quantity">${item.Quantity}</td>
            </tr>`;
    });
    addtbody.innerHTML = tbodycontent;
    // historyBox.append(addtbody);
    // ----------------------tfoot---------------------
    tfootcontent = `<tfoot>
            <tr>
              <td colspan="3" class="totalPrice">Tổng cộng: <span class="total-price-value">${order.totalPrice}</span><sup>đ</sup></td>
            </tr>
            <tr>
              <td colspan="3" class="history-order-status">Tình trạng: <span class="history-order-status-text">${order.Status}</span></td>
            </tr>
          </tfoot>`;
    addtfoot.innerHTML = tfootcontent;
    tableContent =
      tableContent +
      '<table class="history-table">' +
      theadcontent +
      tbodycontent +
      tfootcontent +
      "</table>";
  });
  historyTableList.innerHTML = tableContent;
  checkHistoryEmpty();
}
function checkHistoryEmpty() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const historyEmpty = document.querySelector(".history-empty");
  const orders = userLogin.OrderHistory;
  if (orders) {
    historyEmpty.style.display = "none";
  } else {
    historyEmpty.style.display = "block";
  }
}
function showHistory() {
  addToHistory();
  document.querySelector(".history-page").style.display = "block";
}
// -------------------------------- Admin ------------------------------
function showAdminPage() {
  window.location.href = "admin.html";
}
// -------------------------------- Product ------------------------------

if (!localStorage.getItem("flagAddProduct")) {
  let products = [];
  const productListItem = document.querySelectorAll(".all-product-item");
  productListItem.forEach((item, index) => {
    const product = {
      ID: Math.round(Math.random() * 10000000000),
      Img: item.querySelector(".product-img").src,
      Name: item.querySelector(".product-name").innerText,
      Brand: item.querySelector(".product-brand").innerText,
      Price: item.querySelector(".product-price").innerText,
      Quantity: item.querySelector(".product-quantity").innerText,
      OriginalPrice: item.querySelector(
        ".product-original-price .original-price"
      ).innerText,
      Detail: {
        Img: item.querySelector(".detail-img").src,
        CPU: item.querySelector(".CPU").innerText,
        RAM: item.querySelector(".RAM").innerText,
        RAMType: item.querySelector(".RAM-type").innerText,
        HardDisk: item.querySelector(".hard-disk").innerText,
        Card: item.querySelector(".card").innerText,
        Pin: item.querySelector(".pin").innerText,
        Weight: item.querySelector(".weight").innerText,
      },
    };
    products.push(product);
  });
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("flagAddProduct", JSON.stringify("1"));
}
function displayProduct() {
  const products = JSON.parse(localStorage.getItem("products"));
  const productContainer = document.querySelector("#all-product .container");
  const productList = document.createElement("div");
  productList.classList.add("all-product-list");
  productList.id = "product-list";
  let productListContent = "";
  products.forEach((item) => {
    productListContent += `<section class="product all-product-item dell">
                <img
                  src="${item.Img}"
                  alt=""
                  class="product-img"
                />
                <p class="product-name">${item.Name}(N5I5052W1)</p>
                <div class="product-brand" style="display: none;">${item.Brand}</div>
                <span class="product-price">${item.Price}</span><sup class="sale-price">₫</sup>
                <div class="product-original-price">
                  <span class="original-price">${item.OriginalPrice}</span><sup class="original-price">₫</sup>
                </div>
                <i class="fa-regular fa-eye more-details" onclick="showDetail(this)">
                  <div class="note">Xem thêm thông tin</div>
                </i>
                <i class="fa-solid fa-cart-shopping add-cart">
                  <div class="note">Thêm vào giỏ hàng</div>
                </i>
                <div class="overlay" >
                  <div class="detail-box">
                    <i class="fa-solid fa-rectangle-xmark close"></i>
                    <section class="detail-head">
                      <img src="./assets/imgs/dell2d.jpg" alt="" class="detail-img">
                      <div class="detail-title">
                        <h2 class="detail-heading">${item.Name}</h2>
                        <span class="detail-price">${item.Price}</span><sup class="sale-price">₫</sup>
                        <div class="detail-original-price">
                          <span class="detail-original-price-value">${item.OriginalPrice}</span><sup class="sale-price">₫</sup>
                        </div>
                        <div class="product-quantity">Kho: ${item.Quantity}</div>
                        <div class="detail-quantity">
                          <i class="fa-solid fa-circle-minus desc-quantity" onclick="decreaseQuantity(this)"></i>
                          <input type="number" class="detail-quantity-value" value="1" min="1"></input>
                          <i class="fa-solid fa-circle-plus plus-quantity" onclick="increaseQuantity(this)"></i>
                        </div>
                        <div class="detail-btn">
                          <button class="add-cart-btn">Thêm vào giỏ hàng</button>
                          <button class="buy-btn">Mua ngay</button>
                        </div>
                      </div>
                    </section>
                    <h3 class="detail-heading">Thông tin chi tiết</h3>
                    <table class="detail-table">
                      <tr>
                        <td>Bộ xử lý:</td>
                        <td class="CPU">${item.Detail.CPU}</td>
                      </tr>
                      <tr>
                        <td>RAM:</td>
                        <td class="RAM">${item.Detail.RAM}</td>
                      </tr>
                      <tr>
                        <td>Loại RAM</td>
                        <td class="RAM-type">${item.Detail.RAMType}</td>
                      </tr>
                      <tr>
                        <td>Ổ cứng:</td>
                        <td class="hard-disk">${item.Detail.HardDisk}</td>
                      </tr>
                      <tr>
                        <td>Card:</td>
                        <td class="card">${item.Detail.Card}</td>
                      </tr>
                      <tr>
                        <td>Pin:</td>
                        <td class="pin">${item.Detail.Pin}</td>
                      </tr>
                      <tr>
                        <td>Khối lượng:</td>
                        <td class="weight">${item.Detail.Weight}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </section>`;
  });
  productList.innerHTML = productListContent;
  productContainer.append(productList);
  hideOverlay();
}
displayProduct();
