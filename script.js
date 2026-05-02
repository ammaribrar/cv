// Cursor Follower
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const cardRoleText = document.querySelector('.card-role-text');
const roles = ['Automation Specialist', 'Graphics Designer', 'Web Developer', 'Wordpress Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        
        // Update Card Role with Fade Effect
        cardRoleText.classList.add('role-fade-out');
        setTimeout(() => {
            cardRoleText.textContent = roles[roleIndex];
            cardRoleText.classList.remove('role-fade-out');
        }, 500);

        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('hide');
    observer.observe(section);
});

// Start Typing
document.addEventListener('DOMContentLoaded', () => {
    type();
});

// Add CSS for Reveal Animation dynamically
const style = document.createElement('style');
style.textContent = `
    .hide {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal {
        opacity: 1;
        transform: translateY(0);
    }
    .hide-item {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
        transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .reveal-item {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;
document.head.appendChild(style);

// Gallery Item Staggered Reveal
const galleryObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const galleryObserver = new IntersectionObserver((entries) => {
    let delayCounter = 0;
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('reveal-item');
            }, delayCounter * 150);
            delayCounter++;
            galleryObserver.unobserve(entry.target);
        }
    });
}, galleryObserverOptions);

document.querySelectorAll('.gallery-item').forEach(item => {
    item.classList.add('hide-item');
    galleryObserver.observe(item);
});

// Carousel Logic
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const nextBtn = carousel.querySelector('.next-btn');
    const prevBtn = carousel.querySelector('.prev-btn');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');

    if (track && slides.length > 0) {
        let currentSlide = 0;
        
        // Create indicators
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
            if(indicatorsContainer) indicatorsContainer.appendChild(dot);
        });

        const indicators = Array.from(carousel.querySelectorAll('.indicator'));

        function updateCarousel() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            indicators.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto-play
        let carouselInterval = setInterval(nextSlide, 3000);

        // Pause on hover
        carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, 3000);
        });
    }
});

// Scroll to Top Button Logic
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
