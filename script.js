// --- MENU BURGER ---
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// --- CARROUSEL GÉNÉRIQUE ---
function initCarousel(selector, intervalTime) {
    const slides = document.querySelectorAll(selector);
    let currentSlide = 0;

    function show(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function next() {
        currentSlide = (currentSlide + 1) % slides.length;
        show(currentSlide);
    }

    show(currentSlide);
    let interval = setInterval(next, intervalTime);

    return {
        slides,
        show,
        next,
        get interval() { return interval; },
        clear: () => clearInterval(interval),
        restart: () => interval = setInterval(next, intervalTime),
        get currentSlide() { return currentSlide; },
        set currentSlide(val) { currentSlide = val; }
    };
}

// Initialisation des 4 carrousels
const extCarousel = initCarousel('.carousel-fade img', 3000);
const intCarousel = initCarousel('.carousel-fade2 img', 3000);
const secuCarousel = initCarousel('.carousel-fade-secu img', 3000);
const lumCarousel = initCarousel('.carousel-fade-quoti img', 3000);

function stopAllIntervals() {
    extCarousel.clear();
    intCarousel.clear();
    secuCarousel.clear();
    lumCarousel.clear();
}

function resumeAllIntervals() {
    extCarousel.restart();
    intCarousel.restart();
    secuCarousel.restart();
    lumCarousel.restart();
}

// --- LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
let currentGalleryImages = [];

// Ouvrir la lightbox
function openLightbox(galleryImages, index) {
    currentGalleryImages = galleryImages;
    currentIndex = index;
    showLightboxImage(currentIndex);
    lightbox.style.display = 'flex';
    stopAllIntervals();
}

function showLightboxImage(index) {
    const image = currentGalleryImages[index];
    lightboxImg.src = image.src;
}

// Fermer la lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    resumeAllIntervals();
});

// Touche Échap pour fermer
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.style.display = 'none';
        resumeAllIntervals();
    }
});

// Navigation lightbox
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    showLightboxImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentGalleryImages.length;
    showLightboxImage(currentIndex);
});

// Ouvrir la lightbox depuis chaque carrousel
extCarousel.slides.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(extCarousel.slides, index));
});

intCarousel.slides.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(intCarousel.slides, index));
});

secuCarousel.slides.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(secuCarousel.slides, index));
});

lumCarousel.slides.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(lumCarousel.slides, index));
});
