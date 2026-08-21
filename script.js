// ==================== NAVEGAÇÃO ENTRE PÁGINAS ====================
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

function showPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    const targetLink = document.querySelector(`[data-page="${pageId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    navLinksContainer.classList.remove('active');
    hamburger.classList.remove('active');
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        showPage(pageId);
        history.pushState(null, '', `#${pageId}`);
    });
});

// Hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Handle initial hash
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
});

window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showPage(hash);
});

// ==================== MODAL USUÁRIO ====================
const userBtn = document.getElementById('userBtn');
const userModal = document.getElementById('userModal');
const modalClose = document.getElementById('modalClose');
const loginForm = document.getElementById('loginForm');

userBtn.addEventListener('click', () => {
    userModal.classList.add('active');
});

modalClose.addEventListener('click', () => {
    userModal.classList.remove('active');
});

userModal.addEventListener('click', (e) => {
    if (e.target === userModal) {
        userModal.classList.remove('active');
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✅ Login realizado com sucesso! Bem-vindo ao Y2KBite!');
    userModal.classList.remove('active');
    loginForm.reset();
});

// ==================== FILTROS DO CARDÁPIO ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        menuItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.4s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ==================== CARRINHO ====================
let cart = [];

const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartModalClose = document.getElementById('cartModalClose');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const totalValue = document.getElementById('totalValue');
const btnCheckout = document.getElementById('btnCheckout');

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCart();
    showToast(`🛒 ${name} adicionado ao carrinho!`);
}

function removeFromCart(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.qty--;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    updateCart();
}

function increaseQty(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.qty++;
    }
    updateCart();
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotal.style.display = 'none';
        btnCheckout.style.display = 'none';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="cart-item-controls">
                    <button onclick="removeFromCart('${item.name}')">−</button>
                    <span class="cart-item-qty">${item.qty}</span>
                    <button onclick="increaseQty('${item.name}')">+</button>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        totalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        cartTotal.style.display = 'flex';
        btnCheckout.style.display = 'flex';
    }
}

cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

cartModalClose.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

btnCheckout.addEventListener('click', () => {
    if (cart.length === 0) return;

    let message = '🍔 *Pedido Y2KBite*\n\n';
    cart.forEach(item => {
        message += `• ${item.qty}x ${item.name} - R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    message += `\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5511999992222?text=${encoded}`, '_blank');
});

// ==================== VERIFICAÇÃO DE CEP ====================
const btnCep = document.getElementById('btnCep');
const cepInput = document.getElementById('cepInput');
const cepResult = document.getElementById('cepResult');
const cepStatus = document.getElementById('cepStatus');

btnCep.addEventListener('click', () => {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length < 8) {
        cepResult.style.display = 'block';
        cepStatus.className = 'cep-status error';
        cepStatus.textContent = '❌ CEP inválido. Digite um CEP com 8 dígitos.';
        return;
    }

    // Simulação de verificação
    cepResult.style.display = 'block';
    cepStatus.className = 'cep-status success';
    cepStatus.textContent = '✅ Entrega disponível para sua região! Prazo: 30-50 min.';
});

cepInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnCep.click();
    }
});

// Máscara de CEP
cepInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    e.target.value = value;
});

// ==================== FORMULÁRIO DE CONTATO ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✅ Mensagem enviada com sucesso! Retornaremos em breve.');
    contactForm.reset();
});

// ==================== TOAST NOTIFICATION ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== ANIMAÇÃO DE SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.menu-item, .feature-card, .contact-card, .payment-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==================== EFEITO PARALLAX SUAVE NO HERO ====================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }
});

console.log('%c Y2KBite - Just Vibes! 🌟 ', 'background: #c9a84c; color: #1a0f0a; font-size: 16px; font-weight: bold; padding: 10px; border-radius: 5px;');