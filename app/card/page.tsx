"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./card.css";

// ─── Petal Background Canvas ───
function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
      color: string;
    }

    const colors = [
      "rgba(232, 180, 248, 0.4)",
      "rgba(248, 164, 200, 0.3)",
      "rgba(212, 168, 248, 0.35)",
      "rgba(248, 200, 220, 0.25)",
      "rgba(200, 160, 240, 0.3)",
    ];

    const petals: Petal[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: Math.sin(Math.random() * Math.PI) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId: number;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Draw a petal/ellipse shape
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        drawPetal(p);
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="petal-canvas" aria-hidden="true" />;
}

// ─── Sparkle on Mouse Move ───
function SparkleTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSparkle = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSparkle.current < 60) return;
      lastSparkle.current = now;

      const container = containerRef.current;
      if (!container) return;

      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.textContent = ["✦", "✧", "·", "♡", "˚"][
        Math.floor(Math.random() * 5)
      ];
      sparkle.style.left = `${e.clientX - 6}px`;
      sparkle.style.top = `${e.clientY - 6}px`;
      sparkle.style.fontSize = `${Math.random() * 14 + 8}px`;
      sparkle.style.color = [
        "#e8b4f8",
        "#f8a4c8",
        "#d4a8f8",
        "#f0d0e8",
        "#c8a0f0",
      ][Math.floor(Math.random() * 5)];

      container.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={containerRef} className="sparkle-container" />;
}

