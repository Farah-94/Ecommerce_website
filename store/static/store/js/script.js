console.log("javascript is loading")


// Automatic Image Slider for Kafshy E-commerce Site

// document.addEventListener('DOMContentLoaded', function() {
//     // Get slider elements
//     const sliderContainer = document.querySelector('.slider-container');
//     const slides = document.querySelectorAll('.hero-slide');
    
//     // If there are no slides, exit the function
//     if (slides.length === 0) return;
    
//     let currentSlide = 0;
//     const slideCount = slides.length;
    
//     // Set initial positions
//     function setupSlides() {
//         slides.forEach((slide, index) => {
//             slide.style.position = 'absolute';
//             slide.style.left = '0';
//             slide.style.width = '100%';
//             slide.style.opacity = index === currentSlide ? '1' : '0';
//             slide.style.zIndex = index === currentSlide ? '1' : '0';
//             slide.style.transition = 'opacity 1s ease';
//         });
//     }
    
//     // Function to move to the next slide
//     function moveToNextSlide() {
//         // Hide current slide
//         slides[currentSlide].style.opacity = '0';
//         slides[currentSlide].style.zIndex = '0';
        
//         // Move to next slide (loop back to first slide if at the end)
//         currentSlide = (currentSlide + 1) % slideCount;
        
//         // Show new current slide
//         slides[currentSlide].style.opacity = '1';
//         slides[currentSlide].style.zIndex = '1';
//     }
    
//     // Initialize slides
//     setupSlides();
    
//     // Start automatic sliding every 5 seconds
//     setInterval(moveToNextSlide, 5000);
// });


document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider-container");
    const slides = document.querySelectorAll(".hero-slide");
    const videos = document.querySelectorAll("video");
    let currentIndex = 0;

    function slideVideos() {
        videos.forEach(video => video.pause()); // Pause all videos
        currentIndex = (currentIndex + 1) % slides.length;
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
        videos[currentIndex].play(); // Play only the current video
    }

    setInterval(slideVideos, 10000); // Change video every 10 seconds
});






// ----------------
// document.addEventListener('DOMContentLoaded', function() {
//     // Main dropdown menu button
//     const dropdownBtn = document.querySelector('.dropbtn');
//     const dropdownContent = document.querySelector('.dropdown-content');
    
//     // Toggle main dropdown when clicking the menu button
//     dropdownBtn.addEventListener('click', function(e) {
//         e.stopPropagation();
//         dropdownContent.classList.toggle('show');
//     });
    
//     // Handle submenu toggles for "Latest Items"
//     const hasSubmenuItems = document.querySelectorAll('.has-submenu > a');
    
//     hasSubmenuItems.forEach(item => {
//         item.addEventListener('click', function(e) {
//             e.preventDefault();
//             e.stopPropagation();
            
//             // Toggle the immediate submenu of the clicked item
//             const submenu = this.nextElementSibling;
            
//             // First close all other submenus at the same level
//             const siblings = this.parentElement.parentElement.querySelectorAll('.submenu, .sub-dropdown');
//             siblings.forEach(menu => {
//                 if (menu !== submenu && menu.classList.contains('show')) {
//                     menu.classList.remove('show');
//                 }
//             });
            
//             // Then toggle the clicked submenu
//             submenu.classList.toggle('show');
//         });
//     });
    
//     // Close dropdown when clicking outside
//     document.addEventListener('click', function(e) {
//         // Close all dropdowns when clicking outside
//         if (!e.target.matches('.dropbtn') && !e.target.closest('.dropdown-content')) {
//             dropdownContent.classList.remove('show');
            
//             // Also close all submenus
//             const allSubmenus = document.querySelectorAll('.submenu, .sub-dropdown');
//             allSubmenus.forEach(menu => {
//                 menu.classList.remove('show');
//             });
//         }
//     });
    
//     // Prevent clicks inside dropdown from closing it
//     dropdownContent.addEventListener('click', function(e) {
//         // Only prevent if it's not a direct link click
//         if (!e.target.matches('a') || e.target.nextElementSibling) {
//             e.stopPropagation();
//         }
//     });
    
//     // Add touch support for mobile devices
//     if ('ontouchstart' in window) {
//         hasSubmenuItems.forEach(item => {
//             item.addEventListener('touchstart', function(e) {
//                 e.preventDefault();
//                 e.stopPropagation();
                
//                 const submenu = this.nextElementSibling;
//                 submenu.classList.toggle('show');
//             });
//         });
//     }
// });
// -----------------

document.addEventListener("DOMContentLoaded", function () {
    // Select parent menu items
    const latestItem = document.querySelector(".has-submenu > a");
    const womanMenu = document.querySelector(".submenu .has-submenu > a");
    const submenu = document.querySelector(".submenu");
    const subDropdown = document.querySelector(".sub-dropdown");

    // Toggle "Women" when "Latest Items" is clicked
    latestItem.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        submenu.classList.toggle("open");
    });

    // Toggle subcategories when "Women" is clicked
    womanMenu.addEventListener("click", function (event) {
        event.preventDefault();
        subDropdown.classList.toggle("open");
    });
});



