"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const BAR_COUNT = 24;

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export default function AudioPlayer({ autoPlay = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const sourceCreatedRef = useRef(false);
  const animFrameRef = useRef<number>(0);
  const hasAutoPlayedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>(new Array(BAR_COUNT).fill(2));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const setupAnalyser = useCallback(() => {
    if (!audioRef.current || sourceCreatedRef.current) return;

    try {
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;

      const source = audioCtx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      sourceCreatedRef.current = true;
    } catch {
      // Audio setup failed
    }
  }, []);

  useEffect(() => {
    if (autoPlay && audioRef.current && !hasAutoPlayedRef.current) {
      hasAutoPlayedRef.current = true;
      setupAnalyser();
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked/failed, no action needed
        });
    }
  }, [autoPlay, setupAnalyser]);

  const animateBars = useCallback(() => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const newBars: number[] = [];
      const step = Math.floor(dataArrayRef.current.length / BAR_COUNT);
      for (let i = 0; i < BAR_COUNT; i++) {
        const val = dataArrayRef.current[i * step] || 0;
        newBars.push(Math.max(2, (val / 255) * 28));
      }
      setBars(newBars);
    } else if (isPlaying) {
      setBars((prev) =>
        prev.map(() => Math.max(2, Math.random() * 24 + 3))
      );
    }

    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(animateBars);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(animateBars);
    } else {
      cancelAnimationFrame(animFrameRef.current);
      setBars(new Array(BAR_COUNT).fill(2));
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, animateBars]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setupAnalyser();
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(true);
      }
    }
  };

  if (!isClient) return null;

  return (
    <div className={`audio-player ${isPlaying ? "audio-player--playing" : ""}`} id="audio-player">
      <audio ref={audioRef} src="/audio/bgmusic.mp3" loop preload="none" />

      <button
        className="audio-player__toggle"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        id="play-pause-btn"
      >
        <span className="audio-player__icon">
          {isPlaying ? "⏸" : "▶"}
        </span>
      </button>

      <div className="audio-player__visualizer" aria-hidden="true">
        {bars.map((height, i) => (
          <div
            key={i}
            className="audio-player__bar"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
    </div>
  );
}
