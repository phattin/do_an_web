// functions
{
  function toggleForm(formId, mode) {
    const form = document.getElementById(formId);
    form.classList.remove(mode === "open" ? "disable" : "enable");
    form.classList.add(mode === "open" ? "enable" : "disable");
  }

  function clearInput(inputs) {
    inputs.forEach((input) => {
      input.value = "";
      if (input.tagName === "IMG") {
        input.src = "";
      }
    });
  }

  // check if the input is empty
  function inputFilled(inputs) {
    for (let input of inputs) {
      if (input.tagName === "IMG" && input.src == "") {
        return false;
      }

      if (input.value == "") {
        return false;
      }
    }
    return true;
  }
  function returnInputNotFilled(inputs) {
    for (let input of inputs) {
      if ((input.tagName === "IMG" && input.src == "") || input.value == "") {
        return input;
      }
    }
    return -1;
  }

  // find ID
  function findId(id, productArray) {
    for (let x in productArray) {
      if (productArray[x].id == id) {
        return Number(x);
      }
    }
    return -1;
  }

  // if admin upload image & submit => show image (look this shit again)
  function getImageUrl(id) {
    let input = document.getElementById(id);
    input.addEventListener("change", function (event) {
      const imagefile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        input.src = e.target.result;
      };
      reader.readAsDataURL(imagefile);
    });
  }

  function changePreview(id) {
    let preview = document
      .getElementById(id)
      .closest("form")
      .querySelector(".form__preview");
    preview.src = document.getElementById(id).src;
  }

  // close forms before opening one
  function closeForm() {
    const forms = ["product__add", "product__edit", "product__remove"];
    forms.forEach((form) => {
      if (document.getElementById(form).classList.contains("enable")) {
        toggleForm(form, "close");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // side menu
  const sp = document.getElementById("side-menu__menu-sp");
  const donHang = document.getElementById("side-menu__menu-order");
  const customer = document.getElementById("side-menu__menu-customer");
  const thongke = document.getElementById("side-menu__menu-statistic");

  // products
  const addItem = document.getElementById("product__btn-add-item");
  const editItem = document.getElementById("product__btn-edit-item");
  const removeItem = document.getElementById("product__btn-remove-item");

  const closeWindowItem = document.getElementById("form__close-add-item");
  const closeWindowEditItem = document.getElementById("form__close-edit-item");
  const closeWindowRemoveItem = document.getElementById(
    "form__close-remove-item"
  );

  const submitItem = document.getElementById("form__submit");
  const submitEditItem = document.getElementById("form__submit-edit-item");
  const submitRemoveItem = document.getElementById("form__submit-remove-item");

  // orders

  // customers
  const customerList = document.getElementById("customer__list-body");

  // statistic

  // some attributes
  const tenSP = document.getElementById("form__sp-name");
  const soluongSP = document.getElementById("form__sp-quantity");
  const giaSP = document.getElementById("form__sp-price");
  const chitietSP = document.getElementById("form__sp-description");
  const hinhSP = document.getElementById("form__sp-img");
  let productID = 1;

  const editIdSP = document.getElementById("form__edit-id");
  const editTenSP = document.getElementById("form__edit-name");
  const editSoluongSP = document.getElementById("form__edit-quantity");
  const editGiaSP = document.getElementById("form__edit-price");
  const editChitietSP = document.getElementById("form__edit-description");
  const editHinhSP = document.getElementById("form__edit-img");

  const removeIdSP = document.getElementById("form__remove-id");

  // array to store products
  const productArray = [];
  let storedItem = {};

  // store local storage's key
  const key = [];

  // update array when localStorage has values
  {
    for (let i = 0; i < localStorage.length; i++) {
      if (!localStorage.getItem("adminLoggedIn")) {
        key.push(localStorage.key(i));
      }
    }

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) != "adminLoggedIn") {
        key.push(localStorage.key(i));
      }
    }

    if (key != "") {
      key.sort();
    }

    // upload data when reload the page
    for (let i = 0; i < localStorage.length; i++) {
      storedItem = JSON.parse(localStorage.getItem(key[i]));
      productArray.push(storedItem);
      if (productArray[productID - 1].status == "show") {
        document.getElementById("product__list-body").innerHTML += `
                    <tr id="${productArray[productID - 1].id}">
                        <td>${productArray[productID - 1].id}</td>
                        <td>${productArray[productID - 1].name}</td>
                        <td>${productArray[productID - 1].sl}</td>
                        <td>${productArray[productID - 1].gia}</td>
                        <td style="overflow-y: auto;">${
                          productArray[productID - 1].describe
                        }</td>
                        <td><img src="${
                          productArray[productID - 1].imageSrc
                        }" style="max-width: 100%;" alt="Photo of ${
          productArray[productID - 1].name
        }"></td>
                    </tr>
                `;
      }
      productID++;
    }
  }

  // open / close a page when the icon is clicked
  {
    // open product lists
    sp.addEventListener("click", function () {
      toggleForm("product", "open");
      toggleForm("order", "close");
      toggleForm("customer", "close");
      toggleForm("statistic", "close");
    });

    // open orders
    donHang.addEventListener("click", function () {
      toggleForm("order", "open");
      toggleForm("product", "close");
      toggleForm("customer", "close");
      toggleForm("statistic", "close");
    });

    // open statistic
    thongke.addEventListener("click", function () {
      toggleForm("statistic", "open");
      toggleForm("product", "close");
      toggleForm("order", "close");
      toggleForm("customer", "close");
    });

    // open customer
    customer.addEventListener("click", function () {
      checkBlock();
      toggleForm("customer", "open");
      toggleForm("product", "close");
      toggleForm("order", "close");
      toggleForm("statistic", "close");
    });

    // open form to add products
    addItem.addEventListener("click", function () {
      closeForm();
      // open product__add
      document.querySelector(".form__preview").src =
        "./image/no-photo-or-blank-image.jpg";
      toggleForm("product__add", "open");
      getImageUrl("form__sp-img");

      // then autofocus the first input
      tenSP.focus();
    });

    // open form to edit products
    editItem.addEventListener("click", function () {
      closeForm();
      toggleForm("product__edit", "open");
      getImageUrl("form__edit-img");

      // then autofocus the first input
      editIdSP.focus();
    });

    // open form to remove products
    removeItem.addEventListener("click", function () {
      closeForm();
      // open product__remove
      toggleForm("product__remove", "open");
      removeIdSP.focus();
    });

    // open form to add orders

    // close item form.
    closeWindowItem.addEventListener("click", function () {
      // make all the input empty
      clearInput([tenSP, soluongSP, giaSP, chitietSP, hinhSP]);
      // then close it
      toggleForm("product__add", "close");
    });

    // close edit window
    closeWindowEditItem.addEventListener("click", function () {
      // make all the input empty
      clearInput([
        editIdSP,
        editTenSP,
        editSoluongSP,
        editGiaSP,
        editChitietSP,
        editHinhSP,
      ]);
      // then close it
      toggleForm("product__edit", "close");
    });

    // close remove window
    closeWindowRemoveItem.addEventListener("click", function () {
      clearInput([removeIdSP]);
      toggleForm("product__remove", "close");
    });
  }
  // Function to block customers
  customerList.addEventListener("click", function (event) {
    if (event.target.closest(".customer__status")) {
      const customerStatus = event.target.closest(".customer__status");
      if (customerStatus.innerText == "Hoạt động") {
        if (confirm("Bạn có chắc chắn muốn khóa tài khoản này không?")) {
          customerStatus.innerText = "Đã khóa";
          customerStatus.style.backgroundColor = "red";
          customerStatus.style.color = "white";
          const emailLock =
            customerStatus.parentElement.parentElement.querySelector(
              ".customer__userEmail"
            ).innerText;
          const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
          userLock.push(emailLock);
          localStorage.setItem("userLock", JSON.stringify(userLock));
        }
      } else if (customerStatus.innerText == "Đã khóa") {
        if (confirm("Bạn có chắc chắn muốn mở khóa tài khoản này không?")) {
          customerStatus.innerText = "Hoạt động";
          customerStatus.style.backgroundColor = "green";
          customerStatus.style.color = "black";
          const emailLock =
            customerStatus.parentElement.parentElement.querySelector(
              ".customer__userEmail"
            ).innerText;
          const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
          for (let i = 0; i < userLock.length; i++)
            if (emailLock == userLock[i]) userLock.splice(i, 1);
          localStorage.setItem("userLock", JSON.stringify(userLock));
        }
      }
    }
  });
  // check block customers
  function checkBlock() {
    const customerStatus = customerList.querySelectorAll(".customer__status");
    customerStatus.forEach((status) => {
      const emailLock = status.parentElement.parentElement.querySelector(
        ".customer__userEmail"
      ).innerText;
      const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
      for (let i = 0; i < userLock.length; i++)
        if (emailLock == userLock[i]) {
          status.innerText = "Đã khóa";
          status.style.backgroundColor = "red";
          status.style.color = "white";
        }
    });
  }
  // check if the pay and the ship is checked => its background will be green

  // Do something if the button in items are clicked

  //--------------------------------- Customer -----------------------------
  function addCustomer() {
    const userLocal = JSON.parse(localStorage.getItem("users"));
    let customerContent = "";
    userLocal.forEach((user) => {
      customerContent =
        customerContent +
        `<tr id="KH#1">
                                        <td class="customer__userID">${user.UserId}</td>
                                        <td class="customer__userName">${user.UserName}</td>
                                        <td class="customer__userPhone">${user.Phone}</td>
                                        <td class="customer__userAddress">${user.Address}</td>
                                        <td class="customer__userEmail">${user.Email}</td>
                                        <td><button type="button" class="customer__status" title="Nhấp chuột để thay đổi trạng thái">Hoạt động</button></td>
                                     </tr>`;
    });
    document.querySelector("#customer__list-body").innerHTML = customerContent;
  }
  addCustomer();
});
