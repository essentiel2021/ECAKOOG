document.addEventListener('DOMContentLoaded', () => {
    console.log('Agrica JS Initialized');

    // Scroll Reveal Logic
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    console.log('Reveal elements found:', revealElements.length);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                console.log('Activating element:', entry.target.tagName, entry.target.className);
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.01,
        rootMargin: '0px 0px -50px 0px'
    });

    if (revealElements.length > 0) {
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        console.warn('No reveal elements found in DOM');
    }

    // Smooth scrolling for any links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href.startsWith('#')) return;

            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (err) {
                console.error('Invalid selector:', href);
            }

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Dropdown Click Logic
    document.querySelectorAll('.dropdown-toggle > a').forEach(toggleLink => {
        toggleLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const parent = this.parentElement;
            if (!parent) return;

            const wasActive = parent.classList.contains('active');

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-toggle').forEach(dt => {
                if (dt !== parent) dt.classList.remove('active');
            });

            parent.classList.toggle('active', !wasActive);
        });
    });

    // Social Share Popup Logic
    const shareBtns = document.querySelectorAll('.realisation-accent');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            shareBtns.forEach(otherBtn => {
                if (otherBtn !== this) otherBtn.classList.remove('active');
            });
            this.classList.toggle('active');
        });
    });

    // Global Click Handler
    document.addEventListener('click', (e) => {
        // Close social popups
        shareBtns.forEach(btn => btn.classList.remove('active'));

        // Close dropdowns
        if (!e.target.closest('.dropdown-toggle')) {
            document.querySelectorAll('.dropdown-toggle').forEach(dt => dt.classList.remove('active'));
        }
    });
});