// ─── Floating Hearts ───
function FloatingHearts() {
  const hearts = ["💜", "💗", "💖", "🤍", "💕", "🩷", "🩵", "✨"];

  return (
    <div className="floating-hearts" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 12}s`,
            animationDelay: `${Math.random() * 10}s`,
            fontSize: `${Math.random() * 1 + 0.8}rem`,
          }}
        >
          {hearts[i % hearts.length]}
        </div>
      ))}
    </div>
  );
}

// ─── Card Audio Player ───
function CardAudioPlayer({ isPlaying }: { isPlaying: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [internalPlaying, setInternalPlaying] = useState(false);

  // Sync with card open/close
  useEffect(() => {
    setInternalPlaying(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (internalPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [internalPlaying]);

  const togglePlay = () => setInternalPlaying(!internalPlaying);

  return (
    <div 
      className={`retro-disc-player ${internalPlaying ? "is-playing" : ""}`}
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      aria-label={internalPlaying ? "Pause music" : "Play music"}
    >
      <audio ref={audioRef} src="/audio/wohdin.mp3" loop preload="auto" />
      <div className="retro-disc">
        <div className="retro-disc-inner">
          <div className="retro-disc-center" />
        </div>
      </div>
      <div className="retro-disc-arm" />
      
      <div className="retro-disc-btn">
        {internalPlaying ? "⏸" : "▶"}
      </div>
    </div>
  );
}

// ─── Magical Flies ───
function MagicalFlies() {
  return (
    <div className="magical-flies-container">
      {[...Array(5)].map((_, i) => (
        <div key={`star-${i}`} className={`shooting-star star-${i}`} />
      ))}
      {[...Array(10)].map((_, i) => (
        <div key={`fly-${i}`} className={`firefly firefly-${i}`} />
      ))}
    </div>
  );
}

// ─── Main Card Page Component ───
export default function BirthdayCardPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card-page">
      <CardAudioPlayer isPlaying={isOpen} />
      <MagicalFlies />
      <PetalCanvas />
      <FloatingHearts />
      <SparkleTrail />

      {/* Back Button */}
      <Link href="/" className="card-back-btn" id="back-to-home">
        ← Back to Chaos
      </Link>

      <div className="card-container">
        {/* Envelope Header */}
        <motion.div
          className="envelope-section"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="envelope-icon"
            animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            💌
          </motion.div>
          <h1 className="envelope-title">A Letter For You</h1>
          <p className="envelope-subtitle">from someone who loves you endlessly</p>
        </motion.div>

        {/* 3D Flip Card */}
        <motion.div
          className="card-3d-wrapper"
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <div
            className={`card-3d ${isOpen ? "is-open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={0}
            aria-label={isOpen ? "Close birthday card" : "Open birthday card"}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
            }}
          >
            {/* Front */}
            <div className="card-face card-front">
              <div className="card-front__decoration" />
              <div className="card-front__flowers-top">🌸 🌷 🌺 🌸 🌷</div>
              <h2 className="card-front__title">
                Happy Birthday
                <br />
                Himadri ♡
              </h2>
              <p className="card-front__for">— my sister from another mister —</p>
              <span className="card-front__tap">tap to open ✦</span>
              <div className="card-front__flowers-bottom">🌷 🌸 🌺 🌷 🌸</div>
            </div>

            {/* Back (Inside) */}
            <div className="card-face card-back">
              <div className="card-back__header">
                <div className="card-back__dear">Dearest Himadri,</div>
                <div className="card-back__hearts">💜 🤍 💗 🤍 💜</div>
              </div>

              <div 
                className="card-back__message"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              >
                <p>
                  happy birthday himadri aaj ka din utna hi special hai jitni tu meri life mein hai sach kahu toh tujh jaisi dost milna kismat ki baat hai aur main sach mein lucky hu ki tu mere sath hai tu kitni amazing aur pyari hai ye tujhe khud bhi nahi pata hoga ✨❤️
                </p>
                <p>
                  tu sach mein ek bohot khoobsurat insaan hai andar se bhi aur bahar se bhi himadri aur tu life mein har wo khushi deserve karti hai jo tu chahti hai 🌟 main hamesha tere sath khada hu chahe scooty ke brake fail ho ya life ke tera ye life saver hamesha duty pe rahega 🦸‍♂️
                </p>
                <p>
                  chal ab zyada rona mat aur wo aasu poch le kyuki aaj tera din hai aur tujhe bohot saari khushiyan manani hain 🎉 hamesha aise hi muskurati reh kyu ki teri smile bohot pyari lagti hai jaldi mil aur meri treat ready rakhna love you pagli happy birthday once again ❤️🎂 (and maine abhi tk dhang se daru nhi pee h so yeah i mean waiting for it)
                </p>
              </div>

              <div className="card-back__sign-off">
                <div className="card-back__subheader">
                  From someone who loves you endlessly
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Emotional Sections */}
        <motion.div
          className="card-sections"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Section 1 */}
          <motion.div
            className="card-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="card-section__icon">🦸‍♂️</span>
            <h3 className="card-section__title">Your Permanent Life Saver</h3>
            <div className="card-section__text">
              <p>
                Whether it&apos;s a terrifying moment on a scooty with no brakes or just the everyday chaos of life trying to knock you down, I want you to remember that I will always be there to catch you. 
              </p>
              <p>
                I&apos;ve literally saved you once, and I&apos;ll spend the rest of our lives making sure you never have to face a single scary moment alone. Consider me forever on duty.
              </p>
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            className="card-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <span className="card-section__icon">🫂</span>
            <h3 className="card-section__title">My Safe Space In The Storm</h3>
            <div className="card-section__text">
              <p>
                We&apos;ve seen each other through the heaviest days and the most exhausting, confusing phases. When the world got too loud and our hearts took a beating, we became each other&apos;s quiet refuge.
              </p>
              <p>
                You gave me immense strength when I felt like I had none, and we learned how to just sit with our sadness together until it disappeared. You are the strongest, bravest person I know.
              </p>
            </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            className="card-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="card-section__icon">🚌</span>
            <h3 className="card-section__title">The Comfort of Simply Being With You</h3>
            <div className="card-section__text">
              <p>
                It&apos;s never just been about the long bus rides across states or the late-night movies—it&apos;s about how you have this beautiful ability to make the longest, most exhausting journeys feel exactly like home.
              </p>
              <p>
                With you, endless hours turn into fleeting seconds. Those simple, quiet nights filled with non-stop talking are some of the most precious moments of my life. I wouldn&apos;t trade them for the world.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Wish Button removed */}

        {/* Footer */}
        <div className="card-footer">
          <motion.p
            className="card-footer__text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            made with all the love in the world 💜
          </motion.p>
        </div>
      </div>
    </div>
  );
}
