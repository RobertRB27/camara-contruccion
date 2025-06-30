'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  Mail,
  Award,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserPlus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LaborPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const workers = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      role: 'Maestro de Obra',
      specialization: 'Construcción General',
      experience: 15,
      status: 'Activo',
      currentProject: 'Torre Residencial Vista Mar',
      dailyRate: 80,
      phone: '+593 99 123 4567',
      email: 'carlos.mendoza@email.com',
      certifications: ['Seguridad Industrial', 'Manejo de Grúas'],
      startDate: '2020-03-15',
      performance: 95,
      hoursWorked: 1840,
      availability: 'Ocupado'
    },
    {
      id: 2,
      name: 'Miguel Torres',
      role: 'Albañil',
      specialization: 'Mampostería',
      experience: 8,
      status: 'Activo',
      currentProject: 'Centro Comercial Norte',
      dailyRate: 50,
      phone: '+593 98 765 4321',
      email: 'miguel.torres@email.com',
      certifications: ['Construcción en Altura'],
      startDate: '2021-06-10',
      performance: 88,
      hoursWorked: 1520,
      availability: 'Ocupado'
    },
    {
      id: 3,
      name: 'Ana Rodríguez',
      role: 'Ingeniera Civil',
      specialization: 'Supervisión de Obra',
      experience: 12,
      status: 'Activo',
      currentProject: 'Torre Residencial Vista Mar',
      dailyRate: 120,
      phone: '+593 97 456 7890',
      email: 'ana.rodriguez@email.com',
      certifications: ['PMP', 'Seguridad Industrial', 'BIM'],
      startDate: '2019-01-20',
      performance: 98,
      hoursWorked: 1920,
      availability: 'Ocupado'
    },
    {
      id: 4,
      name: 'Luis Ramírez',
      role: 'Operador de Maquinaria',
      specialization: 'Excavadoras y Grúas',
      experience: 10,
      status: 'Activo',
      currentProject: 'Complejo Habitacional Sur',
      dailyRate: 65,
      phone: '+593 96 321 0987',
      email: 'luis.ramirez@email.com',
      certifications: ['Operador de Grúa', 'Maquinaria Pesada'],
      startDate: '2020-08-05',
      performance: 92,
      hoursWorked: 1680,
      availability: 'Ocupado'
    },
    {
      id: 5,
      name: 'Pedro Vásquez',
      role: 'Electricista',
      specialization: 'Instalaciones Eléctricas',
      experience: 6,
      status: 'Disponible',
      currentProject: null,
      dailyRate: 60,
      phone: '+593 95 654 3210',
      email: 'pedro.vasquez@email.com',
      certifications: ['Electricidad Industrial'],
      startDate: '2022-02-14',
      performance: 85,
      hoursWorked: 1200,
      availability: 'Disponible'
    },
    {
      id: 6,
      name: 'María González',
      role: 'Plomero',
      specialization: 'Instalaciones Sanitarias',
      experience: 7,
      status: 'Vacaciones',
      currentProject: null,
      dailyRate: 55,
      phone: '+593 94 789 0123',
      email: 'maria.gonzalez@email.com',
      certifications: ['Plomería Residencial'],
      startDate: '2021-11-08',
      performance: 90,
      hoursWorked: 1350,
      availability: 'No Disponible'
    },
    {
      id: 7,
      name: 'Roberto Silva',
      role: 'Ayudante General',
      specialization: 'Apoyo General',
      experience: 3,
      status: 'Activo',
      currentProject: 'Centro Comercial Norte',
      dailyRate: 30,
      phone: '+593 93 012 3456',
      email: 'roberto.silva@email.com',
      certifications: ['Seguridad Básica'],
      startDate: '2023-04-12',
      performance: 78,
      hoursWorked: 980,
      availability: 'Ocupado'
    },
    {
      id: 8,
      name: 'Carmen Morales',
      role: 'Arquitecta',
      specialization: 'Diseño y Supervisión',
      experience: 14,
      status: 'Disponible',
      currentProject: null,
      dailyRate: 100,
      phone: '+593 92 345 6789',
      email: 'carmen.morales@email.com',
      certifications: ['AutoCAD', 'Revit', 'Gestión de Proyectos'],
      startDate: '2018-09-03',
      performance: 96,
      hoursWorked: 1750,
      availability: 'Disponible'
    }
  ];

  const roles = [
    { name: 'Maestro de Obra', count: 1, avgRate: 80 },
    { name: 'Albañil', count: 1, avgRate: 50 },
    { name: 'Ingeniera Civil', count: 1, avgRate: 120 },
    { name: 'Operador de Maquinaria', count: 1, avgRate: 65 },
    { name: 'Electricista', count: 1, avgRate: 60 },
    { name: 'Plomero', count: 1, avgRate: 55 },
    { name: 'Ayudante General', count: 1, avgRate: 30 },
    { name: 'Arquitecta', count: 1, avgRate: 100 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-100 text-green-800';
      case 'Disponible': return 'bg-blue-100 text-blue-800';
      case 'Vacaciones': return 'bg-yellow-100 text-yellow-800';
      case 'Inactivo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Disponible': return 'text-green-600';
      case 'Ocupado': return 'text-blue-600';
      case 'No Disponible': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return 'text-green-600';
    if (performance >= 85) return 'text-blue-600';
    if (performance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterRole === 'all' || worker.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const totalWorkers = workers.length;
  const activeWorkers = workers.filter(w => w.status === 'Activo').length;
  const availableWorkers = workers.filter(w => w.availability === 'Disponible').length;
  const totalMonthlyCost = workers.reduce((sum, w) => sum + (w.dailyRate * 22), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Personal</h1>
          <p className="text-gray-600 mt-2">
            Administra y controla todo el personal de construcción
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-brand-gradient text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Contratar Personal
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Personal</p>
                <p className="text-3xl font-bold text-gray-900">{totalWorkers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Activos</p>
                <p className="text-3xl font-bold text-green-600">{activeWorkers}</p>
                <p className="text-sm text-green-600">En proyectos</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <p className="text-3xl font-bold text-blue-600">{availableWorkers}</p>
                <p className="text-sm text-blue-600">Para asignar</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Costo Mensual</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalMonthlyCost.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workers" className="w-full">
        <TabsList>
          <TabsTrigger value="workers">Personal</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="workers" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar personal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={filterRole === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterRole('all')}
                size="sm"
              >
                Todos
              </Button>
              {roles.slice(0, 4).map((role) => (
                <Button
                  key={role.name}
                  variant={filterRole === role.name ? 'default' : 'outline'}
                  onClick={() => setFilterRole(role.name)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {role.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Workers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWorkers.map((worker) => (
              <Card key={worker.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white font-medium">
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {worker.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{worker.role}</p>
                        <p className="text-xs text-gray-500">{worker.experience} años exp.</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="w-4 h-4 mr-2" />
                          Asignar Proyecto
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Desactivar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Badge className={getStatusColor(worker.status)}>
                      {worker.status}
                    </Badge>
                    <Badge variant="outline" className={getAvailabilityColor(worker.availability)}>
                      {worker.availability}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Current Project */}
                  {worker.currentProject && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{worker.currentProject}</span>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{worker.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="truncate">{worker.email}</span>
                    </div>
                  </div>

                  {/* Performance */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Rendimiento</span>
                      <span className={`font-medium ${getPerformanceColor(worker.performance)}`}>
                        {worker.performance}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          worker.performance >= 95 ? 'bg-green-500' :
                          worker.performance >= 85 ? 'bg-blue-500' :
                          worker.performance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${worker.performance}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Rate and Hours */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Tarifa Diaria</div>
                      <div className="font-medium text-gray-900">
                        ${worker.dailyRate}/día
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Horas Trabajadas</div>
                      <div className="font-medium text-gray-900">
                        {worker.hoursWorked}h
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-500 mb-2">Certificaciones:</div>
                    <div className="flex flex-wrap gap-1">
                      {worker.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Ver Perfil
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-brand-primary text-white"
                      disabled={worker.availability === 'No Disponible'}
                    >
                      {worker.availability === 'Disponible' ? 'Asignar' : 'Gestionar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{role.name}</h3>
                    <Award className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Personal:</span>
                      <span className="font-medium">{role.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tarifa Promedio:</span>
                      <span className="font-medium">${role.avgRate}/día</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Costo Mensual:</span>
                      <span className="font-medium">${(role.avgRate * role.count * 22).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workers
                    .sort((a, b) => b.performance - a.performance)
                    .slice(0, 5)
                    .map((worker, index) => (
                      <div key={worker.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{worker.name}</div>
                            <div className="text-sm text-gray-600">{worker.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${getPerformanceColor(worker.performance)}`}>
                            {worker.performance}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {worker.hoursWorked}h trabajadas
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas de Rendimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workers
                    .filter(w => w.performance < 80)
                    .map((worker) => (
                      <div key={worker.id} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-900">
                            {worker.name} - {worker.role}
                          </p>
                          <p className="text-xs text-yellow-700">
                            Rendimiento: {worker.performance}% - Requiere seguimiento
                          </p>
                        </div>
                      </div>
                    ))}
                  
                  {workers.filter(w => w.performance < 80).length === 0 && (
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-900">
                          Excelente rendimiento general
                        </p>
                        <p className="text-xs text-green-700">
                          Todo el personal mantiene un rendimiento superior al 80%
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}