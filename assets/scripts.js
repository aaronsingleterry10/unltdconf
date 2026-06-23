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
})();