document.addEventListener('DOMContentLoaded', () => {
    console.log('Agrica Header Loaded');

    // Smooth scrolling for any links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
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
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Dropdown Click Logic
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle > a');
    dropdownToggles.forEach(toggleLink => {
        toggleLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const parent = this.parentElement;
            const wasActive = parent.classList.contains('active');

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-toggle').forEach(dt => {
                if (dt !== parent) dt.classList.remove('active');
            });

            // Toggle current
            if (!wasActive) {
                parent.classList.add('active');
            } else {
                parent.classList.remove('active');
            }
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

    // Combined Outside Click Handler
    document.addEventListener('click', (e) => {
        // Close social popups
        shareBtns.forEach(btn => btn.classList.remove('active'));

        // Close dropdowns
        if (!e.target.closest('.dropdown-toggle')) {
            document.querySelectorAll('.dropdown-toggle').forEach(dt => dt.classList.remove('active'));
        }
    });

    // Scroll Reveal Logic
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('Entry:', entry.target.className, 'isIntersecting:', entry.isIntersecting);
            if (entry.isIntersecting) {
                console.log('Activating:', entry.target.className);
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
