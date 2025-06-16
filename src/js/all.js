document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".mobile-nav").addEventListener("click", () => {
    document.querySelector("header nav").classList.toggle("show");
  });
});

window.addEventListener("DOMContentLoaded", function () {
  function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log(cartItems);
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }
  }

  updateCartCount();
});

// Modals function

const cartButton = document.querySelector(".cart-button");

// Add a click event listener to the cart button
cartButton.addEventListener("click", displayCartModal);

// Get references to the modal and close button
const modal = document.getElementById("cartModal");
const closeButton = document.querySelector(".close");

// Add click event listener to close button
closeButton.addEventListener("click", closeModal);

function displayCartModal() {
  const totalPriceElement = document.getElementById("total-price");
  const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cartItemsContainer");

  let totalPriceAllItems = 0;

  // Clear previous content
  cartItemsContainer.innerHTML = "";

  if (cartItemsData.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Keranjang belanja kosong</p>';
    totalPriceElement.textContent = "Rp 0";
    openModal();
    return;
  }

  // Loop through cart items data and display them
  cartItemsData.forEach((item, index) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    // Create container for item details
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("item-details");

    // Create container for item image
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("item-image");
    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    imageContainer.appendChild(itemImage);

    const itemText = document.createElement("div");
    itemText.classList.add("item");

    // Create item name element
    const itemName = document.createElement("h5");
    itemName.textContent = item.name;

    // Create item category element
    const itemCategory = document.createElement("p");
    itemCategory.textContent = item.category;
    itemCategory.classList.add("item-category");

    // Create item price element
    const itemPrice = document.createElement("p");
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    itemPrice.textContent = `Rp ${price.toLocaleString('id-ID')}`;
    itemPrice.classList.add("item-price");

    itemText.appendChild(itemName);
    itemText.appendChild(itemCategory);
    itemText.appendChild(itemPrice);

    // Append image and text to details container
    detailsContainer.appendChild(imageContainer);
    detailsContainer.appendChild(itemText);

    // Create container for quantity controls
    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-controls");

    // Create minus button
    const minusButton = document.createElement("button");
    minusButton.innerHTML = '<i class="fas fa-minus"></i>';
    minusButton.onclick = () => {
      if (item.quantity > 1) {
        item.quantity--;
        updateCartItem(index, item);
      }
    };

    // Create quantity input
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = item.quantity;
    quantityInput.min = "1";
    quantityInput.onchange = () => {
      const newQuantity = parseInt(quantityInput.value);
      if (newQuantity >= 1) {
        item.quantity = newQuantity;
        updateCartItem(index, item);
      }
    };

    // Create plus button
    const plusButton = document.createElement("button");
    plusButton.innerHTML = '<i class="fas fa-plus"></i>';
    plusButton.onclick = () => {
      item.quantity++;
      updateCartItem(index, item);
    };

    quantityContainer.appendChild(minusButton);
    quantityContainer.appendChild(quantityInput);
    quantityContainer.appendChild(plusButton);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = () => {
      deleteCartItem(index);
    };

    // Append all elements to item container
    itemContainer.appendChild(detailsContainer);
    itemContainer.appendChild(quantityContainer);
    itemContainer.appendChild(deleteButton);

    cartItemsContainer.appendChild(itemContainer);

    // Calculate total price
    totalPriceAllItems += price * item.quantity;
  });

  totalPriceElement.textContent = `Rp ${totalPriceAllItems.toLocaleString('id-ID')}`;
  openModal();
}

function updateCartItem(index, updatedItem) {
  const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItemsData[index] = updatedItem;
  localStorage.setItem("cartItems", JSON.stringify(cartItemsData));
  displayCartModal();
}

function deleteCartItem(index) {
  const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItemsData.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItemsData));
  updateCartCount();
  displayCartModal();
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}
// Function to open the modal
function openModal() {
  modal.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  const dropbtn = document.getElementById("dropbtn");
  const dropdownContent = document.getElementById("dropdown-content");

  dropbtn.addEventListener("click", function () {
    dropdownContent.style.display = "block";
  });

  dropdownContent.addEventListener("click", function (event) {
    dropbtn.textContent = event.target.getAttribute("data-value");
    dropdownContent.style.display = "none";
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener("click", function (event) {
    if (!event.target.matches("#dropbtn")) {
      if (dropdownContent.style.display == "block") {
        dropdownContent.style.display = "none";
      }
    }
  });
});
