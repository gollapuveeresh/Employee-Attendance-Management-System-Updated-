import React, { useEffect, useState, useRef } from 'react';

export default function RoleVisual() {
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
      { p: 0, t: 0 },       // 0s: Reset, users enter
      { p: 1, t: 1000 },    // 1s: Users move along lanes
      { p: 2, t: 3500 },    // 3.5s: Reached boundary, scan begins
      { p: 3, t: 5500 },    // 5.5s: Access decision (Paths light up/dim)
      { p: 4, t: 7500 },    // 7.5s: Information flows & Dest activates
      { p: 5, t: 10000 },   // 10s: Continuous data flow
      { p: 6, t: 12500 },   // 12.5s: Fade and reorganize
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

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/4] xl:aspect-[4/3] max-h-[600px] rounded-3xl bg-[#030303] border border-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center cursor-default transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-40'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
       <style dangerouslySetInnerHTML={{ __html: `
         @keyframes rlv-cam-push {
           0%, 100% { transform: scale(1) translateX(0); }
           30% { transform: scale(1.05) translateX(2%); }
           60% { transform: scale(1.1) translateX(4%); }
           85% { transform: scale(1.05) translateX(2%); }
         }
         @keyframes rlv-user-move {
           0% { transform: translateX(0); opacity: 0; }
           15% { opacity: 1; }
           100% { transform: translateX(350px); opacity: 1; }
         }
         @keyframes rlv-scan-sweep {
           0% { transform: translateX(-20px); opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { transform: translateX(40px); opacity: 0; }
         }
         @keyframes rlv-draw-lane {
           0% { stroke-dashoffset: 400; opacity: 0; }
           10% { opacity: 1; }
           100% { stroke-dashoffset: 0; opacity: 1; }
         }
         @keyframes rlv-flow-particles {
           0% { stroke-dashoffset: 400; opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { stroke-dashoffset: -400; opacity: 0; }
         }
         @keyframes rlv-dest-activate {
           0% { transform: scale(0.9); opacity: 0.5; filter: drop-shadow(0 0 0px #D4AF37); }
           100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 15px #D4AF37); }
         }
         @keyframes rlv-fade-out {
           0% { opacity: 1; }
           100% { opacity: 0; }
         }
       `}} />

       {/* CAMERA RIG */}
       <div className={`absolute inset-0 w-full h-full origin-left ${phase >= 1 && phase < 7 ? 'animate-[rlv-cam-push_14s_ease-in-out_infinite]' : ''}`}>
         
         {/* BACKGROUND LAYER (Parallax: 1px) */}
         <div 
           className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-out"
           style={{ transform: `translate(${mousePos.x / 80}px, ${mousePos.y / 80}px)` }}
         >
            <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full translate-x-[20%]" />
            {/* Extremely subtle background geometry */}
            <svg className="w-full h-full opacity-10" viewBox="0 0 1000 600">
               <line x1="200" y1="0" x2="200" y2="600" stroke="#FFF" strokeWidth="1" strokeDasharray="4 8" />
               <line x1="800" y1="0" x2="800" y2="600" stroke="#FFF" strokeWidth="1" strokeDasharray="4 8" />
               <circle cx="800" cy="300" r="200" stroke="#FFF" strokeWidth="1" fill="none" />
            </svg>
         </div>

         {/* MIDDLE LAYER (Parallax: 2px) - Lanes & Security Boundary */}
         <div 
           className="absolute inset-0 transition-transform duration-700 ease-out z-10"
           style={{ transform: `translate(${mousePos.x / 40}px, ${mousePos.y / 40}px)` }}
         >
            <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
               <defs>
                 <linearGradient id="rlv-gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                   <stop offset="20%" stopColor="#D4AF37" stopOpacity="0.8" />
                   <stop offset="80%" stopColor="#FFF" stopOpacity="1" />
                   <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
                 </linearGradient>
                 <linearGradient id="rlv-grey-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#333" stopOpacity="0.4" />
                   <stop offset="100%" stopColor="#111" stopOpacity="0" />
                 </linearGradient>
               </defs>

               {/* Pre-Boundary Base Lanes (Left side) */}
               <path d="M 0 150 C 200 150, 300 180, 500 180" stroke="#222" strokeWidth="2" fill="none" />
               <path d="M 0 300 C 200 300, 300 300, 500 300" stroke="#222" strokeWidth="2" fill="none" />
               <path d="M 0 450 C 200 450, 300 420, 500 420" stroke="#222" strokeWidth="2" fill="none" />

               {/* Post-Boundary Active/Inactive Lanes (Right side) - Phase 3+ */}
               {/* Upper Lane: Authorized (Full Open) */}
               {phase >= 3 && phase < 6 && (
                 <>
                   <path d="M 500 180 C 650 180, 700 150, 850 150" stroke="url(#rlv-gold-grad)" strokeWidth="6" fill="none" strokeLinecap="round" className="animate-[rlv-draw-lane_1.5s_ease-out_forwards]" style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.4))' }} />
                   {/* Flowing Data Particles */}
                   {phase >= 4 && (
                     <path d="M 500 180 C 650 180, 700 150, 850 150" stroke="#FFF" strokeWidth="2" fill="none" strokeDasharray="100 300" strokeDashoffset="400" className="animate-[rlv-flow-particles_2s_linear_infinite]" />
                   )}
                 </>
               )}

               {/* Middle Lane: Partial Access */}
               {phase >= 3 && phase < 6 && (
                 <>
                   <path d="M 500 300 C 600 300, 650 300, 700 300" stroke="url(#rlv-gold-grad)" strokeWidth="4" fill="none" strokeLinecap="round" className="animate-[rlv-draw-lane_1s_ease-out_forwards]" opacity="0.7" />
                   {/* Flowing Data Particles */}
                   {phase >= 4 && (
                     <path d="M 500 300 C 600 300, 650 300, 700 300" stroke="#FFF" strokeWidth="1" fill="none" strokeDasharray="50 350" strokeDashoffset="400" className="animate-[rlv-flow-particles_2.5s_linear_infinite]" />
                   )}
                 </>
               )}

               {/* Lower Lane: Restricted (Dissolves) */}
               {phase >= 3 && phase < 6 && (
                 <path d="M 500 420 C 600 420, 650 450, 850 450" stroke="url(#rlv-grey-grad)" strokeWidth="2" fill="none" className="animate-[rlv-draw-lane_1s_ease-out_forwards]" />
               )}

            </svg>

            {/* THE SECURITY BOUNDARY (Vertical Glass Pane at X=500px) */}
            <div className="absolute top-[5%] left-[50%] w-[40px] h-[90%] -translate-x-1/2 flex flex-col justify-center gap-1 z-10 preserve-3d" style={{ perspective: '1000px' }}>
               <div className={`w-full h-full bg-[#111]/40 backdrop-blur-md border-x border-[#333] shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-1000 ${phase >= 3 ? 'border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.15)]' : ''}`} style={{ transform: 'rotateY(-15deg)' }}>
                  {/* Internal grid lines */}
                  <div className="absolute inset-0 w-full h-full flex flex-col justify-between py-[10%] opacity-20">
                     <div className="w-full h-[1px] bg-[#D4AF37]" />
                     <div className="w-full h-[1px] bg-[#D4AF37]" />
                     <div className="w-full h-[1px] bg-[#D4AF37]" />
                  </div>
               </div>
            </div>

            {/* PERMISSION DESTINATIONS (Right Side) */}
            {/* Dest 1: Large Open Structure (Upper) */}
            <div className={`absolute top-[25%] left-[85%] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${phase >= 4 && phase < 6 ? 'animate-[rlv-dest-activate_1s_ease-out_forwards]' : 'opacity-30 scale-90'}`}>
               <div className="w-[80px] h-[80px] border border-[#D4AF37]/50 rounded-lg rotate-45 flex items-center justify-center bg-[#111]/50 backdrop-blur-sm">
                  <div className="w-[40px] h-[40px] border border-[#D4AF37] rounded-sm" />
               </div>
            </div>

            {/* Dest 2: Medium Structure (Middle) */}
            <div className={`absolute top-[50%] left-[70%] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${phase >= 4 && phase < 6 ? 'animate-[rlv-dest-activate_1s_ease-out_forwards]' : 'opacity-30 scale-90'}`}>
               <div className="w-[50px] h-[50px] border border-[#D4AF37]/40 rounded-lg flex items-center justify-center bg-[#111]/50 backdrop-blur-sm">
                  <div className="w-[20px] h-[20px] bg-[#D4AF37]/30 rounded-sm" />
               </div>
            </div>

            {/* Dest 3: Small Restricted Structure (Lower) */}
            <div className="absolute top-[75%] left-[85%] -translate-x-1/2 -translate-y-1/2 opacity-20 scale-75">
               <div className="w-[40px] h-[40px] border border-[#555] rounded-full flex items-center justify-center bg-[#050505]/50 backdrop-blur-sm">
                  <div className="w-[10px] h-[10px] bg-[#333] rounded-full" />
               </div>
            </div>
         </div>

         {/* FOREGROUND LAYER (Parallax: 4px) - Users */}
         <div 
           className="absolute inset-0 transition-transform duration-500 ease-out z-20"
           style={{ transform: `translate(${mousePos.x / 15}px, ${mousePos.y / 15}px)` }}
         >
            {/* USER A (Upper Lane) */}
            <div className={`absolute top-[30%] left-[10%] -translate-x-1/2 -translate-y-1/2 ${phase >= 1 && phase < 6 ? 'animate-[rlv-user-move_3s_ease-in-out_forwards]' : 'opacity-0'} ${phase >= 6 ? 'animate-[rlv-fade-out_1s_ease-out_forwards]' : ''}`}>
               <UserSilhouette scan={phase === 2} authorized={phase >= 3} />
            </div>

            {/* USER B (Middle Lane) */}
            <div className={`absolute top-[50%] left-[10%] -translate-x-1/2 -translate-y-1/2 ${phase >= 1 && phase < 6 ? 'animate-[rlv-user-move_3s_ease-in-out_forwards]' : 'opacity-0'} ${phase >= 6 ? 'animate-[rlv-fade-out_1s_ease-out_forwards]' : ''}`} style={{ animationDelay: '0.2s' }}>
               <UserSilhouette scan={phase === 2} authorized={phase >= 3} partial={true} />
            </div>

            {/* USER C (Lower Lane) */}
            <div className={`absolute top-[70%] left-[10%] -translate-x-1/2 -translate-y-1/2 ${phase >= 1 && phase < 6 ? 'animate-[rlv-user-move_3s_ease-in-out_forwards]' : 'opacity-0'} ${phase >= 6 ? 'animate-[rlv-fade-out_1s_ease-out_forwards]' : ''}`} style={{ animationDelay: '0.4s' }}>
               <UserSilhouette scan={phase === 2} restricted={phase >= 3} />
            </div>
         </div>
       </div>
    </div>
  );
}

