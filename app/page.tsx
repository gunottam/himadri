"use client";

import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";
import PolaroidGrid from "@/components/PolaroidGrid";
import AudioPlayer from "@/components/AudioPlayer";
import WelcomeScreen from "@/components/WelcomeScreen";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      <WelcomeScreen isVisible={!hasEntered} onEnter={() => setHasEntered(true)} />
      <ParticleBackground />
      <main className="main-container">
        <Header />
        <PolaroidGrid />
      </main>
      <AudioPlayer autoPlay={hasEntered} />
    </>
  );
}
