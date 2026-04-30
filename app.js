// 1. شاشة التحميل (Preloader)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
});

// 2. مؤشر الماوس المخصص
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

const interactives = document.querySelectorAll('.interactive, a, button, .img-container');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered-cursor'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered-cursor'));
});

// 3. شريط تقدم القراءة (Scroll Progress)
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

// 4. زر العودة للأعلى
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.remove('scale-0', 'opacity-0');
        scrollToTopBtn.classList.add('scale-100', 'opacity-100');
    } else {
        scrollToTopBtn.classList.add('scale-0', 'opacity-0');
        scrollToTopBtn.classList.remove('scale-100', 'opacity-100');
    }
});
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 5. حركات الظهور عند التمرير (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');

        // 6. تفعيل العدادات عند الظهور
        if (entry.target.querySelector('.counter')) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
            entry.target.classList.remove('counter');
        }
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));

// 7. الوضع الليلي والنهاري (Dark/Light Mode)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    if (htmlElement.classList.contains('dark')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// 8. عارض الصور (Lightbox) وتنزيل الصور
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const downloadBtn = document.getElementById('download-btn');

window.openLightbox = function (imgSrc, caption) {
    lightboxImg.src = imgSrc;
    lightboxCaption.innerText = caption;
    downloadBtn.href = imgSrc;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

window.closeLightbox = function () {
    lightbox.classList.remove('show');
    setTimeout(() => { lightboxImg.src = ''; }, 300);
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && lightbox.classList.contains('show')) closeLightbox();
});

// 9. الأسئلة الشائعة (Accordion)
const faqBtns = document.querySelectorAll('.faq-btn');
faqBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');

        document.querySelectorAll('.faq-content').forEach(el => {
            if (el !== content) {
                el.style.maxHeight = null;
                el.previousElementSibling.querySelector('i').classList.remove('rotate-180');
            }
        });

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.classList.remove('rotate-180');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.add('rotate-180');
        }
    });
});