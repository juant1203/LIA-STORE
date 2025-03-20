function updateCartView() {
    const cartItemsList = document.getElementById("cart-items-list");

    
    if (!cartItemsList) {
        console.error("❌ No se encontró el elemento con ID 'cart-items-list'");
        return; 
    }

    cartItemsList.innerHTML = ''; 
    cart = JSON.parse(localStorage.getItem("cart")) || []; 

    console.log("🛒 Contenido del carrito:", cart); 

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


let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart() {
    let modalImage = document.getElementById('modal-image').src;
    let modalTitle = document.getElementById('modal-title').textContent;
    let modalPrice = document.getElementById('modal-price').textContent;

    
    let product = {
        image: modalImage,
        title: modalTitle,
        price: modalPrice
    };

    
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartView();   
    updateCartCounter(); 

    alert('Producto agregado al carrito!');
    closeModal(); 
}


function updateCartView() {
    const cartItemsList = document.getElementById("cart-items-list");

    if (!cartItemsList) {
        console.error("No se encontró el elemento con ID 'cart-items-list'");
        return;
    }

    cartItemsList.innerHTML = ''; 
    cart = JSON.parse(localStorage.getItem("cart")) || []; 

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


function updateCartCounter() {
    const cartCounter = document.getElementById("cart-counter");

    if (!cartCounter) {
        console.error("No se encontró el elemento con ID 'cart-counter'");
        return;
    }

    cartCounter.textContent = cart.length; 
}


function removeFromCart(index) {
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCartView(); 
    updateCartCounter(); 
}



function emptyCart() {
    cart = [];
    localStorage.removeItem("cart");
    updateCartView();
    updateCartCounter();
}


function searchProducts() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let productName = product.querySelector(".overlay").textContent.toLowerCase();
        product.style.display = productName.includes(input) ? "flex" : "none";
    });
}


document.getElementById("searchInput").addEventListener("keyup", searchProducts);


document.getElementById("cart-button").addEventListener("mouseenter", function () {
    document.getElementById("cart-content").classList.add("visible");
});


document.getElementById("cart-content").addEventListener("mouseleave", function () {
    document.getElementById("cart-content").classList.remove("visible");
});


function toggleFilterMenu() {
    let filterMenu = document.getElementById("filter-menu");
    filterMenu.classList.toggle("active");
}


function filterProducts(category) {
    const allProducts = document.querySelectorAll('.product');
    allProducts.forEach(product => {
        product.style.display = (category === 'all' || product.classList.contains(category)) ? "block" : "none";
    });

    document.getElementById("filter-menu").classList.remove("active");
}

function showProductDetails(imageSrc, title, price) {
    let modalImage = document.getElementById('modal-image');
    let modalTitle = document.getElementById('modal-title');
    let modalPrice = document.getElementById('modal-price');
    let modal = document.getElementById('product-modal');
    
    if (modalImage && modalTitle && modalPrice && modal) {
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        
        modalPrice.textContent = price.replace('Precio: $', '');
        modal.style.display = 'flex';
    }
}



function closeModal() {
    let modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}


document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        const title = product.querySelector('.overlay').textContent;
        const imageUrl = product.querySelector('img').src;
        const price = product.getAttribute("data-price") || "$XX.XX"; 

        showProductDetails(imageUrl, title, price);
    });
});


window.onclick = function(event) {
    let modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeModal();
    }
};


function addToCart() {
    let modalImage = document.getElementById('modal-image').src;
    let modalTitle = document.getElementById('modal-title').textContent;
    let modalPrice = document.getElementById('modal-price').textContent;

    
    let product = {
        image: modalImage,
        title: modalTitle,
        price: modalPrice
    };

    
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert('Producto agregado al carrito!');
    closeModal(); 
}


function updateCartView() {
    const cartItemsList = document.getElementById("cart-items-list");
    cartItemsList.innerHTML = ''; 

    cart = JSON.parse(localStorage.getItem("cart")) || []; 

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


function updateCartCounter() {
    const cartCounter = document.getElementById("cart-counter");
    cartCounter.textContent = cart.length; 
}


function removeFromCart(index) {
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCartView(); 
    updateCartCounter(); 
}

function toggleSupport() {
    document.getElementById("support-menu").classList.toggle("active");
    }
    
function toggleCart() {
    let cartContent = document.getElementById("cart-content");
    if (!cartContent) {
        console.error("❌ No se encontró el elemento con ID 'cart-content'");
        return;
    }
    cartContent.classList.toggle("visible");
    updateCartView(); 
}
    window.addEventListener("DOMContentLoaded", () => {
        console.log("📌 Elemento encontrado:", document.getElementById("cart-items-list"));
    });
    

function updateCartCounter() {
    const cartCounter = document.getElementById("cart-counter");
    if (!cartCounter) {
        console.error("❌ No se encontró el elemento con ID 'cart-counter'");
        return;
    }
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCounter.textContent = cart.length; 
    updateCartView(); 
}


console.log("📌 Estado inicial del carrito:");
console.log("🛒 Contenido del localStorage:", localStorage.getItem("cart"));
console.log("📊 Elementos en el DOM:");
console.log("   - cart-counter:", document.getElementById("cart-counter"));
console.log("   - cart-content:", document.getElementById("cart-content"));
console.log("   - cart-items-list:", document.getElementById("cart-items-list"));


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

  productos.forEach(producto => {
    const item = document.createElement("div");
    item.classList.add("product"); 
    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito('${producto.nombre}', '${producto.precio}', '${producto.imagen}')">🛒 Agregar al carrito</button>
    `;
    contenedor.appendChild(item);
  });


function agregarAlCarrito(nombre, precio, imagen) {
    let product = {
        image: imagen,
        title: nombre,
        price: precio
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartView();
    updateCartCounter();
    alert('Producto agregado al carrito!');
}
