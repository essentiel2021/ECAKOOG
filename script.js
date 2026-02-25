document.addEventListener('DOMContentLoaded', () => {
    console.log('Agrica JS Initialized');

    // Sticky Header Logic
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // Prevent layout jump
                if (!mainHeader.classList.contains('scrolled')) {
                    document.body.style.paddingTop = mainHeader.offsetHeight + 'px';
                    mainHeader.classList.add('scrolled');
                }
            } else {
                if (mainHeader.classList.contains('scrolled')) {
                    document.body.style.paddingTop = '0px';
                    mainHeader.classList.remove('scrolled');
                }
            }
        });
    }

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

        // Fail-safe: Show all after 3 seconds if not already active
        setTimeout(() => {
            revealElements.forEach(el => {
                if (!el.classList.contains('active')) {
                    console.log('Fail-safe activation');
                    el.classList.add('active');
                    revealObserver.unobserve(el);
                }
            });
        }, 3000);
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

    // Services Carousel Navigation
    const servicesTrack = document.querySelector('.services-track');
    const prevBtn = document.querySelector('.services-prev');
    const nextBtn = document.querySelector('.services-next');

    if (servicesTrack && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = servicesTrack.querySelector('.service-card');
            if (!card) return 300;
            const gap = 24;
            return card.offsetWidth + gap;
        };

        prevBtn.addEventListener('click', () => {
            servicesTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            servicesTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }

    // Global Click Handler
    document.addEventListener('click', (e) => {
        // Close social popups
        shareBtns.forEach(btn => btn.classList.remove('active'));

        // Close dropdowns
        if (!e.target.closest('.dropdown-toggle')) {
            document.querySelectorAll('.dropdown-toggle').forEach(dt => dt.classList.remove('active'));
        }
    });
    // Image Lightbox Logic
    const lightboxModal = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const clickableImages = document.querySelectorAll('.clickable-img');

    if (lightboxModal && lightboxImg && clickableImages) {
        clickableImages.forEach(img => {
            img.addEventListener('click', function () {
                lightboxModal.style.display = 'flex';
                // Small timeout to allow display: flex to apply before opacity transition starts
                setTimeout(() => {
                    lightboxModal.classList.add('show');
                }, 10);
                lightboxImg.src = this.src;
            });
        });

        const closeLightbox = () => {
            lightboxModal.classList.remove('show');
            setTimeout(() => {
                lightboxModal.style.display = 'none';
            }, 300); // Wait for transition to finish
        };

        // Close on X click
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        // Close on background click
        lightboxModal.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    // Realisation Image Alignment
    const alignImageToSidebar = () => {
        const sidebar = document.querySelector('.actu-sidebar');
        const imgContainer = document.querySelector('.actu-main-img');

        if (sidebar && imgContainer) {
            if (window.innerWidth > 992) {
                // Match the main image height to the sidebar height
                imgContainer.style.height = sidebar.offsetHeight + 'px';
            } else {
                imgContainer.style.height = 'auto'; // Reset for mobile
            }
        }
    };

    // Kognagnan Cacao Image Alignment Context
    const alignKognagnanImageToMenu = () => {
        // Only apply this logic to the Kognagnan Cacao pages
        const kognagnanPages = [
            'intrants-biologiques.html',
            'cacao-fine-saveur.html',
            'bancarisation-assurance.html',
            'promotion-genre.html',
            'agroforesterie.html'
        ];

        const isKognagnan = kognagnanPages.some(page => window.location.pathname.includes(page));
        if (!isKognagnan) return;

        const sidebarMenu = document.querySelector('.service-sidebar .sidebar-menu');
        const imgContainer = document.querySelector('.service-hero-img');

        // Ensure we are only targeting pages with both the menu and the hero image
        if (sidebarMenu && imgContainer) {
            // Check if it's one of the kognagnan pages or general service page with a menu
            if (window.innerWidth > 992) {
                // Match the main image height to the sidebar menu height
                imgContainer.style.height = sidebarMenu.offsetHeight + 'px';
            } else {
                imgContainer.style.height = 'auto'; // Reset for mobile
            }
        }
    };

    // Run immediately and on resize/load
    alignImageToSidebar();
    alignKognagnanImageToMenu();
    window.addEventListener('load', () => {
        alignImageToSidebar();
        alignKognagnanImageToMenu();
    });
    window.addEventListener('resize', () => {
        alignImageToSidebar();
        alignKognagnanImageToMenu();
    });

});
