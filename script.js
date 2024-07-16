// script.js

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const titles = ["Software Developer", "Machine Learning Engineer", "Data Analyst"];
    let currentIndex = 0;
    const dynamicText = document.getElementById('dynamic-text');
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentTitle = titles[currentIndex];
        if (isDeleting) {
            // Remove characters
            dynamicText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % titles.length;
            }
        } else {
            // Add characters
            dynamicText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentTitle.length) {
                isDeleting = true;
            }
        }

        setTimeout(type, isDeleting ? 100 : 200);
    }

    type();

    const projectsBg = document.querySelector('.projects-bg');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsBg.classList.add('visible');
            } else {
                projectsBg.classList.remove('visible');
            }
        });
    });

    observer.observe(projectsBg);

    /*                */

    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const nextButton = document.querySelector('.right-arrow');
    const prevButton = document.querySelector('.left-arrow');
    
    let currentIndex1 = 0;
    
    function updateCarousel() {
        const middleIndex = currentIndex1 + 1;
        track.style.transform = 'translateX(' + (-currentIndex1 * 33.3333) + '%)';
        items.forEach((item, index) => {
            const img = item.querySelector('img');
            if (index === middleIndex) {
                img.style.transform = 'scale(1.2)';
            } else {
                img.style.transform = 'scale(1)';
            }
        });
    }
    
    nextButton.addEventListener('click', () => {
        currentIndex1 = (currentIndex1 + 1) % items.length;
        updateCarousel();
    });
    
    prevButton.addEventListener('click', () => {
        currentIndex1 = (currentIndex1 - 1 + items.length) % items.length;
        updateCarousel();
    });
    
    updateCarousel();

    
});
