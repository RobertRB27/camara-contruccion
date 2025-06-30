'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Download,
  Filter,
  AlertTriangle,
  CheckCircle,
  PieChart
} from 'lucide-react';
import { CostBreakdown } from '@/components/ai/cost-breakdown';

export default function CostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      name: 'Torre Residencial Vista Mar',
      budget: 850000,
      spent: 637500,
      remaining: 212500,
      progress: 75,
      status: 'En Presupuesto',
      variance: -5.2,
      costs: {
        total: 850000,
        breakdown: [
          { category: 'Materiales', amount: 425000, percentage: 50 },
          { category: 'Mano de Obra', amount: 255000, percentage: 30 },
          { category: 'Equipos', amount: 85000, percentage: 10 },
          { category: 'Permisos', amount: 42500, percentage: 5 },
          { category: 'Contingencia', amount: 42500, percentage: 5 }
        ]
      }
    },
    {
      id: 2,
      name: 'Centro Comercial Norte',
      budget: 1200000,
      spent: 540000,
      remaining: 660000,
      progress: 45,
      status: 'Sobre Presupuesto',
      variance: 12.3,
      costs: {
        total: 1200000,
        breakdown: [
          { category: 'Materiales', amount: 600000, percentage: 50 },
          { category: 'Mano de Obra', amount: 360000, percentage: 30 },
          { category: 'Equipos', amount: 120000, percentage: 10 },
          { category: 'Permisos', amount: 60000, percentage: 5 },
          { category: 'Contingencia', amount: 60000, percentage: 5 }
        ]
      }
    },
    {
      id: 3,
      name: 'Complejo Habitacional Sur',
      budget: 650000,
      spent: 585000,
      remaining: 65000,
      progress: 90,
      status: 'En Presupuesto',
      variance: -2.1,
      costs: {
        total: 650000,
        breakdown: [
          { category: 'Materiales', amount: 325000, percentage: 50 },
          { category: 'Mano de Obra', amount: 195000, percentage: 30 },
          { category: 'Equipos', amount: 65000, percentage: 10 },
          { category: 'Permisos', amount: 32500, percentage: 5 },
          { category: 'Contingencia', amount: 32500, percentage: 5 }
        ]
      }
    }
  ];

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const totalRemaining = projects.reduce((sum, p) => sum + p.remaining, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En Presupuesto': return 'bg-green-100 text-green-800';
      case 'Sobre Presupuesto': return 'bg-red-100 text-red-800';
      case 'Bajo Presupuesto': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-red-600';
    if (variance < -5) return 'text-green-600';
    return 'text-yellow-600';
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const costCategories = [
    {
      name: 'Materiales',
      total: projects.reduce((sum, p) => sum + (p.costs.breakdown.find(b => b.category === 'Materiales')?.amount || 0), 0),
      percentage: 50,
      trend: 'up',
      change: '+8.2%'
    },
    {
      name: 'Mano de Obra',
      total: projects.reduce((sum, p) => sum + (p.costs.breakdown.find(b => b.category === 'Mano de Obra')?.amount || 0), 0),
      percentage: 30,
      trend: 'up',
      change: '+12.5%'
    },
    {
      name: 'Equipos',
      total: projects.reduce((sum, p) => sum + (p.costs.breakdown.find(b => b.category === 'Equipos')?.amount || 0), 0),
      percentage: 10,
      trend: 'down',
      change: '-3.1%'
    },
    {
      name: 'Permisos',
      total: projects.reduce((sum, p) => sum + (p.costs.breakdown.find(b => b.category === 'Permisos')?.amount || 0), 0),
      percentage: 5,
      trend: 'stable',
      change: '+0.5%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Costos</h1>
          <p className="text-gray-600 mt-2">
            Controla y analiza los costos de todos tus proyectos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-brand-gradient text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Análisis
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalBudget.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gastado</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalSpent.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {Math.round((totalSpent / totalBudget) * 100)}% del total
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Restante</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalRemaining.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {Math.round((totalRemaining / totalBudget) * 100)}% disponible
                </p>
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
                <p className="text-sm font-medium text-gray-600">Proyectos</p>
                <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
                <p className="text-sm text-green-600">2 en presupuesto</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList>
          <TabsTrigger value="projects">Proyectos</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="analysis">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          {/* Search */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar proyectos..."
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
            /* Detailed Cost View */
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
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
              
              <CostBreakdown 
                costs={projects.find(p => p.id === selectedProject)?.costs!} 
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
                      <div className="text-right">
                        <div className={`text-sm font-medium ${getVarianceColor(project.variance)}`}>
                          {project.variance > 0 ? '+' : ''}{project.variance}%
                        </div>
                        <div className="text-xs text-gray-500">variación</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Budget Overview */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          ${project.budget.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Presupuesto</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-red-600">
                          ${project.spent.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Gastado</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          ${project.remaining.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Restante</div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progreso del Gasto</span>
                        <span className="font-medium">
                          {Math.round((project.spent / project.budget) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(project.spent / project.budget) * 100} 
                        className="h-2" 
                      />
                    </div>

                    {/* Cost Efficiency */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        {project.variance <= 0 ? (
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                        )}
                        <span className="text-sm font-medium">Eficiencia de Costos</span>
                      </div>
                      <span className={`text-sm font-bold ${getVarianceColor(project.variance)}`}>
                        {project.variance <= 0 ? 'Eficiente' : 'Requiere Atención'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedProject(project.id)}
                      >
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
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {costCategories.map((category, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <div className="flex items-center">
                      {category.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      ) : category.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 bg-gray-400 rounded-full" />
                      )}
                      <span className={`text-sm ml-1 ${
                        category.trend === 'up' ? 'text-red-500' : 
                        category.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                      }`}>
                        {category.change}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    ${category.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {category.percentage}% del presupuesto total
                  </div>
                  <Progress value={category.percentage * 2} className="mt-3 h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendencias de Costos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm font-medium">Materiales</span>
                    <div className="flex items-center text-red-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+8.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm font-medium">Mano de Obra</span>
                    <div className="flex items-center text-red-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+12.5%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm font-medium">Equipos</span>
                    <div className="flex items-center text-green-600">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span className="text-sm">-3.1%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas de Presupuesto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-900">
                        Centro Comercial Norte
                      </p>
                      <p className="text-xs text-red-700">
                        12.3% sobre presupuesto
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">
                        Aumento en costos de materiales
                      </p>
                      <p className="text-xs text-yellow-700">
                        Revisar proveedores
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Complejo Habitacional Sur
                      </p>
                      <p className="text-xs text-green-700">
                        Dentro del presupuesto
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}