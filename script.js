// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Calculate header height for offset
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL
            history.pushState(null, null, targetId);
        }
    });
});

// Floating CTA
const floatingCTA = document.getElementById('floatingCTA');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide floating CTA based on scroll direction
    if (scrollTop > 500 && scrollTop < lastScrollTop) {
        // Scrolling up
        floatingCTA.classList.add('active');
    } else {
        // Scrolling down or at top
        floatingCTA.classList.remove('active');
    }
    
    lastScrollTop = scrollTop;
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simple validation
        if (!formObject.name || !formObject.email || !formObject.phone) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formObject.email) && !formObject.email.includes('@')) {
            // Check if it's a Telegram username
            if (!formObject.email.startsWith('@') && !formObject.email.includes('t.me/')) {
                alert('Пожалуйста, введите корректный email или телеграм');
                return;
            }
        }
        
        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(formObject.phone) || formObject.phone.replace(/\D/g, '').length < 10) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            
            // Reset form
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 1500);
    });
}

// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Сайт "Чистый лист" загружен');
    
    // Add loading class for animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Check for hash in URL and scroll to section
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 500);
    }
});

// Simple analytics (console only for local)
console.log('Аналитика: страница загружена');
console.log('User agent:', navigator.userAgent);
console.log('Screen size:', window.innerWidth, 'x', window.innerHeight);

// Add page view tracking
window.addEventListener('load', () => {
    const pageView = {
        url: window.location.href,
        title: document.title,
        timestamp: new Date().toISOString(),
        referrer: document.referrer
    };
    console.log('Page view:', pageView);
});
// Функция для адаптации размера полноэкранного изображения
function adjustFullscreenImage() {
    const fullscreenImg = document.querySelector('.fullscreen-img');
    const fullscreenSection = document.querySelector('.fullscreen-image');
    const header = document.querySelector('.header');
    
    if (fullscreenImg && fullscreenSection && header) {
        // 1. Корректируем отступ сверху (высота header)
        const headerHeight = header.offsetHeight;
        fullscreenSection.style.marginTop = `${headerHeight}px`;
        
        // 2. Корректируем высоту секции для вьюпорта
        const windowHeight = window.innerHeight;
        fullscreenSection.style.height = `${windowHeight - headerHeight}px`;
        
        // 3. Для очень широких экранов растягиваем изображение
        const windowWidth = window.innerWidth;
        const windowRatio = windowWidth / windowHeight;
        
        // Если экран очень широкий (шире, чем 16:9)
        if (windowRatio > 1.78) { // 16:9 = 1.78
            fullscreenImg.style.width = '100vw';
            fullscreenImg.style.height = 'auto';
            fullscreenImg.style.objectFit = 'cover';
            fullscreenImg.style.objectPosition = 'center center';
        } else {
            fullscreenImg.style.width = '100%';
            fullscreenImg.style.height = '100%';
        }
        
        // 4. Предотвращаем смещение при скролле на iOS
        fullscreenSection.style.transform = 'translateZ(0)';
        fullscreenImg.style.transform = 'translateZ(0)';
        
        console.log(`Adjusted fullscreen image: ${windowWidth}x${windowHeight}, header: ${headerHeight}px`);
    }
}

// В функции инициализации добавляем:
document.addEventListener('DOMContentLoaded', () => {
    // ... существующий код ...
    
    // Запускаем адаптацию полноэкранного изображения
    adjustFullscreenImage();
    
    // Обновляем при ресайзе
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustFullscreenImage, 250);
    });
    
    // Обновляем при изменении ориентации
    window.addEventListener('orientationchange', () => {
        setTimeout(adjustFullscreenImage, 500);
    });
});

// Добавляем обработку загрузки изображения
window.addEventListener('load', () => {
    const fullscreenImg = document.querySelector('.fullscreen-img');
    
    if (fullscreenImg) {
        // Проверяем, загружено ли изображение
        if (fullscreenImg.complete && fullscreenImg.naturalHeight !== 0) {
            adjustFullscreenImage();
        } else {
            // Ждем загрузки изображения
            fullscreenImg.addEventListener('load', adjustFullscreenImage);
            
            // Фолбэк на случай ошибки загрузки
            fullscreenImg.addEventListener('error', () => {
                console.error('Failed to load fullscreen image');
                // Можно подставить заглушку
                fullscreenImg.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920';
            });
        }
    }
    
    // Запускаем адаптацию после полной загрузки страницы
    setTimeout(adjustFullscreenImage, 1000);
});
// Добавьте таймаут и повторную попытку
const loadMapsWithRetry = (retries = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      loadYandexMaps()
        .then(resolve)
        .catch(error => {
          if (n > 0) {
            setTimeout(() => attempt(n - 1), delay);
          } else {
            reject(error);
            // Показать статичную карту или сообщение
          }
        });
    };
    attempt(retries);
  });
};