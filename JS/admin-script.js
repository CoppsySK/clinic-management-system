// admin-script.js
document.addEventListener('DOMContentLoaded', function() {
    // Highlight the active link in the navigation bar
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.profile-menu ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
