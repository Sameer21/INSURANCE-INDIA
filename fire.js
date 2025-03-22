document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '../index.html';
    }
    
    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });
    
    // For demo purposes, we'll set a sample user name
    document.getElementById('user-name').textContent = 'Sameer';
    
    // Form submission
    document.getElementById('fire-quote-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const propertyType = document.getElementById('property-type').value;
        const constructionType = document.getElementById('construction-type').value;
        const propertyValue = parseFloat(document.getElementById('property-value').value);
        const contentsValue = parseFloat(document.getElementById('contents-value').value) || 0;
        const propertyAge = parseInt(document.getElementById('property-age').value);
        
        // Get additional coverages
        const additionalCoverages = [];
        document.querySelectorAll('input[name="additional-coverage"]:checked').forEach(checkbox => {
            additionalCoverages.push(checkbox.value);
        });
        
        // Calculate a simple premium (this is just for demo purposes)
        let basePremium = (propertyValue + contentsValue) * 0.001; // 0.1% of total value
        
        // Adjustments based on property type
        if (propertyType === 'industrial') {
            basePremium *= 1.5; // Industrial properties have higher risk
        } else if (propertyType === 'warehouse') {
            basePremium *= 1.3; // Warehouses have higher risk
        }
        
        // Adjustments based on construction type
        if (constructionType === 'semi-pucca') {
            basePremium *= 1.2; // Semi-pucca constructions have higher risk
        } else if (constructionType === 'kutcha') {
            basePremium *= 1.5; // Kutcha constructions have higher risk
        }
        
        // Adjustments based on property age
        if (propertyAge > 15) {
            basePremium *= 1.2; // Older properties have higher risk
        } else if (propertyAge > 30) {
            basePremium *= 1.4; // Much older properties have higher risk
        }
        
        // Adjustments for additional coverages
        if (additionalCoverages.includes('earthquake')) {
            basePremium += basePremium * 0.2; // 20% extra for earthquake cover
        }
        if (additionalCoverages.includes('terrorism')) {
            basePremium += basePremium * 0.15; // 15% extra for terrorism cover
        }
        if (additionalCoverages.includes('riot')) {
            basePremium += basePremium * 0.1; // 10% extra for riot cover
        }
        
        // Round to 2 decimal places
        const finalPremium = Math.round(basePremium);
        
        // Show result
        alert(`Estimated Annual Premium: ₹${finalPremium.toLocaleString()}\n\nNote: This is an estimate only. Our representative will contact you with a final quote.`);
    });
});