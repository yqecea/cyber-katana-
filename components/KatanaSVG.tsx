import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface KatanaSVGProps {
  progress: number;
  mouse: { x: number; y: number };
}

export const KatanaSVG: React.FC<KatanaSVGProps> = ({ progress, mouse }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const bladeRef = useRef<SVGPathElement>(null);
  const hamonRef = useRef<SVGPathElement>(null);
  const handleRef = useRef<SVGGElement>(null);
  const guardRef = useRef<SVGGElement>(null);
  const habakiRef = useRef<SVGPathElement>(null);
  const tangRef = useRef<SVGPathElement>(null);
  const sheathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGGElement>(null);

  // Parallax intensity
  const pX = (mouse.x - 0.5) * 40;
  const pY = (mouse.y - 0.5) * 40;

  // Deconstruction Logic based on scroll progress (0 to 1)
  // 0.0 - 0.2: Assemble / Idle
  // 0.2 - 0.5: Unsheathe
  // 0.5 - 0.8: Explode / Deconstruct
  // 0.8 - 1.0: Wireframe

  const bladeX = progress > 0.2 ? (progress - 0.2) * 800 : 0;
  const handleX = progress > 0.4 ? -(progress - 0.4) * 400 : 0;
  const guardZ = progress > 0.4 ? (progress - 0.4) * 100 : 0; // Fake Z via scale/shadow
  const rotation = progress * 15 + (mouse.y - 0.5) * 10;
  
  // Opacity for internal tang (visible only when handle moves)
  const tangOpacity = Math.max(0, Math.min(1, (progress - 0.4) * 5));

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 1200 400"
      className="w-full h-full overflow-visible pointer-events-none"
      style={{
        transform: `perspective(1000px) rotateY(${pX * 0.5}deg) rotateX(${-pY * 0.5}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <defs>
        <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#888" />
          <stop offset="50%" stopColor="#eee" />
          <stop offset="100%" stopColor="#aaa" />
        </linearGradient>
        <linearGradient id="bladeShine" x1="0%" y1="0%" x2="100%" y2="10%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="60%" stopColor="transparent" />
        </linearGradient>
        <pattern id="handlePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
           <rect width="20" height="20" fill="#111" />
           <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="#222" stroke="#333" strokeWidth="1"/>
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="chromatic">
           <feOffset in="SourceGraphic" dx="2" dy="0" result="red"/>
           <feOffset in="SourceGraphic" dx="-2" dy="0" result="blue"/>
           <feBlend mode="screen" in="red" in2="blue"/>
        </filter>
      </defs>

      {/* Main Group Centered */}
      <g transform={`translate(100, 150) rotate(${5 + rotation} 400 50)`}>
        
        {/* SHEATH (Saya) - Moves left/fades */}
        <path
            ref={sheathRef}
            d="M200,-5 Q600,-35 900,-5 L905,25 Q600,0 200,25 Z"
            fill="#111"
            stroke="#333"
            strokeWidth="2"
            transform={`translate(${-bladeX * 0.2 - 20}, 0)`}
            opacity={1 - progress * 2}
        />

        {/* TANG (Nakago) - The internal steel, usually hidden */}
        <path
          ref={tangRef}
          d="M200,5 L100,10 L100,30 L200,35 Z"
          fill="#444"
          stroke="#ff0055"
          strokeWidth="1"
          opacity={tangOpacity}
          transform={`translate(${bladeX}, 0)`}
        />

        {/* BLADE (Katana) */}
        <g transform={`translate(${bladeX}, 0)`}>
          {/* Main Steel */}
          <path
            ref={bladeRef}
            d="M200,0 Q600,-30 1000,0 L1020,10 L1000,20 Q600,0 200,40 Z"
            fill="url(#bladeGradient)"
            stroke="#ccc"
            strokeWidth="1"
          />
          {/* Hamon (Temper Line) */}
          <path
            ref={hamonRef}
            d="M210,30 Q600,-5 980,15 L970,18 Q600,2 210,38 Z"
            fill="#ddd"
            opacity="0.5"
            filter="url(#glow)"
          />
          {/* Shine Effect */}
          <path
             d="M200,5 Q600,-25 1000,5 L1000,10 Q600,-15 200,15 Z"
             fill="url(#bladeShine)"
             opacity="0.3"
             style={{ mixBlendMode: 'overlay' }}
          />
        </g>

        {/* HABAKI (Blade Collar) */}
        <path
          ref={habakiRef}
          d="M200,0 L220,0 L220,40 L200,40 Z"
          fill="#b8860b" // Gold/Brass
          transform={`translate(${bladeX}, 0)`}
        />

        {/* TSUBA (Guard) */}
        <g 
            ref={guardRef} 
            transform={`translate(${190 + handleX * 0.1}, 20) scale(${1 + guardZ * 0.005})`}
        >
             {/* The Guard Shape */}
            <circle cx="0" cy="0" r="45" fill="#000" stroke="#ff0055" strokeWidth="2" />
            <circle cx="0" cy="0" r="35" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="5,5"/>
            {/* Decorative holes */}
            <circle cx="-20" cy="-20" r="5" fill="#000" stroke="#ff0055"/>
            <circle cx="20" cy="20" r="5" fill="#000" stroke="#ff0055"/>
        </g>

        {/* TSUKA (Handle) */}
        <g ref={handleRef} transform={`translate(${handleX}, 0)`}>
            {/* Base Handle */}
            <rect x="0" y="5" width="190" height="30" fill="url(#handlePattern)" />
            {/* End Cap (Kashira) */}
            <path d="M0,5 L-10,0 L-10,40 L0,35 Z" fill="#000" stroke="#555" />
            {/* Menuki (Ornament under wrap) */}
            <circle cx="100" cy="20" r="5" fill="#d4af37" opacity="0.8" />
        </g>

        {/* Energy Particles (Simulated) */}
        {progress > 0.6 && (
          <g ref={glowRef} filter="url(#glow)">
             {[...Array(10)].map((_, i) => (
               <circle 
                key={i}
                cx={200 + bladeX + Math.sin(i + Date.now()/1000) * 800} 
                cy={20 + Math.cos(i * 13) * 50} 
                r={Math.random() * 2 + 1} 
                fill="#bd00ff"
                opacity={Math.random()} 
               />
             ))}
          </g>
        )}
      </g>
    </svg>
  );
};
