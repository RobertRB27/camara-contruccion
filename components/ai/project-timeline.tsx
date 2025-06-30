'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface TimelineProps {
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
}

export function ProjectTimeline({ timeline }: TimelineProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in-progress': return 'En Progreso';
      case 'pending': return 'Pendiente';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Cronograma del Proyecto</span>
          </CardTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Duración total: {timeline.totalDuration} días</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timeline.phases.map((phase, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < timeline.phases.length - 1 && (
                  <div className="absolute left-4 top-12 w-0.5 h-16 bg-gray-200"></div>
                )}
                
                <div className="flex items-start space-x-4">
                  {/* Timeline dot */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    phase.status === 'completed' ? 'bg-green-500' :
                    phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  
                  {/* Phase content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {phase.name}
                      </h3>
                      <Badge className={getStatusColor(phase.status)}>
                        {getStatusText(phase.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="text-sm">
                        <span className="text-gray-500">Inicio:</span>
                        <div className="font-medium">
                          {new Date(phase.startDate).toLocaleDateString('es-ES')}
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Fin:</span>
                        <div className="font-medium">
                          {new Date(phase.endDate).toLocaleDateString('es-ES')}
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Duración:</span>
                        <div className="font-medium">{phase.duration} días</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span className="font-medium">{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}