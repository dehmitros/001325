(function() {
    const colors = ['#FFC700', '#FF3D00', '#FF6B00', '#FFD500', '#00B3FF', '#00FF85'];
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    
    // Set canvas style directly
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '9999'
    });

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    const particles = [];

    function createParticle() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speed = Math.random() * 3 + 2;

        particles.push({ x, y, radius, color, speed });
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y += p.speed;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.closePath();

            if (p.y > canvas.height) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function loop() {
        if (particles.length < 200) {
            createParticle();
        }
        updateParticles();
        requestAnimationFrame(loop);
    }

    loop();

    window.addEventListener('resize', resizeCanvas);
})();
