// This script handles the mobile menu toggle and the infinite review carousel.

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('show');
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
            menuBtn.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Infinite review carousel
    const track = document.querySelector('.review-track');
    if (!track) return;

    // Duplicate the content to create a seamless loop
    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent;

    // Function to calculate and apply animation
    const applyAnimation = () => {
        const totalWidth = track.scrollWidth;
        const singleWidth = totalWidth / 2;

        if (singleWidth > 0) {
            // Remove old animation if it exists
            const style = document.getElementById('review-animation-style');
            if (style) {
                style.remove();
            }

            const newStyle = document.createElement('style');
            newStyle.id = 'review-animation-style';
            const duration = singleWidth / 40; // 40px/s speed
            newStyle.innerHTML = `
                @keyframes reviewScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-${singleWidth}px); }
                }
                .review-track {
                    animation: reviewScroll ${duration}s linear infinite;
                }
                .review-track:hover {
                    animation-play-state: paused;
                }
            `;
            document.head.appendChild(newStyle);
        }
    };

    // Apply animation on initial load and when the window is resized
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(applyAnimation, 250);
    });

    applyAnimation();
});