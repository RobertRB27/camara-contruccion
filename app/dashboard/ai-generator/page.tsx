'use client';

import { AIProjectGenerator } from '@/components/ai/ai-project-generator';

export default function AIGeneratorPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Generador de Proyectos con IA
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Describe tu proyecto de construcción y deja que nuestra IA genere 
          planes detallados, cronogramas y estimaciones de costos en segundos.
        </p>
      </div>

      {/* AI Generator Component */}
      <AIProjectGenerator />
    </div>
  );
}