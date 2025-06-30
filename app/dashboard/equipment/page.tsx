'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Truck, 
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Settings,
  Download,
  Filter,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const equipment = [
    {
      id: 1,
      name: 'Excavadora CAT 320D',
      type: 'Excavadora',
      model: 'CAT 320D',
      year: 2020,
      status: 'Disponible',
      location: 'Almacén Central',
      dailyRate: 300,
      currentProject: null,
      nextMaintenance: '2024-07-15',
      hoursWorked: 1250,
      maxHours: 2000,
      condition: 'Excelente',
      operator: null,
      fuelConsumption: '25 L/h',
      specifications: {
        weight: '20 ton',
        power: '122 HP',
        capacity: '1.2 m³'
      }
    },
    {
      id: 2,
      name: 'Grúa Torre Liebherr 85EC-B5',
      type: 'Grúa',
      model: 'Liebherr 85EC-B5',
      year: 2019,
      status: 'En Uso',
      location: 'Torre Vista Mar',
      dailyRate: 500,
      currentProject: 'Torre Residencial Vista Mar',
      nextMaintenance: '2024-08-01',
      hoursWorked: 1800,
      maxHours: 2500,
      condition: 'Bueno',
      operator: 'Carlos Mendoza',
      fuelConsumption: 'N/A',
      specifications: {
        weight: '8.5 ton',
        reach: '50 m',
        capacity: '5 ton'
      }
    },
    {
      id: 3,
      name: 'Mezcladora Concreto 350L',
      type: 'Mezcladora',
      model: 'IMER Syntesi 350',
      year: 2021,
      status: 'En Uso',
      location: 'Centro Comercial Norte',
      dailyRate: 80,
      currentProject: 'Centro Comercial Norte',
      nextMaintenance: '2024-07-30',
      hoursWorked: 800,
      maxHours: 1500,
      condition: 'Excelente',
      operator: 'Miguel Torres',
      fuelConsumption: '8 L/h',
      specifications: {
        weight: '180 kg',
        capacity: '350 L',
        power: '4 HP'
      }
    },
    {
      id: 4,
      name: 'Compactador Vibratorio',
      type: 'Compactador',
      model: 'Wacker BPU 2540A',
      year: 2018,
      status: 'Mantenimiento',
      location: 'Taller de Reparaciones',
      dailyRate: 120,
      currentProject: null,
      nextMaintenance: '2024-06-30',
      hoursWorked: 2100,
      maxHours: 2000,
      condition: 'Regular',
      operator: null,
      fuelConsumption: '3 L/h',
      specifications: {
        weight: '68 kg',
        force: '25 kN',
        frequency: '5800 vpm'
      }
    },
    {
      id: 5,
      name: 'Generador Diesel 100kVA',
      type: 'Generador',
      model: 'Caterpillar DE100E0',
      year: 2020,
      status: 'Disponible',
      location: 'Almacén Central',
      dailyRate: 150,
      currentProject: null,
      nextMaintenance: '2024-08-15',
      hoursWorked: 950,
      maxHours: 1800,
      condition: 'Bueno',
      operator: null,
      fuelConsumption: '22 L/h',
      specifications: {
        weight: '1200 kg',
        power: '100 kVA',
        fuel: 'Diesel'
      }
    },
    {
      id: 6,
      name: 'Montacargas Toyota 3 ton',
      type: 'Montacargas',
      model: 'Toyota 8FG30',
      year: 2019,
      status: 'En Uso',
      location: 'Complejo Habitacional Sur',
      dailyRate: 180,
      currentProject: 'Complejo Habitacional Sur',
      nextMaintenance: '2024-07-20',
      hoursWorked: 1400,
      maxHours: 2200,
      condition: 'Bueno',
      operator: 'Luis Ramírez',
      fuelConsumption: '12 L/h',
      specifications: {
        weight: '4.2 ton',
        capacity: '3 ton',
        height: '4.5 m'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En Uso': return 'bg-blue-100 text-blue-800';
      case 'Mantenimiento': return 'bg-yellow-100 text-yellow-800';
      case 'Fuera de Servicio': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excelente': return 'text-green-600';
      case 'Bueno': return 'text-blue-600';
      case 'Regular': return 'text-yellow-600';
      case 'Malo': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMaintenanceStatus = (nextMaintenance: string) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const daysUntil = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return { status: 'overdue', text: 'Vencido', color: 'text-red-600' };
    if (daysUntil <= 7) return { status: 'urgent', text: `${daysUntil} días`, color: 'text-yellow-600' };
    return { status: 'ok', text: `${daysUntil} días`, color: 'text-green-600' };
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(e => e.status === 'Disponible').length;
  const inUseEquipment = equipment.filter(e => e.status === 'En Uso').length;
  const maintenanceEquipment = equipment.filter(e => e.status === 'Mantenimiento').length;
  const totalDailyValue = equipment.reduce((sum, e) => sum + e.dailyRate, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Equipos</h1>
          <p className="text-gray-600 mt-2">
            Administra y controla todos los equipos de construcción
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-brand-gradient text-white">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Equipo
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Equipos</p>
                <p className="text-3xl font-bold text-gray-900">{totalEquipment}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <p className="text-3xl font-bold text-green-600">{availableEquipment}</p>
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
                <p className="text-sm font-medium text-gray-600">En Uso</p>
                <p className="text-3xl font-bold text-blue-600">{inUseEquipment}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mantenimiento</p>
                <p className="text-3xl font-bold text-yellow-600">{maintenanceEquipment}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Diario</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalDailyValue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="equipment" className="w-full">
        <TabsList>
          <TabsTrigger value="equipment">Equipos</TabsTrigger>
          <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
          <TabsTrigger value="utilization">Utilización</TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar equipos..."
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
                variant={filterStatus === 'Disponible' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('Disponible')}
                size="sm"
              >
                Disponibles
              </Button>
              <Button
                variant={filterStatus === 'En Uso' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('En Uso')}
                size="sm"
              >
                En Uso
              </Button>
              <Button
                variant={filterStatus === 'Mantenimiento' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('Mantenimiento')}
                size="sm"
              >
                Mantenimiento
              </Button>
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => {
              const maintenanceStatus = getMaintenanceStatus(item.nextMaintenance);
              const hoursPercentage = (item.hoursWorked / item.maxHours) * 100;
              
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                          {item.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {item.model} ({item.year})
                        </p>
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
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            Programar Mantenimiento
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <Badge variant="outline" className={getConditionColor(item.condition)}>
                        {item.condition}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Location and Project */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{item.location}</span>
                      </div>
                      {item.currentProject && (
                        <div className="flex items-center text-gray-600">
                          <Settings className="w-4 h-4 mr-2" />
                          <span>{item.currentProject}</span>
                        </div>
                      )}
                      {item.operator && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Operador: {item.operator}</span>
                        </div>
                      )}
                    </div>

                    {/* Hours Usage */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Horas de Uso</span>
                        <span className="font-medium">
                          {item.hoursWorked} / {item.maxHours}h
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            hoursPercentage > 90 ? 'bg-red-500' :
                            hoursPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(hoursPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Maintenance and Cost */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Próximo Mantenimiento</div>
                        <div className={`font-medium ${maintenanceStatus.color}`}>
                          {maintenanceStatus.text}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Tarifa Diaria</div>
                        <div className="font-medium text-gray-900">
                          ${item.dailyRate}/día
                        </div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="border-t pt-3">
                      <div className="text-xs text-gray-500 space-y-1">
                        {Object.entries(item.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key}:</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Ver Detalles
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-brand-primary text-white"
                        disabled={item.status === 'Mantenimiento'}
                      >
                        {item.status === 'Disponible' ? 'Asignar' : 'Gestionar'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="space-y-4">
            {equipment.map((item) => {
              const maintenanceStatus = getMaintenanceStatus(item.nextMaintenance);
              if (maintenanceStatus.status === 'ok' && item.status !== 'Mantenimiento') return null;
              
              return (
                <Card key={item.id} className={`border-l-4 ${
                  maintenanceStatus.status === 'overdue' || item.status === 'Mantenimiento' ? 'border-l-red-500' : 'border-l-yellow-500'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          maintenanceStatus.status === 'overdue' || item.status === 'Mantenimiento' ? 'bg-red-100' : 'bg-yellow-100'
                        }`}>
                          <AlertTriangle className={`w-5 h-5 ${
                            maintenanceStatus.status === 'overdue' || item.status === 'Mantenimiento' ? 'text-red-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            {item.status === 'Mantenimiento' ? 'En mantenimiento' : 
                             maintenanceStatus.status === 'overdue' ? 'Mantenimiento vencido' :
                             `Mantenimiento en ${maintenanceStatus.text}`}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Ubicación: {item.location} | Horas: {item.hoursWorked}h
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Programar
                        </Button>
                        <Button size="sm" className="bg-brand-primary text-white">
                          Gestionar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item) => {
              const utilizationRate = item.status === 'En Uso' ? 85 : 
                                    item.status === 'Disponible' ? 0 : 25;
              
              return (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Utilización</span>
                          <span className="font-medium">{utilizationRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              utilizationRate > 80 ? 'bg-green-500' :
                              utilizationRate > 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${utilizationRate}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Ingresos/Mes</div>
                          <div className="font-medium">
                            ${(item.dailyRate * 30 * (utilizationRate / 100)).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Días Activos</div>
                          <div className="font-medium">
                            {Math.round(30 * (utilizationRate / 100))} días
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}