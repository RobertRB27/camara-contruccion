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
  FolderOpen, 
  MoreHorizontal, 
  Calendar, 
  DollarSign,
  Users,
  MapPin,
  Eye,
  Edit,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Download,
  Shield
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCompany, setFilterCompany] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Torre Residencial Vista Mar',
      description: 'Complejo residencial de 15 pisos con vista al océano',
      company: 'Constructora del Pacífico',
      owner: 'Carlos Mendoza',
      status: 'En Progreso',
      priority: 'high',
      progress: 75,
      budget: 850000,
      spent: 637500,
      startDate: '2024-01-15',
      endDate: '2024-08-15',
      location: 'Guayaquil, Ecuador',
      team: 12,
      health: 'good',
      lastActivity: '2024-06-21T10:30:00Z',
      risks: 2,
      issues: 1
    },
    {
      id: 2,
      name: 'Centro Comercial Norte',
      description: 'Centro comercial de 3 niveles con 80 locales',
      company: 'Ingeniería & Construcción S.A.',
      owner: 'Ana Rodríguez',
      status: 'En Progreso',
      priority: 'medium',
      progress: 45,
      budget: 1200000,
      spent: 540000,
      startDate: '2024-03-01',
      endDate: '2024-12-20',
      location: 'Quito, Ecuador',
      team: 18,
      health: 'warning',
      lastActivity: '2024-06-21T09:15:00Z',
      risks: 4,
      issues: 3
    },
    {
      id: 3,
      name: 'Complejo Habitacional Sur',
      description: 'Conjunto habitacional de 50 casas unifamiliares',
      company: 'Obras Civiles del Ecuador',
      owner: 'Luis Ramírez',
      status: 'Finalizando',
      priority: 'low',
      progress: 90,
      budget: 650000,
      spent: 585000,
      startDate: '2023-10-01',
      endDate: '2024-07-30',
      location: 'Cuenca, Ecuador',
      team: 8,
      health: 'good',
      lastActivity: '2024-06-20T16:45:00Z',
      risks: 1,
      issues: 0
    },
    {
      id: 4,
      name: 'Oficinas Corporativas',
      description: 'Edificio de oficinas de 8 pisos para empresas',
      company: 'Construcciones Modernas',
      owner: 'Pedro Vásquez',
      status: 'Planificación',
      priority: 'high',
      progress: 15,
      budget: 980000,
      spent: 147000,
      startDate: '2024-06-01',
      endDate: '2025-03-15',
      location: 'Guayaquil, Ecuador',
      team: 6,
      health: 'good',
      lastActivity: '2024-06-19T14:20:00Z',
      risks: 3,
      issues: 2
    },
    {
      id: 5,
      name: 'Renovación Hospital',
      description: 'Modernización de instalaciones hospitalarias',
      company: 'Estudio de Arquitectura CM',
      owner: 'Carmen Morales',
      status: 'Pausado',
      priority: 'high',
      progress: 60,
      budget: 750000,
      spent: 450000,
      startDate: '2024-02-01',
      endDate: '2024-10-30',
      location: 'Machala, Ecuador',
      team: 15,
      health: 'critical',
      lastActivity: '2024-06-10T08:30:00Z',
      risks: 6,
      issues: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Finalizando': return 'bg-purple-100 text-purple-800';
      case 'Planificación': return 'bg-yellow-100 text-yellow-800';
      case 'Pausado': return 'bg-red-100 text-red-800';
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

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesCompany = filterCompany === 'all' || project.company === filterCompany;
    return matchesSearch && matchesStatus && matchesCompany;
  });

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'En Progreso').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const criticalProjects = projects.filter(p => p.health === 'critical').length;

  const companies = Array.from(new Set(projects.map(p => p.company)));

  const projectsByStatus = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const projectsByHealth = projects.reduce((acc, project) => {
    acc[project.health] = (acc[project.health] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supervisión de Proyectos</h1>
          <p className="text-gray-600 mt-2">
            Monitorea y supervisa todos los proyectos de la plataforma
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-brand-gradient text-white">
            <Shield className="w-4 h-4 mr-2" />
            Auditoría
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Proyectos</p>
                <p className="text-3xl font-bold text-gray-900">{totalProjects}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Activos</p>
                <p className="text-3xl font-bold text-blue-600">{activeProjects}</p>
                <p className="text-sm text-blue-600">En ejecución</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
                <p className="text-3xl font-bold text-green-600">
                  ${(totalBudget / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-green-600">USD</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ejecutado</p>
                <p className="text-3xl font-bold text-purple-600">
                  {Math.round((totalSpent / totalBudget) * 100)}%
                </p>
                <p className="text-sm text-purple-600">del presupuesto</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Críticos</p>
                <p className="text-3xl font-bold text-red-600">{criticalProjects}</p>
                <p className="text-sm text-red-600">Requieren atención</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList>
          <TabsTrigger value="projects">Proyectos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="health">Estado de Salud</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          {/* Search and Filters */}
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Planificación">Planificación</SelectItem>
                  <SelectItem value="Finalizando">Finalizando</SelectItem>
                  <SelectItem value="Pausado">Pausado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCompany} onValueChange={setFilterCompany}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                        {project.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-2">
                        {project.company} • {project.owner}
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
                          Intervenir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="w-4 h-4 mr-2" />
                          Auditar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority === 'high' ? 'Alta' : 
                       project.priority === 'medium' ? 'Media' : 'Baja'}
                    </Badge>
                    <div className={`flex items-center ${getHealthColor(project.health)}`}>
                      {getHealthIcon(project.health)}
                      <span className="ml-1 text-xs font-medium">
                        {project.health === 'good' ? 'Saludable' :
                         project.health === 'warning' ? 'Atención' : 'Crítico'}
                      </span>
                    </div>
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
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Presupuesto</div>
                      <div className="font-medium">${project.budget.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Ejecutado</div>
                      <div className="font-medium">${project.spent.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{project.team} miembros del equipo</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {new Date(project.startDate).toLocaleDateString('es-ES')} - 
                        {new Date(project.endDate).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>

                  {/* Risks and Issues */}
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-1" />
                        <span className="text-sm">{project.risks} riesgos</span>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-red-600 mr-1" />
                        <span className="text-sm">{project.issues} problemas</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Última actividad: {new Date(project.lastActivity).toLocaleDateString('es-ES')}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Supervisar
                    </Button>
                    <Button size="sm" className="flex-1 bg-brand-primary text-white">
                      Intervenir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(projectsByStatus).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(status)}>
                          {status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{count}</div>
                        <div className="text-xs text-gray-500">proyectos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado de Salud</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(projectsByHealth).map(([health, count]) => (
                    <div key={health} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={getHealthColor(health)}>
                          {getHealthIcon(health)}
                        </div>
                        <span className="font-medium">
                          {health === 'good' ? 'Saludables' :
                           health === 'warning' ? 'Con Alertas' : 'Críticos'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{count}</div>
                        <div className="text-xs text-gray-500">proyectos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="space-y-4">
            {projects
              .filter(p => p.health === 'critical' || p.health === 'warning')
              .map((project) => (
                <Card key={project.id} className={`border-l-4 ${
                  project.health === 'critical' ? 'border-l-red-500' : 'border-l-yellow-500'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          project.health === 'critical' ? 'bg-red-100' : 'bg-yellow-100'
                        }`}>
                          <AlertTriangle className={`w-5 h-5 ${
                            project.health === 'critical' ? 'text-red-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-600">
                            {project.company} • {project.owner}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {project.risks} riesgos activos • {project.issues} problemas pendientes
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Revisar
                        </Button>
                        <Button size="sm" className="bg-brand-primary text-white">
                          Intervenir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}