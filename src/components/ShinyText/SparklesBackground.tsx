import React, { useEffect, useRef, useState } from "react";
import { Label } from "./../ui/label";
import { Input } from "./../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./../ui/select";
import { Button } from "./../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./../ui/card";
import { motion } from "framer-motion";

interface SparkleProps {
  size: number;
  color: string;
  style: React.CSSProperties;
}

interface SparklesBackgroundProps {
  density?: number;
  speed?: number;
  sparkleSize?: number;
  colors?: string[];
  className?: string;
  children?: React.ReactNode;
}

const Sparkle: React.FC<SparkleProps> = ({ size, color, style }) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${size / 2}px ${color}`,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 2 + 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  );
};

const SparklesBackground: React.FC<SparklesBackgroundProps> = ({
  density = 50,
  speed = 1,
  sparkleSize = 4,
  colors = ["#FFD700", "#FFC0CB", "#87CEFA", "#7FFFD4", "#FFFFFF"],
  className = "",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number; size: number; color: string }>
  >([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Generate initial sparkles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const newSparkles = [];
    const baseCount = density;

    for (let i = 0; i < baseCount; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * sparkleSize + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setSparkles(newSparkles);
  }, [dimensions, density, sparkleSize, colors]);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Add extra sparkles around cursor when hovering
  useEffect(() => {
    if (!isHovering || dimensions.width === 0) return;

    const cursorSparkles = [];
    const cursorSparkleCount = 10;
    const cursorRadius = 100;

    for (let i = 0; i < cursorSparkleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * cursorRadius;

      cursorSparkles.push({
        id: sparkles.length + i,
        x: mousePosition.x + Math.cos(angle) * distance,
        y: mousePosition.y + Math.sin(angle) * distance,
        size: Math.random() * sparkleSize + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setSparkles((prev) => [...prev.slice(0, density), ...cursorSparkles]);

    const timeout = setTimeout(() => {
      setSparkles((prev) => prev.slice(0, density));
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    mousePosition,
    isHovering,
    dimensions.width,
    sparkleSize,
    colors,
    density,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gradient-to-br from-gray-900 to-black ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          size={sparkle.size}
          color={sparkle.color}
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            animationDuration: `${(Math.random() * 3 + 2) / speed}s`,
          }}
        />
      ))}
      {children}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SparklesBackground;
