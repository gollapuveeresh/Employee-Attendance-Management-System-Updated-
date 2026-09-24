import React, { useState, useRef } from 'react';

export default function AttendanceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2);
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full aspect-square md:aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#1a1a1a] flex items-center justify-center transition-all duration-700 ease-out group cursor-default bg-[#080808]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
       <style dangerouslySetInnerHTML={{ __html: `
         @keyframes att-gold-path {
           0% { stroke-dashoffset: 200; }
           70% { stroke-dashoffset: 0; }
           100% { stroke-dashoffset: 0; }
         }
         @keyframes att-glow-pulse {
           0%, 65% { opacity: 0; transform: scale(0.8); }
           70% { opacity: 0.6; transform: scale(1.1); }
           75%, 100% { opacity: 0; transform: scale(1); }
         }
         @keyframes att-floor-pulse {
           0%, 100% { opacity: 0.2; transform: scale(1); }
           50% { opacity: 0.6; transform: scale(1.1); }
         }
         @keyframes att-sweep-global {
           0%, 30% { transform: translateX(-150%) skewX(-15deg); }
           50% { transform: translateX(200%) skewX(-15deg); }
           100% { transform: translateX(200%) skewX(-15deg); }
         }
         @keyframes att-clock-sweep {
           0%, 30% { transform: translateX(-150%) rotate(30deg); opacity: 0; }
           40% { opacity: 0.3; }
           50%, 100% { transform: translateX(150%) rotate(30deg); opacity: 0; }
         }
         @keyframes att-border-orbit {
           0% { transform: rotate(0deg); }
           100% { transform: rotate(360deg); }
         }
       `}} />

       {/* OUTER BORDER ORBIT (Golden light travelling around border) */}
       <div className="absolute inset-0 z-30 pointer-events-none rounded-[24px] overflow-hidden" style={{ transform: `translate(${mousePos.x / 40}px, ${mousePos.y / 40}px)` }}>
         <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 animate-[att-border-orbit_10s_linear_infinite]">
           <div className="w-[50%] h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent absolute top-0 left-1/4 shadow-[0_0_15px_#D4AF37] opacity-60 group-hover:opacity-100 group-hover:animate-[att-border-orbit_5s_linear_infinite]" />
         </div>
         {/* Inner mask to only show light on the exact border */}
         <div className="absolute inset-[1px] bg-transparent rounded-[23px] shadow-[inset_0_0_20px_rgba(212,175,55,0.1)]" />
       </div>

       {/* MAIN PHOTOGRAPH LAYER */}
       <div 
         className="absolute inset-[1px] rounded-[23px] overflow-hidden z-0 transition-transform duration-700 ease-out"
         style={{ transform: `translate(${mousePos.x / 80}px, ${mousePos.y / 80}px)` }}
       >
         <img 
           src="/assets/attendance.jpeg" 
           alt="Attendance Management" 
           className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
         />
         
         {/* Subtle dark gradient overlay - NOT multiply, just normal alpha blending */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
         
         {/* Cinematic Light Sweep across photograph */}
         <div className="absolute inset-0 pointer-events-none">
           <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent animate-[att-sweep-global_8s_ease-in-out_infinite]" />
         </div>
       </div>

       {/* FOREGROUND ANIMATIONS */}
       <div 
         className="absolute inset-[2px] rounded-[22px] overflow-hidden z-10 pointer-events-none transition-transform duration-700 ease-out"
         style={{ transform: `translate(${mousePos.x / 25}px, ${mousePos.y / 25}px)` }}
       >
         
         {/* 1. GOLD ENERGY PATH */}
         <svg className="absolute inset-0 w-full h-full group-hover:brightness-125 transition-all duration-500" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path 
             d="M -10 95 Q 20 90, 35 92 T 60 82 Q 72 75, 85 75" 
             stroke="#D4AF37" 
             strokeWidth="1.5" 
             fill="none" 
             strokeLinecap="round"
             strokeDasharray="15 200" 
             strokeDashoffset="200"
             className="animate-[att-gold-path_6s_ease-in-out_infinite]"
             style={{ filter: 'drop-shadow(0 0 6px #D4AF37)' }}
           />
         </svg>

         {/* CLOCK LIGHT REFLECTION */}
         <div className="absolute top-[15%] left-[10%] w-[18%] aspect-square rounded-full overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[200%] h-full animate-[att-clock-sweep_6s_ease-in-out_infinite]" />
         </div>

         {/* FLOOR LIGHT PULSE */}
         <div className="absolute left-[60%] top-[82%] w-[8%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 animate-[att-floor-pulse_4s_ease-in-out_infinite] group-hover:border-[#D4AF37]/60" style={{ transform: 'rotateX(60deg)' }} />

         {/* ENTRANCE GLOW */}
         <div className="absolute left-[85%] top-[75%] w-[15%] aspect-square -translate-x-1/2 -translate-y-1/2">
           <div className="w-full h-full rounded-full bg-gradient-to-r from-[#D4AF37]/60 to-transparent blur-[20px] animate-[att-glow-pulse_6s_ease-in-out_infinite]" />
         </div>
       </div>
    </div>
  );
}
