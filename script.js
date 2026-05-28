// --- 1. CUSTOM STAR CURSOR ---
const cursor = document.getElementById('cloud-cursor');
const hoverables = document.querySelectorAll('a, button, input, textarea');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// --- 2. TYPING ANIMATION ---
const textElement = document.getElementById('typing-text');
const textToType = "Mahasiswa Sistem Informasi";
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        textElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}
setTimeout(typeWriter, 500);

// --- 3. DARK MODE TOGGLE ---
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

if(localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// --- 4. SCROLL ANIMATIONS ---
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.id === 'skills' || entry.target.closest('#skills')) {
                document.querySelectorAll('.progress').forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
            }

            if (entry.target.id === 'about' || entry.target.closest('#about')) {
                const counters = document.querySelectorAll('.stat-item h3');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const speed = 200;
                    const updateCount = () => {
                        const count = +counter.innerText;
                        const inc = target / speed;
                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target + "+";
                        }
                    };
                    updateCount();
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .timeline-item').forEach(el => observer.observe(el));
observer.observe(document.getElementById('skills'));
observer.observe(document.getElementById('about'));

// --- 5. NAVBAR SHRINK & SMOOTH SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('shrink', window.scrollY > 50);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// --- 6. MOBILE MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));