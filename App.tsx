import React, { useEffect, useRef, useState } from 'react';
import { KatanaSVG } from './components/KatanaSVG';
import { Section } from './components/Section';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Audio Refs (Simulated sound logic)
  // In a real app, we'd load Howler.js here.

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Master timeline to track total scroll progress for the WebGL/SVG component
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Smooth scrubbing
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });

    // Animation for Headings (Glitch effect on enter)
    gsap.utils.toArray('.anim-text').forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50, skewX: -20 },
        { 
          opacity: 1, 
          y: 0, 
          skewX: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animation for Tech Specs (Staggered)
    gsap.fromTo('.spec-item',
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '#tech-specs',
          start: "top 70%",
        }
      }
    );

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-neutral-950 text-white min-h-[500vh] relative selection:bg-pink-500 selection:text-white">
      
      {/* FIXED BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* The Generative Katana is Fixed and transforms based on scroll */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[120vw] h-[60vh] md:h-[80vh]">
              <KatanaSVG progress={scrollProgress} mouse={mousePos} />
            </div>
        </div>
        
        {/* Dynamic Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
        <div 
            className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-purple-900/10 blur-[100px] rounded-full mix-blend-screen"
            style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
        ></div>
        <div 
            className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-pink-900/10 blur-[100px] rounded-full mix-blend-screen"
            style={{ transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px)` }}
        ></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      </div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-50 mix-blend-difference">
        <div className="text-xl font-bold font-display tracking-widest text-white">RONIN<span className="text-pink-500">.IO</span></div>
        <div className="hidden md:flex gap-8 font-mono text-xs tracking-widest text-neutral-400">
           {['FRAMEWORK', 'SENSORS', 'INTELLIGENCE', 'DEPLOY'].map(item => (
             <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-pink-500 transition-colors cursor-pointer">[ {item} ]</a>
           ))}
        </div>
        <button className="border border-white/20 px-6 py-2 font-mono text-xs hover:bg-white hover:text-black transition-all">
          GET ACCESS
        </button>
      </nav>

      {/* SECTION 1: HERO */}
      <Section id="home" className="h-screen" align="center">
        <div className="relative z-10 flex flex-col items-center">
          <p className="font-mono text-pink-500 tracking-[0.5em] mb-4 text-xs md:text-sm animate-pulse">
            SYSTEM_ONLINE // V.4.0.2
          </p>
          <h1 className="text-6xl md:text-9xl font-display font-bold leading-tight mix-blend-overlay opacity-90 glitch-text" data-text="PRECISION">
            PRECISION
          </h1>
          <h1 className="text-6xl md:text-9xl font-display font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 glitch-text" data-text="REDEFINED">
            REDEFINED
          </h1>
          <p className="mt-8 max-w-lg text-neutral-400 font-mono text-sm md:text-base leading-relaxed">
            The world's first AI-driven cybersecurity blade. Sharp enough to sever connections, smart enough to heal them.
          </p>
          
          <div className="mt-12 flex flex-col items-center">
             <div className="w-[1px] h-20 bg-gradient-to-b from-pink-500 to-transparent"></div>
             <span className="text-[10px] font-mono mt-2 text-pink-500">SCROLL TO UNSHEATHE</span>
          </div>
        </div>
      </Section>

      {/* SECTION 2: THE EDGE (Left Align) */}
      <Section id="framework" align="left">
        <div className="max-w-2xl anim-text">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="text-pink-500 block text-2xl font-mono mb-2">01 // THE EDGE</span>
            NANO-LATENCY <br/> EXECUTION
          </h2>
          <p className="text-lg text-neutral-300 font-light border-l-2 border-pink-500 pl-6 mb-8">
            Traditional security lags. RONIN strikes before the threat materializes. 
            Our predictive engine operates at the kernel level, slicing through latency with O(1) complexity.
          </p>
          <div className="grid grid-cols-2 gap-4 font-mono text-xs text-neutral-500">
             <div className="border border-white/10 p-4 hover:border-pink-500/50 transition-colors">
               <span className="block text-white text-xl mb-1">0.02ms</span>
               RESPONSE TIME
             </div>
             <div className="border border-white/10 p-4 hover:border-pink-500/50 transition-colors">
               <span className="block text-white text-xl mb-1">99.9%</span>
               THREAT ELIMINATION
             </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3: THE CORE (Right Align) */}
      <Section id="sensors" align="right">
        <div className="max-w-2xl anim-text ml-auto">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-right">
            <span className="text-purple-500 block text-2xl font-mono mb-2">02 // THE CORE</span>
            FORGED IN <br/> THE VOID
          </h2>
          <p className="text-lg text-neutral-300 font-light border-r-2 border-purple-500 pr-6 mb-8 text-right">
            Beneath the elegant interface lies a monster. A distributed ledger of threat vectors, 
            immutable and constantly sharpening itself against the dark web's noise.
          </p>
          <ul className="flex flex-col items-end gap-2 font-mono text-sm text-neutral-400">
             <li className="flex items-center gap-2">
                QUANTUM RESISTANT ENCRYPTION <div className="w-2 h-2 bg-purple-500"></div>
             </li>
             <li className="flex items-center gap-2">
                SELF-HEALING CLUSTER NODES <div className="w-2 h-2 bg-purple-500"></div>
             </li>
             <li className="flex items-center gap-2">
                ADAPTIVE POLYMORPHIC CODE <div className="w-2 h-2 bg-purple-500"></div>
             </li>
          </ul>
        </div>
      </Section>

      {/* SECTION 4: DECONSTRUCTION (Centered Tech Specs) */}
      <Section id="intelligence" className="bg-black/50 backdrop-blur-sm" align="center">
        <div id="tech-specs" className="w-full max-w-6xl mx-auto">
           <h2 className="text-4xl md:text-6xl font-display text-center mb-16 anim-text">
             TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">ANATOMY</span>
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { title: "THE TANG", desc: "Full-stack integration extending deep into your infrastructure.", color: "text-pink-500" },
                { title: "THE GUARD", desc: "Zero-trust perimeter defense preventing lateral movement.", color: "text-white" },
                { title: "THE EDGE", desc: "Real-time heuristic scanning of every packet.", color: "text-purple-500" },
              ].map((spec, i) => (
                <div key={i} className="spec-item bg-white/5 p-8 border border-white/10 hover:bg-white/10 transition-all group">
                   <div className={`font-mono text-xs tracking-widest mb-4 ${spec.color}`}>COMPONENT_0{i+1}</div>
                   <h3 className="text-2xl font-display font-bold mb-4 group-hover:translate-x-2 transition-transform">{spec.title}</h3>
                   <p className="text-neutral-400 font-light text-sm">{spec.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </Section>

      {/* SECTION 5: CTA */}
      <Section id="deploy" align="center">
        <div className="relative z-10 flex flex-col items-center anim-text">
          <div className="w-24 h-24 rounded-full border border-pink-500 flex items-center justify-center mb-8 animate-[spin_10s_linear_infinite]">
             <div className="w-20 h-20 rounded-full border border-dashed border-white/30"></div>
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-bold mb-8 text-center">
            WIELD THE <br/> WEAPON
          </h2>
          <p className="max-w-md text-center text-neutral-400 mb-12 font-mono">
            Join the elite circle of architects securing the future. Limited seats available for the V.4.0 beta.
          </p>
          <div className="flex flex-col md:flex-row gap-6">
             <button className="bg-white text-black px-8 py-4 font-bold font-mono tracking-widest hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105">
               INITIATE SEQUENCE
             </button>
             <button className="border border-white/20 text-white px-8 py-4 font-bold font-mono tracking-widest hover:bg-white/10 transition-all">
               VIEW DOCUMENTATION
             </button>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="absolute bottom-8 w-full flex justify-between px-8 text-[10px] font-mono text-neutral-600">
           <div>© 2024 RONIN SYSTEMS</div>
           <div>EST. TOKYO // SF // BERLIN</div>
        </div>
      </Section>

    </div>
  );
}
