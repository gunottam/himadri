"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeScreenProps {
  onEnter: () => void;
  isVisible: boolean;
}

export default function WelcomeScreen({ onEnter, isVisible }: WelcomeScreenProps) {
  const [step, setStep] = useState(0);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="welcome-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="welcome-content">
            {/* Floating decorative emojis */}
            <motion.div
              className="welcome-deco"
              animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              🎂
            </motion.div>

            <motion.h1
              className="welcome-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              You&apos;ve Got a
              <br />
              <span className="welcome-title--accent">Surprise</span>
            </motion.h1>

            <motion.p
              className="welcome-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Someone made this just for you. 💜
            </motion.p>

            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div
                  key="step0"
                  className="welcome-instructions"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="welcome-instructions__title">Part 1: The Chaos 📸</div>
                  <ul className="welcome-instructions__list">
                    <li>🖥️ Best experienced on a <strong>laptop or desktop</strong></li>
                    <li>👆 <strong>Click on polaroids</strong> to read the full story</li>
                    <li>🖱️ <strong>Hover over things</strong> — everything is interactive</li>
                    <li>🔊 <strong>Turn up your volume!</strong></li>
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="step1"
                  className="welcome-instructions"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="welcome-instructions__title">Part 2: The Letter 💌</div>
                  <ul className="welcome-instructions__list">
                    <li>📜 <strong>Scroll all the way down</strong> for a special surprise</li>
                    <li>💌 <strong>Click the card</strong> to flip it open</li>
                    <li>✨ <strong>Hover over the letter text</strong> to see the magical glow</li>
                    <li>🎧 A special song will play automatically</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              className="welcome-enter-btn"
              onClick={() => {
                if (step === 0) setStep(1);
                else onEnter();
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              id="enter-btn"
            >
              {step === 0 ? "Next ✨" : "✨ Enter the Chaos ✨"}
            </motion.button>

            <motion.div
              className="welcome-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              made with love & zero sleep 💕
            </motion.div>
          </div>

          {/* Background floating elements */}
          <div className="welcome-bg-elements" aria-hidden="true">
            {["🎉", "🎈", "💖", "✨", "🎊", "💕", "🥳", "🎂", "🌟", "💜"].map((emoji, i) => (
              <motion.span
                key={i}
                className="welcome-bg-emoji"
                style={{
                  left: `${10 + (i * 8.5) % 85}%`,
                  top: `${15 + ((i * 13) % 70)}%`,
                  fontSize: `${1.2 + (i % 3) * 0.6}rem`,
                }}
                animate={{
                  y: [0, -20 - (i % 3) * 10, 0],
                  x: [0, (i % 2 === 0 ? 8 : -8), 0],
                  rotate: [0, (i % 2 === 0 ? 15 : -15), 0],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
