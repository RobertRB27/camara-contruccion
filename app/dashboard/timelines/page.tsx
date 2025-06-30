'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Calendar, 
  Clock, 
  Plus,
  Filter,
  Download,
  Eye,
  Edit
} from 'lucide-react';
import { ProjectTimeline } from '@/components/ai/project-timeline';

export default function TimelinesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      name: 'Torre Residencial Vista Mar',
      status: 'En Progreso',
      progress: 75,
      startDate: '2024-01-15',
      endDate: '2024-08-15',
      totalDays: 213,
      completedDays: 160,
      timeline: {
        totalDuration: 213,
        phases: [
          {
            name: 'Planificación y Permisos',
            duration: 30,
            startDate: '2024-01-15',
            endDate: '2024-02-14',
            progress: 100,
            status: 'completed' as const
          },
          {
            name: 'Excavación y Cimentación',
            duration: 45,
            startDate: '2024-02-15',
            endDate: '2024-03-31',
            progress: 100,
            status: 'completed' as const
          },
          {
            name: 'Estructura Principal',
            duration: 60,
            startDate: '2024-04-01',
            endDate: '2024-05-30',
            progress: 80,
            status: 'in-progress' as const
          },
          {
            name: 'Instalaciones',
            duration: 40,
            startDate: '2024-06-01',
            endDate: '2024-07-10',
            progress: 0,
            status: 'pending' as const
          },
          {
            name: 'Acabados',
            duration: 38,
            startDate: '2024-07-11',
            endDate: '2024-08-15',
            progress: 0,
            status: 'pending' as const
          }
        ]
      }
    },
    {
      id: 2,
      name: 'Centro Comercial Norte',
      status: 'En Progreso',
      progress: 45,
      startDate: '2024-03-01',
      endDate: '2024-12-20',
      totalDays: 294,
      completedDays: 132,
      timeline: {
        totalDuration: 294,
        phases: [
          {
            name: 'Diseño y Planificación',
            duration: 45,
            startDate: '2024-03-01',
            endDate: '2024-04-15',
            progress: 100,
            status: 'completed' as const
          },
          {
            name: 'Preparación del Terreno',
            duration: 30,
            startDate: '2024-04-16',
            endDate: '2024-05-15',
            progress: 100,
            status: 'completed' as const
          },
          {
            name: 'Construcción Estructura',
            duration: 90,
            startDate: '2024-05-16',
            endDate: '2024-08-14',
            progress: 60,
            status: 'in-progress' as const
          },
          {
            name: 'Instalaciones y Sistemas',
            duration: 60,
            startDate: '2024-08-15',
            endDate: '2024-10-14',
            progress: 0,
            status: 'pending' as const
          },
          {
            name: 'Acabados y Detalles',
            duration: 69,
            startDate: '2024-10-15',
            endDate: '2024-12-20',
            progress: 0,
            status: 'pending' as const
          }
        ]
      }
    },
    {
      id: 3,
      name: 'Complejo Habitacional Sur',
      status: 'Finalizando',
      progress: 90,
      startDate: '2023-10-01',
      endDate: '2024-07-30',
      totalDays: 303,
      completedDays: 273,
      timeline: {
        totalDuration: 303,
        phases: [
          {
            name: 'Planificación Urbana',
            duration: 60,
            startDate: '2023-10-01',
            endDate: '2023-11-30',
            progress: 100,
            status: 'completed' as const
          },
          {
            name: 'Infraestructura Base',
            duration: 75,
            startDate: '2023-12-01',
            endDate: '2024-02-14',
            progress: 100,
            status: 'completed' as const
          },
          {
            name: 'Construcción de Viviendas',
            duration: 120,
            startDate: '2024-02-15',
            endDate: '2024-06-14',
            progress: 100,
            status: 'completed' as const
          },
          {
            name: 'Acabados y Paisajismo',
            duration: 48,
            startDate: '2024-06-15',
            endDate: '2024-07-30',
            progress: 85,
            status: 'in-progress' as const
          }
        ]
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Finalizando': return 'bg-purple-100 text-purple-800';
      case 'Planificación': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cronogramas de Proyectos</h1>
          <p className="text-gray-600 mt-2">
            Visualiza y gestiona los cronogramas de todos tus proyectos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-brand-gradient text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Cronograma
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar cronogramas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      {selectedProject ? (
        /* Detailed Timeline View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setSelectedProject(null)}
            >
              ← Volver a la lista
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
          
          <ProjectTimeline 
            timeline={projects.find(p => p.id === selectedProject)?.timeline!} 
          />
        </div>
      ) : (
        /* Projects List */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </CardTitle>
                    <Badge className={`mt-2 ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress Overview */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progreso General</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Timeline Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {project.completedDays}
                    </div>
                    <div className="text-sm text-blue-600">Días Completados</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {calculateDaysRemaining(project.endDate)}
                    </div>
                    <div className="text-sm text-green-600">Días Restantes</div>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Inicio: {new Date(project.startDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Fin: {new Date(project.endDate).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>

                {/* Phase Summary */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Fases del Proyecto
                  </h4>
                  <div className="space-y-1">
                    {project.timeline.phases.map((phase, index) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">{phase.name}</span>
                        <Badge 
                          variant="outline" 
                          className={
                            phase.status === 'completed' ? 'text-green-600 border-green-200' :
                            phase.status === 'in-progress' ? 'text-blue-600 border-blue-200' :
                            'text-gray-600 border-gray-200'
                          }
                        >
                          {phase.progress}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    Ver Cronograma
                  </Button>
                  <Button size="sm" className="flex-1 bg-brand-primary text-white">
                    Gestionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-400 mb-4">
              <Calendar className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron cronogramas
            </h3>
            <p className="text-gray-600 mb-4">
              Crea tu primer proyecto para generar cronogramas automáticamente
            </p>
            <Button className="bg-brand-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Crear Cronograma
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}