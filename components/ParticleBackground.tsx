"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: "circle" | "triangle" | "square" | "star";
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const COLORS = [
  "#00f5d4",
  "#f72585",
  "#80ff72",
  "#fee440",
  "#9b5de5",
  "#4cc9f0",
  "#ff6b35",
  "#FD79A8",
];

const SHAPES: Particle["shape"][] = ["circle", "triangle", "square", "star"];

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -(Math.random() * 0.8 + 0.3),
    size: Math.random() * 6 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.04,
    opacity: Math.random() * 0.5 + 0.2,
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;

  switch (p.shape) {
    case "circle":
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "square":
      ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
      break;
    case "triangle":
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.lineTo(-p.size, p.size);
      ctx.lineTo(p.size, p.size);
      ctx.closePath();
      ctx.fill();
      break;
    case "star":
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const method = i === 0 ? "moveTo" : "lineTo";
        ctx[method](Math.cos(angle) * p.size, Math.sin(angle) * p.size);
      }
      ctx.closePath();
      ctx.fill();
      break;
  }

  ctx.restore();
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(canvas.width, canvas.height)
    );

    const REPEL_RADIUS = 120;
    const REPEL_STRENGTH = 2.5;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;

      for (const p of particlesRef.current) {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        p.vx *= 0.98;
        p.vy *= 0.98;

        // Add base upward drift
        p.vy -= 0.01;

        // Wrap around screen
        if (p.y < -p.size * 2) {
          p.y = canvas.height + p.size * 2;
          p.x = Math.random() * canvas.width;
        }
        if (p.y > canvas.height + p.size * 2) {
          p.y = -p.size * 2;
        }
        if (p.x < -p.size * 2) {
          p.x = canvas.width + p.size * 2;
        }
        if (p.x > canvas.width + p.size * 2) {
          p.x = -p.size * 2;
        }

        drawParticle(ctx, p);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}
