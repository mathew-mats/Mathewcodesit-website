// ===== YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== MOBILE MENU =====
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== AJAX FORM SUBMISSION (No Redirect) =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        submitBtn.disabled = true;

        const formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;

            if (data.success) {
                // Show success message
                const wrapper = document.querySelector('.contact-wrapper');
                const existingMsg = document.querySelector('.success-message');
                if (existingMsg) existingMsg.remove();

                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle" style="color:#007ACC; font-size:32px; display:block; margin-bottom:10px;"></i>
                    <strong style="color:#fff; font-size:20px;">Message Sent Successfully! 🎉</strong>
                    <p style="color:#aaaaaa; margin-top:6px;">Thanks for reaching out! I'll get back to you within 24 hours.</p>
                `;
                successMsg.style.cssText = `
                    background: rgba(0, 122, 204, 0.12);
                    border: 1px solid #007ACC;
                    border-radius: 12px;
                    padding: 30px 35px;
                    text-align: center;
                    margin-bottom: 30px;
                    animation: fadeInUp 0.5s ease;
                `;
                wrapper.prepend(successMsg);

                // Clear the form
                this.reset();

                // Auto-hide after 6 seconds
                setTimeout(() => {
                    successMsg.style.transition = 'opacity 0.5s';
                    successMsg.style.opacity = '0';
                    setTimeout(() => successMsg.remove(), 500);
                }, 6000);

                // Scroll to top of contact section
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                alert('Something went wrong. Please try again or contact me directly on WhatsApp.');
            }
        })
        .catch(() => {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            alert('Network error. Please check your connection and try again.');
        });
    });
});

// ===== REVEAL ANIMATION ON SCROLL (Optional) =====
const revealElements = document.querySelectorAll('.skill-category, .project-card, .service-card, .why-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Add revealed class to trigger animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .skill-category.revealed,
        .project-card.revealed,
        .service-card.revealed,
        .why-item.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});