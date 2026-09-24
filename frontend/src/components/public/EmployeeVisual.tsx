import React, { useEffect, useState, useRef } from 'react';

export default function EmployeeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return;
    
    // 14 second loop
    const phases = [
      { p: 0, t: 0 },       // 0s: Nodes appear randomly
      { p: 1, t: 2000 },    // 2s: Connections draw
      { p: 2, t: 4000 },    // 4s: Group into 3 clusters
      { p: 3, t: 6000 },    // 6s: Central hub activates
      { p: 4, t: 8000 },    // 8s: Profile transformation (hero node)
      { p: 5, t: 11000 },   // 11s: Synchronization wave
      { p: 6, t: 13000 },   // 13s: Fade/Reset
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];
    const runLoop = () => {
      phases.forEach(({ p, t }) => {
        timeouts.push(setTimeout(() => setPhase(p), t));
      });
      timeouts.push(setTimeout(runLoop, 14000));
    };

    runLoop();

    return () => timeouts.forEach(clearTimeout);
  }, [isActive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2);
    setMousePos({ x, y });
  };

  // Node definitions (12 nodes)
  const nodes = Array.from({ length: 12 }).map((_, i) => {
    // Random initial positions (Phase 0/1)
    const initX = 20 + Math.random() * 60; // 20-80%
    const initY = 20 + Math.random() * 60; // 20-80%
    
    // Grouped positions (Phase 2+)
    let groupX, groupY;
    if (i < 4) {
      // Group 1: Circular (Left)
      const angle = (i / 4) * Math.PI * 2;
      groupX = 25 + Math.cos(angle) * 10;
      groupY = 40 + Math.sin(angle) * 15;
    } else if (i < 8) {
      // Group 2: Diagonal (Right)
      groupX = 65 + (i - 4) * 6;
      groupY = 20 + (i - 4) * 12;
    } else {
      // Group 3: Vertical (Bottom Center)
      groupX = 50 + (i % 2 === 0 ? -5 : 5);
      groupY = 65 + (i - 8) * 8;
    }

    return { id: i, initX, initY, groupX, groupY, depth: 0.5 + Math.random() * 1 };
  });

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/4] xl:aspect-[4/3] max-h-[600px] rounded-3xl bg-[#030303] border border-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center cursor-default transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-40'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
       <style dangerouslySetInnerHTML={{ __html: `
         @keyframes ev-node-appear {
           0% { transform: scale(0); opacity: 0; }
           100% { transform: scale(1); opacity: 1; }
         }
         @keyframes ev-draw-line {
           0% { stroke-dashoffset: 100; opacity: 0; }
           10% { opacity: 0.5; }
           100% { stroke-dashoffset: 0; opacity: 0.5; }
         }
         @keyframes ev-flow-light {
           0% { stroke-dashoffset: 100; opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { stroke-dashoffset: -100; opacity: 0; }
         }
         @keyframes ev-orbit-1 {
           0% { transform: rotate(0deg) translateX(30px) rotate(0deg); opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); opacity: 0; }
         }
         @keyframes ev-orbit-2 {
           0% { transform: rotate(120deg) translateX(35px) rotate(-120deg); opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { transform: rotate(480deg) translateX(35px) rotate(-480deg); opacity: 0; }
         }
         @keyframes ev-orbit-3 {
           0% { transform: rotate(240deg) translateX(25px) rotate(-240deg); opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { transform: rotate(600deg) translateX(25px) rotate(-600deg); opacity: 0; }
         }
         @keyframes ev-hub-pulse {
           0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
           50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; box-shadow: 0 0 40px #D4AF37; }
         }
         @keyframes ev-sync-wave {
           0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0.8; border-width: 4px; }
           100% { transform: translate(-50%, -50%) scale(10); opacity: 0; border-width: 1px; }
         }
         @keyframes ev-cam-push {
           0%, 100% { transform: scale(1); }
           30% { transform: scale(1.05); }
           60% { transform: scale(1.15); }
           80% { transform: scale(1.05); }
         }
         @keyframes ev-float-ambient {
           0%, 100% { transform: translateY(0px); }
           50% { transform: translateY(-8px); }
         }
       `}} />

       {/* CAMERA RIG */}
       <div className={`absolute inset-0 w-full h-full animate-[ev-cam-push_14s_ease-in-out_infinite]`}>
         
         {/* BACKGROUND ATMOSPHERE (Parallax: 1px) */}
         <div 
           className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-out"
           style={{ transform: `translate(${mousePos.x / 80}px, ${mousePos.y / 80}px)` }}
         >
            <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
            
            {/* Distant background nodes */}
            {Array.from({length: 15}).map((_, i) => (
              <div 
                key={`bg-${i}`}
                className="absolute w-1 h-1 bg-white/10 rounded-full animate-[ev-float-ambient_6s_ease-in-out_infinite]"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
         </div>

         {/* MIDDLE LAYER (Parallax: 3px) - Connection Lines */}
         <div 
           className="absolute inset-0 transition-transform duration-700 ease-out z-10"
           style={{ transform: `translate(${mousePos.x / 40}px, ${mousePos.y / 40}px)` }}
         >
            <svg className="w-full h-full" style={{ filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.3))' }}>
               <defs>
                 <linearGradient id="ev-gold-line" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
                   <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
                   <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
                 </linearGradient>
               </defs>

               {/* Random connections in Phase 1 */}
               {phase >= 1 && phase < 2 && nodes.slice(0, -1).map((n, i) => (
                 <line 
                   key={`line-r-${i}`}
                   x1={`${n.initX}%`} y1={`${n.initY}%`}
                   x2={`${nodes[i+1].initX}%`} y2={`${nodes[i+1].initY}%`}
                   stroke="#D4AF37" strokeWidth="1" opacity="0.3"
                   strokeDasharray="100" strokeDashoffset="100"
                   className="animate-[ev-draw-line_1s_ease-out_forwards]"
                 />
               ))}

               {/* Grouped connections in Phase 2+ */}
               {phase >= 2 && phase < 6 && (
                 <>
                   {/* Inter-group lines */}
                   {[0,1,2].map(i => <line key={`g1-${i}`} x1={`${nodes[i].groupX}%`} y1={`${nodes[i].groupY}%`} x2={`${nodes[i+1].groupX}%`} y2={`${nodes[i+1].groupY}%`} stroke="#D4AF37" strokeWidth="1.5" opacity="0.5" className="animate-[ev-draw-line_1s_ease-out_forwards]" />)}
                   {[4,5,6].map(i => <line key={`g2-${i}`} x1={`${nodes[i].groupX}%`} y1={`${nodes[i].groupY}%`} x2={`${nodes[i+1].groupX}%`} y2={`${nodes[i+1].groupY}%`} stroke="#D4AF37" strokeWidth="1.5" opacity="0.5" className="animate-[ev-draw-line_1s_ease-out_forwards]" />)}
                   {[8,9,10].map(i => <line key={`g3-${i}`} x1={`${nodes[i].groupX}%`} y1={`${nodes[i].groupY}%`} x2={`${nodes[i+1].groupX}%`} y2={`${nodes[i+1].groupY}%`} stroke="#D4AF37" strokeWidth="1.5" opacity="0.5" className="animate-[ev-draw-line_1s_ease-out_forwards]" />)}
                 </>
               )}

               {/* Hub connections in Phase 3+ */}
               {phase >= 3 && phase < 6 && nodes.map((n, i) => (
                 <g key={`hub-line-${i}`}>
                   <line 
                     x1={`${n.groupX}%`} y1={`${n.groupY}%`}
                     x2="50%" y2="45%"
                     stroke="#D4AF37" strokeWidth={phase >= 5 ? 2 : 1} 
                     opacity={phase >= 5 ? 0.8 : 0.4}
                     className="transition-all duration-1000"
                   />
                   {/* Flowing light particles */}
                   <line 
                     x1={`${n.groupX}%`} y1={`${n.groupY}%`}
                     x2="50%" y2="45%"
                     stroke="url(#ev-gold-line)" strokeWidth="3" 
                     strokeDasharray="100" strokeDashoffset="100"
                     className="animate-[ev-flow-light_2s_ease-in-out_infinite]"
                     style={{ animationDelay: `${(i % 3) * 0.5}s` }}
                   />
                 </g>
               ))}
            </svg>
         </div>

         {/* FOREGROUND LAYER (Parallax: 5px) - Nodes and Hub */}
         <div 
           className="absolute inset-0 transition-transform duration-500 ease-out z-20"
           style={{ transform: `translate(${mousePos.x / 20}px, ${mousePos.y / 20}px)` }}
         >
            {/* CENTRAL WORKFORCE HUB (Phase 3+) */}
            <div className={`absolute left-1/2 top-[45%] transition-all duration-1000 ${phase >= 3 && phase < 6 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
               <div className="absolute animate-[ev-hub-pulse_3s_ease-in-out_infinite]">
                 {/* Geometric Core */}
                 <div className="w-12 h-12 bg-[#D4AF37]/20 border border-[#D4AF37] rotate-45 backdrop-blur-md flex items-center justify-center">
                   <div className="w-6 h-6 bg-[#D4AF37]/50 border border-white rotate-45" />
                 </div>
               </div>
               
               {/* Synchronization Wave (Phase 5) */}
               {phase === 5 && (
                 <div className="absolute w-[50px] h-[50px] border-[#D4AF37] rounded-full animate-[ev-sync-wave_2s_ease-out_forwards]" />
               )}
            </div>

            {/* EMPLOYEE NODES */}
            {nodes.map((n, i) => {
              const isHero = i === 11; // Choose one node for the profile transformation
              const activeX = phase < 2 ? n.initX : (isHero && phase === 4 ? 30 : n.groupX);
              const activeY = phase < 2 ? n.initY : (isHero && phase === 4 ? 60 : n.groupY);
              const isHeroActive = isHero && phase === 4;

              return (
                <div 
                  key={`node-${i}`}
                  className={`absolute transition-all duration-1000 ease-in-out -translate-x-1/2 -translate-y-1/2 ${phase >= 6 ? 'opacity-0 scale-0' : 'opacity-100'}`}
                  style={{ 
                    left: `${activeX}%`, 
                    top: `${activeY}%`,
                    animation: `ev-node-appear 0.5s ease-out forwards ${i * 0.1}s`,
                    opacity: 0, // starts at 0, filled by animation
                    zIndex: isHeroActive ? 50 : 10,
                    transform: `scale(${n.depth * (isHeroActive ? 2.5 : 1)}) translate(-50%, -50%)`
                  }}
                >
                  <div className="animate-[ev-float-ambient_4s_ease-in-out_infinite]" style={{ animationDelay: `${(i % 3) * 0.5}s` }}>
                    {/* Abstract Human Silhouette */}
                    <div className="flex flex-col items-center">
                      {/* Head */}
                      <div className={`w-[10px] h-[10px] rounded-full ${isHeroActive || phase === 5 ? 'bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]' : 'bg-[#222] border border-[#444]'} transition-colors duration-1000`} />
                      {/* Body */}
                      <div className={`w-[16px] h-[14px] mt-[2px] rounded-t-lg rounded-b-sm ${isHeroActive || phase === 5 ? 'bg-gradient-to-b from-[#D4AF37]/50 to-[#111]' : 'bg-gradient-to-b from-[#222] to-[#111] border-t border-[#555]'} transition-all duration-1000`} />
                    </div>

                    {/* SCENE 5: PROFILE TRANSFORMATION (Hero Node Only) */}
                    {isHeroActive && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        {/* Identity Ring */}
                        <div className="absolute w-3 h-3 border border-white/80 rounded-full animate-[ev-orbit-1_3s_linear_forwards]" />
                        {/* Department Node */}
                        <div className="absolute w-2 h-2 bg-[#D4AF37] rounded-sm rotate-45 animate-[ev-orbit-2_3s_linear_forwards]" />
                        {/* Timeline Line */}
                        <div className="absolute w-5 h-[2px] bg-white/50 rounded animate-[ev-orbit-3_3s_linear_forwards]" />
                        
                        {/* Soft glow behind hero */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#D4AF37]/20 rounded-full blur-md" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

         </div>
       </div>
    </div>
  );
}
