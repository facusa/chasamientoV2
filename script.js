// Countdown Timer Logic
const countdown = () => {
    const targetDate = new Date('Oct 24, 2026 18:00:00');
    const now = new Date();
    const gap = targetDate.getTime() - now.getTime();

    // How the time works
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculate
    if (gap > 0) {
        const textDayTotal = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        document.getElementById('days').innerText = textDayTotal.toString().padStart(2, '0');
        document.getElementById('hours').innerText = textHour.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = textMinute.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = textSecond.toString().padStart(2, '0');
    } else {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
    }
};

setInterval(countdown, 1000);

// Envelope & Audio Logic
const envelopeContainer = document.getElementById('envelope-container');
const envelopeScreen = document.getElementById('envelope-screen');
const audioControl = document.getElementById('audioControl');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

// Open envelope on click
envelopeContainer.addEventListener('click', () => {
    envelopeContainer.classList.add('open');

    bgMusic.play().then(() => {
        isPlaying = true;
        audioControl.classList.add('playing');
        audioControl.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(e => console.log("Audio play error:", e));

    setTimeout(() => {
        envelopeScreen.classList.add('hidden');
        document.body.classList.remove('locked');
        setTimeout(() => {
            envelopeScreen.style.display = 'none';
        }, 1000);
    }, 1500);
}, { once: true });

bgMusic.addEventListener('play', () => {
    isPlaying = true;
    audioControl.classList.add('playing');
    audioControl.innerHTML = '<i class="fas fa-pause"></i>';
});

bgMusic.addEventListener('pause', () => {
    isPlaying = false;
    audioControl.classList.remove('playing');
    audioControl.innerHTML = '<i class="fas fa-music"></i>';
});

audioControl.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlaying) {
        bgMusic.pause();
    } else {
        bgMusic.play();
    }
});

// Toggle Gifts Details
window.toggleGifts = () => {
    const details = document.getElementById('giftsDetails');
    details.classList.toggle('active');
};

// RSVP Form Submission
const rsvpForm = document.getElementById('rsvpForm');
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;

    if (attendance === 'yes') {
        alert(`¡Gracias ${name}! Hemos registrado tu confirmación de asistencia. ¡Nos vemos en la fiesta!`);
    } else {
        alert(`Gracias ${name} por avisarnos. ¡Te vamos a extrañar!`);
    }

    rsvpForm.reset();
});

// Timeline Animation on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Start countdown immediately
    countdown();

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Navigation Active State Logic
    const sections = document.querySelectorAll('section[id], header[id], .info-card[id]');
    const navLinks = document.querySelectorAll('.bottom-nav a');

    const navObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });
});
