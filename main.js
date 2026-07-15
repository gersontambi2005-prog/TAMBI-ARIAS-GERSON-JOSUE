import { catalogProducts } from './modules/products.js';
import { fetchQuitoWeather, fetchEuroRate } from './modules/api.js';

let cart = [];
let euroRate = 0.92;

const productsGrid = document.getElementById('productos-grid');
const searchInput = document.getElementById('buscar-nombre');
const filterSelect = document.getElementById('filtrar-origen');

const cartItemsList = document.getElementById('items-carrito');
const shippingSelect = document.getElementById('zona-envio');
const subtotalVal = document.getElementById('subtotal-val');
const shippingVal = document.getElementById('envio-val');
const totalVal = document.getElementById('total-val');
const totalEurVal = document.getElementById('total-eur');

const weatherWidget = document.getElementById('clima-widget');
const contactForm = document.getElementById('form-contacto');
const formSuccess = document.getElementById('form-success');
const darkModeToggle = document.getElementById('dark-mode-toggle');

document.addEventListener('DOMContentLoaded', async () => {
    renderProducts(catalogProducts);
    setupEventListeners();
    initDarkMode();
    await initAPIs();
});

async function initAPIs() {
    const weather = await fetchQuitoWeather();
    if (weather) {
        weatherWidget.innerHTML = `
            <p><strong>Quito Clima:</strong> ${weather.temperature}°C</p>
            <p style="font-size: 0.8rem; margin-top: 0.2rem; opacity: 0.9;">¡Ideal para café de especialidad!</p>
        `;
    } else {
        weatherWidget.innerHTML = `<p>Quito: 16°C (Servicio alternativo)</p>`;
    }

    euroRate = await fetchEuroRate();
}

function renderProducts(products) {
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-weight: bold; padding: 2rem;">No se encontraron cafés con esos criterios.</p>';
        return;
    }

    products.forEach(({ id, name, origin, notes, price, image }) => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <img src="${image}" alt="${name}" style="width: 100%; height: 200px; object-fit: cover;">
            <div class="card-body">
                <h3>${name}</h3>
                <span class="origen-badge">${origin}</span>
                <p>${notes}</p>
                <div class="precio">$${price.toFixed(2)}</div>
                <button class="btn-add" data-id="${id}">Agregar al pedido</button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

function setupEventListeners() {
    searchInput.addEventListener('input', filterCatalog);
    filterSelect.addEventListener('change', filterCatalog);

    productsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    shippingSelect.addEventListener('change', updateTotals);
    contactForm.addEventListener('submit', handleFormSubmit);
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// --- MODO OSCURO (CAFE NOCTURNO) ---
function initDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'enabled';
    if (isDark) {
        document.body.classList.add('dark-theme');
        darkModeToggle.textContent = '☀️';
    } else {
        darkModeToggle.textContent = '🌙';
    }
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-theme');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

// --- CONTROL DE CATALOGO Y FILTROS ---
function filterCatalog() {
    const searchText = searchInput.value.toLowerCase();
    const selectedOrigin = filterSelect.value;

    const filtered = catalogProducts.filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchText);
        const matchesOrigin = selectedOrigin === 'todos' || product.origin === selectedOrigin;
        return matchesName && matchesOrigin;
    });

    renderProducts(filtered);
}

function addToCart(id) {
    const product = catalogProducts.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

function renderCart() {
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="empty-cart">El carrito está vacío. Agrega cafés del catálogo.</li>';
        updateTotals();
        return;
    }

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${item.name}</strong> (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsList.appendChild(li);
    });

    updateTotals();
}

function updateTotals() {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const selectedOption = shippingSelect.options[shippingSelect.selectedIndex];
    const shippingCost = parseFloat(selectedOption.getAttribute('data-costo')) || 0;

    const totalUSD = subtotal + shippingCost;
    const totalEUR = totalUSD * euroRate;

    subtotalVal.textContent = `$${subtotal.toFixed(2)}`;
    shippingVal.textContent = `$${shippingCost.toFixed(2)}`;
    totalVal.textContent = `$${totalUSD.toFixed(2)}`;
    totalEurVal.textContent = `Total aproximado: €${totalEUR.toFixed(2)} EUR`;
}

