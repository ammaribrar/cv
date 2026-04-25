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
`;
document.head.appendChild(style);
