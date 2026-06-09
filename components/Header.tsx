"use client";

import { motion } from "framer-motion";

const letterVariants = {
  hidden: { y: -80, opacity: 0, rotate: -15 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      delay: 0.3 + i * 0.05,
      duration: 0.6,
      ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
    },
  }),
};

const title = "HAPPY BIRTHDAY HIMADRI!";

const emojiList = ["🎉", "🎂", "🎈", "💕", "🥳", "✨", "🎊", "💖"];

export default function Header() {
  return (
    <header className="header" id="header">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
      >
        <h1 className="header__title" aria-label={title}>
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      <motion.p
        className="header__subtitle"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        To the most unhinged, irreplaceable, absolute LEGEND of a best friend.
        <br />
        Scroll down to relive every chaotic, beautiful, embarrassing moment we&apos;ve shared. 💀
      </motion.p>

      <motion.div
        className="header__emoji-row"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
      >
        {emojiList.map((emoji, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -10, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </header>
  );
}
