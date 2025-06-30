'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Plus, 
  AlertTriangle, 
  Shield,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function RisksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [isAddRiskOpen, setIsAddRiskOpen] = useState(false);

  const risks = [
    {
      id: 1,
      title: 'Retrasos por Clima',
      description: 'Posibles retrasos en la construcción debido a temporada lluviosa',
      category: 'Ambiental',
      probability: 'Alta',
      impact: 'Medio',
      severity: 'Alto',
      status: 'Activo',
      project: 'Torre Residencial Vista Mar',
      identifiedDate: '2024-06-01',
      dueDate: '2024-08-15',
      owner: 'Carlos Mendoza',
      mitigation: 'Planificar actividades bajo techo durante temporada lluviosa. Tener materiales de protección disponibles.',
      contingency: 'Contratar carpas temporales y ajustar cronograma',
      cost: 15000,
      progress: 60
    },
    {
      id: 2,
      title: 'Aumento de Precios de Materiales',
      description: 'Incremento significativo en costos de cemento y acero',
      category: 'Financiero',
      probability: 'Alta',
      impact: 'Alto',
      severity: 'Crítico',
      status: 'Activo',
      project: 'Centro Comercial Norte',
      identifiedDate: '2024-05-15',
      dueDate: '2024-07-30',
      owner: 'Ana Rodríguez',
      mitigation: 'Comprar materiales principales por adelantado. Negociar contratos a precio fijo.',
      contingency: 'Buscar proveedores alternativos y ajustar presupuesto',
      cost: 45000,
      progress: 30
    },
    {
      id: 3,
      title: 'Falta de Mano de Obra Especializada',
      description: 'Escasez de soldadores certificados para estructura metálica',
      category: 'Recursos Humanos',
      probability: 'Media',
      impact: 'Alto',
      severity: 'Alto',
      status: 'Mitigado',
      project: 'Centro Comercial Norte',
      identifiedDate: '2024-04-20',
      dueDate: '2024-06-30',
      owner: 'Luis Ramírez',
      mitigation: 'Contratar personal con anticipación. Establecer acuerdos con institutos técnicos.',
      contingency: 'Subcontratar servicios especializados',
      cost: 8000,
      progress: 85
    },
    {
      id: 4,
      title: 'Problemas de Suelo',
      description: 'Posible presencia de suelo blando que requiera cimentación especial',
      category: 'Técnico',
      probability: 'Baja',
      impact: 'Alto',
      severity: 'Medio',
      status: 'Monitoreando',
      project: 'Complejo Habitacional Sur',
      identifiedDate: '2024-03-10',
      dueDate: '2024-09-15',
      owner: 'Ana Rodríguez',
      mitigation: 'Realizar estudios de suelo adicionales. Tener diseños alternativos preparados.',
      contingency: 'Implementar pilotes profundos si es necesario',
      cost: 25000,
      progress: 40
    },
    {
      id: 5,
      title: 'Retrasos en Permisos',
      description: 'Demoras en aprobación de permisos municipales',
      category: 'Legal/Regulatorio',
      probability: 'Media',
      impact: 'Medio',
      severity: 'Medio',
      status: 'Resuelto',
      project: 'Torre Residencial Vista Mar',
      identifiedDate: '2024-01-15',
      dueDate: '2024-03-01',
      owner: 'Carmen Morales',
      mitigation: 'Presentar documentación completa desde el inicio. Mantener comunicación constante.',
      contingency: 'Contratar gestor especializado en trámites',
      cost: 3000,
      progress: 100
    },
    {
      id: 6,
      title: 'Accidentes Laborales',
      description: 'Riesgo de accidentes por trabajo en altura',
      category: 'Seguridad',
      probability: 'Media',
      impact: 'Alto',
      severity: 'Alto',
      status: 'Activo',
      project: 'Torre Residencial Vista Mar',
      identifiedDate: '2024-02-01',
      dueDate: '2024-12-31',
      owner: 'Carlos Mendoza',
      mitigation: 'Capacitación continua en seguridad. Uso obligatorio de EPP. Inspecciones regulares.',
      contingency: 'Seguro de accidentes laborales ampliado',
      cost: 12000,
      progress: 70
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Crítico': return 'bg-red-100 text-red-800 border-red-200';
      case 'Alto': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medio': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Bajo': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-red-100 text-red-800';
      case 'Mitigado': return 'bg-yellow-100 text-yellow-800';
      case 'Monitoreando': return 'bg-blue-100 text-blue-800';
      case 'Resuelto': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityIcon = (probability: string) => {
    switch (probability) {
      case 'Alta': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'Media': return <div className="w-4 h-4 bg-yellow-500 rounded-full" />;
      case 'Baja': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const filteredRisks = risks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         risk.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterSeverity === 'all' || risk.severity === filterSeverity;
    return matchesSearch && matchesFilter;
  });

  const totalRisks = risks.length;
  const activeRisks = risks.filter(r => r.status === 'Activo').length;
  const criticalRisks = risks.filter(r => r.severity === 'Crítico').length;
  const resolvedRisks = risks.filter(r => r.status === 'Resuelto').length;

  const risksByCategory = risks.reduce((acc, risk) => {
    acc[risk.category] = (acc[risk.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Riesgos</h1>
          <p className="text-gray-600 mt-2">
            Identifica, evalúa y mitiga los riesgos de tus proyectos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={isAddRiskOpen} onOpenChange={setIsAddRiskOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-gradient text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Riesgo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Riesgo</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del Riesgo</Label>
                    <Input id="title" placeholder="Ej: Retrasos por clima" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ambiental">Ambiental</SelectItem>
                        <SelectItem value="financiero">Financiero</SelectItem>
                        <SelectItem value="tecnico">Técnico</SelectItem>
                        <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                        <SelectItem value="legal">Legal/Regulatorio</SelectItem>
                        <SelectItem value="seguridad">Seguridad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" placeholder="Describe el riesgo detalladamente..." />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="probability">Probabilidad</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Probabilidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">Baja</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="impact">Impacto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Impacto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bajo">Bajo</SelectItem>
                        <SelectItem value="medio">Medio</SelectItem>
                        <SelectItem value="alto">Alto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">Proyecto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Proyecto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="torre">Torre Residencial Vista Mar</SelectItem>
                        <SelectItem value="centro">Centro Comercial Norte</SelectItem>
                        <SelectItem value="complejo">Complejo Habitacional Sur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mitigation">Plan de Mitigación</Label>
                  <Textarea id="mitigation" placeholder="Describe las acciones para mitigar el riesgo..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddRiskOpen(false)}>
                    Cancelar
                  </Button>
                  <Button className="bg-brand-primary text-white">
                    Registrar Riesgo
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Riesgos</p>
                <p className="text-3xl font-bold text-gray-900">{totalRisks}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Riesgos Activos</p>
                <p className="text-3xl font-bold text-red-600">{activeRisks}</p>
                <p className="text-sm text-red-600">Requieren atención</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Críticos</p>
                <p className="text-3xl font-bold text-red-600">{criticalRisks}</p>
                <p className="text-sm text-red-600">Alta prioridad</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resueltos</p>
                <p className="text-3xl font-bold text-green-600">{resolvedRisks}</p>
                <p className="text-sm text-green-600">Completados</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="risks" className="w-full">
        <TabsList>
          <TabsTrigger value="risks">Riesgos</TabsTrigger>
          <TabsTrigger value="matrix">Matriz de Riesgos</TabsTrigger>
          <TabsTrigger value="categories">Por Categoría</TabsTrigger>
        </TabsList>

        <TabsContent value="risks" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar riesgos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterSeverity === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterSeverity('all')}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={filterSeverity === 'Crítico' ? 'default' : 'outline'}
                onClick={() => setFilterSeverity('Crítico')}
                size="sm"
              >
                Críticos
              </Button>
              <Button
                variant={filterSeverity === 'Alto' ? 'default' : 'outline'}
                onClick={() => setFilterSeverity('Alto')}
                size="sm"
              >
                Altos
              </Button>
              <Button
                variant={filterSeverity === 'Medio' ? 'default' : 'outline'}
                onClick={() => setFilterSeverity('Medio')}
                size="sm"
              >
                Medios
              </Button>
            </div>
          </div>

          {/* Risks List */}
          <div className="space-y-4">
            {filteredRisks.map((risk) => (
              <Card key={risk.id} className={`border-l-4 ${
                risk.severity === 'Crítico' ? 'border-l-red-500' :
                risk.severity === 'Alto' ? 'border-l-orange-500' :
                risk.severity === 'Medio' ? 'border-l-yellow-500' : 'border-l-green-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {risk.title}
                          </h3>
                          <p className="text-gray-600 mb-2">{risk.description}</p>
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
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getSeverityColor(risk.severity)}>
                          {risk.severity}
                        </Badge>
                        <Badge className={getStatusColor(risk.status)}>
                          {risk.status}
                        </Badge>
                        <Badge variant="outline">
                          {risk.category}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          {getProbabilityIcon(risk.probability)}
                          <span className="text-sm text-gray-600">
                            Probabilidad: <span className="font-medium">{risk.probability}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Proyecto: <span className="font-medium">{risk.project}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Vence: <span className="font-medium">{new Date(risk.dueDate).toLocaleDateString('es-ES')}</span>
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Plan de Mitigación:</h4>
                        <p className="text-sm text-gray-700">{risk.mitigation}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            <span className="text-gray-600">Responsable: </span>
                            <span className="font-medium">{risk.owner}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Costo estimado: </span>
                            <span className="font-medium">${risk.cost.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Progreso:</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-brand-primary h-2 rounded-full"
                              style={{ width: `${risk.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{risk.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Matriz de Probabilidad vs Impacto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div></div>
                <div className="font-medium text-sm">Bajo</div>
                <div className="font-medium text-sm">Medio</div>
                <div className="font-medium text-sm">Alto</div>
                
                <div className="font-medium text-sm">Alta</div>
                <div className="bg-yellow-100 p-4 rounded border min-h-[80px] flex items-center justify-center">
                  <span className="text-xs">Medio</span>
                </div>
                <div className="bg-orange-100 p-4 rounded border min-h-[80px] flex items-center justify-center">
                  <span className="text-xs">Alto</span>
                </div>
                <div className="bg-red-100 p-4 rounded border min-h-[80px] flex items-center justify-center">
                  <span className="text-xs">Crítico</span>
                </div>
                
                <div className="font-medium text-sm">Media</div>
                <div className="bg-green-100 p-4 rounded border min-h-[80px] flex items-center justify-center">
                  <span className="text-xs">Bajo</span>
                </div>
                <div className="bg-yellow-100 p-4 rounded border min-h-[80px] flex items-center justify-center">
                  <span className="text-xs">Medio</span>
                </div>
                <div className="bg-orange-100 p-4 rounded border min-h-[80px] flex items-center justify-center">
                  <span className="text-xs">Alto</span>
                </div>
                
                <div className="font-medium text-sm">Baja</div>
                <div className="bg-green-100 p-4 rounded border min-h-[80px] flex items-center justify-center">
                  <span className="text-xs">Bajo</span>
                </div>
                <div className="bg-green-100 p-4 rounded border min-h-[80px] flex items-center justify-center">
                  <span className="text-xs">Bajo</span>
                </div>
                <div className="bg-yellow-100 p-4 rounded border min-h-[80px] flex items-center justify-center">
                  <span className="text-xs">Medio</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(risksByCategory).map(([category, count]) => (
              <Card key={category}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{category}</h3>
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Riesgos:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Activos:</span>
                      <span className="font-medium text-red-600">
                        {risks.filter(r => r.category === category && r.status === 'Activo').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Resueltos:</span>
                      <span className="font-medium text-green-600">
                        {risks.filter(r => r.category === category && r.status === 'Resuelto').length}
                      </span>
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