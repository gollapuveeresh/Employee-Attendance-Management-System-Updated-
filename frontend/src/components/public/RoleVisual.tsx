import React, { useState, useRef, useEffect } from 'react';
import rbaImage from '../../assets/role-based-access.jpeg';

export default function RoleVisual() {
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

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[24px] z-0">
      {/* ── 17. LIGHTING BREATH EFFECT (Ambient Glow behind card) ── */}
      <div 
        className="absolute inset-[-20px] rounded-[30px] opacity-0 blur-3xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0) 70%)',
          animation: isActive ? 'rba-breath 8s ease-in-out infinite' : 'none',
        }}
      />

      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden rounded-[24px] border cursor-default bg-[#040404] transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 scale-95'}`}
        style={{
          boxShadow: hovered
            ? '0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.15)'
            : '0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.05)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'opacity 1s ease-out, transform 0.6s ease-out, box-shadow 0.6s ease-out',
          borderColor: hovered ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.06)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @media (prefers-reduced-motion: reduce) {
            .rba-anim-reduce { animation: none !important; transform: none !important; }
          }
          @keyframes rba-breath {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
          @keyframes rba-cinematic-motion {
            0% { transform: scale(1) translate(0px, 0px); }
            33.3% { transform: scale(1.025) translate(-3px, -2px); }
            66.6% { transform: scale(1.04) translate(2px, 1px); }
            100% { transform: scale(1) translate(0px, 0px); }
          }
          @keyframes rba-gold-sweep {
            0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
            10% { opacity: 0; }
            30% { opacity: 0.4; }
            70% { opacity: 0.4; }
            90% { opacity: 0; }
            100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
          }
          @keyframes rba-scan-vertical {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { transform: translateY(200%); opacity: 0; }
          }
          @keyframes rba-path-illuminate {
            0% { opacity: 0.1; filter: drop-shadow(0 0 2px #D4AF37); }
            10% { opacity: 0.8; filter: drop-shadow(0 0 10px #D4AF37); }
            30% { opacity: 0.1; filter: drop-shadow(0 0 2px #D4AF37); }
            100% { opacity: 0.1; filter: drop-shadow(0 0 2px #D4AF37); }
          }
          @keyframes rba-corner-pulse {
            0%, 100% { opacity: 0.2; transform: translate(0,0); }
            50% { opacity: 0.9; transform: translate(1px,1px); }
          }
          @keyframes rba-particle-float {
            0% { transform: translate(0, 0) scale(0.8); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translate(10px, -40px) scale(1.2); opacity: 0; }
          }
          @keyframes rba-border-travel {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}} />

        {/* ── 1. & 5. & 16. CINEMATIC PHOTOGRAPH (Base Layer) ─────────────── */}
        <div
          className="absolute inset-[1px] rounded-[23px] overflow-hidden z-0 rba-anim-reduce"
          style={{
            transform: `translate(${mousePos.x / 60}px, ${mousePos.y / 60}px)`,
            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <img
            src={rbaImage}
            alt="Role-Based Access Control"
            className="w-full h-full object-cover origin-center rba-anim-reduce"
            style={{
              animation: isActive ? 'rba-cinematic-motion 14s cubic-bezier(0.45, 0, 0.55, 1) infinite' : 'none',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
          {/* ── 12. GLASS / DEPTH EFFECT ── */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40 pointer-events-none mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent opacity-30 pointer-events-none" />
        </div>

        {/* ── 10. ANIMATED CARD BORDER (Behind content, over photo edge) ─ */}
        {isActive && (
          <div className="absolute inset-0 z-10 pointer-events-none rounded-[24px] overflow-hidden rba-anim-reduce">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80 animate-[rba-border-travel_5s_linear_infinite]" />
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent opacity-80 animate-[rba-border-travel_5s_linear_infinite]" style={{ animationDelay: '2.5s' }} />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-80 animate-[rba-scan-vertical_5s_linear_infinite]" style={{ animationDelay: '1.25s' }} />
            <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-transparent via-[#D4AF37] to-transparent opacity-80 animate-[rba-scan-vertical_5s_linear_infinite]" style={{ animationDelay: '3.75s' }} />
          </div>
        )}

        {/* ── 11. CORNER ACCENTS ──────────────────────────────────── */}
        {isActive && (
          <div className="absolute inset-0 z-20 pointer-events-none rba-anim-reduce">
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] animate-[rba-corner-pulse_4s_ease-in-out_infinite]" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] animate-[rba-corner-pulse_4s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] animate-[rba-corner-pulse_4s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] animate-[rba-corner-pulse_4s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />
          </div>
        )}

        {/* ── 13. FOREGROUND PARALLAX ─────────────── */}
        <div
          className="absolute inset-0 z-30 pointer-events-none rba-anim-reduce"
          style={{
            transform: `translate(${mousePos.x / 20}px, ${mousePos.y / 20}px)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* ── 7. SECURITY SCANNER (Horizontal thin line moving vertically) ── */}
          {isActive && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div 
                className={`w-full h-[1px] bg-[#D4AF37] shadow-[0_0_15px_#D4AF37] animate-[rba-scan-vertical_6s_ease-in-out_infinite] ${hovered ? 'opacity-80' : 'opacity-40'}`} 
                style={{ transition: 'opacity 0.4s' }}
              />
            </div>
          )}

          {/* ── 6. GOLD LIGHT SWEEP (Left to right) ── */}
          {isActive && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-screen">
              <div 
                className="w-[30%] h-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent blur-xl animate-[rba-gold-sweep_7s_ease-in-out_infinite]"
              />
            </div>
          )}

          {/* ── 8. THREE ACCESS PATHS ── */}
          {isActive && (
            <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Path 1 */}
              <path
                d="M 15 80 Q 25 50 35 45"
                stroke="#D4AF37"
                strokeWidth={hovered ? "1" : "0.5"}
                fill="none"
                className="animate-[rba-path-illuminate_6s_ease-in-out_infinite]"
                style={{ transition: 'stroke-width 0.4s' }}
              />
              {/* Path 2 */}
              <path
                d="M 50 85 Q 50 60 55 40"
                stroke="#D4AF37"
                strokeWidth={hovered ? "1.5" : "0.8"}
                fill="none"
                className="animate-[rba-path-illuminate_6s_ease-in-out_infinite]"
                style={{ animationDelay: '1.5s', transition: 'stroke-width 0.4s' }}
              />
              {/* Path 3 */}
              <path
                d="M 85 75 Q 75 40 65 35"
                stroke="#D4AF37"
                strokeWidth={hovered ? "2" : "1"}
                fill="none"
                className="animate-[rba-path-illuminate_6s_ease-in-out_infinite]"
                style={{ animationDelay: '3s', transition: 'stroke-width 0.4s' }}
              />
            </svg>
          )}

          {/* ── 9. GOLD PARTICLE SIGNALS (8-15 particles) ── */}
          {isActive && (
            <div className="absolute inset-0 w-full h-full pointer-events-none rba-anim-reduce md:block hidden">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className={`absolute w-[2px] h-[2px] rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] animate-[rba-particle-float_6s_ease-in-out_infinite] ${hovered ? 'opacity-100' : 'opacity-60'}`} 
                  style={{ 
                    left: `${15 + (i * 7)}%`, 
                    top: `${60 + (i % 4) * 8}%`,
                    animationDelay: `${i * 0.7}s`,
                    transition: 'opacity 0.4s'
                  }} 
                />
              ))}
            </div>
          )}
          
          {/* Mobile restricted particles */}
          {isActive && (
            <div className="absolute inset-0 w-full h-full pointer-events-none rba-anim-reduce md:hidden block">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className={`absolute w-[2px] h-[2px] rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] animate-[rba-particle-float_6s_ease-in-out_infinite] ${hovered ? 'opacity-100' : 'opacity-60'}`} 
                  style={{ 
                    left: `${20 + (i * 20)}%`, 
                    top: `${65 + (i % 2) * 10}%`,
                    animationDelay: `${i * 1.2}s`,
                    transition: 'opacity 0.4s'
                  }} 
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
