'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Download, 
  FileText, 
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Filter,
  Plus,
  Eye,
  Share,
  Clock
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const reports = [
    {
      id: 1,
      name: 'Reporte Mensual de Proyectos',
      type: 'Progreso',
      description: 'Estado general de todos los proyectos activos',
      generatedDate: '2024-06-20',
      period: 'Junio 2024',
      format: 'PDF',
      size: '2.4 MB',
      status: 'Completado',
      project: 'Todos los proyectos',
      downloads: 15,
      lastAccess: '2024-06-21'
    },
    {
      id: 2,
      name: 'Análisis de Costos - Torre Vista Mar',
      type: 'Financiero',
      description: 'Desglose detallado de costos y presupuesto',
      generatedDate: '2024-06-19',
      period: 'Q2 2024',
      format: 'Excel',
      size: '1.8 MB',
      status: 'Completado',
      project: 'Torre Residencial Vista Mar',
      downloads: 8,
      lastAccess: '2024-06-20'
    },
    {
      id: 3,
      name: 'Reporte de Materiales',
      type: 'Inventario',
      description: 'Estado del inventario y necesidades de reposición',
      generatedDate: '2024-06-18',
      period: 'Junio 2024',
      format: 'PDF',
      size: '1.2 MB',
      status: 'Completado',
      project: 'Todos los proyectos',
      downloads: 22,
      lastAccess: '2024-06-21'
    },
    {
      id: 4,
      name: 'Análisis de Rendimiento del Personal',
      type: 'Recursos Humanos',
      description: 'Evaluación de productividad y desempeño',
      generatedDate: '2024-06-17',
      period: 'Mayo 2024',
      format: 'PDF',
      size: '3.1 MB',
      status: 'Completado',
      project: 'Centro Comercial Norte',
      downloads: 5,
      lastAccess: '2024-06-18'
    },
    {
      id: 5,
      name: 'Reporte de Riesgos Activos',
      type: 'Riesgos',
      description: 'Evaluación y estado de mitigación de riesgos',
      generatedDate: '2024-06-16',
      period: 'Q2 2024',
      format: 'PDF',
      size: '2.7 MB',
      status: 'Completado',
      project: 'Todos los proyectos',
      downloads: 12,
      lastAccess: '2024-06-19'
    },
    {
      id: 6,
      name: 'Dashboard Ejecutivo',
      type: 'Ejecutivo',
      description: 'Resumen ejecutivo con KPIs principales',
      generatedDate: '2024-06-21',
      period: 'Junio 2024',
      format: 'PDF',
      size: '0.8 MB',
      status: 'Generando',
      project: 'Todos los proyectos',
      downloads: 0,
      lastAccess: null
    }
  ];

  const reportTemplates = [
    {
      id: 1,
      name: 'Reporte de Progreso Semanal',
      description: 'Estado semanal de avance de proyectos',
      type: 'Progreso',
      frequency: 'Semanal',
      lastGenerated: '2024-06-17',
      active: true
    },
    {
      id: 2,
      name: 'Análisis Financiero Mensual',
      description: 'Resumen mensual de costos y presupuestos',
      type: 'Financiero',
      frequency: 'Mensual',
      lastGenerated: '2024-06-01',
      active: true
    },
    {
      id: 3,
      name: 'Reporte de Seguridad',
      description: 'Incidentes y medidas de seguridad',
      type: 'Seguridad',
      frequency: 'Quincenal',
      lastGenerated: '2024-06-15',
      active: false
    },
    {
      id: 4,
      name: 'Dashboard de KPIs',
      description: 'Indicadores clave de rendimiento',
      type: 'Ejecutivo',
      frequency: 'Diario',
      lastGenerated: '2024-06-21',
      active: true
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Progreso': return 'bg-blue-100 text-blue-800';
      case 'Financiero': return 'bg-green-100 text-green-800';
      case 'Inventario': return 'bg-purple-100 text-purple-800';
      case 'Recursos Humanos': return 'bg-orange-100 text-orange-800';
      case 'Riesgos': return 'bg-red-100 text-red-800';
      case 'Ejecutivo': return 'bg-gray-100 text-gray-800';
      case 'Seguridad': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Generando': return 'bg-blue-100 text-blue-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF': return <FileText className="w-4 h-4 text-red-500" />;
      case 'Excel': return <BarChart3 className="w-4 h-4 text-green-500" />;
      case 'PowerPoint': return <PieChart className="w-4 h-4 text-orange-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalReports = reports.length;
  const completedReports = reports.filter(r => r.status === 'Completado').length;
  const totalDownloads = reports.reduce((sum, r) => sum + r.downloads, 0);
  const activeTemplates = reportTemplates.filter(t => t.active).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes y Analytics</h1>
          <p className="text-gray-600 mt-2">
            Genera y gestiona reportes detallados de tus proyectos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Plantilla
          </Button>
          <Button className="bg-brand-gradient text-white">
            <FileText className="w-4 h-4 mr-2" />
            Generar Reporte
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reportes</p>
                <p className="text-3xl font-bold text-gray-900">{totalReports}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completados</p>
                <p className="text-3xl font-bold text-green-600">{completedReports}</p>
                <p className="text-sm text-green-600">Este mes</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Descargas</p>
                <p className="text-3xl font-bold text-purple-600">{totalDownloads}</p>
                <p className="text-sm text-purple-600">Total</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Plantillas Activas</p>
                <p className="text-3xl font-bold text-orange-600">{activeTemplates}</p>
                <p className="text-sm text-orange-600">Automatizadas</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar reportes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Progreso">Progreso</SelectItem>
                  <SelectItem value="Financiero">Financiero</SelectItem>
                  <SelectItem value="Inventario">Inventario</SelectItem>
                  <SelectItem value="Recursos Humanos">RRHH</SelectItem>
                  <SelectItem value="Riesgos">Riesgos</SelectItem>
                  <SelectItem value="Ejecutivo">Ejecutivo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                        {report.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-3">
                        {report.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getFormatIcon(report.format)}
                      <span className="text-xs text-gray-500">{report.format}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge className={getTypeColor(report.type)}>
                      {report.type}
                    </Badge>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Report Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Proyecto</div>
                      <div className="font-medium truncate">{report.project}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Período</div>
                      <div className="font-medium">{report.period}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Generado</div>
                      <div className="font-medium">
                        {new Date(report.generatedDate).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Tamaño</div>
                      <div className="font-medium">{report.size}</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{report.downloads} descargas</span>
                      </div>
                      {report.lastAccess && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Último acceso: {new Date(report.lastAccess).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      disabled={report.status !== 'Completado'}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-brand-primary text-white"
                      disabled={report.status !== 'Completado'}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={report.status !== 'Completado'}
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {template.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-2">
                        {template.description}
                      </p>
                    </div>
                    <Badge className={template.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {template.active ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Tipo</div>
                      <Badge className={getTypeColor(template.type)} variant="outline">
                        {template.type}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-gray-600">Frecuencia</div>
                      <div className="font-medium">{template.frequency}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-600">Última generación</div>
                      <div className="font-medium">
                        {new Date(template.lastGenerated).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Configurar
                    </Button>
                    <Button size="sm" className="flex-1 bg-brand-primary text-white">
                      Generar Ahora
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
                <CardTitle>Reportes Más Descargados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports
                    .sort((a, b) => b.downloads - a.downloads)
                    .slice(0, 5)
                    .map((report, index) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{report.name}</div>
                            <div className="text-sm text-gray-600">{report.type}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-brand-primary">
                            {report.downloads}
                          </div>
                          <div className="text-xs text-gray-500">descargas</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipos de Reportes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    reports.reduce((acc, report) => {
                      acc[report.type] = (acc[report.type] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={getTypeColor(type)} variant="outline">
                          {type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{count}</div>
                        <div className="text-xs text-gray-500">reportes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}