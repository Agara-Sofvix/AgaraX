'use client';

import { motion } from "motion/react";
import { 
  Cpu, 
  Cloud, 
  Database, 
  Globe, 
  Zap, 
  Smartphone 
} from "lucide-react";

/**
 * A dot that stays visible at the start of its path and only animates
 * its position when its "turn" comes in the sequence.
 */
const SectionDot = ({ 
  path, 
  delay, 
  totalDuration, 
  travelTime 
}: { 
  path: string, 
  delay: number, 
  totalDuration: number, 
  travelTime: number 
}) => {
  return (
    <motion.circle
      r="4"
      fill="#4F46E5"
      filter="url(#glow)"
      initial={{ offsetDistance: "0%", opacity: 0.4 }}
      animate={{ 
        offsetDistance: ["0%", "100%", "100%", "100%"],
        opacity: [0.4, 1, 1, 0.4] 
      }}
      transition={{
        duration: totalDuration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, travelTime / totalDuration, (travelTime + 0.1) / totalDuration, 1]
      }}
      style={{ 
        offsetPath: `path('${path}')`,
        stroke: "white",
        strokeWidth: 1,
        willChange: "transform, opacity"
      }}
    />
  );
};

const Node = ({ 
  x, 
  y, 
  icon: Icon, 
  label, 
  labelPos = "bottom",
  offsetX = 0,
  offsetY = 0,
  color = "#4F46E5" 
}: { 
  x: number, 
  y: number, 
  icon: any, 
  label: string, 
  labelPos?: "top" | "bottom" | "left" | "right",
  offsetX?: number,
  offsetY?: number,
  color?: string 
}) => {
  let lx = x + offsetX;
  let ly = y + offsetY;

  if (labelPos === "top") ly -= 70;
  else if (labelPos === "bottom") ly += 75;
  else if (labelPos === "left") lx -= 85;
  else if (labelPos === "right") lx += 85;

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <circle 
        cx={x} 
        cy={y} 
        r="40" 
        fill="white" 
        stroke={`${color}40`} 
        strokeWidth="1.5" 
        className="shadow-xl" 
      />
      <circle 
        cx={x} 
        cy={y} 
        r="28" 
        fill={`${color}15`} 
      />
      
      <foreignObject x={x - 12} y={y - 12} width="24" height="24">
        <div className="flex items-center justify-center w-full h-full" style={{ color }}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </foreignObject>
      
    </motion.g>
  );
};

export function LivingDiagram() {
  // Static visual lines for all sections
  const sections = [
    { label: "AI Intelligence", path: "M 250 150 L 100 150" },
    { label: "Cloud Scale", path: "M 250 150 L 250 50" },
    { label: "User Platform", path: "M 250 150 L 400 150" },
    { label: "System Data", path: "M 250 150 L 250 250" },
    { label: "Global Delivery", path: "M 250 150 L 400 250" },
  ];

  const travelTime = 1.2; 
  const totalDuration = sections.length * travelTime;

  return (
    <div className="relative w-full aspect-square md:aspect-video lg:aspect-square flex items-center justify-center p-4">
      <svg 
        viewBox="0 0 500 350" 
        className="w-full h-full max-w-[900px] overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Static Background Lines */}
        <g stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
          {sections.map((s, i) => (
            <path key={i} d={s.path} opacity="0.4" />
          ))}
        </g>

        {/* Sequenced Flow Dots */}
        {sections.map((s, i) => (
          <SectionDot 
            key={i} 
            path={s.path} 
            delay={i * travelTime} 
            totalDuration={totalDuration} 
            travelTime={travelTime} 
          />
        ))}

        {/* Center Hub - Growth Engine label moved further to clear paths */}
        <Node x={250} y={150} icon={Zap} label="Growth Engine" labelPos="bottom" offsetY={20} color="#4F46E5" />
        
        {/* Top - Cloud Scale cleared */}
        <Node x={250} y={50} icon={Cloud} label="Cloud Scale" labelPos="top" />
        
        {/* Sides - Moved further out to clear the intersections in the screenshot */}
        <Node x={100} y={150} icon={Cpu} label="AI Intelligence" labelPos="left" />
        <Node x={400} y={150} icon={Smartphone} label="User Platform" labelPos="right" />
        
        {/* Bottom Nodes */}
        <Node x={250} y={250} icon={Database} label="System Data" labelPos="bottom" />
        <Node x={400} y={250} icon={Globe} label="Global Delivery" labelPos="bottom" />
      </svg>
    </div>
  );
}
