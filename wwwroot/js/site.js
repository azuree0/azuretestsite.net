// Science Fiction & Architecture Theme - Interactive Effects

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Shooting star effect
    const createShootingStar = () => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // Random starting position from top-left area (0-30% from top)
        const startY = Math.random() * 30;
        const startX = -350; // Start off-screen left
        
        star.style.left = `${startX}px`;
        star.style.top = `${startY}%`;
        star.style.animation = 'shootStar 4s linear'; // Fast diagonal movement
        
        document.body.appendChild(star);
        
        // Remove after animation completes
        setTimeout(() => {
            star.remove();
        }, 4000);
    };

    // Create shooting star every 10 seconds
    const shootStarInterval = setInterval(() => {
        createShootingStar();
    }, 10000);

    // Create first shooting star after initial delay
    setTimeout(() => {
        createShootingStar();
    }, 2000);

    // Enhanced card hover effects with scale and glow
    const cards = document.querySelectorAll('.arch-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('is-visible')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn-sci-fi, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced scroll animations with staggered delays
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || (index * 0.1);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('is-visible');
                }, delay * 1000);
            }
        });
    }, observerOptions);

    // Observe all cards and sections with staggered animations
    document.querySelectorAll('.arch-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        el.dataset.delay = (index * 0.1).toString();
        observer.observe(el);
    });

    // Observe sections
    document.querySelectorAll('.section').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.dataset.delay = (index * 0.15).toString();
        observer.observe(el);
    });

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Form submission handler
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create a sci-fi style notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(10, 14, 39, 0.95);
                border: 2px solid var(--primary-cyan);
                color: var(--primary-cyan);
                padding: 1.5rem 2rem;
                border-radius: 0;
                z-index: 10000;
                font-family: 'Orbitron', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = 'Message Transmitted';
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
            
            // Reset form
            this.reset();
        });
    }

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Plasma cursor setup
    const isTouchPointer = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchPointer) {
        document.body.classList.add('is-touch');
        return;
    }

    const plasmaCursor = document.createElement('div');
    plasmaCursor.className = 'plasma-cursor';

    const core = document.createElement('span');
    core.className = 'plasma-core';
    const ring = document.createElement('span');
    ring.className = 'plasma-ring';
    const spark = document.createElement('span');
    spark.className = 'plasma-spark';
    
    plasmaCursor.appendChild(core);
    plasmaCursor.appendChild(ring);
    plasmaCursor.appendChild(spark);

    document.body.appendChild(plasmaCursor);

    const createTrail = (x, y) => {
        const trail = document.createElement('div');
        trail.className = 'plasma-trail';
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        const scale = 0.4 + Math.random() * 0.5;
        const rotation = Math.random() * 360;
        trail.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1300);
    };

    const movePlasmaCursor = (x, y) => {
        plasmaCursor.style.opacity = '1';
        plasmaCursor.style.left = `${x}px`;
        plasmaCursor.style.top = `${y}px`;
    };

    window.addEventListener('mousemove', (e) => {
        movePlasmaCursor(e.clientX, e.clientY);
        createTrail(e.clientX, e.clientY);
    });

    window.addEventListener('mousedown', () => plasmaCursor.classList.add('active'));
    window.addEventListener('mouseup', () => plasmaCursor.classList.remove('active'));

    window.addEventListener('mouseleave', () => {
        plasmaCursor.style.opacity = '0';
    });

    window.addEventListener('mouseenter', () => {
        plasmaCursor.style.opacity = '1';
    });
});
