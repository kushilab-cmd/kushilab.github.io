// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    // Intersection Observer to trigger animation on scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    // Calculate increment
                    const inc = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10); // 10ms frame rate
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
                // Stop observing once animated
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    // Attach observer to each counter
    counters.forEach(counter => {
        observer.observe(counter);
    });
});