// Minimal geometric human silhouette
function UserSilhouette({ scan, authorized, partial, restricted }: { scan: boolean, authorized?: boolean, partial?: boolean, restricted?: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Scanning Beam (Sweeps Left to Right) */}
      {scan && (
        <div className="absolute top-[-10px] bottom-[-10px] w-[2px] bg-[#FFF] shadow-[0_0_10px_#FFF] animate-[rlv-scan-sweep_1.5s_ease-in-out_forwards]" />
      )}
      
      {/* Identity Core (Head) */}
      <div className={`w-[12px] h-[12px] rounded-full border border-[#D4AF37]/50 bg-[#111] transition-all duration-1000 z-10
        ${authorized && !partial ? 'bg-[#D4AF37] shadow-[0_0_15px_#D4AF37] border-[#D4AF37]' : ''}
        ${partial ? 'bg-[#D4AF37]/60 border-[#D4AF37]/80' : ''}
        ${restricted ? 'bg-[#222] border-[#444]' : ''}
      `} />
      
      {/* Body */}
      <div className={`w-[20px] h-[26px] mt-[3px] rounded-t-lg rounded-b-sm border border-[#D4AF37]/30 bg-[#111] transition-all duration-1000
        ${authorized && !partial ? 'bg-gradient-to-b from-[#D4AF37]/40 to-[#111] border-[#D4AF37]' : ''}
        ${partial ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#111] border-[#D4AF37]/60' : ''}
        ${restricted ? 'bg-gradient-to-b from-[#222] to-[#050505] border-[#444]' : ''}
      `} />
      
      {/* Gold Signal (emits post scan) */}
      {scan && (
        <div className="absolute right-[-20px] top-1/2 w-3 h-[2px] bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] rounded opacity-0 animate-[rlv-draw-lane_0.5s_ease-out_forwards_1s]" />
      )}
    </div>
  );
}
