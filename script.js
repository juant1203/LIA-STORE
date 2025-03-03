function updateCartView() {
    const cartItemsList = document.getElementById("cart-items-list");

    // 🛑 Verifica si el elemento existe antes de modificarlo
    if (!cartItemsList) {
        console.error("❌ No se encontró el elemento con ID 'cart-items-list'");
        return; // 🚫 Evita errores si el elemento no existe
    }

    cartItemsList.innerHTML = ''; // Limpiar antes de actualizar
    cart = JSON.parse(localStorage.getItem("cart")) || []; // Recuperar carrito

    console.log("🛒 Contenido del carrito:", cart); // Verificar si hay productos

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>🛒 Tu carrito está vacío</li>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" width="50">
                <span>${item.title} - ${item.price}</span>
                <button onclick="removeFromCart(${index})">❌</button>
            `;
            cartItemsList.appendChild(li);
        });
    }
}

// 📌 Definir carrito global y obtener datos del almacenamiento
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🛒 Función para agregar un producto al carrito
function addToCart() {
    let modalImage = document.getElementById('modal-image').src;
    let modalTitle = document.getElementById('modal-title').textContent;
    let modalPrice = document.getElementById('modal-price').textContent;

    // 🏷 Crear objeto del producto
    let product = {
        image: modalImage,
        title: modalTitle,
        price: modalPrice
    };

    // ➕ Agregar al carrito y guardar en localStorage
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartView();   // 🔄 Actualizar la vista del carrito
    updateCartCounter(); // 🔢 Actualizar contador

    alert('Producto agregado al carrito!');
    closeModal(); // ❌ Cerrar modal después de agregar
}

// 🔄 Función para actualizar la vista del carrito
function updateCartView() {
    const cartItemsList = document.getElementById("cart-items-list");

    if (!cartItemsList) {
        console.error("No se encontró el elemento con ID 'cart-items-list'");
        return;
    }

    cartItemsList.innerHTML = ''; // Limpiar antes de actualizar
    cart = JSON.parse(localStorage.getItem("cart")) || []; // Recuperar carrito

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>🛒 Tu carrito está vacío</li>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" width="50">
                <span>${item.title} - ${item.price}</span>
                <button onclick="removeFromCart(${index})">❌</button>
            `;
            cartItemsList.appendChild(li);
        });
    }
}

// 🔢 Función para actualizar el contador del carrito
function updateCartCounter() {
    const cartCounter = document.getElementById("cart-counter");

    if (!cartCounter) {
        console.error("No se encontró el elemento con ID 'cart-counter'");
        return;
    }

    cartCounter.textContent = cart.length; // Mostrar número de productos
}

// ❌ Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Quitar producto
    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar cambios
    updateCartView(); // 🔄 Refrescar carrito
    updateCartCounter(); // 🔢 Refrescar contador
}


// 🗑 Vaciar carrito
function emptyCart() {
    cart = [];
    localStorage.removeItem("cart");
    updateCartView();
    updateCartCounter();
}

// 🔎 Filtrar productos en tiempo real con la barra de búsqueda
function searchProducts() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let productName = product.querySelector(".overlay").textContent.toLowerCase();
        product.style.display = productName.includes(input) ? "flex" : "none";
    });
}

// 🎯 Escuchar evento de teclado en la barra de búsqueda
document.getElementById("searchInput").addEventListener("keyup", searchProducts);

// 🛒 Mostrar carrito al pasar el ratón sobre el botón del carrito
document.getElementById("cart-button").addEventListener("mouseenter", function () {
    document.getElementById("cart-content").classList.add("visible");
});

// ❌ Ocultar carrito al salir
document.getElementById("cart-content").addEventListener("mouseleave", function () {
    document.getElementById("cart-content").classList.remove("visible");
});

// 🎛 Alternar visibilidad del menú de filtros
function toggleFilterMenu() {
    let filterMenu = document.getElementById("filter-menu");
    filterMenu.classList.toggle("active");
}

// 🎯 Filtrar productos por categoría
function filterProducts(category) {
    const allProducts = document.querySelectorAll('.product');
    allProducts.forEach(product => {
        product.style.display = (category === 'all' || product.classList.contains(category)) ? "block" : "none";
    });

    document.getElementById("filter-menu").classList.remove("active");
}
// 🔍 Función para mostrar los detalles del producto en un modal
function showProductDetails(imageSrc, title, price) {
    let modalImage = document.getElementById('modal-image');
    let modalTitle = document.getElementById('modal-title');
    let modalPrice = document.getElementById('modal-price');
    let modal = document.getElementById('product-modal');
    
    if (modalImage && modalTitle && modalPrice && modal) {
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        // Extraer solo el número del precio
        modalPrice.textContent = price.replace('Precio: $', '');
        modal.style.display = 'flex';
    }
}


