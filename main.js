document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.getElementById('main-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function () {
            nav.classList.toggle('open');
        });

        // Optional: close nav when a link is clicked (for mobile UX)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('open'));
        });
    }

    // Slideshow code
    const slides = document.querySelectorAll('.slide-img');
    const indicators = document.querySelectorAll('.indicator');
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        indicators[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
        indicators[current].classList.add('active');
    }, 5000); // Change image every 5 seconds

    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const menuId = btn.getAttribute('data-menu');
            const menuDiv = document.getElementById(menuId);
            const isActive = menuDiv.classList.contains('active');
            // Hide all menu images first
            document.querySelectorAll('.menu-image').forEach(div => div.classList.remove('active'));
            // Toggle: show if not active, hide if active
            if (!isActive) {
                menuDiv.classList.add('active');
                menuDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // Show order section when any .order-btn is clicked
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('order-section').classList.add('active');
        });
    });

    // Close order section
    document.querySelector('.close-order-btn').addEventListener('click', function() {
        document.getElementById('order-section').classList.remove('active');
        document.getElementById('order-form').reset();
        document.getElementById('order-success').style.display = 'none';
    });

    // Handle order form submission
    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('order-name').value.trim();
        const phone = document.getElementById('order-phone').value.trim();
        const details = document.getElementById('order-details').value.trim();

        // Compose WhatsApp message
        const message = encodeURIComponent(
            `New Order from DIP's CoRNER:%0A` +
            `Name: ${name}%0A` +
            `Phone: ${phone}%0A` +
            `Order Details: ${details}`
        );

        // WhatsApp number (replace with your number, no + or spaces)
        const whatsappNumber = '27710594825'; // e.g. 27721234567

        // Open WhatsApp with the message
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

        // Optionally, close the modal and reset the form
        document.getElementById('order-section').classList.remove('active');
        document.getElementById('order-form').reset();
    });
});