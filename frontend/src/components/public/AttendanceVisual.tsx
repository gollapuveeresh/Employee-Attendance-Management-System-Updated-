import React from 'react';
import attendanceImage from '../../assets/attendance-clean.jpeg';

export default function AttendanceVisual() {
  return (
    <div className="relative w-full h-full aspect-square md:aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#1a1a1a] flex items-center justify-center bg-[#040404]">
      {/* 1. MAIN PHOTOGRAPH LAYER (Base) */}
      <div className="absolute inset-[1px] rounded-[23px] overflow-hidden z-0">
        {/* EXACT imported image but using the clean version */}
        <img 
          src={attendanceImage} 
          alt="Employee entering corporate workplace" 
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
        
        {/* 2. SUBTLE DARK GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
      </div>
    </div>
  );
}
