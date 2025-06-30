'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users,
  Crown,
  Zap,
  Shield,
  Download,
  Edit,
  Save,
  Plus,
  Trash2,
  Check,
  X
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AdminPricingPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);

  const [pricingPlans, setPricingPlans] = useState([
    {
      id: 1,
      name: 'Basic',
      price: 29,
      currency: 'USD',
      billing: 'monthly',
      description: 'Perfecto para pequeños proyectos y constructores independientes',
      features: [
        'Hasta 3 proyectos activos',
        'Generador AI básico',
        'Reportes estándar',
        'Soporte por email',
        '5GB de almacenamiento'
      ],
      limitations: [
        'Sin análisis avanzados',
        'Sin integración con terceros'
      ],
      popular: false,
      active: true,
      subscribers: 45,
      revenue: 1305
    },
    {
      id: 2,
      name: 'Pro',
      price: 79,
      currency: 'USD',
      billing: 'monthly',
      description: 'Ideal para empresas constructoras medianas con múltiples proyectos',
      features: [
        'Proyectos ilimitados',
        'Generador AI avanzado',
        'Análisis de riesgos',
        'Reportes personalizados',
        'Soporte prioritario',
        '50GB de almacenamiento',
        'Gestión de equipos',
        'Integración con Excel'
      ],
      limitations: [],
      popular: true,
      active: true,
      subscribers: 128,
      revenue: 10112
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 199,
      currency: 'USD',
      billing: 'monthly',
      description: 'Solución completa para grandes constructoras y corporaciones',
      features: [
        'Todo lo de Pro',
        'API personalizada',
        'Integración con ERP',
        'Soporte 24/7',
        'Almacenamiento ilimitado',
        'Usuarios ilimitados',
        'Análisis predictivo',
        'Consultoría especializada',
        'SLA garantizado'
      ],
      limitations: [],
      popular: false,
      active: true,
      subscribers: 23,
      revenue: 4577
    }
  ]);

  const materialPrices = [
    {
      id: 1,
      material: 'Cemento Portland',
      unit: 'saco 50kg',
      currentPrice: 8.50,
      previousPrice: 8.20,
      change: 3.7,
      supplier: 'Cemento Nacional',
      lastUpdated: '2024-06-21',
      region: 'Guayas'
    },
    {
      id: 2,
      material: 'Hierro de Construcción 12mm',
      unit: 'varilla 12m',
      currentPrice: 12.75,
      previousPrice: 11.80,
      change: 8.1,
      supplier: 'Aceros del Ecuador',
      lastUpdated: '2024-06-20',
      region: 'Nacional'
    },
    {
      id: 3,
      material: 'Arena Fina',
      unit: 'm³',
      currentPrice: 25.00,
      previousPrice: 24.50,
      change: 2.0,
      supplier: 'Agregados del Litoral',
      lastUpdated: '2024-06-21',
      region: 'Costa'
    },
    {
      id: 4,
      material: 'Grava Triturada',
      unit: 'm³',
      currentPrice: 30.00,
      previousPrice: 30.70,
      change: -2.3,
      supplier: 'Agregados del Litoral',
      lastUpdated: '2024-06-19',
      region: 'Costa'
    },
    {
      id: 5,
      material: 'Bloque de Hormigón 15x20x40',
      unit: 'unidad',
      currentPrice: 0.85,
      previousPrice: 0.82,
      change: 3.7,
      supplier: 'Bloques Guayas',
      lastUpdated: '2024-06-21',
      region: 'Guayas'
    }
  ];

  const laborRates = [
    {
      id: 1,
      role: 'Maestro de Obra',
      dailyRate: 80,
      previousRate: 75,
      change: 6.7,
      experience: 'Senior',
      region: 'Guayaquil',
      lastUpdated: '2024-06-15'
    },
    {
      id: 2,
      role: 'Albañil',
      dailyRate: 50,
      previousRate: 48,
      change: 4.2,
      experience: 'Intermedio',
      region: 'Nacional',
      lastUpdated: '2024-06-10'
    },
    {
      id: 3,
      role: 'Ayudante General',
      dailyRate: 30,
      previousRate: 28,
      change: 7.1,
      experience: 'Junior',
      region: 'Nacional',
      lastUpdated: '2024-06-12'
    },
    {
      id: 4,
      role: 'Electricista',
      dailyRate: 60,
      previousRate: 58,
      change: 3.4,
      experience: 'Especializado',
      region: 'Quito',
      lastUpdated: '2024-06-18'
    },
    {
      id: 5,
      role: 'Plomero',
      dailyRate: 55,
      previousRate: 53,
      change: 3.8,
      experience: 'Especializado',
      region: 'Nacional',
      lastUpdated: '2024-06-16'
    }
  ];

  const totalRevenue = pricingPlans.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalSubscribers = pricingPlans.reduce((sum, plan) => sum + plan.subscribers, 0);
  const averageRevenue = totalRevenue / totalSubscribers;

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-red-600';
    if (change < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control de Precios</h1>
          <p className="text-gray-600 mt-2">
            Gestiona planes de suscripción y precios de materiales
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button 
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditMode ? 'Guardar' : 'Editar'}
          </Button>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">+18% este mes</p>
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
                <p className="text-sm font-medium text-gray-600">Suscriptores</p>
                <p className="text-3xl font-bold text-gray-900">{totalSubscribers}</p>
                <p className="text-sm text-blue-600">+12 nuevos</p>
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
                <p className="text-sm font-medium text-gray-600">Ingreso Promedio</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${Math.round(averageRevenue)}
                </p>
                <p className="text-sm text-purple-600">por usuario</p>
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
                <p className="text-sm font-medium text-gray-600">Conversión</p>
                <p className="text-3xl font-bold text-gray-900">24.5%</p>
                <p className="text-sm text-orange-600">trial a pago</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList>
          <TabsTrigger value="subscription">Planes de Suscripción</TabsTrigger>
          <TabsTrigger value="materials">Precios de Materiales</TabsTrigger>
          <TabsTrigger value="labor">Tarifas de Mano de Obra</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Planes de Suscripción</h2>
            <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-gradient text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Plan</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="planName">Nombre del Plan</Label>
                      <Input id="planName" placeholder="Ej: Premium" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="planPrice">Precio Mensual</Label>
                      <Input id="planPrice" type="number" placeholder="99" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="planDescription">Descripción</Label>
                    <Textarea id="planDescription" placeholder="Describe las características del plan..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddPlanOpen(false)}>
                      Cancelar
                    </Button>
                    <Button className="bg-brand-primary text-white">
                      Crear Plan
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-brand-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-brand-primary text-white">
                      Más Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    <Switch checked={plan.active} disabled={!isEditMode} />
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600">/{plan.billing}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-brand-primary">
                        {plan.subscribers}
                      </div>
                      <div className="text-xs text-gray-600">Suscriptores</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        ${plan.revenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Ingresos</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Características:</h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Limitaciones:</h4>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <X className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {isEditMode && (
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Precios de Materiales</h2>
            <Button className="bg-brand-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Actualizar Precios
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900">Material</th>
                      <th className="text-right p-4 font-medium text-gray-900">Precio Actual</th>
                      <th className="text-right p-4 font-medium text-gray-900">Precio Anterior</th>
                      <th className="text-center p-4 font-medium text-gray-900">Cambio</th>
                      <th className="text-left p-4 font-medium text-gray-900">Proveedor</th>
                      <th className="text-center p-4 font-medium text-gray-900">Región</th>
                      <th className="text-center p-4 font-medium text-gray-900">Actualizado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materialPrices.map((material) => (
                      <tr key={material.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-gray-900">{material.material}</div>
                            <div className="text-sm text-gray-500">{material.unit}</div>
                          </div>
                        </td>
                        <td className="p-4 text-right font-medium">
                          ${material.currentPrice.toFixed(2)}
                        </td>
                        <td className="p-4 text-right text-gray-600">
                          ${material.previousPrice.toFixed(2)}
                        </td>
                        <td className="p-4 text-center">
                          <div className={`flex items-center justify-center ${getChangeColor(material.change)}`}>
                            {getChangeIcon(material.change)}
                            <span className="ml-1 text-sm font-medium">
                              {material.change > 0 ? '+' : ''}{material.change.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {material.supplier}
                        </td>
                        <td className="p-4 text-center">
                          <Badge variant="outline">{material.region}</Badge>
                        </td>
                        <td className="p-4 text-center text-sm text-gray-600">
                          {new Date(material.lastUpdated).toLocaleDateString('es-ES')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labor" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Tarifas de Mano de Obra</h2>
            <Button className="bg-brand-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Actualizar Tarifas
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900">Rol</th>
                      <th className="text-right p-4 font-medium text-gray-900">Tarifa Actual</th>
                      <th className="text-right p-4 font-medium text-gray-900">Tarifa Anterior</th>
                      <th className="text-center p-4 font-medium text-gray-900">Cambio</th>
                      <th className="text-center p-4 font-medium text-gray-900">Experiencia</th>
                      <th className="text-center p-4 font-medium text-gray-900">Región</th>
                      <th className="text-center p-4 font-medium text-gray-900">Actualizado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {laborRates.map((labor) => (
                      <tr key={labor.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{labor.role}</div>
                        </td>
                        <td className="p-4 text-right font-medium">
                          ${labor.dailyRate}/día
                        </td>
                        <td className="p-4 text-right text-gray-600">
                          ${labor.previousRate}/día
                        </td>
                        <td className="p-4 text-center">
                          <div className={`flex items-center justify-center ${getChangeColor(labor.change)}`}>
                            {getChangeIcon(labor.change)}
                            <span className="ml-1 text-sm font-medium">
                              {labor.change > 0 ? '+' : ''}{labor.change.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <Badge variant="outline">{labor.experience}</Badge>
                        </td>
                        <td className="p-4 text-center">
                          <Badge variant="outline">{labor.region}</Badge>
                        </td>
                        <td className="p-4 text-center text-sm text-gray-600">
                          {new Date(labor.lastUpdated).toLocaleDateString('es-ES')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}