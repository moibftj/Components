import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SparklesBackground from "./SparklesBackground";

interface ShinyTextProps {
  text?: string;
  fontSize?: number;
  shineIntensity?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text = "Shiny Text",
  fontSize = 64,
  shineIntensity = 0.8,
  className = "",
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Calculate gradient angle based on mouse position
  const calculateGradientAngle = () => {
    if (!containerRef.current) return 45;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angleRad = Math.atan2(
      mousePosition.y - centerY,
      mousePosition.x - centerX,
    );
    return (angleRad * 180) / Math.PI + 90;
  };

  const gradientAngle = calculateGradientAngle();
  const shineOpacity = Math.min(1, Math.max(0.3, shineIntensity));

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{
        background: "#111",
        width: "100%",
        height: "100%",
        minHeight: "200px",
      }}
    >
      <SparklesBackground mousePosition={mousePosition} />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.h1
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: "bold",
            background: `linear-gradient(${gradientAngle}deg, rgba(255,165,0,0.9), rgba(255,140,0,${shineOpacity}), rgba(192,192,192,${shineOpacity}), rgba(255,165,0,0.8))`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            textShadow: "0 0 10px rgba(255,255,255,0.3)",
            padding: "20px",
            userSelect: "none",
          }}
          animate={{
            backgroundPosition: [`0% 0%`, `100% 100%`],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {text}
        </motion.h1>
      </div>
    </div>
  );
};

export default ShinyText;
