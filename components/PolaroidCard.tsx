"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Memory } from "@/data/memories";

interface PolaroidCardProps {
  memory: Memory;
  index: number;
  onClick: () => void;
}

export default function PolaroidCard({ memory, index, onClick }: PolaroidCardProps) {
  const [imgError, setImgError] = useState(false);

  // Generate a stable random rotation between -8 and +8 degrees based on id
  const seed = memory.id * 7 + 3;
  const rotation = ((seed * 9301 + 49297) % 233280) / 233280 * 16 - 8;

  return (
    <motion.div
      className="polaroid"
      layoutId={`polaroid-${memory.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 60, rotate: rotation }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{
        rotate: 0,
        scale: 1.05,
        zIndex: 20,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.68, -0.55, 0.265, 1.55],
      }}
    >
      <div className="polaroid__inner">
        <div className="polaroid__image-wrapper">
          <span className="polaroid__number">{memory.id}</span>
          <span className="polaroid__era">{memory.era}</span>
          {!imgError ? (
            <img
              className="polaroid__image"
              src={memory.imagePath}
              alt={memory.title}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="polaroid__placeholder"
              style={{ background: memory.backgroundColor }}
            >
              {memory.id}
            </div>
          )}
        </div>

        <div className="polaroid__content">
          <h3 className="polaroid__title">{memory.title}</h3>
          <p className="polaroid__description">{memory.description}</p>
        </div>

        <div
          className="polaroid__accent"
          style={{ background: memory.backgroundColor }}
        />
      </div>
    </motion.div>
  );
}
