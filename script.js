const filterBtns = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.category;
    products.forEach((p) => {
      if (category === "all" || p.dataset.category === category) {
        p.style.display = "block";
      } else {
        p.style.display = "none";
      }
    });
  });
});

// Cart logic
let cart = [];
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    addToCart(product.dataset.name, product.dataset.price);
  });
});

function addToCart(name, price) {
  cart.push({ name, price: parseInt(price) });
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    let li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeItem(${i})">❌</button>`;
    cartItems.appendChild(li);
  });
  totalPrice.textContent = total;
  cartCount.textContent = cart.length;
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

cartBtn.onclick = () => (cartModal.style.display = "block");
closeCart.onclick = () => (cartModal.style.display = "none");
checkoutBtn.onclick = () => {
  alert("✅ Order placed successfully!");
  cart = [];
  renderCart();
  cartModal.style.display = "none";
};

// Product detail modal
const productModal = document.getElementById("product-modal");
const closeProduct = document.getElementById("close-product");
const productImg = document.getElementById("product-img");
const productTitle = document.getElementById("product-title");
const productDesc = document.getElementById("product-desc");
const productPrice = document.getElementById("product-price");
const modalAddCart = document.getElementById("modal-add-cart");
let currentProduct = null;

products.forEach((prod) => {
  prod.addEventListener("click", (e) => {
    if (!e.target.classList.contains("add-to-cart")) {
      currentProduct = prod;
      productImg.src = prod.dataset.img;
      productTitle.textContent = prod.dataset.name;
      productDesc.textContent = prod.dataset.desc;
      productPrice.textContent = prod.dataset.price;
      productModal.style.display = "block";
    }
  });
});

modalAddCart.onclick = () => {
  if (currentProduct) {
    addToCart(currentProduct.dataset.name, currentProduct.dataset.price);
    productModal.style.display = "none";
  }
};

closeProduct.onclick = () => (productModal.style.display = "none");

// Close modal if clicked outside
window.onclick = (e) => {
  if (e.target === cartModal) cartModal.style.display = "none";
  if (e.target === productModal) productModal.style.display = "none";
};
