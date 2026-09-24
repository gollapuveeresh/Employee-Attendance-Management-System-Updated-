import React, { useState, useRef } from 'react';
import attendanceImage from '../../assets/attendance.jpeg';

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
      className="relative w-full h-full aspect-square md:aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#1a1a1a] flex items-center justify-center transition-all duration-700 ease-out group cursor-default bg-[#040404]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
       <style dangerouslySetInnerHTML={{ __html: `
         @keyframes att-camera-breathe {
           0%, 100% { transform: scale(1.02) translate(0, 0); }
           50% { transform: scale(1.04) translate(-0.5%, -0.5%); }
         }
         @keyframes att-gold-path {
           0%, 20% { stroke-dashoffset: 200; opacity: 1; filter: drop-shadow(0 0 5px #D4AF37); }
           60% { stroke-dashoffset: 0; opacity: 1; filter: drop-shadow(0 0 10px #D4AF37); }
           80%, 100% { stroke-dashoffset: 0; opacity: 0; filter: drop-shadow(0 0 5px #D4AF37); }
         }
         @keyframes att-glow-pulse {
           0%, 55% { opacity: 0; transform: scale(0.8); }
           60% { opacity: 0.5; transform: scale(1.1); }
           70%, 100% { opacity: 0; transform: scale(1); }
         }
         @keyframes att-clock-sweep {
           0%, 30% { transform: translateX(-150%) rotate(30deg); opacity: 0; }
           40% { opacity: 0.2; }
           50%, 100% { transform: translateX(150%) rotate(30deg); opacity: 0; }
         }
         @keyframes att-particle-1 {
           0%, 100% { transform: translate(0, 0); opacity: 0.1; }
           50% { transform: translate(15px, -10px); opacity: 0.6; }
         }
         @keyframes att-particle-2 {
           0%, 100% { transform: translate(0, 0); opacity: 0.1; }
           50% { transform: translate(-10px, -15px); opacity: 0.5; }
         }
       `}} />

       {/* 1. MAIN PHOTOGRAPH LAYER (Base) */}
       <div 
         className="absolute inset-[1px] rounded-[23px] overflow-hidden z-0 transition-transform duration-700 ease-out animate-[att-camera-breathe_15s_ease-in-out_infinite]"
         style={{ transform: `translate(${mousePos.x / 80}px, ${mousePos.y / 80}px)` }}
       >
         {/* EXACT imported image */}
         <img 
           src={attendanceImage} 
           alt="Employee entering corporate workplace" 
           className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
           style={{ objectPosition: 'center center' }}
         />
         
         {/* 2. SUBTLE DARK GRADIENT */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
       </div>

       {/* 3. GOLD ANIMATION & 4. VERIFICATION EFFECTS (Foreground) */}
       <div 
         className="absolute inset-[2px] rounded-[22px] overflow-hidden z-10 pointer-events-none transition-transform duration-700 ease-out"
         style={{ transform: `translate(${mousePos.x / 30}px, ${mousePos.y / 30}px)` }}
       >
         
         {/* GOLD LIGHT PATH (Tracing existing floor line) */}
         <svg className="absolute inset-0 w-full h-full group-hover:brightness-110 transition-all duration-500" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path 
             d="M -10 95 Q 20 90, 35 92 T 60 82 Q 72 75, 85 75" 
             stroke="#D4AF37" 
             strokeWidth="1.5" 
             fill="none" 
             strokeLinecap="round"
             strokeDasharray="15 200" 
             strokeDashoffset="200"
             className="animate-[att-gold-path_6s_ease-in-out_infinite]"
           />
         </svg>

         {/* CLOCK REFLECTION */}
         <div className="absolute top-[15%] left-[10%] w-[18%] aspect-square rounded-full overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[200%] h-full animate-[att-clock-sweep_6s_ease-in-out_infinite]" />
         </div>

         {/* ENTRANCE VERIFICATION PULSE */}
         <div className="absolute left-[85%] top-[75%] w-[15%] aspect-square -translate-x-1/2 -translate-y-1/2">
           <div className="w-full h-full rounded-full bg-gradient-to-r from-[#D4AF37]/50 to-transparent blur-[15px] animate-[att-glow-pulse_6s_ease-in-out_infinite]" />
         </div>

         {/* TINY PARTICLES AROUND PATH */}
         <div className="absolute left-[35%] top-[85%] w-1 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_4px_#D4AF37] animate-[att-particle-1_4s_ease-in-out_infinite]" />
         <div className="absolute left-[65%] top-[78%] w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_6px_#D4AF37] animate-[att-particle-2_5s_ease-in-out_infinite_1s]" />
         
       </div>
       
    </div>
  );
}