// ❌ Función para cerrar el modal
function closeModal() {
    let modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 🚀 Evento para abrir el modal al hacer clic en un producto
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        const title = product.querySelector('.overlay').textContent;
        const imageUrl = product.querySelector('img').src;
        const price = product.getAttribute("data-price") || "$XX.XX"; // Asegurar que el precio existe

        showProductDetails(imageUrl, title, price);
    });
});

// ❌ Cerrar el modal si el usuario hace clic fuera del contenido
window.onclick = function(event) {
    let modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeModal();
    }
};

// 🛒 Función para agregar un producto al carrito
function addToCart() {
    let modalImage = document.getElementById('modal-image').src;
    let modalTitle = document.getElementById('modal-title').textContent;
    let modalPrice = document.getElementById('modal-price').textContent;

    // 🏷 Crear objeto del producto
    let product = {
        image: modalImage,
        title: modalTitle,
        price: modalPrice
    };

    // ➕ Agregar al carrito y guardar en localStorage
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert('Producto agregado al carrito!');
    closeModal(); // ❌ Cerrar modal después de agregar
}

// 🔄 Función para actualizar la vista del carrito
function updateCartView() {
    const cartItemsList = document.getElementById("cart-items-list");
    cartItemsList.innerHTML = ''; // Limpiar antes de actualizar

    cart = JSON.parse(localStorage.getItem("cart")) || []; // Recuperar carrito

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Tu carrito está vacío</li>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" width="50">
                <span>${item.title} - ${item.price}</span>
                <button onclick="removeFromCart(${index})">❌</button>
            `;
            cartItemsList.appendChild(li);
        });
    }
}

// 🔢 Función para actualizar el contador del carrito
function updateCartCounter() {
    const cartCounter = document.getElementById("cart-counter");
    cartCounter.textContent = cart.length; // Mostrar número de productos
}

// ❌ Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Quitar producto
    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar cambios
    updateCartView(); // 🔄 Refrescar carrito
    updateCartCounter(); // 🔢 Refrescar contador
}

function toggleSupport() {
    document.getElementById("support-menu").classList.toggle("active");
    }
    // 🛒 Función para mostrar/ocultar el carrito
function toggleCart() {
    let cartContent = document.getElementById("cart-content");
    if (!cartContent) {
        console.error("❌ No se encontró el elemento con ID 'cart-content'");
        return;
    }
    cartContent.classList.toggle("visible");
    updateCartView(); // Actualizar la vista del carrito al mostrarlo
}
    window.addEventListener("DOMContentLoaded", () => {
        console.log("📌 Elemento encontrado:", document.getElementById("cart-items-list"));
    });
    
// 🔢 Función para actualizar el contador del carrito
function updateCartCounter() {
    const cartCounter = document.getElementById("cart-counter");
    if (!cartCounter) {
        console.error("❌ No se encontró el elemento con ID 'cart-counter'");
        return;
    }
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCounter.textContent = cart.length; // Mostrar número de productos
    updateCartView(); // Actualizar también la vista del carrito
}

// Agregar al final del archivo script.js
console.log("📌 Estado inicial del carrito:");
console.log("🛒 Contenido del localStorage:", localStorage.getItem("cart"));
console.log("📊 Elementos en el DOM:");
console.log("   - cart-counter:", document.getElementById("cart-counter"));
console.log("   - cart-content:", document.getElementById("cart-content"));
console.log("   - cart-items-list:", document.getElementById("cart-items-list"));

// Modificar la función addToCart para ver el proceso
function addToCart() {
    console.log("🛒 Iniciando addToCart");
    console.log("   - Modal image:", document.getElementById('modal-image').src);
    console.log("   - Modal title:", document.getElementById('modal-title').textContent);
    console.log("   - Modal price:", document.getElementById('modal-price').textContent);
    
    let modalImage = document.getElementById('modal-image').src;
    let modalTitle = document.getElementById('modal-title').textContent;
    let modalPrice = document.getElementById('modal-price').textContent;
    
    let product = {
        image: modalImage,
        title: modalTitle,
        price: modalPrice
    };
    
    console.log("📦 Producto a agregar:", product);
    
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartView();
    updateCartCounter();
    alert('Producto agregado al carrito!');
    closeModal();
}
function emptyCart() {
    cart = [];
    localStorage.removeItem("cart");
    updateCartView();
    updateCartCounter();
}