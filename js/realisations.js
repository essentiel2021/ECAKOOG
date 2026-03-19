document.addEventListener('DOMContentLoaded', () => {
    // Realisation Image Alignment
    const alignImageToSidebar = () => {
        const sidebar = document.querySelector('.widget-recent');
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

    // Run immediately and on resize/load
    alignImageToSidebar();
    window.addEventListener('load', () => {
        alignImageToSidebar();
    });
    window.addEventListener('resize', () => {
        alignImageToSidebar();
    });
});
