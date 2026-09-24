import React, { useEffect, useState, useRef } from 'react';

export default function LeaveVisual() {
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
      { p: 0, t: 0 },       // 0s: Stand, enter
      { p: 1, t: 1000 },    // 1s: Start walking
      { p: 2, t: 3000 },    // 3s: Leave request appears & connects
      { p: 3, t: 5000 },    // 5s: Approval gate opens
      { p: 4, t: 7000 },    // 7s: Milestones light up
      { p: 5, t: 10000 },   // 10s: Reach balance ring
      { p: 6, t: 12000 },   // 12s: Full illumination (WOW)
      { p: 7, t: 13500 },   // 13.5s: Fade to reset
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
      className={`relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/4] xl:aspect-[4/3] max-h-[600px] rounded-3xl bg-[#020202] border border-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center cursor-default transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-40'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      style={{ perspective: '1200px' }}
    >
       <style dangerouslySetInnerHTML={{ __html: `
         @keyframes walk-cycle {
           0%, 100% { transform: translateY(0) rotateZ(0deg); }
           25% { transform: translateY(-4px) rotateZ(1deg); }
           50% { transform: translateY(0) rotateZ(0deg); }
           75% { transform: translateY(-4px) rotateZ(-1deg); }
         }
         @keyframes walk-shadow {
           0%, 100% { transform: scale(1); opacity: 0.8; }
           25% { transform: scale(0.8); opacity: 0.4; }
           50% { transform: scale(1); opacity: 0.8; }
           75% { transform: scale(0.8); opacity: 0.4; }
         }
         @keyframes camera-travel {
           0% { transform: translate3d(0, 50px, -200px) rotateX(60deg); }
           15% { transform: translate3d(0, 50px, -100px) rotateX(65deg); }
           35% { transform: translate3d(0, 50px, 150px) rotateX(70deg); }
           50% { transform: translate3d(0, 30px, 300px) rotateX(75deg); }
           70% { transform: translate3d(0, 20px, 450px) rotateX(78deg); }
           85% { transform: translate3d(0, 20px, 500px) rotateX(75deg); }
           100% { transform: translate3d(0, 50px, -200px) rotateX(60deg); }
         }
         @keyframes doc-appear {
           0% { transform: translate3d(-30px, -80px, 100px) scale(0); opacity: 0; }
           100% { transform: translate3d(-40px, -120px, 150px) scale(1); opacity: 1; }
         }
         @keyframes doc-shoot {
           0% { transform: translate3d(-40px, -120px, 150px) scale(1); opacity: 1; }
           50% { transform: translate3d(0, -100px, 300px) scale(0.2) scaleX(3); filter: blur(4px); opacity: 1; background: #D4AF37; }
           100% { transform: translate3d(0, -80px, 600px) scale(0) scaleX(5); filter: blur(8px); opacity: 0; }
         }
         @keyframes gate-open-left {
           0% { transform: rotateY(0deg); }
           100% { transform: rotateY(-70deg); }
         }
         @keyframes gate-open-right {
           0% { transform: rotateY(0deg); }
           100% { transform: rotateY(70deg); }
         }
         @keyframes gate-wave {
           0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
           100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
         }
         @keyframes path-pulse {
           0%, 100% { opacity: 0.3; }
           50% { opacity: 0.8; }
         }
         @keyframes full-illuminate {
           0% { filter: brightness(1) drop-shadow(0 0 0px #D4AF37); }
           50% { filter: brightness(1.5) drop-shadow(0 0 20px #D4AF37); }
           100% { filter: brightness(1) drop-shadow(0 0 0px #D4AF37); }
         }
         .preserve-3d { transform-style: preserve-3d; }
       `}} />

       {/* BACKGROUND ENVIRONMENT (Parallax: 1px) */}
       <div 
         className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-out"
         style={{ transform: `translate(${mousePos.x / 80}px, ${mousePos.y / 80}px)` }}
       >
          <div className="absolute w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
       </div>

       {/* 3D WORLD CONTAINER */}
       {/* The camera-travel animation moves the entire ground plane forward to simulate the person walking */}
       <div 
         className={`absolute inset-0 flex items-center justify-center preserve-3d transition-transform duration-700 ease-out`}
         style={{ transform: `translate(${mousePos.x / 40}px, ${mousePos.y / 40}px)` }}
       >
          <div className={`relative w-[600px] h-[1200px] preserve-3d ${phase >= 1 && phase < 7 ? 'animate-[camera-travel_12s_linear_forwards]' : 'transform translate3d(0, 50px, -200px) rotateX(60deg)'}`}>
             
             {/* THE GOLDEN PATH (Ground Plane) */}
             <div className="absolute inset-0 flex justify-center preserve-3d">
                <div className={`w-[80px] h-full bg-gradient-to-t from-transparent via-[#D4AF37]/20 to-[#D4AF37]/40 blur-sm ${phase >= 6 ? 'animate-[full-illuminate_2s_ease-in-out_forwards]' : 'animate-[path-pulse_4s_infinite]'}`} />
                <div className={`absolute w-[40px] h-full bg-gradient-to-t from-[#D4AF37]/10 via-[#D4AF37]/60 to-[#D4AF37] ${phase >= 6 ? 'animate-[full-illuminate_2s_ease-in-out_forwards]' : ''}`} />
                
                {/* Path Lines */}
                <div className="absolute w-full h-full flex justify-between px-5">
                   <div className="w-[1px] h-full bg-[#D4AF37]/50" />
                   <div className="w-[1px] h-full bg-[#D4AF37]/50" />
                </div>
             </div>

             {/* APPROVAL GATE (At Z=400px, which is Y=400px in the top-down 2D div that gets rotated 60deg) */}
             {/* Let's place it at top = 300px (closer to far end) */}
             <div className="absolute top-[300px] left-1/2 -translate-x-1/2 preserve-3d" style={{ transform: 'rotateX(-90deg)' }}>
                {/* Gate Structure */}
                <div className="relative flex items-end h-[120px] preserve-3d">
                   <div className="w-[4px] h-[120px] bg-gradient-to-t from-[#D4AF37]/20 to-[#D4AF37]" />
                   <div className="w-[120px] h-[4px] bg-[#D4AF37] absolute top-0" />
                   <div className="w-[4px] h-[120px] bg-gradient-to-t from-[#D4AF37]/20 to-[#D4AF37] absolute right-0" />
                   
                   {/* Left Door */}
                   <div className={`absolute left-[4px] top-[4px] w-[56px] h-[116px] border border-[#D4AF37]/50 bg-[#111]/80 backdrop-blur-sm origin-left transition-transform duration-1000 ${phase >= 3 ? 'animate-[gate-open-left_1s_ease-out_forwards]' : ''}`} />
                   {/* Right Door */}
                   <div className={`absolute right-[4px] top-[4px] w-[56px] h-[116px] border border-[#D4AF37]/50 bg-[#111]/80 backdrop-blur-sm origin-right transition-transform duration-1000 ${phase >= 3 ? 'animate-[gate-open-right_1s_ease-out_forwards]' : ''}`} />
                   
                   {/* Gate Wave */}
                   {phase === 3 && (
                     <div className="absolute top-1/2 left-1/2 w-[100px] h-[100px] rounded-full border-2 border-[#D4AF37] animate-[gate-wave_1.5s_ease-out_forwards]" />
                   )}
                </div>
             </div>

             {/* LEAVE DAYS MILESTONES (At top = 600px to 800px) */}
             <div className="absolute top-[600px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] preserve-3d">
                {[0, 1, 2, 3, 4].map((i) => {
                  const isActivePoint = phase >= 4;
                  return (
                    <div 
                      key={i} 
                      className="absolute preserve-3d" 
                      style={{ 
                        top: `${i * 40}px`, 
                        left: i % 2 === 0 ? '-30px' : '230px',
                        transform: 'rotateX(-90deg)'
                      }}
                    >
                      <div className="w-1 h-20 bg-gradient-to-t from-[#D4AF37]/10 to-transparent" />
                      <div className={`absolute top-[-10px] left-[-4px] w-3 h-3 rounded-full transition-all duration-700 ease-out
                        ${isActivePoint ? 'bg-[#D4AF37] shadow-[0_0_15px_#D4AF37] scale-100' : 'bg-[#333] scale-50'}
                      `} style={{ transitionDelay: `${i * 300}ms` }} />
                    </div>
                  );
                })}
             </div>

             {/* BALANCE RING (At top = 950px, very end) */}
             <div className="absolute top-[1000px] left-1/2 -translate-x-1/2 preserve-3d" style={{ transform: 'rotateX(-90deg)' }}>
                <div className={`relative w-[240px] h-[240px] border-4 border-[#222] rounded-full flex items-center justify-center transition-all duration-1000 bg-[#050505]/80 backdrop-blur-lg
                  ${phase >= 5 ? 'shadow-[0_0_50px_rgba(212,175,55,0.3)]' : ''}
                  ${phase >= 6 ? 'animate-[full-illuminate_2s_ease-in-out_forwards]' : ''}
                `}>
                   <svg width="240" height="240" viewBox="0 0 240 240" className="absolute inset-0 rotate-[-90deg]">
                      {phase >= 5 && <circle cx="120" cy="120" r="116" stroke="#D4AF37" strokeWidth="8" fill="none" strokeDasharray="728" strokeDashoffset="728" className="animate-[lv2-fill-ring_2s_ease-out_forwards]" style={{ animationName: 'gl-draw-ribbon' /* reuse */ }} />}
                   </svg>
                   {/* Central Balance Energy */}
                   <div className={`w-[80px] h-[80px] rounded-full transition-all duration-1000 ${phase >= 5 ? 'bg-[#D4AF37] shadow-[0_0_40px_#D4AF37] opacity-80' : 'bg-[#111]'}`} />
                   
                   {/* Ring Wave */}
                   {phase === 5 && (
                     <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37] animate-[gate-wave_2s_ease-out_forwards]" />
                   )}
                </div>
             </div>

          </div>
       </div>

       {/* FOREGROUND LAYER (Person & Request Doc - Stays relatively static in screen space, simulating camera follow) */}
       <div 
         className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-transform duration-500 ease-out"
         style={{ transform: `translate(${mousePos.x / 15}px, ${mousePos.y / 15}px)` }}
       >
          {/* ABSTRACT 3D PERSON */}
          <div className="relative">
             {/* Person Shadow */}
             <div className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[40px] h-[10px] bg-black/80 blur-sm rounded-full ${phase >= 1 && phase < 7 ? 'animate-[walk-shadow_1s_linear_infinite]' : ''}`} />
             
             {/* Person Body */}
             <div className={`flex flex-col items-center ${phase >= 1 && phase < 7 ? 'animate-[walk-cycle_1s_linear_infinite]' : ''}`}>
               {/* Head */}
               <div className="w-[18px] h-[24px] bg-gradient-to-br from-[#E6C875] via-[#D4AF37] to-[#111] rounded-full mb-1 shadow-[inset_0_-4px_6px_rgba(0,0,0,0.6)]" />
               {/* Torso */}
               <div className="w-[28px] h-[50px] bg-gradient-to-br from-[#333] via-[#1A1A1A] to-[#0A0A0A] rounded-t-xl rounded-b-md border border-[#D4AF37]/30 shadow-[inset_0_4px_10px_rgba(212,175,55,0.2)]" />
               {/* Legs (abstract joined shape) */}
               <div className="w-[24px] h-[35px] bg-gradient-to-b from-[#111] to-[#050505] rounded-b-sm clip-path-legs" />
             </div>
          </div>

          {/* LEAVE REQUEST DOCUMENT */}
          {/* Appears near person, then shoots forward */}
          {phase === 2 && (
             <div className="absolute animate-[doc-appear_1s_ease-out_forwards,doc-shoot_1s_ease-in_forwards_1s]">
                <div className="w-[30px] h-[40px] bg-[#111]/80 backdrop-blur-md border border-[#D4AF37] rounded flex flex-col items-center py-2 gap-1 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                   <div className="w-5 h-[1px] bg-[#D4AF37]" />
                   <div className="w-3 h-[1px] bg-[#D4AF37]" />
                </div>
             </div>
          )}
       </div>

    </div>
  );
}
