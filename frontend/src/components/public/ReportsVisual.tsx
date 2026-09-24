import React, { useState, useRef, useEffect } from 'react';
import reportAnalyticsImage from '../../assets/report-analytics.png';

export default function ReportsVisual() {
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
      {/* ── 2. OUTER GOLD GLOW (Behind card) ── */}
      <div 
        className="absolute inset-[-20px] rounded-[30px] blur-3xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0) 70%)',
          animation: isActive ? 'rep-ambient-glow 8s ease-in-out infinite' : 'none',
          opacity: hovered ? 1 : 0.8,
          transform: `translate(${mousePos.x / 100}px, ${mousePos.y / 100}px)`,
          transition: 'opacity 0.6s ease-out, transform 0.4s ease-out'
        }}
      />

      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden rounded-[24px] border border-[#2A2A2A] cursor-default bg-[#0A0A0A] transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{
          boxShadow: hovered
            ? '0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.15)'
            : '0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.05)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'opacity 1s ease-out, transform 0.6s ease-out, box-shadow 0.6s ease-out',
          borderColor: hovered ? 'rgba(212,175,55,0.4)' : 'rgba(42,42,42,1)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @media (prefers-reduced-motion: reduce) {
            .rep-anim-reduce { animation: none !important; transform: none !important; }
          }
          @keyframes rep-ambient-glow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          @keyframes rep-cam-move {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          @keyframes rep-glass-reflect {
            0% { transform: translateX(-150%) skewX(-30deg); opacity: 0; }
            20% { opacity: 0.08; }
            80% { opacity: 0.08; }
            100% { transform: translateX(250%) skewX(-30deg); opacity: 0; }
          }
          @keyframes rep-border-travel {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes rep-border-travel-y {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
          @keyframes rep-corner-pulse {
            0%, 100% { opacity: 0; transform: translate(0,0); }
            50% { opacity: 0.8; transform: translate(3px,3px); }
          }
        `}} />

        {/* ── 4. CINEMATIC PHOTOGRAPH (Layer 1) ─────────────── */}
        <div
          className="absolute inset-[1px] rounded-[23px] overflow-hidden z-0 rep-anim-reduce"
          style={{
            transform: `translate(${mousePos.x / 60}px, ${mousePos.y / 60}px)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <img
            src={reportAnalyticsImage}
            alt="Reports & Analytics"
            className="w-full h-full object-cover origin-center rep-anim-reduce"
            style={{
              animation: isActive ? 'rep-cam-move 14s ease-in-out infinite' : 'none',
              transform: hovered ? 'scale(1.025)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        </div>

        {/* ── 1. SUBTLE GOLD BORDER ANIMATION ─ */}
        {isActive && (
          <div className="absolute inset-0 z-40 pointer-events-none rounded-[24px] overflow-hidden rep-anim-reduce">
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[rep-border-travel_6s_linear_infinite] transition-opacity duration-500`} />
            <div className={`absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[rep-border-travel_6s_linear_infinite] transition-opacity duration-500`} style={{ animationDelay: '3s' }} />
            <div className={`absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[rep-border-travel-y_6s_linear_infinite] transition-opacity duration-500`} style={{ animationDelay: '1.5s' }} />
            <div className={`absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[rep-border-travel-y_6s_linear_infinite] transition-opacity duration-500`} style={{ animationDelay: '4.5s' }} />
          </div>
        )}

        {/* ── 3. CORNER ACCENTS ──────────────────────────────────── */}
        {isActive && (
          <div className="absolute inset-0 z-40 pointer-events-none rep-anim-reduce">
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37] rounded-tl animate-[rep-corner-pulse_6s_ease-in-out_infinite]" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4AF37] rounded-tr animate-[rep-corner-pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }} />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4AF37] rounded-br animate-[rep-corner-pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4AF37] rounded-bl animate-[rep-corner-pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '4.5s' }} />
          </div>
        )}

        {/* ── 5. GLASS REFLECTION ──────────────────────── */}
        {isActive && (
          <div 
            className="absolute inset-0 z-10 pointer-events-none rep-anim-reduce overflow-hidden"
            style={{
              transform: `translate(${mousePos.x / 40}px, ${mousePos.y / 40}px)`,
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <div className="absolute top-0 left-0 w-[30%] h-[150%] -translate-y-[25%] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl animate-[rep-glass-reflect_12s_ease-in-out_infinite]" />
          </div>
        )}

      </div>
    </div>
  );
}
