import React, { useState, useRef, useEffect } from 'react';
import responsiveImage from '../../assets/responsive (1).png';

export default function ResponsiveVisual() {
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
    <div className="relative w-full aspect-[2752/1536] rounded-[24px] z-0">
      {/* ── SOFT OUTER GOLD GLOW (Behind card) ── */}
      <div 
        className="absolute inset-[-20px] rounded-[30px] blur-3xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0) 70%)',
          animation: isActive ? 'res-ambient-glow 9s ease-in-out infinite' : 'none',
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
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'opacity 1s ease-out, transform 0.6s ease-out, box-shadow 0.6s ease-out',
          borderColor: hovered ? 'rgba(212,175,55,0.4)' : 'rgba(42,42,42,1)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @media (prefers-reduced-motion: reduce) {
            .res-anim-reduce { animation: none !important; transform: none !important; }
          }
          @keyframes res-ambient-glow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          @keyframes res-glass-reflect {
            0% { transform: translateX(-150%) skewX(-30deg); opacity: 0; }
            20% { opacity: 0.08; }
            80% { opacity: 0.08; }
            100% { transform: translateX(250%) skewX(-30deg); opacity: 0; }
          }
          @keyframes res-border-travel {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes res-border-travel-y {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}} />

        {/* ── CINEMATIC PHOTOGRAPH ─────────────── */}
        <div
          className="absolute inset-0 rounded-[24px] overflow-hidden z-0"
        >
          <img
            src={responsiveImage}
            alt="Responsive Access"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ── MOVING GOLD BORDER ─ */}
        {isActive && (
          <div className="absolute inset-0 z-40 pointer-events-none rounded-[24px] overflow-hidden res-anim-reduce">
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[res-border-travel_6s_linear_infinite] transition-opacity duration-500`} />
            <div className={`absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[res-border-travel_6s_linear_infinite] transition-opacity duration-500`} style={{ animationDelay: '3s' }} />
            <div className={`absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[res-border-travel-y_6s_linear_infinite] transition-opacity duration-500`} style={{ animationDelay: '1.5s' }} />
            <div className={`absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[res-border-travel-y_6s_linear_infinite] transition-opacity duration-500`} style={{ animationDelay: '4.5s' }} />
          </div>
        )}

        {/* ── GLASS REFLECTION ──────────────────────── */}
        {isActive && (
          <div 
            className="absolute inset-0 z-10 pointer-events-none res-anim-reduce overflow-hidden"
            style={{
              transform: `translate(${mousePos.x / 40}px, ${mousePos.y / 40}px)`,
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <div className="absolute top-0 left-0 w-[30%] h-[150%] -translate-y-[25%] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl animate-[res-glass-reflect_12s_ease-in-out_infinite]" />
          </div>
        )}

      </div>
    </div>
  );
}
