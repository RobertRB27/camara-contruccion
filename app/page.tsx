'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Hero } from '@/components/sections/hero';
import { AIProjectGenerator } from '@/components/ai/ai-project-generator';
import { Features } from '@/components/sections/features';
import { Footer } from '@/components/layout/footer';
import { AuthModal } from '@/components/auth/auth-modal';

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onAuthClick={handleAuthClick} />
      
      <main>
        <Hero onGetStarted={() => handleAuthClick('register')} />
        
        <section id="ai-generator" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI Project Generator
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Describe your construction project and let our AI generate comprehensive 
                plans, timelines, and cost estimates in seconds.
              </p>
            </div>
            <AIProjectGenerator />
          </div>
        </section>

        <Features />
      </main>

      <Footer />

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}