// functions
{
  function toggleForm(formId, mode) {
    const form = document.getElementById(formId);
    form.classList.remove(mode === "open" ? "disable" : "enable");
    form.classList.add(mode === "open" ? "enable" : "disable");
  }
  function hideOverlay() {
    const overlayArr = document.querySelectorAll(".overlay") || [];
    overlayArr.forEach((overlays) => {
      overlays.addEventListener("click", (event) => {
        if (event.target === overlays) {
          overlays.style.removeProperty("display");
          overlays.style.display = "none";
        }
      });
    });
    const closes = document.querySelectorAll(".close") || [];
    closes.forEach((closebtn) => {
      closebtn.addEventListener("click", () => {
        closebtn.parentElement.parentElement.style.display = "none";
      });
    });
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
  // function getImageUrl(id) {
  //   let input = document.getElementById(id);
  //   input.addEventListener("change", function (event) {
  //     const imagefile = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       input.src = e.target.result;
  //     };
  //     reader.readAsDataURL(imagefile);
  //   });
  // }

  // function changePreview(inputElement) {
  //   console.log(inputElement.parentElement)
  //   const preview = inputElement.parentElement.querySelector('.form__preview')
  //   preview.src = document.getElementById(this).src;
  // }
  function uploadImg(inputElement) {
    const preview = inputElement.parentElement.querySelector(".form__preview");
    const fileSelected = inputElement.files;
    if (fileSelected.length > 0) {
      const fileToLoad = fileSelected[0];
      const fileReader = new FileReader();
      fileReader.onload = function (fileLoaderEvent) {
        const srcNew = fileLoaderEvent.target.result;
        preview.src = srcNew;
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }
  function toggleMoreDetail() {
    const moreDetail = document.querySelector(".form__sp-description-more");
    const moreDisplayStyle = window.getComputedStyle(moreDetail).display;
    if (moreDisplayStyle === "none") {
      moreDetail.style.display = "block"; // Hiển thị phần tử
    } else {
      moreDetail.style.display = "none"; // Ẩn phần tử
    }
  }
  function showProductAdd() {
    document.querySelector(".product__add").style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  hideOverlay();
  // side menu
  const sp = document.getElementById("side-menu__menu-sp");
  const donHang = document.getElementById("side-menu__menu-order");
  const customer = document.getElementById("side-menu__menu-customer");
  const thongke = document.getElementById("side-menu__menu-statistic");

  // products
  const addItem = document.getElementById("product__btn-add-item");
  const editItem = document.getElementById("product__btn-edit-item");
  const removeItem = document.getElementById("product__btn-remove-item");

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
  let productArray = [];

  // update array when localStorage has values
  {
    if (localStorage.getItem("products")) {
      // get data from localStorage
      productArray = JSON.parse(localStorage.getItem("products"));

      // upload data when reload the page
      for (let i = 0; i < productArray.length; i++) {
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
                            <td><i class="fa-regular fa-pen-to-square"></i>  <i class="fa-solid fa-trash"></i></td>
                        </tr>
                    `;
        }
        productID++;
      }
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

    // open form to edit products
    // open form to add orders
  }

  // submit item's info => if have value in the inputs => submit
  // {
  //   submitItem.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     if (!inputFilled([tenSP, soluongSP, giaSP, chitietSP, hinhSP])) {
  //       return false;
  //     } else if (isNaN(soluongSP.value)) {
  //       alert("Vui lòng nhập số.");
  //       soluongSP.focus();
  //       return false;
  //     } else if (isNaN(giaSP.value)) {
  //       alert("Vui lòng nhập số.");
  //       giaSP.focus();
  //       return false;
  //     }
  //     // bring values into table
  //     else {
  //       // do the thing
  //       productArray[productID - 1] = {
  //         id: `SP#${productID}`,
  //         name: tenSP.value,
  //         sl: soluongSP.value,
  //         gia: giaSP.value,
  //         describe: chitietSP.value,
  //         imageName: hinhSP.value,
  //         imageSrc: hinhSP.src,
  //         status: "show",
  //       };

  //       try {
  //         document.getElementById("product__list-body").innerHTML += `
  //                       <tr id="${productArray[productID - 1].id}">
  //                           <td>${productArray[productID - 1].id}</td>
  //                           <td>${productArray[productID - 1].name}</td>
  //                           <td>${productArray[productID - 1].sl}</td>
  //                           <td>${productArray[productID - 1].gia}</td>
  //                           <td style="overflow-y: auto;">${
  //                             productArray[productID - 1].describe
  //                           }</td>
  //                           <td><img src="${
  //                             productArray[productID - 1].imageSrc
  //                           }" style="max-width: 100%;" alt="Photo of ${
  //           productArray[productID - 1].name
  //         }"></td>
  //                           <td><i class="fa-regular fa-pen-to-square"></i>  <i class="fa-solid fa-trash"></i></td>
  //                       </tr>
  //                   `;

  //         // store data into localStorage
  //         if (localStorage.getItem("products")) {
  //           localStorage.removeItem("products");
  //         }
  //         localStorage.setItem("products", JSON.stringify(productArray));

  //         productID++;
  //       } catch (e) {
  //         alert("Cannot submit data because of exceeding storage!" + e);
  //         productArray.splice(productID - 1, 1);
  //       }

  //       // make all the input empty
  //       clearInput([tenSP, soluongSP, giaSP, chitietSP, hinhSP]);
  //       document.querySelector(".form__preview").src =
  //         "./assets/imgs/no-photo-or-blank-image.jpg";
  //     }
  //   });

  // edit has error
  // submitEditItem.addEventListener("click", function (event) {
  //   event.preventDefault();
  //   // if id is null
  //   if (!inputFilled([editIdSP])) {
  //     alert("Vui lòng nhập ID của sản phẩm");
  //     editIdSP.focus();
  //     return false;
  //   } else if (findId(editIdSP.value, productArray) == -1) {
  //     alert("Không tìm thấy được sản phẩm.");
  //     editIdSP.focus();
  //     return false;
  //   }

  //   // if there are tuples that are empty
  //   else if (
  //     !inputFilled([
  //       editTenSP,
  //       editSoluongSP,
  //       editGiaSP,
  //       editChitietSP,
  //       editHinhSP,
  //     ])
  //   ) {
  //     if (
  //       confirm(
  //         "Các trường bị bỏ trống sẽ được sử dụng dữ liệu cũ, bạn có chắc chứ?"
  //       )
  //     ) {
  //       console.log("Using old data...");
  //       let index = findId(editIdSP.value, productArray);
  //       console.log(`Update data using index ${index}`);
  //       while (
  //         returnInputNotFilled([
  //           editTenSP,
  //           editSoluongSP,
  //           editGiaSP,
  //           editChitietSP,
  //           editHinhSP,
  //         ]) != -1
  //       ) {
  //         let input = returnInputNotFilled([
  //           editTenSP,
  //           editSoluongSP,
  //           editGiaSP,
  //           editChitietSP,
  //           editHinhSP,
  //         ]);
  //         switch (input) {
  //           case editTenSP:
  //             input.value = productArray[index].name;
  //             console.log(`Complete edit name: ${input.value}`);
  //             break;
  //           case editSoluongSP:
  //             input.value = productArray[index].sl;
  //             console.log(`Complete edit quantity: ${input.value}`);
  //             break;
  //           case editGiaSP:
  //             input.value = productArray[index].gia;
  //             console.log(`Complete edit price: ${input.value}`);
  //             break;
  //           case editChitietSP:
  //             input.value = productArray[index].describe;
  //             console.log(`Complete edit description: ${input.value}`);
  //             break;
  //           case editHinhSP:
  //             input.src = productArray[index].imageSrc;
  //             console.log(`Complete edit image: ${input.value}`);
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     } else return false;
  //   }

  //   // if all of the values are filled
  //   // update array
  //   let index = findId(editIdSP.value, productArray);
  //   console.log(`Updating array index ${index}`);
  //   productArray[index].name = editTenSP.value;
  //   productArray[index].sl = editSoluongSP.value;
  //   productArray[index].gia = editGiaSP.value;
  //   productArray[index].describe = editChitietSP.value;
  //   productArray[index].imageSrc = editHinhSP.src;
  //   console.log(productArray[index]);

  //   try {
  //     // update localStorage
  //     console.log(`Updating local storage SP#${index + 1}`);
  //     localStorage.setItem("products", JSON.stringify(productArray));
  //   } catch (e) {
  //     alert("Cannot submit data because of exceeding storage!");
  //     productArray.splice(index, 1);
  //     return false;
  //   }
  //   let rows = document.querySelectorAll("#product__list-body tr");
  //   for (let row of rows) {
  //     if (row.id == productArray[index].id) {
  //       row.innerHTML = `
  //                     <tr id="${productArray[index].id}">
  //                         <td>${productArray[index].id}</td>
  //                         <td>${productArray[index].name}</td>
  //                         <td>${productArray[index].sl}</td>
  //                         <td>${productArray[index].gia}</td>
  //                         <td style="overflow-y: auto;">${productArray[index].describe}</td>
  //                         <td><img src="${productArray[index].imageSrc}" style="max-width: 100%;" alt="Photo of ${productArray[index].name}"></td>
  //                         <td><i class="fa-regular fa-pen-to-square"></i>  <i class="fa-solid fa-trash"></i></td>
  //                     </tr>
  //                 `;
  //       break;
  //     }
  //   }
  //   clearInput([
  //     editIdSP,
  //     editTenSP,
  //     editSoluongSP,
  //     editGiaSP,
  //     editChitietSP,
  //     editHinhSP,
  //   ]);
  // });

  //   submitRemoveItem.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     if (!inputFilled([removeIdSP])) {
  //       return false;
  //     } else if (findId(removeIdSP.value, productArray) == -1) {
  //       alert("Không tìm thấy sản phảm trong danh sách");
  //       return false;
  //     } else {
  //       let index = findId(removeIdSP.value, productArray);
  //       // are you sure to remove the product?
  //       if (
  //         confirm(`Bạn có muốn xóa thông tin sau không?

  //               Tên sản phẩm: ${productArray[index].name}
  //               Số lượng: ${productArray[index].sl}
  //               Giá: ${productArray[index].gia}
  //               Chi tiết: ${productArray[index].describe}
  //           `)
  //       ) {
  //         console.log(`Removing key: SP#${index + 1}`);
  //         // update array
  //         productArray[index].status = "hidden";
  //         // update local storage
  //         localStorage.setItem("products", JSON.stringify(productArray));

  //         let rows = document.querySelectorAll("#product__list-body tr");
  //         for (let row of rows) {
  //           if (row.id == productArray[index].id) {
  //             row.remove();
  //             break;
  //           }
  //         }

  //         console.log(productArray);
  //         clearInput([removeIdSP]);
  //       }
  //     }
  //   });
  // }
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
  function addCustomertoTable() {
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
  addCustomertoTable();
  //--------------------------------- Product -----------------------------
  // ------------ Add ------------
  function addProducttoTable() {
    const products = JSON.parse(localStorage.getItem("products"));
    let productContent = "";
    products.forEach((product) => {
      productContent += `<tr>
                    <td class="product__id">${product.ID}</td>
                    <td class="product__name">${product.Name}</td>
                    <td class="product__quantity">${product.Quantity}</td>
                    <td class="product__price">${product.Price}</td>
                    <td>Chi tiết</td>
                    <td class="product__img"><img src="${product.Img}" /></td>
                    <td>
                      <i class="fa-regular fa-pen-to-square edit-icon" onclick="editProduct(this)"></i>
                      <i class="fa-solid fa-trash delete-icon" onclick="deleteProduct(this)"></i>
                    </td>
                  </tr>`;
    });
    document.querySelector("#product__list-body").innerHTML = productContent;
  }
  addProducttoTable();
  document
    .querySelector(".form__submit-btn")
    .addEventListener("click", addOneProduct);
  function addOneProduct(event) {
    event.preventDefault();
    const name = document.getElementById("form__sp-name");
    const brand = document.getElementById("form__sp-brand");
    const quantity = document.getElementById("form__sp-quantity");
    const price = document.getElementById("form__sp-price");
    const img = document.getElementById("form__preview-img");
    const cpu = document.getElementById("form__sp-cpu");
    const ram = document.getElementById("form__sp-ram");
    const ramType = document.getElementById("form__sp-ramtype");
    const hardDisk = document.getElementById("form__sp-harddisk");
    const card = document.getElementById("form__sp-card");
    const pin = document.getElementById("form__sp-pin");
    const weight = document.getElementById("form__sp-weight");
    const detailImg = document.getElementById("form__preview-detail-img");
    if (!inputFilled([name, quantity, price, img])) {
      return false;
    } else if (isNaN(quantity.value)) {
      alert("Vui lòng nhập số.");
      quantity.focus();
      return false;
    } else if (isNaN(price.value)) {
      alert("Vui lòng nhập số.");
      price.focus();
      return false;
    }
    // bring values into table
    else {
      // do the thing
      const product = {
        ID: Math.round(Math.random() * 10000000000),
        Img: img.src,
        Name: name.value,
        Brand: brand.value,
        Price: price.value,
        Quantity: quantity.value,
        OriginalPrice: "",
        Detail: {
          Img: detailImg.src,
          CPU: cpu.value,
          RAM: ram.value,
          RAMType: ramType.value,
          HardDisk: hardDisk.value,
          Card: card.value,
          Pin: pin.value,
          Weight: weight.value,
        },
      };
      const productContent = `
                        <tr>
                            <td class="product__id">${product.ID}</td>
                            <td class="product__name">${product.Name}</td>
                            <td class="product__quantity">${product.Quantity}</td>
                            <td class="product__price">${product.Price}</td>
                            <td>Chi tiết</td>
                            <td class="product__img"><img src="${product.Img}"/></td>
                            <td>
                              <i class="fa-regular fa-pen-to-square edit-icon" onclick="editProduct(this)"></i>
                              <i class="fa-solid fa-trash delete-icon" onclick="deleteProduct(this)"></i>
                            </td>
                        </tr>
                    `;
      const addtr = document.createElement("tr");
      addtr.innerHTML = productContent;
      document.getElementById("product__list-body").append = addtr;
      // store data into localStorage
      const products = JSON.parse(localStorage.getItem("products")) || [];
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));

      // make all the input empty
      clearInput([
        name,
        brand,
        quantity,
        price,
        img,
        price,
        cpu,
        ram,
        ramType,
        hardDisk,
        card,
        pin,
        weight,
      ]);
      document.querySelector("#form__preview-img").src =
        "./assets/imgs/no-photo-or-blank-image.jpg";
      document.querySelector("#form__preview-detail-img").src =
        "./assets/imgs/no-photo-or-blank-image.jpg";
    }
  }
});
// submit item's info => if have value in the inputs => submit
// ------------ Edit ------------
function editProduct(productElement) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const divProduct = productElement.parentElement.parentElement;
  const id = divProduct.querySelector(".product__id").innerText;
  const nameText = divProduct.querySelector(".product__name");
  const quantityText = divProduct.querySelector(".product__quantity");
  const priceText = divProduct.querySelector(".product__price");
  const imgDiv = divProduct.querySelector(".product__img");
  for (let i = 0; i < products.length; i++) {
    if (products[i].ID == id) {
      const name = document.getElementById("form__edit-name");
      const brand = document.getElementById("form__edit-brand");
      const quantity = document.getElementById("form__edit-quantity");
      const price = document.getElementById("form__edit-price");
      const img = document.getElementById("form__edit-preview-img");
      const cpu = document.getElementById("form__edit-cpu");
      const ram = document.getElementById("form__edit-ram");
      const ramType = document.getElementById("form__edit-ramtype");
      const hardDisk = document.getElementById("form__edit-harddisk");
      const card = document.getElementById("form__edit-card");
      const pin = document.getElementById("form__edit-pin");
      const weight = document.getElementById("form__edit-weight");
      const detailImg = document.getElementById(
        "form__edit-preview-detail-img"
      );

      name.value = products[i].Name;
      brand.value = products[i].Brand;
      quantity.value = products[i].Quantity;
      price.value = products[i].Price;
      img.src = products[i].Img;
      cpu.value = products[i].Detail.CPU;
      ram.value = products[i].Detail.RAM;
      ramType.value = products[i].Detail.RAMType;
      hardDisk.value = products[i].Detail.HardDisk;
      card.value = products[i].Detail.Card;
      pin.value = products[i].Detail.Pin;
      weight.value = products[i].Detail.Weight;
      detailImg.src = products[i].Detail.Img;
      // ----- Submit ------
      document
        .querySelector(".form__edit-submit-btn")
        .addEventListener("click", (event) => {
          event.preventDefault();
          const product = {
            ID: id,
            Img: img.src,
            Name: name.value,
            Brand: brand.value,
            Price: price.value,
            Quantity: quantity.value,
            OriginalPrice: "",
            Detail: {
              Img: detailImg.src,
              CPU: cpu.value,
              RAM: ram.value,
              RAMType: ramType.value,
              HardDisk: hardDisk.value,
              Card: card.value,
              Pin: pin.value,
              Weight: weight.value,
            },
          };
          nameText.innerText = product.Name;
          quantityText.innerText = product.Quantity;
          priceText.innerText = product.Price;
          imgDiv.src = product.Img;
          products[i] = product;
          localStorage.setItem("products", JSON.stringify(products));
        });
      break;
    }
  }
  document.querySelector(".product__edit").style.display = "block";
}
// ------------ Delete ------------
function deleteProduct(productElement) {
  if (confirm("Bạn có chắc chắn xóa sản phẩm này")) {
    const divProduct = productElement.parentElement.parentElement;
    const id = divProduct.querySelector(".product__id").innerText;
    const products = JSON.parse(localStorage.getItem("products")) || [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].ID == id) {
        products.splice(i, 1);
        localStorage.setItem("products", JSON.stringify(products));
        break;
      }
    }
    divProduct.remove();
  }
}
