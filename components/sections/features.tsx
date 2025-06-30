'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Calculator, 
  FileSpreadsheet, 
  Shield, 
  Clock, 
  Users,
  BarChart3,
  Smartphone,
  Cloud
} from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Brain,
      title: 'IA Avanzada',
      description: 'Algoritmos de machine learning para estimaciones precisas y optimización automática de recursos.',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Calculator,
      title: 'Cálculos Precisos',
      description: 'Estimaciones de costos exactas basadas en precios actuales del mercado ecuatoriano.',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: FileSpreadsheet,
      title: 'Exportación Excel',
      description: 'Genera reportes detallados en Excel con un solo clic para compartir con tu equipo.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Shield,
      title: 'Análisis de Riesgos',
      description: 'Identifica y mitiga riesgos potenciales antes de que afecten tu proyecto.',
      color: 'text-red-600 bg-red-100'
    },
    {
      icon: Clock,
      title: 'Cronogramas Inteligentes',
      description: 'Planificación automática de tareas con dependencias y optimización de tiempos.',
      color: 'text-orange-600 bg-orange-100'
    },
    {
      icon: Users,
      title: 'Gestión de Equipos',
      description: 'Administra roles, permisos y colaboración en tiempo real entre todos los stakeholders.',
      color: 'text-indigo-600 bg-indigo-100'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avanzados',
      description: 'Dashboards interactivos con métricas clave y KPIs de rendimiento del proyecto.',
      color: 'text-teal-600 bg-teal-100'
    },
    {
      icon: Smartphone,
      title: 'App Móvil',
      description: 'Accede a tus proyectos desde cualquier lugar con nuestra app móvil nativa.',
      color: 'text-pink-600 bg-pink-100'
    },
    {
      icon: Cloud,
      title: 'Cloud Seguro',
      description: 'Almacenamiento en la nube con encriptación de grado militar y backups automáticos.',
      color: 'text-cyan-600 bg-cyan-100'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Características Avanzadas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Herramientas profesionales diseñadas específicamente para la industria 
            de la construcción en Ecuador.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-brand-gradient rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para revolucionar tus proyectos?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Únete a más de 500 constructores que ya confían en nuestra plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-brand-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Prueba Gratuita
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-primary transition-colors">
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}