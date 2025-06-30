'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  Users, 
  Truck, 
  AlertTriangle,
  FileText,
  Download
} from 'lucide-react';
import { ProjectTimeline } from './project-timeline';
import { CostBreakdown } from './cost-breakdown';
import { ResourcePlanning } from './resource-planning';

interface GeneratedProject {
  title: string;
  description: string;
  timeline: {
    totalDuration: number;
    phases: Array<{
      name: string;
      duration: number;
      startDate: string;
      endDate: string;
      progress: number;
      status: 'pending' | 'in-progress' | 'completed';
    }>;
  };
  costs: {
    total: number;
    breakdown: Array<{
      category: string;
      amount: number;
      percentage: number;
    }>;
  };
  materials: Array<{
    item: string;
    quantity: number;
    unit: string;
    unitCost: number;
    totalCost: number;
  }>;
  equipment: Array<{
    item: string;
    quantity: number;
    dailyRate: number;
    duration: number;
    totalCost: number;
  }>;
  labor: Array<{
    role: string;
    quantity: number;
    dailyRate: number;
    duration: number;
    totalCost: number;
  }>;
  risks: Array<{
    risk: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
  }>;
}

export function AIProjectGenerator() {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProject, setGeneratedProject] = useState<GeneratedProject | null>(null);
  const [streamingText, setStreamingText] = useState('');

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    setStreamingText('');
    setGeneratedProject(null);

    // Simulate AI streaming response
    const responses = [
      'Analizando descripción del proyecto...',
      'Calculando materiales necesarios...',
      'Estimando costos de mano de obra...',
      'Generando cronograma de trabajo...',
      'Evaluando riesgos potenciales...',
      'Optimizando recursos...',
      'Finalizando plan del proyecto...'
    ];

    for (let i = 0; i < responses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setStreamingText(responses[i]);
    }

    // Generate mock project data
    const mockProject: GeneratedProject = {
      title: 'Proyecto de Construcción Residencial',
      description: input,
      timeline: {
        totalDuration: 180,
        phases: [
          {
            name: 'Planificación y Permisos',
            duration: 30,
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            progress: 100,
            status: 'completed'
          },
          {
            name: 'Excavación y Cimentación',
            duration: 45,
            startDate: '2024-01-31',
            endDate: '2024-03-15',
            progress: 80,
            status: 'in-progress'
          },
          {
            name: 'Estructura Principal',
            duration: 60,
            startDate: '2024-03-16',
            endDate: '2024-05-15',
            progress: 0,
            status: 'pending'
          },
          {
            name: 'Instalaciones',
            duration: 30,
            startDate: '2024-05-16',
            endDate: '2024-06-15',
            progress: 0,
            status: 'pending'
          },
          {
            name: 'Acabados',
            duration: 45,
            startDate: '2024-06-16',
            endDate: '2024-07-30',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      costs: {
        total: 250000,
        breakdown: [
          { category: 'Materiales', amount: 125000, percentage: 50 },
          { category: 'Mano de Obra', amount: 75000, percentage: 30 },
          { category: 'Equipos', amount: 25000, percentage: 10 },
          { category: 'Permisos', amount: 12500, percentage: 5 },
          { category: 'Contingencia', amount: 12500, percentage: 5 }
        ]
      },
      materials: [
        { item: 'Cemento', quantity: 500, unit: 'sacos', unitCost: 8, totalCost: 4000 },
        { item: 'Hierro', quantity: 15, unit: 'toneladas', unitCost: 800, totalCost: 12000 },
        { item: 'Arena', quantity: 200, unit: 'm³', unitCost: 25, totalCost: 5000 },
        { item: 'Grava', quantity: 150, unit: 'm³', unitCost: 30, totalCost: 4500 },
        { item: 'Bloques', quantity: 5000, unit: 'unidades', unitCost: 0.8, totalCost: 4000 }
      ],
      equipment: [
        { item: 'Excavadora', quantity: 1, dailyRate: 300, duration: 15, totalCost: 4500 },
        { item: 'Mezcladora', quantity: 2, dailyRate: 80, duration: 60, totalCost: 9600 },
        { item: 'Grúa', quantity: 1, dailyRate: 500, duration: 30, totalCost: 15000 },
        { item: 'Andamios', quantity: 1, dailyRate: 50, duration: 90, totalCost: 4500 }
      ],
      labor: [
        { role: 'Maestro de Obra', quantity: 1, dailyRate: 80, duration: 180, totalCost: 14400 },
        { role: 'Albañiles', quantity: 4, dailyRate: 50, duration: 150, totalCost: 30000 },
        { role: 'Ayudantes', quantity: 6, dailyRate: 30, duration: 150, totalCost: 27000 },
        { role: 'Electricista', quantity: 2, dailyRate: 60, duration: 30, totalCost: 3600 },
        { role: 'Plomero', quantity: 2, dailyRate: 55, duration: 25, totalCost: 2750 }
      ],
      risks: [
        {
          risk: 'Retrasos por clima',
          probability: 'medium',
          impact: 'medium',
          mitigation: 'Planificar actividades bajo techo durante temporada lluviosa'
        },
        {
          risk: 'Aumento de precios de materiales',
          probability: 'high',
          impact: 'high',
          mitigation: 'Comprar materiales principales por adelantado'
        },
        {
          risk: 'Falta de mano de obra especializada',
          probability: 'low',
          impact: 'high',
          mitigation: 'Contratar personal con anticipación'
        }
      ]
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    setGeneratedProject(mockProject);
    setIsGenerating(false);
    setStreamingText('');
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <Card className="border-2 border-dashed border-brand-secondary/30 hover:border-brand-secondary/50 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-brand-primary" />
            <span>Describe tu Proyecto de Construcción</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ejemplo: Quiero construir una casa de 2 pisos con 3 dormitorios, 2 baños, sala, cocina y garaje. El terreno es de 200m² en zona urbana de Guayaquil. Presupuesto aproximado de $80,000."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <Button
            onClick={handleGenerate}
            disabled={!input.trim() || isGenerating}
            className="w-full bg-brand-gradient hover:opacity-90 text-white"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="loading-dots mr-2">Generando</div>
                <Sparkles className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                Generar Proyecto con IA
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isGenerating && (
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="animate-pulse-glow">
                <Sparkles className="w-12 h-12 text-brand-primary mx-auto" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Generando tu proyecto...</h3>
                <p className="text-brand-primary font-medium">{streamingText}</p>
              </div>
              <Progress value={75} className="w-full max-w-md mx-auto" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Project Results */}
      {generatedProject && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {generatedProject.title}
            </h2>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </Button>
          </div>

          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="timeline" className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Cronograma</span>
              </TabsTrigger>
              <TabsTrigger value="costs" className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Costos</span>
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Materiales</span>
              </TabsTrigger>
              <TabsTrigger value="equipment" className="flex items-center space-x-1">
                <Truck className="w-4 h-4" />
                <span className="hidden sm:inline">Equipos</span>
              </TabsTrigger>
              <TabsTrigger value="labor" className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="risks" className="flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">Riesgos</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-4">
              <ProjectTimeline timeline={generatedProject.timeline} />
            </TabsContent>

            <TabsContent value="costs" className="space-y-4">
              <CostBreakdown costs={generatedProject.costs} />
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Materiales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Material</th>
                          <th className="text-right p-2">Cantidad</th>
                          <th className="text-right p-2">Precio Unit.</th>
                          <th className="text-right p-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedProject.materials.map((material, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">{material.item}</td>
                            <td className="text-right p-2">
                              {material.quantity} {material.unit}
                            </td>
                            <td className="text-right p-2">
                              ${material.unitCost.toLocaleString()}
                            </td>
                            <td className="text-right p-2 font-semibold">
                              ${material.totalCost.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Equipos Requeridos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Equipo</th>
                          <th className="text-right p-2">Cantidad</th>
                          <th className="text-right p-2">Tarifa Diaria</th>
                          <th className="text-right p-2">Días</th>
                          <th className="text-right p-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedProject.equipment.map((equipment, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">{equipment.item}</td>
                            <td className="text-right p-2">{equipment.quantity}</td>
                            <td className="text-right p-2">
                              ${equipment.dailyRate.toLocaleString()}
                            </td>
                            <td className="text-right p-2">{equipment.duration}</td>
                            <td className="text-right p-2 font-semibold">
                              ${equipment.totalCost.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="labor" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mano de Obra</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Rol</th>
                          <th className="text-right p-2">Cantidad</th>
                          <th className="text-right p-2">Tarifa Diaria</th>
                          <th className="text-right p-2">Días</th>
                          <th className="text-right p-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedProject.labor.map((labor, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">{labor.role}</td>
                            <td className="text-right p-2">{labor.quantity}</td>
                            <td className="text-right p-2">
                              ${labor.dailyRate.toLocaleString()}
                            </td>
                            <td className="text-right p-2">{labor.duration}</td>
                            <td className="text-right p-2 font-semibold">
                              ${labor.totalCost.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Riesgos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedProject.risks.map((risk, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{risk.risk}</h4>
                          <div className="flex space-x-2">
                            <Badge className={getRiskColor(risk.probability)}>
                              {risk.probability} prob.
                            </Badge>
                            <Badge className={getRiskColor(risk.impact)}>
                              {risk.impact} impacto
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          <strong>Mitigación:</strong> {risk.mitigation}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}