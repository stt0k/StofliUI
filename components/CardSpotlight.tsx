'use client';
import React, { useRef, useState } from 'react';

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
      className='relative flex min-h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-500/20 bg-gradient-to-b from-gray-50 dark:from-zinc-950 from-5% to-[#17c96408] p-6 shadow-sm'
    >
      <div
        className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(23,201,100,.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

export default CardSpotlight;

