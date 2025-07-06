import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  fontSize: number;
  shineIntensity: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, fontSize, shineIntensity }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const textElement = textRef.current;
    if (textElement) {
      textElement.addEventListener('mousemove', handleMouseMove);
      return () => textElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    // Generate sparkles
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setSparkles(newSparkles);
  }, []);

  const shineStyle = {
    background: `linear-gradient(
      ${Math.atan2(mousePosition.y - 50, mousePosition.x - 50) * 180 / Math.PI + 90}deg,
      transparent 0%,
      rgba(255, 255, 255, ${shineIntensity * 0.3}) 45%,
      rgba(255, 255, 255, ${shineIntensity}) 50%,
      rgba(255, 255, 255, ${shineIntensity * 0.3}) 55%,
      transparent 100%
    )`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
  };

  const baseTextStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Text Container */}
      <div
        ref={textRef}
        className="relative cursor-pointer select-none"
        style={{ fontSize: `${fontSize}px` }}
      >
        {/* Base Text */}
        <div
          className="font-bold tracking-tight"
          style={baseTextStyle}
        >
          {text}
        </div>

        {/* Shine Overlay */}
        <div
          className="absolute inset-0 font-bold tracking-tight pointer-events-none"
          style={shineStyle}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ShinyText;