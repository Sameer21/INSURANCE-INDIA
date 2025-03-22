// Handle tabs switching
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            const targetForm = document.getElementById(this.getAttribute('data-target'));
            targetForm.classList.add('active');
        });
    });
    
    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real application, you would authenticate with a server here
        // For demo purposes, we'll just redirect to the dashboard
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    });
    
    // Handle register form submission
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const mobile = document.getElementById('register-mobile').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        // Basic validation
        if (!name || !email || !mobile || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // In a real application, you would register with a server here
        // For demo purposes, we'll just show a success message and switch to login
        alert('Registration successful! Please log in.');
        
        // Switch to login tab
        tabButtons[0].click();
    });
    
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }
});