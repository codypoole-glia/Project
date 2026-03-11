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

// Open Deposit form handling
function selectAccountType(type) {
    document.getElementById('depositForm').style.display = 'block';
    document.getElementById('depositForm').scrollIntoView({ behavior: 'smooth' });
}

const depositForm = document.getElementById('depositForm');
if (depositForm) {
    depositForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Account application submitted! You will receive a confirmation email shortly.');
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


// Update balances every 5 seconds (demo only)
if (document.querySelector('.balance')) {
    setInterval(updateBalances, 5000);
}

// Toggle transaction details
function toggleTransactionDetails(button) {
    const transactionItem = button.closest('.transaction-item');
    const expandedSection = transactionItem.querySelector('.transaction-expanded');
    
    // Close all other expanded sections
    document.querySelectorAll('.transaction-expanded.show').forEach(section => {
        if (section !== expandedSection) {
            section.classList.remove('show');
            section.closest('.transaction-item').querySelector('.expand-btn').classList.remove('expanded');
        }
    });
    
    // Toggle current section
    expandedSection.classList.toggle('show');
    button.classList.toggle('expanded');
}

// Transaction filtering
const accountFilter = document.getElementById('accountFilter');
const dateFilter = document.getElementById('dateFilter');
const typeFilter = document.getElementById('typeFilter');
const searchInput = document.getElementById('searchInput');

if (accountFilter) {
    [accountFilter, dateFilter, typeFilter].forEach(filter => {
        filter.addEventListener('change', filterTransactions);
    });
}

if (searchInput) {
    searchInput.addEventListener('input', filterTransactions);
}

function filterTransactions() {
    const transactions = document.querySelectorAll('.transaction-item');
    const accountValue = accountFilter?.value || 'all';
    const typeValue = typeFilter?.value || 'all';
    const searchValue = searchInput?.value.toLowerCase() || '';
    
    transactions.forEach(transaction => {
        const merchant = transaction.querySelector('.transaction-merchant').textContent.toLowerCase();
        const account = transaction.querySelector('.transaction-account').textContent;
        const isPending = transaction.classList.contains('pending');
        const isDebit = transaction.querySelector('.transaction-amount').classList.contains('debit');
        
        let show = true;
        
        if (accountValue !== 'all' && !account.includes(accountValue)) {
            show = false;
        }
        
        if (typeValue === 'pending' && !isPending) {
            show = false;
        } else if (typeValue === 'debit' && !isDebit) {
            show = false;
        } else if (typeValue === 'credit' && isDebit) {
            show = false;
        }
        
        if (searchValue && !merchant.includes(searchValue)) {
            show = false;
        }
        
        transaction.style.display = show ? 'flex' : 'none';
    });
}

// View transactions for specific account
function viewTransactions(accountNumber) {
    window.location.href = `transactions.html?account=${accountNumber}`;
}

// Download statement
function downloadStatement(accountNumber) {
    alert(`Downloading statement for account ****${accountNumber}. In a real app, this would generate a PDF.`);
}

console.log('gBank initialized - Welcome to modern banking!');
