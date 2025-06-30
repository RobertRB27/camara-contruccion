'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { 
  FolderOpen, 
  Calculator, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const stats = [
    {
      title: 'Proyectos Activos',
      value: '12',
      change: '+2 este mes',
      icon: FolderOpen,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Presupuesto Total',
      value: '$2.4M',
      change: '+15% vs mes anterior',
      icon: DollarSign,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Proyectos Completados',
      value: '48',
      change: '+8 este trimestre',
      icon: CheckCircle,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Alertas Pendientes',
      value: '3',
      change: 'Requieren atención',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'Torre Residencial Vista Mar',
      progress: 75,
      budget: '$850,000',
      status: 'En Progreso',
      dueDate: '2024-08-15'
    },
    {
      id: 2,
      name: 'Centro Comercial Norte',
      progress: 45,
      budget: '$1,200,000',
      status: 'En Progreso',
      dueDate: '2024-12-20'
    },
    {
      id: 3,
      name: 'Complejo Habitacional Sur',
      progress: 90,
      budget: '$650,000',
      status: 'Finalizando',
      dueDate: '2024-07-30'
    }
  ];

  const quickActions = [
    {
      title: 'Nuevo Proyecto',
      description: 'Crear un nuevo proyecto con IA',
      icon: Plus,
      action: () => router.push('/dashboard/ai-generator'),
      color: 'bg-brand-gradient text-white'
    },
    {
      title: 'Ver Proyectos',
      description: 'Gestionar proyectos existentes',
      icon: FolderOpen,
      action: () => router.push('/dashboard/projects'),
      color: 'bg-blue-500 text-white'
    },
    {
      title: 'Análisis de Costos',
      description: 'Revisar presupuestos y gastos',
      icon: Calculator,
      action: () => router.push('/dashboard/costs'),
      color: 'bg-green-500 text-white'
    },
    {
      title: 'Gestión de Personal',
      description: 'Administrar equipos de trabajo',
      icon: Users,
      action: () => router.push('/dashboard/labor'),
      color: 'bg-purple-500 text-white'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido, {user?.name}
        </h1>
        <p className="text-gray-600 mt-2">
          Aquí tienes un resumen de tus proyectos y actividades recientes.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Proyectos Recientes</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/dashboard/projects')}
              >
                Ver Todos
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {project.name}
                    </h4>
                    <span className="text-sm font-medium text-brand-primary">
                      {project.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progreso: {project.progress}%</span>
                      <span>Presupuesto: {project.budget}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-brand-primary h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      Fecha límite: {new Date(project.dueDate).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-transform ${action.color}`}
                  onClick={action.action}
                >
                  <action.icon className="w-8 h-8" />
                  <div className="text-center">
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-xs opacity-80">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Proyecto "Torre Vista Mar" actualizado</p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Nuevo presupuesto generado con IA</p>
                <p className="text-xs text-gray-500">Hace 4 horas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Alerta: Retraso en entrega de materiales</p>
                <p className="text-xs text-gray-500">Hace 1 día</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}