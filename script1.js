// document.addEventListener('DOMContentLoaded', () => {
//     const track = document.querySelector('.carousel-track');
//     const items = Array.from(track.children);
//     const nextButton = document.querySelector('.right-arrow');
//     const prevButton = document.querySelector('.left-arrow');

//     let currentIndex = 1; // Start with the second image in the middle

//     function updateCarousel() {
//         const middleIndex = currentIndex;
//         const offset = -((currentIndex - 1) * 33.3333); // Adjust offset to center the current index

//         track.style.transform = `translateX(${offset}%)`;

//         items.forEach((item, index) => {
//             if (index === middleIndex) {
//                 item.classList.add('active');
//             } else {
//                 item.classList.remove('active');
//             }
//         });

//         // Hide left arrow if the first image is in the middle
//         if (currentIndex === 0) {
//             prevButton.style.display = 'none';
//         } else {
//             prevButton.style.display = 'block';
//         }

//         // Hide right arrow if the last image is in the middle
//         if (currentIndex === items.length - 1) {
//             nextButton.style.display = 'none';
//         } else {
//             nextButton.style.display = 'block';
//         }
//     }

//     nextButton.addEventListener('click', () => {
//         currentIndex = Math.min(currentIndex + 1, items.length - 1);
//         updateCarousel();
//     });

//     prevButton.addEventListener('click', () => {
//         currentIndex = Math.max(currentIndex - 1, 0);
//         updateCarousel();
//     });

//     updateCarousel();
// });


document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const nextButton = document.querySelector('.right-arrow');
    const prevButton = document.querySelector('.left-arrow');

    let currentIndex = 1; // Start with the second image in the middle

    function updateCarousel() {
        const isSmallScreen = window.innerWidth <= 768;
        const offsetPercentage = isSmallScreen ? 100 : 33.3333; // Adjust offset based on screen size
        const offset = -((currentIndex) * offsetPercentage); // Adjust offset to center the current index

        track.style.transform = `translateX(${offset}%)`;

        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Hide left arrow if the first image is in the middle
        if (currentIndex === 0) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
        }

        // Hide right arrow if the last image is in the middle
        if (currentIndex === items.length - 1) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
        }
    }

    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, items.length - 1);
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel); // Update carousel on window resize

    updateCarousel();
});

