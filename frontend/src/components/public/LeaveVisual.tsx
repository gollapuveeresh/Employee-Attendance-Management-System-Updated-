import React, { useState, useRef } from 'react';
import leaveImage from '../../assets/leave.jpeg';

export default function LeaveVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

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
      className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-[24px] border border-[#1a1a1a] cursor-default bg-[#040404]"
      style={{
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.15)'
          : '0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.06)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow 500ms ease, transform 500ms ease',
        borderColor: hovered ? 'rgba(212,175,55,0.35)' : 'rgba(255,255,255,0.06)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setMousePos({ x: 0, y: 0 }); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes lv-breathe {
          0%, 100% { transform: scale(1.0); }
          50%       { transform: scale(1.025); }
        }
        @keyframes lv-breathe-hover {
          0%, 100% { transform: scale(1.03); }
          50%       { transform: scale(1.05); }
        }
        @keyframes lv-sweep {
          0%   { transform: translateX(-120%) skewX(-12deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(220%) skewX(-12deg); opacity: 0; }
        }
        @keyframes lv-border-breathe {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.7; }
        }
        @keyframes lv-corner-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.9; transform: scale(1.3); }
        }
        @keyframes lv-corner-pulse2 {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.2); }
        }
        @keyframes lv-glow-border {
          0%, 100% { box-shadow: inset 0 0 0px rgba(212,175,55,0); }
          50%       { box-shadow: inset 0 0 18px rgba(212,175,55,0.12); }
        }
      `}} />

      {/* ── PHOTO LAYER ─────────────────────────────────────────── */}
      <div
        className="absolute inset-[1px] rounded-[23px] overflow-hidden z-0"
        style={{
          transform: `translate(${mousePos.x / 70}px, ${mousePos.y / 70}px)`,
          transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <img
          src={leaveImage}
          alt="Leave Management — corporate office entrance"
          className="w-full h-full object-cover object-center"
          style={{
            animation: hovered
              ? 'lv-breathe-hover 10s ease-in-out infinite'
              : 'lv-breathe 10s ease-in-out infinite',
            transition: 'animation 500ms',
          }}
        />

        {/* Subtle vignette — keeps edges dark so gold effects pop, never blacks out center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.45) 100%)',
          }}
        />

        {/* Bottom fade — anchors card to page */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none bg-gradient-to-t from-black/55 to-transparent" />
      </div>

      {/* ── GOLD LIGHT SWEEP ──────────────────────────────────────── */}
      <div className="absolute inset-[1px] rounded-[23px] overflow-hidden z-10 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[30%] h-full pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 0%, rgba(212,175,55,0.08) 50%, transparent 100%)',
            animation: 'lv-sweep 6s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* ── ANIMATED BORDER GLOW (inside rim) ────────────────────── */}
      <div
        className="absolute inset-[1px] rounded-[23px] z-20 pointer-events-none"
        style={{
          boxShadow: hovered
            ? 'inset 0 0 30px rgba(212,175,55,0.18)'
            : 'inset 0 0 0px rgba(212,175,55,0)',
          border: '1px solid rgba(212,175,55,0.12)',
          animation: 'lv-glow-border 4s ease-in-out infinite',
          transition: 'box-shadow 500ms ease',
        }}
      />

      {/* ── CORNER LIGHT ACCENTS ─────────────────────────────────── */}
      {/* Top-left */}
      <div className="absolute top-3 left-3 z-30 pointer-events-none">
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)',
            animation: 'lv-corner-pulse 3.5s ease-in-out infinite',
          }}
        />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-3 right-3 z-30 pointer-events-none">
        <div
          className="w-5 h-5 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)',
            animation: 'lv-corner-pulse2 4.5s ease-in-out infinite',
            animationDelay: '1.8s',
          }}
        />
      </div>

      {/* ── FOREGROUND PARALLAX LAYER (slightly stronger shift) ──── */}
      <div
        className="absolute inset-0 z-40 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x / 25}px, ${mousePos.y / 25}px)`,
          transition: 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Thin top-edge gold line */}
        <div
          className="absolute top-[1px] left-[12%] right-[12%] h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(212,175,55,0.5) 40%, rgba(212,175,55,0.5) 60%, transparent)',
            animation: 'lv-border-breathe 3s ease-in-out infinite',
          }}
        />
        {/* Thin bottom-edge gold line */}
        <div
          className="absolute bottom-[1px] left-[12%] right-[12%] h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 40%, rgba(212,175,55,0.3) 60%, transparent)',
            animation: 'lv-border-breathe 3s ease-in-out infinite',
            animationDelay: '1.5s',
          }}
        />
      </div>
    </div>
  );
}
