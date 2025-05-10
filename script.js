// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        mobileMenu.classList.toggle('show');
        
        // Animate links sequentially
        const links = mobileMenu.querySelectorAll('.mobile-nav-link');
        links.forEach((link, index) => {
            link.style.setProperty('--i', index);
            if (mobileMenu.classList.contains('show')) {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            } else {
                link.style.opacity = '0';
                link.style.transform = 'translateY(-10px)';
            }
        });
    });
}

// Smooth Scroll for All Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                menuBtn.classList.remove('open');
            }
            
            // Smooth scroll after menu closes
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    });
});

// Active Link Detection
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = `#${section.id}`;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Typing Animation
const titles = ["Web Developer", "Software Engineer", "Full Stack Developer", "Trader", "Informatics Student"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeTitle() {
    const typingElement = document.getElementById('typing');
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeTitle, typingSpeed);
}

// Initialize GSAP Animations
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeTitle, 1000);
    
    // Fade in tagline
    gsap.to("#tagline", {
        opacity: 1,
        duration: 1,
        delay: 2
    });
    
    // About section animation
    gsap.to(".about-content", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1
    });
    
    // Skills animation
    gsap.to(".skill-card", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1
    });
    
    // Social icons animation
    gsap.to(".social-icon", {
        scrollTrigger: {
            trigger: "#social",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1
    });
});