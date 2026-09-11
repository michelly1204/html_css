document.addEventListener('DOMContentLoaded', function() {

    // ==================== DADOS DO CARDÁPIO ====================
    const menuData = [
        { id: 1, name: "Hambúrguer Bacon Cheddar", category: "burger", price: 24.99, desc: "Pão brioche, blend 180g, bacon crocante, cheddar derretido.", emoji: "🍔", badge: "Mais Pedido", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
        { id: 2, name: "Batata Frita Média", category: "porcao", price: 15.00, desc: "Batatas crocantes com sal e tempero especial.", emoji: "🍟", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
        { id: 3, name: "Coca-Cola 1L", category: "bebida", price: 9.99, desc: "Refrigerante gelado.", emoji: "🥤", img: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400" },
        { id: 4, name: "Combo Y2K", category: "combo", price: 34.99, desc: "Hambúrguer + Batata + Coca-Cola.", emoji: "", badge: "Combo", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400" },
        { id: 5, name: "Pudim", category: "sobremesa", price: 14.99, desc: "Pudim de leite condensado com calda.", emoji: "🍮", img: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400" },
        { id: 6, name: "Pizza de Pepperoni", category: "pizza", price: 29.99, desc: "Massa artesanal, mussarela e pepperoni.", emoji: "", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
        { id: 7, name: "Cheeseburger Clássico", category: "burger", price: 19.99, desc: "Pão, blend 150g, queijo cheddar.", emoji: "🍔", img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400" },
        { id: 8, name: "Batata Frita Grande", category: "porcao", price: 22.00, desc: "Porção grande com cheddar e bacon.", emoji: "🍟", img: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400" },
        { id: 9, name: "Milk Shake", category: "bebida", price: 16.99, desc: "Chocolate, morango ou baunilha.", emoji: "", badge: "Novo", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400" },
        { id: 10, name: "Pizza Margherita", category: "pizza", price: 26.99, desc: "Mussarela de búfala e manjericão.", emoji: "🍕", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400" },
        { id: 11, name: "Brownie com Sorvete", category: "sobremesa", price: 18.99, desc: "Brownie quente com sorvete.", emoji: "🍫", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400" },
        { id: 12, name: "Combo Duplo", category: "combo", price: 44.99, desc: "2 Burgers + 2 Batatas + 2 Refris.", emoji: "🍔", badge: "Promo", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400" },
        { id: 13, name: "Onion Rings", category: "porcao", price: 18.99, desc: "Anéis de cebola crocantes.", emoji: "🧅", img: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400" },
        { id: 14, name: "Suco Natural", category: "bebida", price: 11.99, desc: "Laranja, abacaxi ou maracujá.", emoji: "🧃", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400" },
        { id: 15, name: "X-Burger Especial", category: "burger", price: 27.99, desc: "Blend 200g, queijo, presunto, ovo.", emoji: "🍔", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400" },
        { id: 16, name: "Açaí 500ml", category: "sobremesa", price: 16.99, desc: "Açaí com granola e banana.", emoji: "", badge: "Popular", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400" }
    ];

    // ==================== LOCALSTORAGE (BANCO LOCAL) ====================
    function salvarCarrinho() {
        localStorage.setItem('y2kbite_carrinho', JSON.stringify(cart));
    }

    function carregarCarrinho() {
        const salvo = localStorage.getItem('y2kbite_carrinho');
        if (salvo) {
            cart = JSON.parse(salvo);
            updateCartUI();
        }
    }

    // ==================== CARRINHO ====================
    let cart = [];

    // Carregar carrinho salvo ao abrir o site
    carregarCarrinho();

    // ==================== TOAST ====================
    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ==================== NAVEGAÇÃO ====================
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const targetLink = document.querySelector(`.nav-item[data-page="${pageId}"]`);
        if (targetLink) targetLink.classList.add('active');

        if (sidebar) sidebar.classList.remove('open');
    }

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(this.getAttribute('data-page'));
        });
    });

    document.querySelectorAll('.btn-hero[data-page]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(this.getAttribute('data-page'));
        });
    });

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 900 && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    // ==================== RENDERIZAR CARDÁPIO ====================
    const menuGrid = document.getElementById('menuGrid');
    const searchInput = document.getElementById('searchInput');
    const catBtns = document.querySelectorAll('.cat-btn');

    function renderMenu(items) {
        if (!menuGrid) return;
        menuGrid.innerHTML = items.map(item => `
            <div class="menu-item" data-category="${item.category}">
                ${item.badge ? `<div class="menu-badge">${item.badge}</div>` : ''}
                <div class="menu-img">
                    <img src="${item.img}" alt="${item.name}" 
                         onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'food-emoji\\'>${item.emoji}</span>';">
                </div>
                <div class="menu-info">
                    <h3>${item.name}</h3>
                    <p class="menu-desc">${item.desc}</p>
                    <div class="menu-footer">
                        <span class="menu-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                        <button class="btn-add" data-name="${item.name}" data-price="${item.price}">
                            <i class="fas fa-plus"></i> Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.btn-add').forEach(btn => {
            btn.addEventListener('click', function() {
                addToCart(this.getAttribute('data-name'), parseFloat(this.getAttribute('data-price')));
            });
        });
    }

    renderMenu(menuData);

    catBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            catBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterMenu();
        });
    });

    if (searchInput) searchInput.addEventListener('input', filterMenu);

    function filterMenu() {
        const activeBtn = document.querySelector('.cat-btn.active');
        const cat = activeBtn ? activeBtn.getAttribute('data-cat') : 'all';
        const search = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const filtered = menuData.filter(item => {
            const matchCat = cat === 'all' || item.category === cat;
            const matchSearch = !search || item.name.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search);
            return matchCat && matchSearch;
        });

        renderMenu(filtered);
    }

    // ==================== FUNÇÕES DO CARRINHO ====================
    function addToCart(name, price) {
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ name, price, qty: 1 });
        }
        salvarCarrinho();
        updateCartUI();
        showToast(`🛒 ${name} adicionado!`);
    }

    function removeFromCart(name) {
        const item = cart.find(i => i.name === name);
        if (item) {
            item.qty--;
            if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
        }
        salvarCarrinho();
        updateCartUI();
    }

    function increaseQty(name) {
        const item = cart.find(i => i.name === name);
        if (item) item.qty++;
        salvarCarrinho();
        updateCartUI();
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        const sidebarCount = document.getElementById('cartSidebarCount');
        const sidebarTotal = document.getElementById('cartSidebarTotal');
        const mobileBadge = document.getElementById('mobileCartBadge');

        if (sidebarCount) sidebarCount.textContent = totalItems;
        if (sidebarTotal) sidebarTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        if (mobileBadge) mobileBadge.textContent = totalItems;

        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const totalValue = document.getElementById('totalValue');
        const btnCheckout = document.getElementById('btnCheckout');

        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
            if (cartTotal) cartTotal.style.display = 'none';
            if (btnCheckout) btnCheckout.style.display = 'none';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span>R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="window.removeFromCart('${item.name}')">−</button>
                        <span class="cart-item-qty">${item.qty}</span>
                        <button onclick="window.increaseQty('${item.name}')">+</button>
                    </div>
                </div>
            `).join('');

            if (totalValue) totalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
            if (cartTotal) cartTotal.style.display = 'flex';
            if (btnCheckout) btnCheckout.style.display = 'flex';
        }
    }

    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.increaseQty = increaseQty;

    // ==================== MODAL DO CARRINHO ====================
    const cartModal = document.getElementById('cartModal');
    const cartModalClose = document.getElementById('cartModalClose');
    const cartSidebarBtn = document.getElementById('cartSidebarBtn');
    const mobileCartBtn = document.getElementById('mobileCartBtn');
    const btnCheckout = document.getElementById('btnCheckout');

    function openCart() { if (cartModal) cartModal.classList.add('active'); }
    function closeCart() { if (cartModal) cartModal.classList.remove('active'); }

    if (cartSidebarBtn) cartSidebarBtn.addEventListener('click', openCart);
    if (mobileCartBtn) mobileCartBtn.addEventListener('click', openCart);
    if (cartModalClose) cartModalClose.addEventListener('click', closeCart);
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) closeCart();
        });
    }

    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            if (cart.length === 0) return;
            let msg = '🍔 *Pedido Y2KBite*\n\n';
            cart.forEach(item => {
                msg += `• ${item.qty}x ${item.name} - R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}\n`;
            });
            const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            msg += `\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
            window.open(`https://wa.me/5511999992222?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    // ==================== CEP ====================
    const btnCep = document.getElementById('btnCep');
    const cepInput = document.getElementById('cepInput');
    const cepResult = document.getElementById('cepResult');
    const cepStatus = document.getElementById('cepStatus');

    if (btnCep && cepInput) {
        btnCep.addEventListener('click', function() {
            const cep = cepInput.value.replace(/\D/g, '');
            if (cep.length < 8) {
                if (cepResult) cepResult.style.display = 'block';
                if (cepStatus) {
                    cepStatus.className = 'cep-status error';
                    cepStatus.textContent = '❌ CEP inválido. Digite 8 dígitos.';
                }
                return;
            }
            if (cepResult) cepResult.style.display = 'block';
            if (cepStatus) {
                cepStatus.className = 'cep-status success';
                cepStatus.textContent = '✅ Entrega disponível! Prazo: 30-50 min.';
            }
        });

        cepInput.addEventListener('input', function(e) {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 5) v = v.substring(0, 5) + '-' + v.substring(5, 8);
            e.target.value = v;
        });

        cepInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') btnCep.click();
        });
    }

    // ==================== FORMULÁRIO DE CONTATO ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('✅ Mensagem enviada! Retornaremos em breve.');
            this.reset();
        });
    }

    // ==================== ANIMAÇÃO DE SCROLL ====================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .value-card, .payment-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    console.log('%c Y2KBite carregado! ', 'background: #c9a84c; color: #0d0805; font-size: 14px; font-weight: bold; padding: 5px;');

});