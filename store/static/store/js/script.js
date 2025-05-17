console.log("Kafshy Storefront JavaScript File Loaded");


// Storefront Main JavaScript
document.addEventListener("DOMContentLoaded", function() {
   

    // // ======================
    // // 1. MOBILE NAVIGATION
    // // ======================
    // const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    // const mainNavigation = document.querySelector('.main-navigation');
    
    // if (mobileMenuToggle && mainNavigation) {
    //     mobileMenuToggle.addEventListener('click', function() {
    //         this.setAttribute('aria-expanded', 
    //             this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    //         mainNavigation.classList.toggle('active');
    //     });
    // }

    // ======================
    // 2. HERO SLIDER
    // ======================
   document.addEventListener("DOMContentLoaded", function () {
    const heroSlider = document.querySelector(".hero-slider .slider-container");
    const heroSlides = document.querySelectorAll(".hero-slider .hero-slide");

    if (heroSlider && heroSlides.length > 0) {
        let currentHeroSlide = 0;
        let heroInterval;

        function updateHeroSlider() {
            heroSlider.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
        }

        function nextHeroSlide() {
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            updateHeroSlider();
        }

        heroInterval = setInterval(nextHeroSlide, 5000);

        // Pause slider on hover
        heroSlider.addEventListener("mouseenter", () => clearInterval(heroInterval));
        heroSlider.addEventListener("mouseleave", () => {
            heroInterval = setInterval(nextHeroSlide, 5000);
        });
    }
});

    // ======================
    // 3. MEGA MENU SYSTEM
    // ======================
    const megaMenuTriggers = document.querySelectorAll('.has-submenu > a');
    
    megaMenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const isOpen = parent.classList.contains('open');
            
            // Close all other menus first
            document.querySelectorAll('.has-submenu').forEach(item => {
                if (item !== parent) item.classList.remove('open');
            });
            
            // Toggle current
            parent.classList.toggle('open');
            
            // Close if clicking the same menu item
            if (isOpen) parent.classList.remove('open');
        });
    });

    // Close menus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-submenu')) {
            document.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('open');
            });
        }
    });

    // ======================
    // 4. PRODUCT GRID INTERACTIONS
    // ======================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // ======================
    // 5. SORTING FUNCTIONALITY
    // ======================
    const sortSelect = document.getElementById('sort-by');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // In a real implementation, this would make an AJAX call or redirect
            console.log('Sorting by:', this.value);
            // window.location.href = `?sort=${this.value}`;
        });
    }

    // ======================
    // 6. CART ACTIONS
    // ======================
    document.querySelectorAll('.add-to-cart-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate AJAX add to cart
            const button = this.querySelector('button');
            const originalText = button.innerHTML;
            
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
            
            // Simulate API call
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Added!';
                updateCartCount(1);
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 2000);
            }, 800);
        });
    });

    function updateCartCount(change) {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const current = parseInt(cartCount.textContent.match(/\d+/)[0]) || 0;
            cartCount.textContent = `Cart (${current + change})`;
            
            // Add visual feedback
            cartCount.classList.add('updated');
            setTimeout(() => cartCount.classList.remove('updated'), 300);
        }
    }

    // ======================
    // 7. NEWSLETTER FORM
    // ======================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.includes('@')) {
                // Simulate subscription
                this.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <p>Thank you for subscribing!</p>
                    </div>
                `;
            }
        });
    }

    // ======================
    // 8. RESPONSIVE BEHAVIORS
    // ======================
    function handleResponsive() {
        const isMobile = window.innerWidth < 768;
        
        // Adjust mega menu for mobile
        if (isMobile) {
            document.querySelectorAll('.mega-menu-column').forEach(column => {
                column.style.width = '100%';
            });
        }
    }
    
    window.addEventListener('resize', handleResponsive);
    handleResponsive();
});

// document.addEventListener('DOMContentLoaded', function() {
//     const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
//     const navMenu = document.querySelector('.nav-menu');
    
//     mobileMenuToggle.addEventListener('click', function() {
//         const isExpanded = this.getAttribute('aria-expanded') === 'true';
//         this.setAttribute('aria-expanded', !isExpanded);
//         navMenu.classList.toggle('active');
//     });
// });

function handleSortChange(selectElement) {
    const sortValue = selectElement.value;
    const currentUrl = new URL(window.location.href);
    
    // Update or add the sort parameter
    currentUrl.searchParams.set('sort', sortValue);
    
    // Reload the page with the new sort parameter
    window.location.href = currentUrl.toString();
}