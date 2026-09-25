import React, { useState, useRef, useEffect } from 'react';
import notificationsImage from '../../assets/notifications.jpg';

export default function NotificationsVisual() {
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
    <div className="relative w-full aspect-[1600/893] rounded-[24px] z-0">
      {/* ── SOFT OUTER GOLD GLOW (Behind card) ── */}
      <div 
        className="absolute inset-[-20px] rounded-[30px] blur-3xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0) 70%)',
          animation: isActive ? 'notif-ambient-glow 8s ease-in-out infinite' : 'none',
          opacity: hovered ? 1 : 0.8,
          transform: `translate(${mousePos.x / 120}px, ${mousePos.y / 120}px)`,
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
            .notif-anim-reduce { animation: none !important; transform: none !important; }
          }
          @keyframes notif-ambient-glow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          @keyframes notif-cam-move {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.01); }
            50% { transform: scale(1.015); }
            75% { transform: scale(1.01); }
          }
          @keyframes notif-glass-reflect {
            0% { transform: translateX(-150%) skewX(-30deg); opacity: 0; }
            20% { opacity: 0.08; }
            80% { opacity: 0.08; }
            100% { transform: translateX(250%) skewX(-30deg); opacity: 0; }
          }
          @keyframes notif-gold-sweep {
            0% { transform: translateX(-100%); opacity: 0; }
            20% { opacity: 0.15; }
            80% { opacity: 0.15; }
            100% { transform: translateX(200%); opacity: 0; }
          }
          @keyframes notif-border-travel {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes notif-border-travel-y {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
          @keyframes notif-light-pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.5); }
          }
          @keyframes notif-particle-float {
            0% { opacity: 0; transform: translate(0,0) scale(0.8); }
            20% { opacity: 0.7; }
            80% { opacity: 0.7; }
            100% { opacity: 0; transform: translate(10px, -20px) scale(1.2); }
          }
          @keyframes notif-corner-pulse {
            0%, 100% { opacity: 0; transform: translate(0,0); }
            50% { opacity: 0.8; transform: translate(2px,2px); }
          }
        `}} />

        {/* ── CINEMATIC PHOTOGRAPH ─────────────── */}
        <div
          className="absolute inset-0 rounded-[24px] overflow-hidden z-0 notif-anim-reduce"
          style={{
            transform: `translate(${mousePos.x / 100}px, ${mousePos.y / 100}px)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <img
            src={notificationsImage}
            alt="Notifications"
            className="w-full h-full object-cover object-center notif-anim-reduce"
            style={{
              animation: isActive ? 'notif-cam-move 16s ease-in-out infinite' : 'none',
              transform: hovered ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        </div>

        {/* ── NOTIFICATION LIGHT PULSE (Layer 2) ── */}
        {isActive && (
          <div className="absolute inset-0 z-20 pointer-events-none notif-anim-reduce"
               style={{
                 transform: `translate(${mousePos.x / 80}px, ${mousePos.y / 80}px)`,
                 transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
               }}
          >
            {/* Placed generally centrally but offset to look natural near potential devices in photo */}
            <div className="absolute left-[55%] top-[40%] w-8 h-8 rounded-full bg-[#D4AF37] blur-[12px] mix-blend-screen animate-[notif-light-pulse_6s_ease-in-out_infinite]" />
            <div className="absolute left-[55%] top-[40%] w-2 h-2 rounded-full bg-white opacity-80 blur-[2px] animate-[notif-light-pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
          </div>
        )}

        {/* ── NOTIFICATION PARTICLES (Layer 3) ── */}
        {isActive && (
          <div className="absolute inset-0 z-30 pointer-events-none notif-anim-reduce"
               style={{
                 transform: `translate(${mousePos.x / 60}px, ${mousePos.y / 60}px)`,
                 transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
               }}
          >
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_4px_#D4AF37] animate-[notif-particle-float_5s_ease-in-out_infinite]"
                style={{
                  left: `${45 + (i * 4)}%`,
                  top: `${60 - (i * 3)}%`,
                  animationDelay: `${i * 0.7}s`,
                  opacity: 0, // Starts 0, keyframe handles it
                }}
              />
            ))}
          </div>
        )}

        {/* ── GOLD LIGHT SWEEP (Layer 4) ── */}
        {isActive && (
          <div className="absolute inset-0 z-40 pointer-events-none notif-anim-reduce overflow-hidden">
            <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent blur-2xl animate-[notif-gold-sweep_8s_ease-in-out_infinite]" />
          </div>
        )}

        {/* ── GLASS REFLECTION (Layer 4) ── */}
        {isActive && (
          <div 
            className="absolute inset-0 z-40 pointer-events-none notif-anim-reduce overflow-hidden"
            style={{
              transform: `translate(${mousePos.x / 50}px, ${mousePos.y / 50}px)`,
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <div className="absolute top-0 left-0 w-[30%] h-[150%] -translate-y-[25%] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-3xl" style={{ animation: hovered ? 'notif-glass-reflect 8s ease-in-out infinite' : 'notif-glass-reflect 12s ease-in-out infinite' }} />
          </div>
        )}

        {/* ── MOVING GOLD BORDER ─ */}
        {isActive && (
          <div className="absolute inset-0 z-50 pointer-events-none rounded-[24px] overflow-hidden notif-anim-reduce">
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[notif-border-travel_6s_linear_infinite] transition-opacity duration-500`} />
            <div className={`absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[notif-border-travel_6s_linear_infinite] transition-opacity duration-500`} style={{ animationDelay: '3s' }} />
            <div className={`absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[notif-border-travel-y_6s_linear_infinite] transition-opacity duration-500`} style={{ animationDelay: '1.5s' }} />
            <div className={`absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-transparent via-[#D4AF37] to-transparent ${hovered ? 'opacity-80' : 'opacity-40'} animate-[notif-border-travel-y_6s_linear_infinite] transition-opacity duration-500`} style={{ animationDelay: '4.5s' }} />
          </div>
        )}

        {/* ── CORNER ACCENTS ──────────────────────────────────── */}
        {isActive && (
          <div className="absolute inset-0 z-50 pointer-events-none notif-anim-reduce">
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#D4AF37] rounded-tl animate-[notif-corner-pulse_6s_ease-in-out_infinite]" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#D4AF37] rounded-tr animate-[notif-corner-pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }} />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#D4AF37] rounded-br animate-[notif-corner-pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#D4AF37] rounded-bl animate-[notif-corner-pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '4.5s' }} />
          </div>
        )}

      </div>
    </div>
  );
}
