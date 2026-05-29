const API_BASE_URL = 'http://localhost:8080';

// ─── AUTH ─────────────────────────────────────────────────────────────────────

const register = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
        alert('Account registered successfully!');
    } else {
        alert('Failed to register account.');
    }
};

const whoiam = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/whoiam`, {
        method: 'GET',
        credentials: 'include'
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('user-info').textContent = `Logged in as: ${data.name} (${data.email})`;
    } else {
        document.getElementById('user-info').textContent = 'Not logged in.';
    }
};

const login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        alert('Login successful!');
        whoiam();
    } else {
        alert('Failed to login.');
    }
};

const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include'
    });

    if (response.ok) {
        alert('Logout successful!');
        document.getElementById('user-info').textContent = 'Not logged in.';
    } else {
        alert('Failed to logout.');
    }
};

// ─── ACCOUNTS ─────────────────────────────────────────────────────────────────

const loadAccounts = () => {
    fetch(`${API_BASE_URL}/accounts`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('accountList');
            list.innerHTML = '';
            data.forEach(account => {
                const li = document.createElement('li');
                li.textContent = `${account.name} (${account.email})`;
                list.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching accounts:', error));
};

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

const createProduct = async () => {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);

    const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, price, stock })
    });

    if (response.ok) {
        alert('Product created successfully!');
        loadProducts();
    } else {
        alert('Failed to create product.');
    }
};

const loadProducts = () => {
    fetch(`${API_BASE_URL}/products`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('productList');
            list.innerHTML = '';
            data.forEach(product => {
                const li = document.createElement('li');
                li.textContent = `[${product.id}] ${product.name} - R$ ${product.price} (stock: ${product.stock})`;
                list.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
};

// ─── ORDERS ───────────────────────────────────────────────────────────────────

const createOrder = async () => {
    const productId = document.getElementById('order-product-id').value;
    const quantity = parseInt(document.getElementById('order-quantity').value);

    const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId, quantity })
    });

    if (response.ok) {
        alert('Order created successfully!');
        loadOrders();
    } else {
        alert('Failed to create order.');
    }
};

const loadOrders = () => {
    fetch(`${API_BASE_URL}/orders`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('orderList');
            list.innerHTML = '';
            data.forEach(order => {
                const li = document.createElement('li');
                li.textContent = `[${order.id}] Product: ${order.productId} - Qty: ${order.quantity} - Status: ${order.status}`;
                list.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
};

// ─── EXCHANGE ─────────────────────────────────────────────────────────────────

const getExchangeRate = async () => {
    const from = document.getElementById('from-currency').value.toUpperCase();
    const to = document.getElementById('to-currency').value.toUpperCase();

    const response = await fetch(`${API_BASE_URL}/exchanges/${from}/${to}`, {
        method: 'GET',
        credentials: 'include'
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('exchangeResult').textContent = JSON.stringify(data, null, 2);
    } else {
        document.getElementById('exchangeResult').textContent = 'Failed to get exchange rate. Are you logged in?';
    }
};
