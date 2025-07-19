// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content sections
    const tabButtons = document.querySelectorAll('.nav-tab, [data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Function to switch tabs
    function switchTab(targetTab) {
        // Remove active class from all nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show target tab content
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
        
        // Add active class to corresponding nav tab
        const navTab = document.querySelector(`.nav-tab[data-tab="${targetTab}"]`);
        if (navTab) {
            navTab.classList.add('active');
        }
    }
    
    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            if (targetTab) {
                switchTab(targetTab);
            }
        });
    });
    
    // Form submission handlers
    const cropForm = document.querySelector('.crop-form');
    if (cropForm) {
        cropForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Crop listing submitted successfully!');
        });
    }
    
    // Search functionality for seeds
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // In a real application, this would filter the products
            console.log('Searching for:', this.value);
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            // In a real application, this would filter by category
            console.log('Filtering by:', this.value);
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Item added to cart!');
        });
    });
    
    // Edit product functionality
    const editButtons = document.querySelectorAll('.edit-product-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Edit product functionality would open here');
        });
    });
    
    // Warehouse rental functionality
    const rentButtons = document.querySelectorAll('.rent-btn:not(.disabled)');
    rentButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Warehouse rental process would start here');
        });
    });
    
    // Extend rental functionality
    const extendButtons = document.querySelectorAll('.warehouse-actions .btn-primary.blue');
    extendButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Rental extension process would start here');
        });
    });
    
    // View details functionality
    const viewDetailsButtons = document.querySelectorAll('.warehouse-actions .btn-secondary');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Warehouse details would be displayed here');
        });
    });
    
    // Upload area click handler
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            alert('File upload dialog would open here');
        });
    }
    
    // Smooth scrolling for better UX
    document.querySelectorAll('button[data-tab]').forEach(button => {
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.product-card, .warehouse-card, .stats-card, .quick-action-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
    
    // Initialize with overview tab active
    switchTab('overview');
});