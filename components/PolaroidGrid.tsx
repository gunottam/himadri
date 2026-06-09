"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import Link from "next/link";
import memories from "@/data/memories";
import type { Memory } from "@/data/memories";
import PolaroidCard from "./PolaroidCard";
import MemoryModal from "./MemoryModal";

export default function PolaroidGrid() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <section id="memories-section">
      <h2 className="section-title">The Sacred Wall</h2>

      <LayoutGroup>
        <div className="polaroid-grid">
          {memories.map((memory, index) => (
            <PolaroidCard
              key={memory.id}
              memory={memory}
              index={index}
              onClick={() => setSelectedMemory(memory)}
            />
          ))}
        </div>

        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      </LayoutGroup>

      {/* Card CTA — below the photo grid */}
      <motion.div
        className="grid-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <Link href="/card" className="header__card-btn" id="open-card-btn">
          <motion.span
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: "inline-block" }}
          >
            💌 Open Your Birthday Card
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
