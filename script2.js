// Vanilla JavaScript solution
document.addEventListener("DOMContentLoaded", function() {
    const navHeight = document.querySelector('nav').offsetHeight; // Adjust 'nav' to match your navigation selector

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});
