(function () {
    const marquees = document.querySelectorAll('.marquee-track, .marquee-track-reverse');

    marquees.forEach((track) => {
        const speed = 0.7;
        const isReverse = track.classList.contains('marquee-track-reverse');

        let x = 0;
        let groupWidth = 0;
        let hasInitialized = false;

        function setGroupWidth() {
            const firstGroup = track.querySelector('.marquee-group');
            groupWidth = firstGroup.offsetWidth;

            // Only set the starting position once
            if (!hasInitialized) {
                if (isReverse) {
                    x = -groupWidth;
                } else {
                    x = 0;
                }

                hasInitialized = true;
            }
        }

        function animateMarquee() {
            if (isReverse) {
                x += speed;

                if (x >= 0) {
                    x = -groupWidth;
                }
            } else {
                x -= speed;

                if (x <= -groupWidth) {
                    x = 0;
                }
            }

            track.style.transform = `translate3d(${x}px, 0, 0)`;

            requestAnimationFrame(animateMarquee);
        }

        setGroupWidth();

        window.addEventListener('resize', () => {
            setGroupWidth();
        });

        animateMarquee();
    }); 

    // Animation JS

    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    const typeTitles = document.querySelectorAll('.type-title');

    function typeText(element) {
        const text = element.dataset.text;
        let index = 0;

        element.textContent = '';
        element.classList.remove('typing-done');

        const typingInterval = setInterval(() => {
            element.textContent += text[index];
            index++;

            if (index === text.length) {
            clearInterval(typingInterval);
            element.classList.add('typing-done');
            }
        }, 75);
    }

    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            typeText(entry.target);
            } else {
            entry.target.textContent = '';
            entry.target.classList.remove('typing-done');
            }
        });
    }, {
        threshold: 0.4
    });

    typeTitles.forEach(title => {
        typingObserver.observe(title);
    });
    // ----------------
})();