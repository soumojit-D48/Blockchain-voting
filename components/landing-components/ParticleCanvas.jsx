import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ParticleCanvas({ scrollProgress = 0, cursorFollow = false }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const centerRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!cursorFollow) return;
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorFollow]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = 120;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.7 ? '#FF9900' : '#ffffff',
      speed: Math.random() * 0.5 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const center = centerRef.current;
      const progress = scrollProgress;
      const funnelStrength = progress * 0.08;
      const speedMultiplier = 1 + progress * 3;
      const mouse = mouseRef.current;

      particlesRef.current.forEach((p) => {
        if (cursorFollow && progress < 0.1) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const attractionRadius = 250;
          
          if (dist < attractionRadius && dist > 0) {
            const force = (attractionRadius - dist) / attractionRadius;
            p.vx += (dx / dist) * force * 0.5;
            p.vy += (dy / dist) * force * 0.5;
          }
        } else {
          const dx = center.x - p.x;
          const dy = center.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (progress > 0.1) {
            p.vx += (dx / dist) * funnelStrength;
            p.vy += (dy / dist) * funnelStrength;
          }
        }

        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (1 - progress * 0.5);
        ctx.fill();
      });

      if (progress > 0.2 && !cursorFollow) {
        const gradient = ctx.createRadialGradient(
          center.x, center.y, 0,
          center.x, center.y, 150 * progress
        );
        gradient.addColorStop(0, `rgba(255, 153, 0, ${progress * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 153, 0, 0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress, cursorFollow, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className={cursorFollow ? "absolute inset-0 pointer-events-none z-0" : "fixed inset-0 pointer-events-none z-0"}
      style={cursorFollow ? { opacity: 0.7 } : { background: '#050505' }}
    />
  );
}