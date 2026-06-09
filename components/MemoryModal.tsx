"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Memory } from "@/data/memories";

interface MemoryModalProps {
  memory: Memory | null;
  onClose: () => void;
}

export default function MemoryModal({ memory, onClose }: MemoryModalProps) {
  const [imgError, setImgError] = useState(false);

  // Reset image error state when memory changes
  useEffect(() => {
    setImgError(false);
  }, [memory?.id]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (memory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [memory]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            layoutId={`polaroid-${memory.id}`}
            onClick={(e) => e.stopPropagation()}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <button className="modal__close" onClick={onClose} aria-label="Close modal">
              ✕
            </button>

            <div className="modal__image-wrapper">
              {!imgError ? (
                <img
                  className="modal__image"
                  src={memory.imagePath}
                  alt={memory.title}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="modal__placeholder"
                  style={{ background: memory.backgroundColor }}
                >
                  📸 #{memory.id}
                </div>
              )}
            </div>

            <div className="modal__body">
              <span
                className="modal__era-tag"
                style={{ background: memory.backgroundColor }}
              >
                {memory.era}
              </span>

              <h2 className="modal__title">{memory.title}</h2>

              <p className="modal__description">{memory.description}</p>

              <div
                className="modal__joke-section"
                style={{ borderColor: memory.backgroundColor }}
              >
                <div
                  className="modal__joke-label"
                  style={{ color: memory.backgroundColor }}
                >
                  🔒 Inside Joke Archive
                </div>
                <p className="modal__joke-text">{memory.insideJoke}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
