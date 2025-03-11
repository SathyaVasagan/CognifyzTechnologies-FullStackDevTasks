const API_URL = 'http://localhost:5000/api/users';

document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        age: document.getElementById('age').value
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    fetchUsers();
});

async function fetchUsers() {
    const res = await fetch(API_URL);
    const users = await res.json();
    document.getElementById('userList').innerHTML = users.map(user => 
        `<li>${user.name} (${user.email}) - ${user.phone} - ${user.age} <button onclick="deleteUser('${user._id}')">Delete</button></li>`
    ).join('');
}

async function deleteUser(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchUsers();
}

fetchUsers();
