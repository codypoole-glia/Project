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

// Dispute Modal Functions
function openDisputeModal(transactionId) {
    const modal = document.getElementById('disputeModal');
    const transaction = document.querySelector(`[data-id="${transactionId}"]`);
    
    if (transaction && modal) {
        const merchant = transaction.querySelector('.transaction-merchant').textContent;
        const amount = transaction.querySelector('.transaction-amount').textContent;
        const date = transaction.querySelector('.transaction-date').textContent;
        
        const infoDiv = document.getElementById('disputeTransactionInfo');
        infoDiv.innerHTML = `
            <strong>Transaction Details:</strong><br>
            Merchant: ${merchant}<br>
            Amount: ${amount}<br>
            Date: ${date}
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeDisputeModal() {
    const modal = document.getElementById('disputeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Handle dispute form submission
const disputeForm = document.getElementById('disputeForm');
if (disputeForm) {
    disputeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Dispute submitted successfully! We will review your case and contact you within 3-5 business days.');
        closeDisputeModal();
        disputeForm.reset();
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('disputeModal');
    if (e.target === modal) {
        closeDisputeModal();
    }
});

// View transactions for specific account
function viewTransactions(accountNumber) {
    window.location.href = `transactions.html?account=${accountNumber}`;
}

// Download statement
function downloadStatement(accountNumber) {
    alert(`Downloading statement for account ****${accountNumber}. In a real app, this would generate a PDF.`);
}

console.log('gBank initialized - Welcome to modern banking!');
