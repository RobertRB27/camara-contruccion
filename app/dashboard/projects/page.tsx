'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  DollarSign,
  Users,
  MapPin,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Torre Residencial Vista Mar',
      description: 'Complejo residencial de 15 pisos con vista al océano',
      status: 'En Progreso',
      progress: 75,
      budget: 850000,
      spent: 637500,
      startDate: '2024-01-15',
      endDate: '2024-08-15',
      location: 'Guayaquil, Ecuador',
      team: 12,
      priority: 'high'
    },
    {
      id: 2,
      name: 'Centro Comercial Norte',
      description: 'Centro comercial de 3 niveles con 80 locales',
      status: 'En Progreso',
      progress: 45,
      budget: 1200000,
      spent: 540000,
      startDate: '2024-03-01',
      endDate: '2024-12-20',
      location: 'Quito, Ecuador',
      team: 18,
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Complejo Habitacional Sur',
      description: 'Conjunto habitacional de 50 casas unifamiliares',
      status: 'Finalizando',
      progress: 90,
      budget: 650000,
      spent: 585000,
      startDate: '2023-10-01',
      endDate: '2024-07-30',
      location: 'Cuenca, Ecuador',
      team: 8,
      priority: 'low'
    },
    {
      id: 4,
      name: 'Oficinas Corporativas',
      description: 'Edificio de oficinas de 8 pisos para empresas',
      status: 'Planificación',
      progress: 15,
      budget: 980000,
      spent: 147000,
      startDate: '2024-06-01',
      endDate: '2025-03-15',
      location: 'Guayaquil, Ecuador',
      team: 6,
      priority: 'high'
    },
    {
      id: 5,
      name: 'Renovación Hospital',
      description: 'Modernización de instalaciones hospitalarias',
      status: 'Completado',
      progress: 100,
      budget: 750000,
      spent: 720000,
      startDate: '2023-08-01',
      endDate: '2024-02-28',
      location: 'Machala, Ecuador',
      team: 15,
      priority: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Finalizando': return 'bg-purple-100 text-purple-800';
      case 'Planificación': return 'bg-yellow-100 text-yellow-800';
      case 'Pausado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Proyectos</h1>
          <p className="text-gray-600 mt-2">
            Gestiona y supervisa todos tus proyectos de construcción
          </p>
        </div>
        <Button 
          className="bg-brand-gradient text-white"
          onClick={() => router.push('/dashboard/ai-generator')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar proyectos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === 'En Progreso' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('En Progreso')}
            size="sm"
          >
            En Progreso
          </Button>
          <Button
            variant={filterStatus === 'Completado' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('Completado')}
            size="sm"
          >
            Completados
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {project.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <Badge className={getPriorityColor(project.priority)}>
                  {project.priority === 'high' ? 'Alta' : 
                   project.priority === 'medium' ? 'Media' : 'Baja'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progreso</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Budget */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>Presupuesto</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((project.spent / project.budget) * 100)}% utilizado
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(project.startDate).toLocaleDateString('es-ES')} - {new Date(project.endDate).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{project.team} miembros del equipo</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Detalles
                </Button>
                <Button size="sm" className="flex-1 bg-brand-primary text-white">
                  Gestionar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron proyectos
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Crea tu primer proyecto para comenzar'}
            </p>
            <Button 
              className="bg-brand-gradient text-white"
              onClick={() => router.push('/dashboard/ai-generator')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Proyecto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}