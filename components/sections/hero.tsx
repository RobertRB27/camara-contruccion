'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section id="home" className="pt-20 pb-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-light text-brand-primary text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Powered by AI
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Gestión de
                <span className="gradient-text block">
                  Construcción
                </span>
                Inteligente
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Revoluciona tus proyectos de construcción con IA avanzada. 
                Genera planes, estima costos y optimiza recursos automáticamente.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-brand-gradient hover:opacity-90 text-white px-8 py-4 text-lg"
              >
                Comenzar Gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-brand-primary text-brand-primary hover:bg-brand-light px-8 py-4 text-lg"
              >
                Ver Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary">500+</div>
                <div className="text-sm text-gray-600">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary">98%</div>
                <div className="text-sm text-gray-600">Precisión</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary">24/7</div>
                <div className="text-sm text-gray-600">Soporte</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white rounded-2xl shadow-2xl p-8 construction-pattern">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Proyecto: Torre Residencial
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">En Progreso</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-light rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-4 h-4 text-brand-primary" />
                        <span className="text-sm font-medium">Presupuesto</span>
                      </div>
                      <div className="text-2xl font-bold text-brand-primary">
                        $2.5M
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Progreso</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        67%
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cimentación</span>
                      <span className="text-sm font-medium text-green-600">Completado</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-full"></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Estructura</span>
                      <span className="text-sm font-medium text-brand-primary">En Progreso</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-brand-primary h-2 rounded-full w-2/3"></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Acabados</span>
                      <span className="text-sm font-medium text-gray-400">Pendiente</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-300 h-2 rounded-full w-1/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-brand-gradient opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brand-secondary opacity-10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}