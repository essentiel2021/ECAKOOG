document.addEventListener('DOMContentLoaded', () => {
    // Determine the base path or current page name to set active links
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Fetch Header
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load header');
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('header-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
                setActiveLink(currentPath);
                initHeaderEvents();
            }
        })
        .catch(err => console.error("Error fetching header:", err));

    // Fetch Footer
    fetch('components/footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load footer');
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
            }
        })
        .catch(err => console.error("Error fetching footer:", err));

    function setActiveLink(path) {
        // Clear all existing active states
        document.querySelectorAll('.main-header a.active').forEach(a => a.classList.remove('active'));
        
        // Find links that match current path exactly
        const links = document.querySelectorAll('.main-header a');
        for (let link of links) {
            let href = link.getAttribute('href');
            if (href && href === path) {
                link.classList.add('active');
                
                // If the active link is inside a dropdown menu, highlight the parent dropdown toggle as well
                const dropdown = link.closest('.dropdown-toggle');
                if (dropdown) {
                     const parentLink = dropdown.querySelector('a.dropdown-link');
                     if (parentLink) parentLink.classList.add('active');
                }
                break; // stop at first exact match
            }
        }
    }

    function initHeaderEvents() {
        // Sticky Header Logic
        const mainHeader = document.querySelector('.main-header');
        if (mainHeader) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
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

        // Dropdown Click Logic (Mobile & Desktop interactions)
        document.querySelectorAll('.dropdown-toggle > a').forEach(toggleLink => {
            toggleLink.addEventListener('click', function (e) {
                // If it's a dropdown toggle, prevent default navigation only if we just want to open the menu
                e.preventDefault();
                e.stopPropagation();
                
                const parent = this.parentElement;
                if (!parent) return;
                
                const wasActive = parent.classList.contains('active');
                
                // Close all others
                document.querySelectorAll('.dropdown-toggle').forEach(dt => {
                    if (dt !== parent) dt.classList.remove('active');
                });
                
                parent.classList.toggle('active', !wasActive);
            });
        });
        
        // Global click to close dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-toggle')) {
                document.querySelectorAll('.dropdown-toggle').forEach(dt => dt.classList.remove('active'));
            }
        });
    }
});
