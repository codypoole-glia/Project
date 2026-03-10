// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Transfer form handling
const transferForm = document.querySelector('.transfer-form');
if (transferForm) {
    transferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Transfer initiated! In a real app, this would process the transaction.');
    });
}

// Speed option selection
document.querySelectorAll('.speed-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.speed-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        this.querySelector('input').checked = true;
    });
});

// Add floating animation to cards
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 2}s`;
});

// Simulate real-time balance updates (demo only)
function updateBalances() {
    const balances = document.querySelectorAll('.balance .amount');
    balances.forEach(balance => {
        const currentValue = parseFloat(balance.textContent.replace(/[$,]/g, ''));
        const change = (Math.random() - 0.5) * 10;
        const newValue = currentValue + change;
        balance.textContent = `$${newValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    });
}

// Update balances every 5 seconds (demo only)
if (document.querySelector('.balance')) {
    setInterval(updateBalances, 5000);
}

console.log('NeoBank initialized - Welcome to the future of banking!');
