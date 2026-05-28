
const API_BASE_URL = 'http://localhost:8080';

const register = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
        credentials: 'include' // Include cookies for session management
    });
    
    if (response.ok) {
        const data = await response.json();
        document.getElementById('user-info').textContent = `Logged in as: ${data.name} (${data.email})`;
    } else {
        document.getElementById('user-info').textContent = 'Not logged in.';
    }
}

const login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies for session management
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        alert('Login successful!');
    } else {
        alert('Failed to login.');
    }
};

const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include' // Include cookies for session management
    });

    if (response.ok) {
        alert('Logout successful!');
        document.getElementById('user-info').textContent = 'Not logged in.';
    } else {
        alert('Failed to logout.');
    }
};

const loadAccounts = () => {
    fetch(`${API_BASE_URL}/accounts`, {
        method: 'GET',
        credentials: 'include' // Include cookies for session management
    })
        .then(response => response.json())
        .then(data => {
            const accountList = document.getElementById('accountList');
            accountList.innerHTML = '';
            data.forEach(account => {
                const li = document.createElement('li');
                li.textContent = `${account.name} (${account.email})`;
                accountList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching accounts:', error));
}
