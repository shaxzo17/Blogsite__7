
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Star rating system
    const starRatings = document.querySelectorAll('.stars');

    starRatings.forEach(rating => {
        const stars = rating.querySelectorAll('i');
        const postId = rating.dataset.postId;

        stars.forEach(star => {
            star.addEventListener('click', function() {
                const ratingValue = this.dataset.rating;

                // Send rating to server
                fetch(`/set-rating/${ratingValue}/${postId}/`, {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Update UI
                        stars.forEach((s, index) => {
                            if (index < ratingValue) {
                                s.classList.add('active');
                                s.classList.remove('far');
                                s.classList.add('fas');
                            } else {
                                s.classList.remove('active');
                                s.classList.remove('fas');
                                s.classList.add('far');
                            }
                        });

                        // Update rating text
                        const ratingText = rating.querySelector('.rating-text');
                        if (ratingText) {
                            ratingText.textContent = `Average: ${data.avg_rating}/5 (${data.total_ratings} votes)`;
                        }
                    }
                });
            });

            // Hover effect
            star.addEventListener('mouseover', function() {
                const ratingValue = this.dataset.rating;
                stars.forEach((s, index) => {
                    if (index < ratingValue) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });

            star.addEventListener('mouseout', function() {
                stars.forEach(s => {
                    s.classList.remove('hover');
                });
            });
        });
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                const animation = element.getAttribute('data-animation') || 'fadeIn';
                element.classList.add(animation);

                // Handle delay if specified
                const delay = element.getAttribute('data-delay');
                if (delay) {
                    element.style.animationDelay = `${delay}ms`;
                }
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Helper function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}