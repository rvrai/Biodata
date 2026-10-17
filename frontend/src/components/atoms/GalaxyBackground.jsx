import React, { useEffect, useRef } from 'react';

// Color palettes per section — the galaxy shifts hue as you scroll.
// Modeled after real spiral galaxy clusters (e.g. Whirlpool / M31).
const PALETTES = {
  hero: { core: [0, 217, 255], inner: [150, 120, 255], outer: [0, 190, 255] },
  about: { core: [168, 85, 247], inner: [236, 72, 153], outer: [99, 102, 241] },
  projects: { core: [251, 146, 60], inner: [249, 115, 22], outer: [234, 88, 12] },
  experience: { core: [52, 211, 153], inner: [16, 185, 129], outer: [5, 150, 105] },
  skills: { core: [96, 165, 250], inner: [59, 130, 246], outer: [37, 99, 235] },
  education: { core: [250, 204, 21], inner: [234, 179, 8], outer: [202, 138, 4] },
  certificates: { core: [244, 114, 182], inner: [236, 72, 153], outer: [217, 70, 239] },
  contact: { core: [0, 217, 255], inner: [34, 211, 238], outer: [45, 212, 191] },
  default: { core: [0, 217, 255], inner: [150, 120, 255], outer: [0, 190, 255] },
};

const lerp = (a, b, t) => a + (b - a) * t;
const lerpColor = (c, target, t) => [
  lerp(c[0], target[0], t),
  lerp(c[1], target[1], t),
  lerp(c[2], target[2], t),
];

/**
 * Animated starfield background.
 * - Mid-size stars that blink periodically with a slow, visible animation.
 * - The star glow's color shifts subtly to match the active section.
 */
const GalaxyBackground = ({ variant = 'hero' }) => {
  const canvasRef = useRef(null);
  const variantRef = useRef(variant);
  variantRef.current = variant;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let stars = [];
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const current = { core: [0, 0, 0], inner: [0, 0, 0], outer: [0, 0, 0] };

    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 11000), 170);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 0.8 + Math.random() * 1.7, // mid-size stars
          baseAlpha: 0.25 + Math.random() * 0.5,
          speed: 0.0008 + Math.random() * 0.0022, // slow blink (~2.5–6s)
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const draw = (t) => {
      const pal = PALETTES[variantRef.current] || PALETTES.default;
      current.core = lerpColor(current.core, pal.core, 0.03);
      const [cr, cg, cb] = current.core;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mid-size stars with slow, visible blink (kept as-is)
      for (const s of stars) {
        const blink = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
        const alpha = s.baseAlpha * (0.35 + 0.65 * blink);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.8 && blink > 0.7) {
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const render = () => {
      resize();
      if (prefersReduced) draw(0);
      else raf = requestAnimationFrame(loop);
    };

    render();
    const onResize = () => {
      resize();
      if (prefersReduced) draw(0);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="galaxy-canvas"
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}
    />
  );
};

export default GalaxyBackground;
