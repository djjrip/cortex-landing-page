'use client';

import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error(error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      
      {/* Navigation */}
      <nav className="w-full flex items-center justify-between p-6 absolute top-0 z-50">
        <div className="font-black tracking-tighter text-xl">
          PROJECT CORTEX
        </div>
        <button onClick={handleCheckout} disabled={isLoading} className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
          {isLoading ? 'Processing...' : 'Get Lifetime Access'}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="z-10 max-w-4xl flex flex-col items-center">
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-xs font-medium tracking-widest uppercase text-emerald-400">
            Now Available as a Native Desktop App
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            THE AUTONOMOUS <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              SECOND BRAIN.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mb-12">
            Stop typing linear notes. Start mapping spatial thoughts. Project Cortex is a WebGL-powered 3D Neural Network that physically structures your ideas in real-time using OpenAI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button 
              onClick={handleCheckout}
              disabled={isLoading}
              className="px-8 py-4 bg-white text-black font-bold tracking-wide rounded-lg hover:bg-emerald-400 hover:text-black hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(52,211,118,0.4)] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? 'Loading Checkout...' : 'Buy Lifetime License — $149'}
            </button>
            <p className="text-xs text-white/40 tracking-wide mt-4 sm:mt-0 sm:ml-4">
              Bring Your Own Key (BYOK)<br/>Zero Monthly Server Fees.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="w-full py-32 px-6 border-t border-white/10 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6 font-bold">1</div>
            <h3 className="text-xl font-bold mb-4">Spatial Intelligence</h3>
            <p className="text-white/50 text-sm leading-relaxed">Watch your thoughts physically explode into a 3D architecture. Synaptic mass scales node size automatically based on importance.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mb-6 font-bold">2</div>
            <h3 className="text-xl font-bold mb-4">True LLM Native</h3>
            <p className="text-white/50 text-sm leading-relaxed">Plug in your OpenAI API Key. Type a demand, and watch gpt-4o-mini autonomously spawn highly actionable sub-tasks into your universe.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 mb-6 font-bold">3</div>
            <h3 className="text-xl font-bold mb-4">Native Desktop Performance</h3>
            <p className="text-white/50 text-sm leading-relaxed">Powered by a Rust Tauri shell and native SQLite bindings. Lightning fast. Unbelievably low memory footprint. 100% local data privacy.</p>
          </div>
        </div>
      </section>

    </main>
  );
}
