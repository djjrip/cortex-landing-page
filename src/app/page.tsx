'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D graph so it only renders on the client (prevents Vercel SSR crash)
const InteractiveDemo = dynamic(() => import('@/components/InteractiveDemo'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      setIsSubscribing(true);
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        alert('Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubscribing(false);
    }
  };

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
      <nav className="w-full flex items-center justify-between p-6 absolute top-0 z-50 pointer-events-none">
        <div className="font-black tracking-tighter text-xl pointer-events-auto">
          PROJECT CORTEX
        </div>
        <button onClick={handleCheckout} disabled={isLoading} className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors pointer-events-auto">
          {isLoading ? 'Processing...' : 'Get Lifetime Access'}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        
        {/* Interactive WebGL Background */}
        <InteractiveDemo />

        {/* Foreground Content - Note pointer-events-none so mouse clicks pass through to the graph, except on buttons */}
        <div className="z-10 max-w-4xl flex flex-col items-center pointer-events-none">
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-md mb-8 text-xs font-medium tracking-widest uppercase text-emerald-400">
            Now Available as a Native Desktop App
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
            THE AUTONOMOUS <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              SECOND BRAIN.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mb-12 drop-shadow-md">
            Stop typing linear notes. Start mapping spatial thoughts. Drag and spin the universe behind you. Project Cortex physically structures your ideas in real-time using OpenAI.
          </p>
          
          <div className="flex flex-col gap-6 items-center pointer-events-auto w-full max-w-md">
            <button 
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full px-8 py-4 bg-white text-black font-bold tracking-wide rounded-lg hover:bg-emerald-400 hover:text-black hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(52,211,118,0.4)] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? 'Loading Checkout...' : 'Buy Lifetime License — $149'}
            </button>
            
            <div className="relative flex items-center w-full my-2">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-bold text-white/30 uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {subscribed ? (
              <div className="w-full py-3 px-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium">
                ✓ You're on the waitlist. We'll email you.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full flex gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for free updates..." 
                  required
                  className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-500/50 text-sm placeholder-white/30 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-3 bg-white/10 border border-white/10 rounded-lg text-sm font-bold hover:bg-white/20 transition-colors disabled:opacity-50"
                >
                  {isSubscribing ? '...' : 'Join'}
                </button>
              </form>
            )}
            
            <p className="text-xs text-white/40 tracking-wide drop-shadow-md">
              Bring Your Own Key (BYOK) • Zero Monthly Server Fees.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-20 w-full py-32 px-6 border-t border-white/10 bg-gradient-to-b from-black to-zinc-950">
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
