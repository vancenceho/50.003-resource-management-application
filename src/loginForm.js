cd // main.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // Redirect to the dashboard or main application page
            window.location.href = '/dashboard';
        } else {
            // Handle errors (e.g., display a message to the user)
            alert('Login failed. Please check your username and password.');
        }
    });
});
