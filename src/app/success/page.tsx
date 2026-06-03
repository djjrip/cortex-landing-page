'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="z-10 max-w-2xl flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
      <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-4xl mb-6">
        ✓
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
        Payment Successful
      </h1>
      <p className="text-lg text-white/60 mb-8 font-light">
        Welcome to Project Cortex. Your lifetime license has been secured.
      </p>
      
      <div className="w-full bg-black/50 rounded-lg p-6 border border-white/10 mb-8 text-left">
        <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Next Steps</h3>
        <ol className="list-decimal list-inside text-white/80 space-y-3 font-light">
          <li>Check your email for your unique License Key.</li>
          <li>Download the Native Desktop App installer via the secure link in your email.</li>
          <li>Run the installer and enter your License Key upon first launch.</li>
        </ol>
      </div>

      <div className="text-xs text-white/30 font-mono">
        Session ID: {sessionId || 'N/A'}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
