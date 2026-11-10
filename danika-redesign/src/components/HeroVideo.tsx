'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const ID = 'hero-video';

/** Silent, looping background video. People who prefer reduced motion get the still poster instead. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // React does not reliably set the muted attribute; autoplay needs it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); return; }
    v.play().catch(() => { /* autoplay blocked (e.g. low-power mode): the poster stays visible */ });
  }, []);

  return (
    <video
      ref={ref}
      id={ID}
      className="absolute inset-0 h-full w-full object-cover object-center"
      autoPlay muted loop playsInline preload="auto" aria-hidden tabIndex={-1}
      poster="/videos/home-hero-poster.jpg"
    >
      <source src="/videos/home-hero.mp4" type="video/mp4" />
    </video>
  );
}

/** Pause / play control for the background video (moving content that runs longer than 5 seconds needs one). */
export function HeroVideoToggle({ className = '' }: { className?: string }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = document.getElementById(ID) as HTMLVideoElement | null;
    if (!v) return;
    const sync = () => setPlaying(!v.paused);
    sync();
    v.addEventListener('play', sync);
    v.addEventListener('pause', sync);
    return () => { v.removeEventListener('play', sync); v.removeEventListener('pause', sync); };
  }, []);

  const toggle = () => {
    const v = document.getElementById(ID) as HTMLVideoElement | null;
    if (!v) return;
    if (v.paused) v.play().catch(() => {}); else v.pause();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Pause background video' : 'Play background video'}
      className={`grid h-11 w-11 place-items-center rounded-btn border border-white/40 bg-brand-950/60 text-white backdrop-blur-sm transition-colors hover:bg-brand-950/85 ${className}`}
    >
      {playing ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
    </button>
  );
}
