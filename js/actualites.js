document.addEventListener('DOMContentLoaded', () => {
    // Actualites Image Alignment
    const alignImageToSidebar = () => {
        const sidebar = document.querySelector('.widget-recent');
        const imgContainer = document.querySelector('.actu-main-img');

        if (sidebar && imgContainer) {
            if (window.innerWidth > 992) {
                imgContainer.style.height = 'auto'; // Reset before measuring
                const sidebarBottom = sidebar.getBoundingClientRect().bottom;
                const imgTop = imgContainer.getBoundingClientRect().top;

                // Match the main image bottom to the widget-recent bottom
                imgContainer.style.height = (sidebarBottom - imgTop) + 'px';
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
