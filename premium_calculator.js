// premium_calculator.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
    document.getElementById('user-name').textContent = 'Sameer';
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleType = urlParams.get('vehicle') || 'cars';
    const coverageType = urlParams.get('coverage') || 'package';
    
    // Set form defaults based on URL parameters
    document.getElementById('vehicle-type').value = vehicleType;
    document.querySelector(`input[name="coverage"][value="${coverageType}"]`).checked = true;
    
    // Display vehicle type in the heading
    const vehicleTypeHeading = document.getElementById('vehicle-type-heading');
    if (vehicleTypeHeading) {
        vehicleTypeHeading.textContent = vehicleType.toUpperCase();
    }
    
    // Initialize premium display
    updatePremiumDisplay();
    
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });
    
    // Add event listeners to all form inputs
    const formInputs = document.querySelectorAll('#premium-form input, #premium-form select');
    formInputs.forEach(input => {
        input.addEventListener('change', updatePremiumDisplay);
    });
    
    // Calculate button event listener (optional if you want to manually trigger calculation)
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            updatePremiumDisplay();
        });
    }
    
    // Proceed to payment button
    const proceedBtn = document.getElementById('proceed-btn');
    if (proceedBtn) {
        proceedBtn.addEventListener('click', function() {
            alert('Redirecting to payment gateway...');
            // In a real app, you might save the quote details and redirect
            // window.location.href = 'payment.html';
        });
    }
    
    // Back button to return to motor insurance page
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'motor.html';
        });
    }
    
    // Function to calculate and update the premium
    function updatePremiumDisplay() {
        const premiumResult = calculatePremium();
        
        // Update the premium display
        document.getElementById('base-premium').textContent = '₹' + premiumResult.basePremium.toLocaleString();
        document.getElementById('addons-cost').textContent = '₹' + premiumResult.addonsCost.toLocaleString();
        document.getElementById('discount-amount').textContent = '₹' + premiumResult.discountAmount.toLocaleString();
        document.getElementById('total-premium').textContent = '₹' + premiumResult.totalPremium.toLocaleString();
        
        // Show the results section
        document.getElementById('premium-results').style.display = 'block';
    }
    
    // The main premium calculation function
    function calculatePremium() {
        // Get all form values
        const vehicleType = document.getElementById('vehicle-type').value;
        const vehicleAge = parseInt(document.getElementById('vehicle-age').value);
        const vehicleValue = parseInt(document.getElementById('vehicle-value').value);
        const coverage = document.querySelector('input[name="coverage"]:checked').value;
        
        // Get addon selections
        const zeroDepreciation = document.getElementById('zero-depreciation').checked;
        const roadSideAssistance = document.getElementById('roadside-assistance').checked;
        const engineProtection = document.getElementById('engine-protection').checked;
        const passengerCover = document.getElementById('passenger-cover').checked;
        
        // Get driver details
        const driverAge = parseInt(document.getElementById('driver-age').value);
        const drivingExperience = parseInt(document.getElementById('driving-experience').value);
        const noClaims = document.getElementById('no-claims-bonus').checked;
        
        // Base rate calculation (as percentage of vehicle value)
        let baseRate = 0;
        
        // Different base rates based on vehicle type
        switch (vehicleType) {
            case 'cars':
                baseRate = 0.03; // 3% of vehicle value
                break;
            case 'pcv':
                baseRate = 0.04; // 4% of vehicle value
                break;
            case 'ev':
                baseRate = 0.025; // 2.5% of vehicle value (incentive for electric vehicles)
                break;
            case 'trucks':
                baseRate = 0.045; // 4.5% of vehicle value
                break;
            case 'plane':
                baseRate = 0.06; // 6% of vehicle value
                break;
            default:
                baseRate = 0.03;
        }
        
        // Adjust for liability-only vs comprehensive package
        if (coverage === 'liability') {
            baseRate = baseRate * 0.4; // Liability only is cheaper
        }
        
        // Calculate base premium
        let basePremium = vehicleValue * baseRate;
        
        // Adjust for vehicle age
        if (vehicleAge <= 1) {
            // New vehicle discount
            basePremium *= 0.9;
        } else if (vehicleAge > 5) {
            // Older vehicle surcharge
            basePremium *= (1 + (vehicleAge - 5) * 0.05); // 5% more for each year above 5
        }
        
        // Calculate addon costs
        let addonsCost = 0;
        
        if (zeroDepreciation) {
            addonsCost += vehicleValue * 0.01; // 1% of vehicle value
        }
        
        if (roadSideAssistance) {
            addonsCost += 1500; // Flat fee
        }
        
        if (engineProtection) {
            addonsCost += vehicleValue * 0.005; // 0.5% of vehicle value
        }
        
        if (passengerCover) {
            addonsCost += 1000; // Flat fee
        }
        
        // Adjust for driver profile
        let driverMultiplier = 1.0;
        
        // Younger drivers are higher risk
        if (driverAge < 25) {
            driverMultiplier += 0.2; // 20% surcharge
        } else if (driverAge > 60) {
            driverMultiplier += 0.1; // 10% surcharge
        }
        
        // Experience discount
        if (drivingExperience > 10) {
            driverMultiplier -= 0.1; // 10% discount
        } else if (drivingExperience < 2) {
            driverMultiplier += 0.15; // 15% surcharge
        }
        
        // Apply driver multiplier
        basePremium *= driverMultiplier;
        
        // Calculate discounts
        let discountAmount = 0;
        
        // No claims bonus
        if (noClaims) {
            discountAmount = basePremium * 0.2; // 20% discount
        }
        
        // Calculate total premium
        const totalPremium = basePremium + addonsCost - discountAmount;
        
        // Apply minimum premium rule
        const minimumPremium = 3000;
        const finalPremium = Math.max(totalPremium, minimumPremium);
        
        // Return the premium breakdown
        return {
            basePremium: Math.round(basePremium),
            addonsCost: Math.round(addonsCost),
            discountAmount: Math.round(discountAmount),
            totalPremium: Math.round(finalPremium)
        };
    }
});
