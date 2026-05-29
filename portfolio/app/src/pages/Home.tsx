"use client";

import SplineScene from "../components/bg/SplineScene";

export default function Home() {
    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative text-white overflow-hidden px-6">
            {/* Background Scene */}
            <div className="absolute inset-0 z-0">
                <SplineScene />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center gap-8 text-center">
                <button 
                    data-cursor-hide="true"
                    data-cursor-text="Hide"
                    className="relative z-30 px-8 py-4 border border-white/20 hover:border-white transition-colors uppercase tracking-widest text-xs font-bold bg-white/5 backdrop-blur-sm pointer-events-auto"
                >
                    Hello 
                </button>
                
                <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-[0.2em]">Home Page</h1>
            </div>
        </section>
    );
}
