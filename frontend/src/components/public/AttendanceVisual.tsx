import React, { useEffect, useState, useRef } from 'react';

export default function AttendanceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 0) {
          startSequence();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [phase]);

  const startSequence = () => {
    setPhase(1); // Arrival
    setTimeout(() => setPhase(2), 1500); // Time
    setTimeout(() => setPhase(3), 3000); // Verification
    setTimeout(() => setPhase(4), 4500); // Location
    setTimeout(() => setPhase(5), 6000); // Working Hours
    setTimeout(() => setPhase(6), 7500); // Complete Loop
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 40;
    const y = (e.clientY - rect.top - rect.height / 2) / 40;
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/4] xl:aspect-[4/3] max-h-[600px] rounded-3xl bg-[#080808] border border-[#222] shadow-2xl overflow-hidden flex items-center justify-center cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
       <style dangerouslySetInnerHTML={{ __html: `
         @keyframes av-orbit {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
         }
         @keyframes av-counter-orbit {
           from { transform: rotate(360deg); }
           to { transform: rotate(0deg); }
         }
         @keyframes av-pulse {
           0% { transform: scale(1); opacity: 0.5; }
           100% { transform: scale(2.5); opacity: 0; }
         }
         @keyframes av-breathe {
           0%, 100% { transform: scale(1); }
           50% { transform: scale(1.03); }
         }
         @keyframes av-clock-hand {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
         }
         @keyframes av-dash {
           from { stroke-dashoffset: 100; }
           to { stroke-dashoffset: 0; }
         }
         @keyframes av-glow-flow {
           0% { stroke-dashoffset: 600; opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { stroke-dashoffset: -600; opacity: 0; }
         }
         .av-glow-path {
           stroke-dasharray: 600;
           stroke-dashoffset: 600;
         }
       `}} />

       <div 
         className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
         style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
       >
          {/* Ambient Glow */}
          <div className={`absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-[#D4AF37]/10 blur-[80px] rounded-full transition-opacity duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`} />

          {/* Central Person */}
          <div className={`absolute z-30 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} ${phase >= 6 ? 'animate-[av-breathe_4s_ease-in-out_infinite]' : ''}`}>
             <div className="bg-[#111] border border-[#333] rounded-full p-6 shadow-[0_0_30px_rgba(212,175,55,0.15)] relative">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" className="drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                {/* Central Live Pulse */}
                {phase >= 6 && (
                  <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-[av-pulse_3s_ease-out_infinite]" />
                )}
             </div>
          </div>

          {/* Orbit System */}
          <div className={`absolute w-[260px] h-[260px] md:w-[360px] md:h-[360px] rounded-full border border-[#222] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} ${phase >= 6 ? 'animate-[av-orbit_40s_linear_infinite]' : ''}`}>
             
             {/* Connection Lines Container */}
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 360">
               <defs>
                 <linearGradient id="av-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                    <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                 </linearGradient>
               </defs>
               
               {/* Fixed lines connecting nodes to center conceptually */}
               <path d="M 180 180 Q 180 60 180 0" stroke="#222" strokeWidth="1" fill="none" />
               <path d="M 180 180 Q 300 180 360 180" stroke="#222" strokeWidth="1" fill="none" />
               <path d="M 180 180 Q 180 300 180 360" stroke="#222" strokeWidth="1" fill="none" />
               <path d="M 180 180 Q 60 180 0 180" stroke="#222" strokeWidth="1" fill="none" />
               
               {/* Animated Glow Lines */}
               {phase >= 6 && (
                 <>
                   <path d="M 180 0 Q 180 90 180 180" stroke="url(#av-glow-grad)" strokeWidth="2" fill="none" className="av-glow-path animate-[av-glow-flow_4s_linear_infinite]" />
                   <path d="M 180 180 Q 270 180 360 180" stroke="url(#av-glow-grad)" strokeWidth="2" fill="none" className="av-glow-path animate-[av-glow-flow_4s_linear_infinite_1s]" />
                   <path d="M 180 360 Q 180 270 180 180" stroke="url(#av-glow-grad)" strokeWidth="2" fill="none" className="av-glow-path animate-[av-glow-flow_4s_linear_infinite_2s]" />
                   <path d="M 180 180 Q 90 180 0 180" stroke="url(#av-glow-grad)" strokeWidth="2" fill="none" className="av-glow-path animate-[av-glow-flow_4s_linear_infinite_3s]" />
                 </>
               )}
             </svg>

             {/* 1. Time Node (Top) */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={`${phase >= 6 ? 'animate-[av-counter-orbit_40s_linear_infinite]' : ''}`}>
                   <div className={`w-14 h-14 rounded-2xl bg-[#111] border border-[#333] flex items-center justify-center transition-all duration-700 ease-out shadow-lg ${phase >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 -translate-y-10'}`}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.5">
                       <circle cx="12" cy="12" r="10"/>
                       <path d="M12 6v6l4 2" className={`origin-center ${phase >= 2 ? 'animate-[av-clock-hand_6s_linear_infinite]' : ''}`}/>
                     </svg>
                   </div>
                   {phase === 2 && <div className="absolute inset-0 rounded-2xl border border-[#D4AF37] animate-[av-pulse_1s_ease-out_forwards]" />}
                </div>
             </div>
             
             {/* 2. Verification Node (Right) */}
             <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                <div className={`${phase >= 6 ? 'animate-[av-counter-orbit_40s_linear_infinite]' : ''}`}>
                   <div className={`w-14 h-14 rounded-2xl bg-[#111] border border-[#333] flex items-center justify-center transition-all duration-700 ease-out shadow-lg ${phase >= 3 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-10'}`}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                       <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="opacity-50" />
                       {phase >= 3 && <path d="M9 12l2 2 4-4" strokeWidth="2.5" strokeDasharray="100" strokeDashoffset="100" className="animate-[av-dash_0.6s_ease-out_forwards]" />}
                     </svg>
                   </div>
                   {phase === 3 && <div className="absolute inset-0 rounded-2xl border border-[#D4AF37] animate-[av-pulse_1s_ease-out_forwards]" />}
                </div>
             </div>
             
             {/* 3. Location Node (Bottom) */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className={`${phase >= 6 ? 'animate-[av-counter-orbit_40s_linear_infinite]' : ''}`}>
                   <div className={`w-14 h-14 rounded-2xl bg-[#111] border border-[#333] flex items-center justify-center transition-all duration-700 ease-out shadow-lg ${phase >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10'}`}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.5">
                       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                     </svg>
                   </div>
                   {(phase === 4 || phase >= 6) && (
                     <>
                       <div className="absolute inset-0 rounded-2xl border border-[#D4AF37] animate-[av-pulse_2s_ease-out_infinite]" />
                       <div className="absolute inset-0 rounded-2xl border border-[#D4AF37] animate-[av-pulse_2s_ease-out_infinite_0.5s]" />
                     </>
                   )}
                </div>
             </div>
             
             {/* 4. Progress Node (Left) */}
             <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                <div className={`${phase >= 6 ? 'animate-[av-counter-orbit_40s_linear_infinite]' : ''}`}>
                   <div className={`w-14 h-14 rounded-2xl bg-[#111] border border-[#333] flex items-center justify-center transition-all duration-700 ease-out shadow-lg ${phase >= 5 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 -translate-x-10'}`}>
                     <svg width="28" height="28" viewBox="0 0 36 36" className="rotate-[-90deg]">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222" strokeWidth="3" />
                        {phase >= 5 && <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#D4AF37" strokeWidth="3" strokeDasharray="100" strokeDashoffset="100" className="animate-[av-dash_1.5s_ease-out_forwards]" />}
                     </svg>
                   </div>
                </div>
             </div>
             
          </div>

          {/* Random floating smart data particles in background */}
          {phase >= 6 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-[av-pulse_3s_infinite] shadow-[0_0_8px_#D4AF37]" />
               <div className="absolute top-[70%] left-[70%] w-2 h-2 bg-white rounded-full animate-[av-pulse_4s_infinite_1s] shadow-[0_0_8px_#FFF]" />
               <div className="absolute top-[40%] left-[80%] w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-[av-pulse_2s_infinite_0.5s] shadow-[0_0_8px_#D4AF37]" />
               <div className="absolute top-[80%] left-[20%] w-1 h-1 bg-white rounded-full animate-[av-pulse_3.5s_infinite_2s] shadow-[0_0_8px_#FFF]" />
            </div>
          )}

       </div>
    </div>
  );
}
