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

fetch('http://localhost:10000/productos')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    // Asegúrate de que 'data' sea un array antes de intentar iterarlo
    if (Array.isArray(data)) {
      data.forEach(producto => {
        document.getElementById('productos').innerHTML += `
          <div class="producto">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
          </div>
        `;
      });
    } else {
      console.error('Los datos no son un array válido');
    }
  })
  .catch(error => {
    console.error('Hubo un error:', error);
  });


  const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');
const closeRegister = document.getElementById('closeRegister');
const closeLogin = document.getElementById('closeLogin');

registerBtn.onclick = function() {
  registerModal.style.display = "block";
}

loginBtn.onclick = function() {
  loginModal.style.display = "block";
}

closeRegister.onclick = function() {
  registerModal.style.display = "none";
}

closeLogin.onclick = function() {
  loginModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var userId = profile.getId(); 
    var userName = profile.getName();
    var userEmail = profile.getEmail();

    
    console.log('ID: ' + userId);
    console.log('Nombre: ' + userName);
    console.log('Correo: ' + userEmail);

    
    sendVerificationCode(userEmail);
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('Usuario desconectado');
    });
  }

  async function obtenerUsuario() {
    try {
      const response = await fetch("http://localhost:10000/api/user", {
        credentials: "include", 
      });
      const user = await response.json();
  
      if (user.error) {
        console.log("Usuario no autenticado");
        return;
      }
  
      document.getElementById("nombreUsuario").textContent = user.name;
      document.getElementById("correoUsuario").textContent = user.email;
      document.getElementById("fotoUsuario").src = user.photo;
    } catch (error) {
      console.error("Error obteniendo el usuario:", error);
    }
  }
  
  // Llamamos a la función cuando la página cargue
  window.onload = obtenerUsuario;

  function cerrarSesion() {
    window.location.href = "http://localhost:10000/logout";
  }  

  document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, email, contraseña }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("✅ Registro exitoso");
        } else {
            alert("❌ Error: " + data.message);
        }
    } catch (error) {
        console.error("❌ Error al enviar el formulario:", error);
        alert("❌ Error en la conexión con el servidor");
    }
});

// Mostrar el banner si el usuario no ha aceptado las cookies
if (!localStorage.getItem("cookiesAccepted")) {
    document.getElementById("cookie-banner").style.display = "block";
  }
  
  // Manejar la aceptación de cookies
  document.getElementById("accept-cookies").addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");  // Guardar en el almacenamiento local que las cookies han sido aceptadas
    document.getElementById("cookie-banner").style.display = "none";  // Ocultar el banner
  });
  
  window.addEventListener("load", function() {
    window.cookieconsent.initialise({
      palette: {
        popup: { background: "#333" },
        button: { background: "#ffcc00" }
      },
      theme: "classic",
      position: "bottom",
      content: {
        message: "Este sitio usa cookies para mejorar la experiencia de usuario.",
        dismiss: "Aceptar",
        link: "Más información",
        href: "/politica-de-cookies"
      },
      onStatusChange: function(status) {
        // Aquí puedes manejar qué hacer cuando el usuario acepta o rechaza las cookies
      }
    });
  });
  