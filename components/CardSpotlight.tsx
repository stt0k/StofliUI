"use client";
import type React from "react";
import { useRef, useState } from "react";

interface CardSpotlightProps {
  children: React.ReactNode;
}

const CardSpotlight: React.FC<CardSpotlightProps> = ({ children }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-40 items-center justify-center overflow-hidden rounded-lg border border-[#00D1FF]/60 dark:border-[#00D1FF]/30 bg-white/50 dark:bg-black/60 p-6 shadow-[0_0_20px_rgba(0,209,255,0.3)] dark:shadow-none backdrop-blur-sm"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 209, 255, 0.3), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/10 via-[#FF8C33]/5 to-[#FF5733]/10 dark:from-transparent dark:via-transparent dark:to-transparent pointer-events-none"></div>
      {children}
    </div>
  );
};

export default CardSpotlight;
