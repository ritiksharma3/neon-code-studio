import { useEffect, useRef, memo } from 'react';

const CodeRain = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters for the matrix rain - mix of code symbols and characters
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]();:=+-*&^%$#@!~`|\\';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array to track the y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Color variations
    const colors = [
      'hsl(187, 100%, 45%)', // cyan
      'hsl(165, 100%, 50%)', // green
      'hsl(262, 83%, 58%)', // purple
    ];

    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(11, 15, 25, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Position
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Color - brighter at the head
        const headBrightness = Math.random() > 0.95;
        if (headBrightness) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = colors[0];
          ctx.shadowBlur = 20;
        } else {
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        // Reset drop when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i] += 0.5 + Math.random() * 0.5;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="code-rain-container opacity-40"
      style={{ background: 'transparent' }}
    />
  );
});

CodeRain.displayName = 'CodeRain';

export default CodeRain;