// --- FORMULARIO DE CONTACTO ---
function handleFormSubmit(e) {
    e.preventDefault();
    let isValid = true;

    const nombre = document.getElementById('nombre');
    const errNombre = document.getElementById('error-nombre');
    if (nombre.value.trim().length < 3) {
        errNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
        isValid = false;
    } else {
        errNombre.textContent = "";
    }

    const email = document.getElementById('email');
    const errEmail = document.getElementById('error-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        errEmail.textContent = "Ingresa un correo electrónico válido.";
        isValid = false;
    } else {
        errEmail.textContent = "";
    }

    const telefono = document.getElementById('telefono');
    const errTelefono = document.getElementById('error-telefono');
    const telRegex = /^[0-9]{9,10}$/;
    if (!telRegex.test(telefono.value.trim())) {
        errTelefono.textContent = "Debe tener entre 9 y 10 dígitos numéricos.";
        isValid = false;
    } else {
        errTelefono.textContent = "";
    }

    const mensaje = document.getElementById('mensaje');
    const errMensaje = document.getElementById('error-mensaje');
    if (mensaje.value.trim().length < 10) {
        errMensaje.textContent = "El mensaje debe tener al menos 10 caracteres.";
        isValid = false;
    } else {
        errMensaje.textContent = "";
    }

    if (isValid) {
        formSuccess.textContent = `¡Gracias ${nombre.value}! Tu mensaje ha sido enviado correctamente.`;
        formSuccess.className = "hidden-msg success-box";
        contactForm.reset();
        
        setTimeout(() => {
            formSuccess.className = "hidden-msg";
        }, 5000);
    }
}

// --- LÓGICA DEL COFFEE MATCHMAKER ---
let perfilSabor = '';

window.seleccionarSabor = function(sabor) {
    perfilSabor = sabor;
    document.getElementById('quiz-paso1').style.display = 'none';
    document.getElementById('quiz-paso2').style.display = 'block';
}

window.recomendarCafe = function(intensidad) {
    document.getElementById('quiz-paso2').style.display = 'none';
    const resultadoDiv = document.getElementById('quiz-resultado');
    resultadoDiv.style.display = 'block';

    let idRecomendado = 1;

    if (perfilSabor === 'dulce') {
        if (intensidad === 'suave') {
            idRecomendado = 5; // Chito Altura
        } else {
            idRecomendado = 4; // Yirgacheffe Orgánico
        }
    } else if (perfilSabor === 'fuerte') {
        if (intensidad === 'suave') {
            idRecomendado = 2; // Valle del Cauca
        } else {
            idRecomendado = 3; // Cerrado Mineiro
        }
    }

    const cafeEncontrado = catalogProducts.find(p => p.id === idRecomendado);
    
    if (cafeEncontrado) {
        document.getElementById('recomendado-nombre').textContent = cafeEncontrado.name;
        document.getElementById('recomendado-desc').textContent = `${cafeEncontrado.notes} (Origen: ${cafeEncontrado.origin})`;
        
        const btnAgregar = document.getElementById('btn-agregar-recomendado');
        const nuevoBtn = btnAgregar.cloneNode(true);
        btnAgregar.parentNode.replaceChild(nuevoBtn, btnAgregar);
        
        nuevoBtn.addEventListener('click', () => {
            addToCart(cafeEncontrado.id);
            alert(`¡${cafeEncontrado.name} agregado al pedido!`);
        });
    }
}

window.reiniciarQuiz = function() {
    document.getElementById('quiz-resultado').style.display = 'none';
    document.getElementById('quiz-paso1').style.display = 'block';
    perfilSabor = '';
}