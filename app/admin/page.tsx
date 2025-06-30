'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { 
  Users, 
  FolderOpen, 
  DollarSign, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  Crown,
  Activity
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const adminStats = [
    {
      title: 'Total Usuarios',
      value: '1,247',
      change: '+12% este mes',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Proyectos Activos',
      value: '89',
      change: '+5 nuevos esta semana',
      icon: FolderOpen,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Ingresos Totales',
      value: '$45.2K',
      change: '+23% vs mes anterior',
      icon: DollarSign,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Alertas Sistema',
      value: '7',
      change: '2 críticas',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100'
    }
  ];

  const systemMetrics = [
    { label: 'Uptime del Sistema', value: '99.9%', status: 'excellent' },
    { label: 'Usuarios Activos (24h)', value: '342', status: 'good' },
    { label: 'Proyectos Generados (IA)', value: '156', status: 'good' },
    { label: 'Tiempo Respuesta Promedio', value: '1.2s', status: 'warning' }
  ];

  const recentActivity = [
    {
      type: 'user',
      message: 'Nuevo usuario registrado: María González',
      time: 'Hace 15 min',
      status: 'info'
    },
    {
      type: 'project',
      message: 'Proyecto "Centro Comercial" completado',
      time: 'Hace 1 hora',
      status: 'success'
    },
    {
      type: 'alert',
      message: 'Alerta de sistema: Alto uso de CPU',
      time: 'Hace 2 horas',
      status: 'warning'
    },
    {
      type: 'payment',
      message: 'Pago procesado: $2,500 - Constructora ABC',
      time: 'Hace 3 horas',
      status: 'success'
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return Users;
      case 'project': return FolderOpen;
      case 'alert': return AlertTriangle;
      case 'payment': return DollarSign;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-8">
      {/* Admin Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Crown className="w-8 h-8 text-yellow-500 mr-3" />
            Panel de Administración
          </h1>
          <p className="text-gray-600 mt-2">
            Bienvenido, {user?.name}. Gestiona el sistema desde aquí.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => router.push('/admin/users')}
          >
            Gestionar Usuarios
          </Button>
          <Button 
            className="bg-brand-gradient text-white"
            onClick={() => router.push('/admin/analytics')}
          >
            Ver Analytics
          </Button>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Métricas del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    {metric.label}
                  </span>
                  <span className={`text-sm font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.status === 'success' ? 'bg-green-100 text-green-600' :
                      activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      activity.status === 'error' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Administrativas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => router.push('/admin/users')}
            >
              <Users className="w-6 h-6" />
              <span>Gestionar Usuarios</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => router.push('/admin/pricing')}
            >
              <DollarSign className="w-6 h-6" />
              <span>Control de Precios</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => router.push('/admin/analytics')}
            >
              <TrendingUp className="w-6 h-6" />
              <span>Ver Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}