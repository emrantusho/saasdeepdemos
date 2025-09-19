(function() {
  const canvas = document.getElementById('solar-system-canvas');
  // This is a crucial check. The script will only run if it finds the canvas element.
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    const numStars = 200;

    const sun = { x: 0, y: 0, radius: 25, color: 'rgba(255, 220, 100, 1)' };
    const planets = [
      { radius: 4, distance: 70, speed: 0.01, angle: Math.random() * 2 * Math.PI, color: '#A9A9A9' },
      { radius: 8, distance: 120, speed: 0.005, angle: Math.random() * 2 * Math.PI, color: '#4682B4' },
      { radius: 6, distance: 180, speed: 0.003, angle: Math.random() * 2 * Math.PI, color: '#B22222' },
      { radius: 12, distance: 260, speed: 0.0015, angle: Math.random() * 2 * Math.PI, color: '#DEB887' },
    ];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      sun.x = width / 2;
      sun.y = height / 2;
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5,
          alpha: Math.random()
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      ctx.fillStyle = 'white';
      stars.forEach(star => {
        star.y -= 0.2; // Slowly drift stars upwards
        if (star.y < 0) star.y = height;

        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      
      // Draw sun and its glow
      const sunGlow = ctx.createRadialGradient(sun.x, sun.y, sun.radius, sun.x, sun.y, sun.radius * 3.5);
      sunGlow.addColorStop(0, sun.color);
      sunGlow.addColorStop(0.5, 'rgba(255, 200, 50, 0.4)');
      sunGlow.addColorStop(1, 'rgba(255, 180, 0, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius * 3.5, 0, 2 * Math.PI);
      ctx.fill();

      // Draw planets and orbits
      planets.forEach(p => {
        p.angle += p.speed;
        const x = sun.x + Math.cos(p.angle) * p.distance;
        const y = sun.y + Math.sin(p.angle) * p.distance;
        
        // Draw orbit path
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, p.distance, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw planet
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, 2 * Math.PI);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    // Initialize
    window.addEventListener('resize', () => {
      resize();
      createStars();
    });

    resize();
    createStars();
    animate();
  }
})();
