document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
    
    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });
    
    // For demo purposes, we'll set a sample user name
    document.getElementById('user-name').textContent = 'Sameer';
    
    // Vehicle type selection
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    const carOptions = document.getElementById('car-options');
    
    vehicleCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            vehicleCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show car options if cars is selected
            if (this.getAttribute('data-type') == 'cars','PCV','EV','TRUCKS','PLANE' ) {
                carOptions.classList.add('active');
            } else {
                carOptions.classList.remove('active');
                alert(`You selected ${this.querySelector('h3').textContent}. This feature is under development.`);
            }
        });
    });
    
    // Option selection (Package/Liability)
    const optionBtns = document.querySelectorAll('.option-btn');
    const optionDetails = document.querySelectorAll('.option-details');
    
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and details
            optionBtns.forEach(b => b.classList.remove('active'));
            optionDetails.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked button and corresponding details
            this.classList.add('active');
            const option = this.getAttribute('data-option');
            document.getElementById(`${option}-details`).classList.add('active');
        });
    });
    
    // Quote button functionality
   const quoteButtons = document.querySelectorAll('.get-quote-btn');
    
    quoteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const optionType = this.closest('.option-details').id.replace('-details', '');
            // Redirect to the premium calculator page
            window.location.href = 'premium_calculator.html';

        });
    });
});
