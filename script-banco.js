// ==================== BANCO DE DADOS LOCAL (LocalStorage) ====================

const DB = {
    // Inicializa o banco
    init() {
        if (!localStorage.getItem('y2kbite_produtos')) {
            const produtosIniciais = [
                { id: 1, nome: "Hambúrguer Bacon Cheddar", categoria: "burger", preco: 24.99, descricao: "Pão brioche, blend 180g, bacon crocante.", imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
                { id: 2, nome: "Batata Frita Média", categoria: "porcao", preco: 15.00, descricao: "Batatas crocantes com tempero especial.", imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
                { id: 3, nome: "Coca-Cola 1L", categoria: "bebida", preco: 9.99, descricao: "Refrigerante gelado.", imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400" },
                { id: 4, nome: "Pizza de Pepperoni", categoria: "pizza", preco: 29.99, descricao: "Massa artesanal com pepperoni.", imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
                { id: 5, nome: "Pudim", categoria: "sobremesa", preco: 14.99, descricao: "Pudim cremoso com caramelo.", imagem: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400" },
                { id: 6, nome: "Combo Y2K", categoria: "combo", preco: 34.99, descricao: "Burger + Batata + Refri.", imagem: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400" }
            ];
            localStorage.setItem('y2kbite_produtos', JSON.stringify(produtosIniciais));
        }
        if (!localStorage.getItem('y2kbite_pedidos')) {
            localStorage.setItem('y2kbite_pedidos', JSON.stringify([]));
        }
        if (!localStorage.getItem('y2kbite_clientes')) {
            localStorage.setItem('y2kbite_clientes', JSON.stringify([]));
        }
    },

    // PRODUTOS
    getProdutos() {
        return JSON.parse(localStorage.getItem('y2kbite_produtos')) || [];
    },

    getProdutoPorId(id) {
        const produtos = this.getProdutos();
        return produtos.find(p => p.id === id);
    },

    getProdutosPorCategoria(categoria) {
        const produtos = this.getProdutos();
        if (categoria === 'all') return produtos;
        return produtos.filter(p => p.categoria === categoria);
    },

    addProduto(produto) {
        const produtos = this.getProdutos();
        produto.id = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
        produtos.push(produto);
        localStorage.setItem('y2kbite_produtos', JSON.stringify(produtos));
        return produto;
    },

    updateProduto(id, dados) {
        const produtos = this.getProdutos();
        const index = produtos.findIndex(p => p.id === id);
        if (index !== -1) {
            produtos[index] = { ...produtos[index], ...dados };
            localStorage.setItem('y2kbite_produtos', JSON.stringify(produtos));
            return produtos[index];
        }
        return null;
    },

    deleteProduto(id) {
        const produtos = this.getProdutos().filter(p => p.id !== id);
        localStorage.setItem('y2kbite_produtos', JSON.stringify(produtos));
    },

    // PEDIDOS
    getPedidos() {
        return JSON.parse(localStorage.getItem('y2kbite_pedidos')) || [];
    },

    addPedido(pedido) {
        const pedidos = this.getPedidos();
        pedido.id = Date.now();
        pedido.data = new Date().toISOString();
        pedido.status = 'pendente';
        pedidos.push(pedido);
        localStorage.setItem('y2kbite_pedidos', JSON.stringify(pedidos));
        return pedido;
    },

    updateStatusPedido(id, status) {
        const pedidos = this.getPedidos();
        const index = pedidos.findIndex(p => p.id === id);
        if (index !== -1) {
            pedidos[index].status = status;
            localStorage.setItem('y2kbite_pedidos', JSON.stringify(pedidos));
        }
    },

    // CLIENTES
    getClientes() {
        return JSON.parse(localStorage.getItem('y2kbite_clientes')) || [];
    },

    addCliente(cliente) {
        const clientes = this.getClientes();
        cliente.id = Date.now();
        cliente.criadoEm = new Date().toISOString();
        clientes.push(cliente);
        localStorage.setItem('y2kbite_clientes', JSON.stringify(clientes));
        return cliente;
    },

    // LIMPAR TUDO (útil para testes)
    reset() {
        localStorage.removeItem('y2kbite_produtos');
        localStorage.removeItem('y2kbite_pedidos');
        localStorage.removeItem('y2kbite_clientes');
        this.init();
    }
};

// Inicializa o banco ao carregar
DB.init();

console.log('%c🗄️ Banco Y2KBite carregado!', 'color: #c9a84c; font-weight: bold;');
console.log('Comandos: DB.getProdutos(), DB.addProduto({...}), DB.reset()');