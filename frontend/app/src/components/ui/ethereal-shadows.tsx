"use client";

import React from "react";

export const EtherealShadows = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Subtle Monochrome Distortion / Shadows */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-white opacity-[0.03] blur-[120px] animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-white opacity-[0.02] blur-[100px] animate-pulse"
          style={{ animationDuration: "15s" }}
        />
        <div 
          className="absolute top-[30%] left-[40%] w-[40%] h-[40%] rounded-full bg-white opacity-[0.015] blur-[80px]"
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
    </div>
  );
};
