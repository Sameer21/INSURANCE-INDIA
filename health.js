document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
    
    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = '../index.html';
    });
    
    // For demo purposes, we'll set a sample user name
    document.getElementById('user-name').textContent = 'Sameer';
    
    // "Know More" button functionality
    const knowMoreButtons = document.querySelectorAll('.plan-card .btn');
    
    knowMoreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const planName = this.closest('.plan-card').querySelector('h3').textContent;
            alert(`You selected ${planName}. This feature is under development.`);
        });
    });
});