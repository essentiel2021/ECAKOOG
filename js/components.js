document.addEventListener('DOMContentLoaded', () => {
    // Determine the base path or current page name to set active links
    let pathName = window.location.pathname;
    let currentHtmlFile = pathName.split('/').pop() || 'index.html';
    
    // Logic to determine if we are in a subfolder (depth 1) or root (depth 0)
    // Using simple folder matching since we know the exact site architecture
    const isSubfolder = pathName.includes('/services/') || 
                        pathName.includes('/kognagnan-cacao/') || 
                        pathName.includes('/realisations/') || 
                        pathName.includes('/actualites/');
                        
    const rootPrefix = isSubfolder ? '../' : './';
    
    // For calculating the active link logic:
    // If we are on /services/achat-collecte.html, the menu should probably highlight "Achat, collecte..." 
    // AND the parent "Nos Services".
    // We will matching using the href value stored in the header HTML.
    
    // Fetch Header
    fetch(`${rootPrefix}components/header.html`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load header');
            return response.text();
        })
        .then(data => {
            // Replace dynamic {{ROOT}} tags with the actual correct relative path prefix
            let processedHTML = data.replace(/\{\{ROOT\}\}/g, rootPrefix);
            
            const placeholder = document.getElementById('header-placeholder');
            if (placeholder) {
                placeholder.innerHTML = processedHTML;
                setActiveLink(currentHtmlFile, isSubfolder, pathName);
                initHeaderEvents();
            }
        })
        .catch(err => console.error("Error fetching header:", err));

    // Fetch Footer
    fetch(`${rootPrefix}components/footer.html`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load footer');
            return response.text();
        })
        .then(data => {
            let processedHTML = data.replace(/\{\{ROOT\}\}/g, rootPrefix);
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                placeholder.innerHTML = processedHTML;
            }
        })
        .catch(err => console.error("Error fetching footer:", err));

    function setActiveLink(filename, isSub, fullPath) {
        document.querySelectorAll('.main-header a.active').forEach(a => a.classList.remove('active'));
        
        const links = document.querySelectorAll('.main-header a');
        for (let link of links) {
            let href = link.getAttribute('href');
            if (!href) continue;
            
            // Clean href to remove the ROOT prefix for comparison, e.g. "../services/index.html" -> "services/index.html"
            let cleanHref = href.replace('../', '').replace('./', '');
            
            let match = false;
            // Precise match for index pages vs exact files
            if (isSub) {
                // e.g. fullPath contains /services/achat-collecte.html
                // cleanHref is services/achat-collecte.html
                if (fullPath.includes(cleanHref) && cleanHref !== "index.html") {
                    match = true;
                }
            } else {
                if (cleanHref === filename) {
                    match = true;
                }
            }
            
            if (match) {
                link.classList.add('active');
                
                // If it's a dropdown option, highlight parent
                const dropdown = link.closest('.dropdown-toggle');
                if (dropdown) {
                     const parentLink = dropdown.querySelector('a.dropdown-link');
                     if (parentLink) parentLink.classList.add('active');
                }
                break;
            }
        }
    }

    function initHeaderEvents() {
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

        document.querySelectorAll('.dropdown-toggle > a').forEach(toggleLink => {
            toggleLink.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                
                const parent = this.parentElement;
                if (!parent) return;
                
                const wasActive = parent.classList.contains('active');
                document.querySelectorAll('.dropdown-toggle').forEach(dt => {
                    if (dt !== parent) dt.classList.remove('active');
                });
                parent.classList.toggle('active', !wasActive);
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-toggle')) {
                document.querySelectorAll('.dropdown-toggle').forEach(dt => dt.classList.remove('active'));
            }
        });
    }
});
