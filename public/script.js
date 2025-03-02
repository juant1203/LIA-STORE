function toggleCart() {
    let cart = document.getElementById("cart-content");
    let cartItems = document.getElementById("cart-items");

    cart.classList.toggle("visible");

    // Si el carrito está vacío, muestra el mensaje
    if (cartItems.children.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">Que lastima 😥, Aún no tienes articulos para comprar 🛒</p>`;
    }
}

function addToCart(productName) {
    let cartItems = document.getElementById("cart-items");

    // Si hay un mensaje de "carrito vacío", elimínalo
    let emptyMessage = document.querySelector(".empty-cart");
    if (emptyMessage) {
        emptyMessage.remove();
    }

    // Crea un nuevo elemento de producto
    let newItem = document.createElement("p");
    newItem.textContent = `🛍️ ${productName}`;
    cartItems.appendChild(newItem);
}


document.addEventListener("click", function (event) {
    let cart = document.getElementById("cart-content");
    let cartButton = document.getElementById("cart-button");

    if (!cart.contains(event.target) && event.target !== cartButton) {
        cart.classList.remove("visible"); // Usa clases en lugar de manipular directamente el estilo
    }
});

// 🎛 Alternar visibilidad del menú de filtros con animación
function toggleFilterMenu() {
    let filterMenu = document.getElementById("filter-menu");
    filterMenu.classList.toggle("active");
}

// 🔍 Filtrar productos por categoría
function filterProducts(category) {
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        product.style.display = category === "all" || product.classList.contains(category) ? "flex" : "none";
    });

    // Oculta el menú después de seleccionar
    document.getElementById("filter-menu").classList.remove("active");
}

// 🔎 Filtrar productos en tiempo real con la barra de búsqueda
function searchProducts() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let productName = product.querySelector(".overlay").innerText.toLowerCase();
        product.style.display = productName.includes(input) ? "flex" : "none";
    });
}

// 🎯 Escuchar el evento de teclado en la barra de búsqueda
document.getElementById("searchInput").addEventListener("keyup", searchProducts);

// 🛍 Agregar productos al carrito y guardarlos en localStorage
function addToCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// 🔄 Actualizar el contenido del carrito y contar productos
function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-items");
    let cartCounter = document.getElementById("cart-counter");

    // Limpiar lista del carrito
    cartList.innerHTML = "";

    // Agregar cada producto a la lista
    cart.forEach(product => {
        let li = document.createElement("li");
        li.textContent = product;
        cartList.appendChild(li);
    });

    // Mostrar el número de productos en el carrito
    cartCounter.textContent = cart.length;
}

// ✅ Cargar el carrito al iniciar la página
document.addEventListener("DOMContentLoaded", updateCartUI);

function emptyCart() {
    const cartList = document.querySelector('.cart-content ul');
    cartList.innerHTML = ''; // Vacía los productos del carrito
    document.getElementById('cart-counter').style.display = 'none'; // Oculta el contador
}
// 🔹 Función para abrir el modal con los detalles del producto
function openProductModal(image, title, description, price) {
    document.getElementById('modalImage').src = image;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalPrice').textContent = price;

    // Mostrar el modal
    document.getElementById('productModal').classList.add('active');
}

// 🔹 Función para cerrar el modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

// 🔹 Agregar evento de clic a cada producto
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', function () {
        let image = this.querySelector('img').src;
        let title = this.querySelector('.overlay').textContent.trim();
        let description = "Descripción del producto aquí"; // Puedes personalizar esto si tienes descripciones
        let price = "$XX.XX"; // Puedes ajustar para que tome un precio real

        openProductModal(image, title, description, price);
    });
});

// 🔹 Función para agregar el producto desde el modal al carrito
function addToCartFromModal() {
    alert("Producto agregado al carrito");
    closeProductModal();
}

// 🔹 Array para almacenar productos en el carrito
let cartItems = [];

// 🔹 Función para agregar un producto al carrito
function addToCart(image, title, price) {
    // Crear un objeto con los detalles del producto
    let product = { image, title, price };
    
    // Agregarlo al carrito
    cartItems.push(product);
    
    // Actualizar la vista del carrito
    updateCartView();
}

// 🔹 Función para actualizar el carrito en pantalla
function updateCartView() {
    let cartList = document.getElementById('cartList');
    cartList.innerHTML = '';  // Limpiar lista antes de actualizar

    cartItems.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="Producto">
            <span>${item.title} - ${item.price}</span>
            <button onclick="removeFromCart(${index})">❌</button>
        `;
        cartList.appendChild(li);
    });

    // Mostrar el carrito si hay productos
    let cartContent = document.getElementById('cartContent');
    if (cartItems.length > 0) {
        cartContent.style.display = "flex";
    } else {
        cartContent.style.display = "none";
    }
}

// 🔹 Función para eliminar un producto del carrito
function removeFromCart(index) {
    cartItems.splice(index, 1);  // Eliminar el producto del array
    updateCartView();  // Actualizar la vista
}

// 🔹 Función para vaciar el carrito
function emptyCart() {
    cartItems = [];
    updateCartView();
}

// 🔹 Modificar la función de agregar al carrito desde el modal
function addToCartFromModal() {
    let image = document.getElementById('modalImage').src;
    let title = document.getElementById('modalTitle').textContent;
    let price = document.getElementById('modalPrice').textContent;

    addToCart(image, title, price);
    closeProductModal();
}
function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-content");
    let clearCartButton = document.getElementById("clear-cart");

    if (cart.length > 0) {
        clearCartButton.style.display = "block"; // Mostrar el botón
    } else {
        clearCartButton.style.display = "none"; // Ocultar el botón si no hay productos
    }
}

document.getElementById("cart-button").addEventListener("mouseenter", function () {
    let cart = document.getElementById("cart-content");
    cart.classList.add("visible");
    checkCart(); // Verificar si está vacío y mostrar el mensaje adecuado
});

document.getElementById("cart-content").addEventListener("mouseleave", function () {
    let cart = document.getElementById("cart-content");
    cart.classList.remove("visible");
});

// 🛒 Función para vaciar el carrito
function emptyCart() {
    localStorage.removeItem("cart"); // Elimina los productos almacenados
    cartItems = []; // Limpia la variable del carrito en memoria
    updateCartView(); // Actualiza la interfaz del carrito

    // Vuelve a verificar si el carrito está vacío para mostrar el mensaje adecuado
    checkCart();
}

// 🔄 Función para verificar si el carrito está vacío y mostrar el mensaje
function checkCart() {
    let cartItemsContainer = document.getElementById("cart-items");

    if (cartItemsContainer.children.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">🛒 Tu carrito está vacío. ¡Añade productos!</p>`;
    }
}

// ✅ Cargar el carrito al iniciar la página
document.addEventListener("DOMContentLoaded", function () {
    updateCartView();
    checkCart();
});


