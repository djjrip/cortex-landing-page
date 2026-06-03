'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

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
      if (res.ok) { setSubscribed(true); setEmail(''); }
    } catch (error) { console.error(error); }
    finally { setIsSubscribing(false); }
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) { console.error(error); }
    finally { setIsLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[#020206] text-white overflow-x-hidden">

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass rounded-full px-5 py-2.5 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="font-mono text-xs tracking-widest text-white/70 uppercase">Project Cortex</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="glass rounded-full px-5 py-2.5 text-xs font-bold tracking-widest uppercase text-emerald-400 hover:text-white hover:bg-white/5 transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Get Access — $149'}
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden grid-bg">

        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/4 rounded-full blur-[160px] pointer-events-none" />

        {/* 3D Graph — fills the whole hero */}
        <div className="absolute inset-0 opacity-70 pointer-events-auto">
          <InteractiveDemo />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8">

          {/* Badge */}
          <div className="fade-in-up gradient-border glass rounded-full px-5 py-2 flex items-center gap-3 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-emerald-400 uppercase">
              Live Now · Native Windows Desktop App
            </span>
          </div>

          {/* Headline */}
          <h1 className="fade-in-up-delay-1 text-[clamp(3rem,8vw,7rem)] font-bold tracking-[-0.03em] leading-[0.92] text-white">
            Your thoughts,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 glow-emerald">
              mapped in 3D.
            </span>
          </h1>

          {/* Sub */}
          <p className="fade-in-up-delay-2 text-[clamp(1rem,2vw,1.25rem)] text-white/50 max-w-xl leading-relaxed font-light">
            Type a demand. Watch GPT-4 explode it into a living constellation of interconnected ideas, tasks, and strategy — in real-time.
          </p>

          {/* CTAs */}
          <div className="fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 items-center pointer-events-auto w-full max-w-md">
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="btn-primary w-full sm:w-auto flex-1 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-bold text-sm tracking-wide rounded-xl disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Buy Lifetime License — $149'}
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto flex-1 px-8 py-4 glass rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all text-center"
            >
              See How It Works ↓
            </a>
          </div>

          {/* Social proof strip */}
          <div className="fade-in-up-delay-4 flex items-center gap-6 text-white/30 text-xs font-mono">
            <span>✓ No subscriptions</span>
            <span className="w-px h-3 bg-white/10" />
            <span>✓ 100% local data</span>
            <span className="w-px h-3 bg-white/10" />
            <span>✓ Bring your own API key</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 z-10">
          <span className="font-mono text-[9px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative z-20 border-y border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '250+', label: 'Nodes per brain map' },
            { num: '<3s', label: 'GPT-4 response time' },
            { num: '0ms', label: 'Server latency (100% local)' },
            { num: '$149', label: 'One-time, forever' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-1">
              <span className="font-mono text-3xl font-bold text-emerald-400 number-glow">{s.num}</span>
              <span className="text-xs text-white/30 uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-20 py-32 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-20">
            <p className="font-mono text-[10px] tracking-[0.3em] text-emerald-400 uppercase mb-4">Why Cortex</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built different.<br /><span className="text-white/40">From the ground up.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                color: 'from-blue-500/10 to-blue-500/0',
                border: 'border-blue-500/20',
                tag: 'Performance',
                title: 'Native Rust Core',
                body: 'Built with Tauri — not Electron. 10x faster, 80% less RAM. A desktop app that actually respects your machine.'
              },
              {
                icon: '🧠',
                color: 'from-emerald-500/10 to-emerald-500/0',
                border: 'border-emerald-500/20',
                tag: 'Intelligence',
                title: 'True LLM Native',
                body: 'Plug in your OpenAI key. Type any demand and watch GPT-4o instantly architect a full knowledge graph in 3D space.'
              },
              {
                icon: '🔒',
                color: 'from-purple-500/10 to-purple-500/0',
                border: 'border-purple-500/20',
                tag: 'Privacy',
                title: 'Zero Cloud. 100% Local.',
                body: 'Your data lives in native SQLite on your machine. No servers. No subscriptions. No one can read your thoughts but you.'
              },
              {
                icon: '🌌',
                color: 'from-pink-500/10 to-pink-500/0',
                border: 'border-pink-500/20',
                tag: 'Visualization',
                title: 'Spatial Intelligence',
                body: 'Three.js WebGL renderer with volumetric bloom shaders. Your brain becomes a galaxy you can fly through and explore.'
              },
              {
                icon: '∞',
                color: 'from-amber-500/10 to-amber-500/0',
                border: 'border-amber-500/20',
                tag: 'Ownership',
                title: 'Lifetime License',
                body: '$149. One payment. Forever. No monthly fees. No price hikes. Yours until the heat death of the universe.'
              },
              {
                icon: '🔑',
                color: 'from-rose-500/10 to-rose-500/0',
                border: 'border-rose-500/20',
                tag: 'BYOK',
                title: 'Your Key. Your Costs.',
                body: 'Bring Your Own OpenAI API Key. Average cost per session: $0.001. We take zero margin on your AI usage.'
              },
            ].map((f) => (
              <div key={f.title} className={`group relative p-8 rounded-2xl bg-gradient-to-b ${f.color} border ${f.border} hover:border-opacity-50 transition-all duration-500 hover:-translate-y-1`}>
                <div className="text-2xl mb-6">{f.icon}</div>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 mb-2">{f.tag}</p>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-20 py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-mono text-[10px] tracking-[0.3em] text-emerald-400 uppercase mb-4">Workflow</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Three steps.<br /><span className="text-white/40">Infinite thoughts.</span></h2>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { step: '01', title: 'Type your demand', body: 'Open Project Cortex. Enter any thought, goal, or problem in plain language.' },
              { step: '02', title: 'GPT-4 maps the universe', body: 'In under 3 seconds, the AI engine decomposes your demand into interconnected sub-tasks, concepts, and strategies.' },
              { step: '03', title: 'Explore your spatial mind', body: 'Fly through the 3D constellation. Click any node to inspect it. Drag nodes to reorganize your thinking. Add more demands and watch the universe expand.' },
            ].map((s) => (
              <div key={s.step} className="glass rounded-2xl p-8 flex gap-8 items-start hover:bg-white/5 transition-all group">
                <span className="font-mono text-5xl font-bold text-white/10 group-hover:text-emerald-500/30 transition-colors shrink-0">{s.step}</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-white/50 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="relative z-20 py-32 px-6 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[0.3em] text-emerald-400 uppercase mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">Simple. Fair.<br /><span className="text-white/40">One time.</span></h2>

          <div className="gradient-border rounded-3xl p-10 glass-strong text-left relative overflow-hidden">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 shimmer opacity-30 pointer-events-none rounded-3xl" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-2">Lifetime License</p>
                  <div className="flex items-end gap-2">
                    <span className="text-6xl font-bold">$149</span>
                    <span className="text-white/30 text-sm mb-2 line-through">$299</span>
                  </div>
                  <p className="text-white/40 text-sm mt-1">Pay once. Use forever. First 50 buyers only.</p>
                </div>
                <div className="glass rounded-xl px-3 py-1.5">
                  <span className="font-mono text-[9px] text-emerald-400 tracking-widest uppercase">Early Access</span>
                </div>
              </div>

              <div className="space-y-3 mb-10">
                {[
                  'Native Windows desktop application (.exe)',
                  'Python AI sidecar with OpenAI integration',
                  'Unlimited demands & neural maps',
                  '100% local SQLite database',
                  'All future updates included',
                  'Priority support via email',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs shrink-0">✓</span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="btn-primary w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-bold text-sm tracking-wide rounded-xl disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Claim Lifetime Access — $149'}
              </button>
            </div>
          </div>

          {/* Waitlist fallback */}
          <div className="mt-8">
            {subscribed ? (
              <p className="text-emerald-400 text-sm font-medium">&#10003; You&apos;re on the list. We&apos;ll reach out soon.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Or join the waitlist for free updates..."
                  required
                  className="flex-1 px-4 py-3 glass rounded-xl text-sm placeholder-white/20 focus:outline-none focus:border-emerald-500/40 border border-transparent transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-5 py-3 glass rounded-xl text-sm font-bold hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  {isSubscribing ? '...' : 'Join'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-20 border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Project Cortex</span>
          </div>
          <p className="font-mono text-xs text-white/20 tracking-wide">© 2025 · Built by a bootstrapped founder · Your data, your machine, your mind.</p>
        </div>
      </footer>

    </main>
  );
}
