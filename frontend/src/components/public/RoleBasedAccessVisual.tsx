import React, { useState, useRef, useEffect } from 'react';
import rbaImage from '../../assets/role-based-access.jpeg';

export default function RoleBasedAccessVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-[24px] border border-[#1a1a1a] cursor-default bg-[#040404] transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 scale-95'}`}
      style={{
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.15)'
          : '0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.05)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'opacity 1s ease-out, transform 0.6s ease-out, box-shadow 0.6s ease-out',
        borderColor: hovered ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.06)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setMousePos({ x: 0, y: 0 }); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rba-cinematic-motion {
          0% { transform: scale(1) translate(0px, 0px); }
          33.3% { transform: scale(1.018) translate(-3px, -2px); }
          66.6% { transform: scale(1.035) translate(2px, 1px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        @keyframes rba-scan-horizontal {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        @keyframes rba-scan-vertical {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        @keyframes rba-path-illuminate {
          0%, 100% { opacity: 0.1; stroke-dashoffset: 200; filter: drop-shadow(0 0 2px #D4AF37); }
          20% { opacity: 0.8; stroke-dashoffset: 0; filter: drop-shadow(0 0 10px #D4AF37); }
          40% { opacity: 0.1; stroke-dashoffset: -200; filter: drop-shadow(0 0 2px #D4AF37); }
        }
        @keyframes rba-corner-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1) translate(0,0); }
          50% { opacity: 0.9; transform: scale(1.2) translate(1px,1px); }
        }
        @keyframes rba-particle-float {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
        }
        @keyframes rba-border-travel {
          0% { transform: translateX(-100%) rotate(0deg); }
          100% { transform: translateX(200%) rotate(0deg); }
        }
      `}} />

      {/* ── 1. CINEMATIC PHOTOGRAPH (Base Layer) ────────────────────── */}
      <div
        className="absolute inset-[1px] rounded-[23px] overflow-hidden z-0"
        style={{
          transform: `translate(${mousePos.x / 60}px, ${mousePos.y / 60}px)`,
          transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <img
          src={rbaImage}
          alt="Role-Based Access Control"
          className="w-full h-full object-cover origin-center"
          style={{
            animation: 'rba-cinematic-motion 12s cubic-bezier(0.45, 0, 0.55, 1) infinite',
            // Slight extra scale on hover handled via standard tailwind below if needed, 
            // but the cinematic motion handles base scale. We use a wrapper scale for hover:
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        {/* Very subtle edge vignette to keep frame clean */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* ── 2. ANIMATED GOLD BORDER (Behind content, over photo edge) ─ */}
      {isActive && (
        <div className="absolute inset-0 z-10 pointer-events-none rounded-[24px] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60 animate-[rba-border-travel_4s_linear_infinite]" />
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent opacity-60 animate-[rba-border-travel_4s_linear_infinite]" style={{ animationDelay: '2s' }} />
          <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-60 animate-[rba-scan-vertical_4s_linear_infinite]" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-transparent via-[#D4AF37] to-transparent opacity-60 animate-[rba-scan-vertical_4s_linear_infinite]" style={{ animationDelay: '3s' }} />
        </div>
      )}

      {/* ── 3. CORNER ANIMATIONS ──────────────────────────────────── */}
      {isActive && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] animate-[rba-corner-pulse_4s_ease-in-out_infinite]" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] animate-[rba-corner-pulse_4s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] animate-[rba-corner-pulse_4s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] animate-[rba-corner-pulse_4s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />
        </div>
      )}

      {/* ── 4. FOREGROUND PARALLAX (Scanners & Paths) ─────────────── */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x / 20}px, ${mousePos.y / 20}px)`,
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* SECURE ACCESS SCANNER (Vertical thin line) */}
        {isActive && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div 
              className={`w-full h-[1px] bg-[#D4AF37] shadow-[0_0_15px_#D4AF37] animate-[rba-scan-vertical_6s_ease-in-out_infinite] ${hovered ? 'opacity-80' : 'opacity-40'}`} 
              style={{ transition: 'opacity 0.4s' }}
            />
          </div>
        )}

        {/* MULTI-LAYER GOLD LIGHT SCANNING (Horizontal soft beam) */}
        {isActive && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-screen">
            <div 
              className="w-[20%] h-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent blur-md animate-[rba-scan-horizontal_8s_ease-in-out_infinite]"
              style={{ transform: 'skewX(-15deg)' }}
            />
          </div>
        )}

        {/* THREE ACCESS PATHS (Abstract lines mapping to the 3 structures) */}
        {isActive && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Path 1: Left Structure (Employee) */}
            <path
              d="M 20 80 L 25 60 L 35 60"
              stroke="#D4AF37"
              strokeWidth={hovered ? "0.8" : "0.5"}
              fill="none"
              strokeDasharray="100 200"
              className="animate-[rba-path-illuminate_6s_ease-in-out_infinite]"
              style={{ transition: 'stroke-width 0.4s' }}
            />
            {/* Path 2: Center Structure (HR) */}
            <path
              d="M 45 80 L 50 50 L 60 50"
              stroke="#D4AF37"
              strokeWidth={hovered ? "1" : "0.5"}
              fill="none"
              strokeDasharray="100 200"
              className="animate-[rba-path-illuminate_6s_ease-in-out_infinite]"
              style={{ animationDelay: '2s', transition: 'stroke-width 0.4s' }}
            />
            {/* Path 3: Right Structure (Admin) */}
            <path
              d="M 70 85 L 75 40 L 90 40"
              stroke="#D4AF37"
              strokeWidth={hovered ? "1.2" : "0.8"}
              fill="none"
              strokeDasharray="100 200"
              className="animate-[rba-path-illuminate_6s_ease-in-out_infinite]"
              style={{ animationDelay: '4s', transition: 'stroke-width 0.4s' }}
            />
          </svg>
        )}

        {/* GOLD PARTICLE SYSTEM (Controlled signals along paths) */}
        {isActive && (
          <>
            <div className={`absolute left-[22%] top-[70%] w-1 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_5px_#D4AF37] animate-[rba-particle-float_6s_ease-in-out_infinite] ${hovered ? 'opacity-100' : 'opacity-60'}`} />
            <div className={`absolute left-[48%] top-[60%] w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_8px_#FFF] animate-[rba-particle-float_6s_ease-in-out_infinite] ${hovered ? 'opacity-100' : 'opacity-60'}`} style={{ animationDelay: '2s' }} />
            <div className={`absolute left-[72%] top-[65%] w-1 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_6px_#D4AF37] animate-[rba-particle-float_6s_ease-in-out_infinite] ${hovered ? 'opacity-100' : 'opacity-60'}`} style={{ animationDelay: '4s' }} />
          </>
        )}
      </div>
    </div>
  );
}
