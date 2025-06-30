'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign,
  FolderOpen,
  Activity,
  Download,
  Calendar,
  Filter,
  Eye,
  Target,
  Zap,
  Globe,
  CheckCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const overviewMetrics = [
    {
      title: 'Ingresos Totales',
      value: '$47,832',
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Usuarios Activos',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Proyectos Generados',
      value: '342',
      change: '+8.7%',
      trend: 'up',
      icon: FolderOpen,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Tasa de Conversión',
      value: '24.5%',
      change: '-2.1%',
      trend: 'down',
      icon: Target,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const userMetrics = [
    {
      metric: 'Nuevos Registros',
      value: 156,
      change: '+23.4%',
      period: 'Este mes'
    },
    {
      metric: 'Usuarios Activos Diarios',
      value: 342,
      change: '+15.2%',
      period: 'Promedio 7 días'
    },
    {
      metric: 'Tiempo de Sesión',
      value: '24m 32s',
      change: '+8.7%',
      period: 'Promedio'
    },
    {
      metric: 'Retención (30 días)',
      value: '68.4%',
      change: '+5.1%',
      period: 'Cohorte actual'
    }
  ];

  const revenueMetrics = [
    {
      plan: 'Basic',
      subscribers: 45,
      revenue: 1305,
      growth: '+12.3%',
      churn: '5.2%'
    },
    {
      plan: 'Pro',
      subscribers: 128,
      revenue: 10112,
      growth: '+18.7%',
      churn: '3.1%'
    },
    {
      plan: 'Enterprise',
      subscribers: 23,
      revenue: 4577,
      growth: '+25.4%',
      churn: '1.8%'
    }
  ];

  const featureUsage = [
    {
      feature: 'Generador AI',
      usage: 89.2,
      users: 1112,
      trend: 'up'
    },
    {
      feature: 'Análisis de Costos',
      usage: 76.8,
      users: 957,
      trend: 'up'
    },
    {
      feature: 'Gestión de Riesgos',
      usage: 64.3,
      users: 802,
      trend: 'stable'
    },
    {
      feature: 'Reportes Avanzados',
      usage: 52.1,
      users: 650,
      trend: 'up'
    },
    {
      feature: 'Integración API',
      usage: 23.7,
      users: 296,
      trend: 'down'
    }
  ];

  const topCompanies = [
    {
      name: 'Constructora del Pacífico',
      projects: 12,
      revenue: 948,
      plan: 'Enterprise'
    },
    {
      name: 'Ingeniería & Construcción S.A.',
      projects: 8,
      revenue: 632,
      plan: 'Pro'
    },
    {
      name: 'Obras Civiles del Ecuador',
      projects: 6,
      revenue: 474,
      plan: 'Pro'
    },
    {
      name: 'Construcciones Modernas',
      projects: 4,
      revenue: 316,
      plan: 'Basic'
    },
    {
      name: 'Estudio de Arquitectura CM',
      projects: 3,
      revenue: 237,
      plan: 'Pro'
    }
  ];

  const systemMetrics = [
    {
      metric: 'Uptime',
      value: '99.97%',
      status: 'excellent',
      target: '99.9%'
    },
    {
      metric: 'Tiempo de Respuesta',
      value: '1.2s',
      status: 'good',
      target: '<2s'
    },
    {
      metric: 'Uso de CPU',
      value: '34%',
      status: 'good',
      target: '<70%'
    },
    {
      metric: 'Uso de Memoria',
      value: '67%',
      status: 'warning',
      target: '<80%'
    },
    {
      metric: 'Almacenamiento',
      value: '2.4TB',
      status: 'good',
      target: '<5TB'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-yellow-100 text-yellow-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Avanzados</h1>
          <p className="text-gray-600 mt-2">
            Métricas detalladas y análisis de rendimiento de la plataforma
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 días</SelectItem>
              <SelectItem value="30d">30 días</SelectItem>
              <SelectItem value="90d">90 días</SelectItem>
              <SelectItem value="1y">1 año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {overviewMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="revenue">Ingresos</TabsTrigger>
          <TabsTrigger value="features">Características</TabsTrigger>
          <TabsTrigger value="companies">Empresas</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">{metric.metric}</h3>
                    <div className="text-3xl font-bold text-brand-primary">
                      {metric.value}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{metric.period}</span>
                      <span className="text-sm font-medium text-green-600">
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Actividad de Usuarios por Hora</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {Array.from({ length: 24 }, (_, i) => {
                  const height = Math.random() * 80 + 20;
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className="bg-brand-primary rounded-t"
                        style={{ height: `${height}%`, width: '20px' }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">
                        {i.toString().padStart(2, '0')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {revenueMetrics.map((plan, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{plan.plan}</h3>
                    <Badge className={getPlanColor(plan.plan)}>
                      {plan.plan}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Suscriptores:</span>
                      <span className="font-medium">{plan.subscribers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Ingresos:</span>
                      <span className="font-medium">${plan.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Crecimiento:</span>
                      <span className="font-medium text-green-600">{plan.growth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Churn:</span>
                      <span className="font-medium text-red-600">{plan.churn}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Evolución de Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {Array.from({ length: 12 }, (_, i) => {
                  const height = Math.random() * 80 + 20;
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className="bg-green-500 rounded-t"
                        style={{ height: `${height}%`, width: '30px' }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">
                        {new Date(2024, i).toLocaleDateString('es-ES', { month: 'short' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Uso de Características</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureUsage.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{feature.feature}</span>
                        {getTrendIcon(feature.trend)}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{feature.usage}%</div>
                        <div className="text-xs text-gray-500">{feature.users} usuarios</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-brand-primary h-2 rounded-full"
                        style={{ width: `${feature.usage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adopción de Nuevas Características</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Análisis Predictivo con IA
                    </p>
                    <p className="text-xs text-green-700">
                      Adoptado por 67% de usuarios Enterprise en 2 semanas
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Dashboard Personalizable
                    </p>
                    <p className="text-xs text-blue-700">
                      45% de usuarios activos lo han configurado
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Globe className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">
                      Integración con ERP
                    </p>
                    <p className="text-xs text-yellow-700">
                      Disponible solo para Enterprise, 23% de adopción
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Empresas por Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-600">
                          {company.projects} proyectos activos
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-brand-primary">
                        ${company.revenue}
                      </div>
                      <Badge className={getPlanColor(company.plan)} variant="outline">
                        {company.plan}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">156</div>
                  <div className="text-sm text-gray-600">Empresas Activas</div>
                  <div className="text-xs text-green-600 mt-1">+12 este mes</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">$82.4K</div>
                  <div className="text-sm text-gray-600">Ingreso Promedio</div>
                  <div className="text-xs text-blue-600 mt-1">por empresa/año</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">94.2%</div>
                  <div className="text-sm text-gray-600">Satisfacción</div>
                  <div className="text-xs text-purple-600 mt-1">NPS Score</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">{metric.metric}</h3>
                    <div className={`text-3xl font-bold ${getStatusColor(metric.status)}`}>
                      {metric.value}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Target: {metric.target}
                      </span>
                      <Badge className={
                        metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                        metric.status === 'good' ? 'bg-blue-100 text-blue-800' :
                        metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {metric.status === 'excellent' ? 'Excelente' :
                         metric.status === 'good' ? 'Bueno' :
                         metric.status === 'warning' ? 'Atención' : 'Crítico'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Todos los servicios operativos
                    </p>
                    <p className="text-xs text-green-700">
                      Última verificación: hace 2 minutos
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Backup automático completado
                    </p>
                    <p className="text-xs text-blue-700">
                      Último backup: hace 6 horas
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">
                      Uso de memoria elevado
                    </p>
                    <p className="text-xs text-yellow-700">
                      Monitorear durante las próximas horas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}