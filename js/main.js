/* ============================================
   WOMB OF SHADOWS — Main JS
   Particles, scroll effects, mobile nav
   ============================================ */

// --- Navbar scroll effect ---
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 60);
    lastScroll = scrollY;
}, { passive: true });

// --- Mobile nav toggle ---
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        navToggle.setAttribute('aria-expanded', isOpen);
        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
}

// --- Ambient particles (hero section) ---
function initParticles() {
    const canvas = document.createElement('canvas');
    const container = document.getElementById('particles');
    if (!container) return;

    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const count = Math.min(80, Math.floor(window.innerWidth / 15));

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.15 - 0.1,
            opacity: Math.random() * 0.6 + 0.1,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.02 + 0.005,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += p.pulseSpeed;

            // Wrap around
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;
            if (p.y < -10) p.y = canvas.height + 10;
            if (p.y > canvas.height + 10) p.y = -10;

            const opacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

            // Amber glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(196, 135, 58, ${opacity})`;
            ctx.fill();

            // Soft glow halo
            if (p.size > 1.2) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(196, 135, 58, ${opacity * 0.1})`;
                ctx.fill();
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
}

// --- Scroll-triggered fade-in ---
function initScrollAnimations() {
    const targets = document.querySelectorAll(
        '.book-text, .read-gate, .chapter-card, .subscribe-inner, .author-content, .follow-inner, .reaction-form-wrap'
    );

    targets.forEach(el => el.classList.add('fade-in'));

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        targets.forEach(el => observer.observe(el));
    } else {
        // Fallback: show everything
        targets.forEach(el => el.classList.add('visible'));
    }
}

// --- Sample gate form: subscribe to Buttondown + instant PDF download ---
const gateForm = document.getElementById('gate-form');
if (gateForm) {
    gateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('gate-email').value;
        const btn = gateForm.querySelector('button');
        const origText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        // Subscribe to launch list via Google Forms (Buttondown pending review)
        fetch('https://docs.google.com/forms/d/e/1FAIpQLSeeIuLG4wc3rJjE8x5k3TyUAJii_jMh46rMbdacrWqayclb-A/formResponse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'entry.791413828=' + encodeURIComponent(email),
            mode: 'no-cors'
        }).catch(() => {}); // Silent fail OK — PDF still delivers

        // Deliver the PDF immediately
        setTimeout(() => {
            btn.textContent = 'Downloading...';
            const link = document.createElement('a');
            link.href = 'sample/Womb_of_Shadows_Sample.pdf';
            link.download = 'Womb_of_Shadows_Sample_Chapters.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success state
            btn.textContent = 'Downloaded!';
            btn.style.background = '#2a7a3a';
            gateForm.querySelector('input').value = '';

            // Show success message, hide form
            const successEl = document.getElementById('gate-success');
            if (successEl) {
                gateForm.style.display = 'none';
                gateForm.previousElementSibling.style.display = 'none'; // hide description
                document.querySelector('.gate-icon')?.style.display && (document.querySelector('.read-gate-icon').style.display = 'none');
                successEl.style.display = 'block';
            }
        }, 800);
    });
}

// --- Subscribe form: Buttondown signup + success state ---
const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('subscribe-email').value;
        const btn = subscribeForm.querySelector('button');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        fetch('https://docs.google.com/forms/d/e/1FAIpQLSeeIuLG4wc3rJjE8x5k3TyUAJii_jMh46rMbdacrWqayclb-A/formResponse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'entry.791413828=' + encodeURIComponent(email),
            mode: 'no-cors'
        }).catch(() => {});

        setTimeout(() => {
            subscribeForm.style.display = 'none';
            const noteEl = document.getElementById('subscribe-note');
            if (noteEl) noteEl.style.display = 'none';
            const successEl = document.getElementById('subscribe-success');
            if (successEl) successEl.style.display = 'block';
        }, 800);
    });
}

// --- Reaction form: submit to Google Forms ---
const reactionForm = document.getElementById('reaction-form');
if (reactionForm) {
    reactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reaction-name').value;
        const comment = document.getElementById('reaction-comment').value;
        const btn = reactionForm.querySelector('button');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const body = 'entry.1331793035=' + encodeURIComponent(name) +
                     '&entry.269667257=' + encodeURIComponent(comment);

        fetch('https://docs.google.com/forms/d/e/1FAIpQLSfa0Tz3xS42PYi8F1QGTcWto6Uqqs-mn4W9Vth1W0_9nP9rDA/formResponse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body,
            mode: 'no-cors'
        }).catch(() => {});

        setTimeout(() => {
            reactionForm.style.display = 'none';
            const successEl = document.getElementById('reaction-success');
            if (successEl) successEl.style.display = 'block';
        }, 700);
    });
}

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
});
