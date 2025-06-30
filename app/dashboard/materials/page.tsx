'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Package, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
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

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const materials = [
    {
      id: 1,
      name: 'Cemento Portland',
      category: 'Cemento',
      unit: 'sacos',
      stock: 150,
      minStock: 50,
      maxStock: 300,
      unitCost: 8.50,
      totalValue: 1275,
      supplier: 'Cemento Nacional',
      lastUpdated: '2024-06-20',
      status: 'En Stock',
      trend: 'up',
      priceChange: '+5.2%',
      projects: ['Torre Vista Mar', 'Centro Comercial Norte']
    },
    {
      id: 2,
      name: 'Hierro de Construcción 12mm',
      category: 'Acero',
      unit: 'varillas',
      stock: 25,
      minStock: 30,
      maxStock: 100,
      unitCost: 12.75,
      totalValue: 318.75,
      supplier: 'Aceros del Ecuador',
      lastUpdated: '2024-06-19',
      status: 'Stock Bajo',
      trend: 'up',
      priceChange: '+8.1%',
      projects: ['Torre Vista Mar', 'Complejo Habitacional']
    },
    {
      id: 3,
      name: 'Arena Fina',
      category: 'Agregados',
      unit: 'm³',
      stock: 80,
      minStock: 20,
      maxStock: 150,
      unitCost: 25.00,
      totalValue: 2000,
      supplier: 'Agregados del Litoral',
      lastUpdated: '2024-06-21',
      status: 'En Stock',
      trend: 'stable',
      priceChange: '+0.5%',
      projects: ['Torre Vista Mar', 'Centro Comercial Norte', 'Complejo Habitacional']
    },
    {
      id: 4,
      name: 'Grava Triturada',
      category: 'Agregados',
      unit: 'm³',
      stock: 5,
      minStock: 15,
      maxStock: 100,
      unitCost: 30.00,
      totalValue: 150,
      supplier: 'Agregados del Litoral',
      lastUpdated: '2024-06-18',
      status: 'Crítico',
      trend: 'down',
      priceChange: '-2.3%',
      projects: ['Centro Comercial Norte']
    },
    {
      id: 5,
      name: 'Bloques de Hormigón 15x20x40',
      category: 'Mampostería',
      unit: 'unidades',
      stock: 2500,
      minStock: 500,
      maxStock: 5000,
      unitCost: 0.85,
      totalValue: 2125,
      supplier: 'Bloques Guayas',
      lastUpdated: '2024-06-20',
      status: 'En Stock',
      trend: 'stable',
      priceChange: '+1.2%',
      projects: ['Torre Vista Mar', 'Complejo Habitacional']
    },
    {
      id: 6,
      name: 'Tubería PVC 4 pulgadas',
      category: 'Plomería',
      unit: 'metros',
      stock: 200,
      minStock: 100,
      maxStock: 500,
      unitCost: 3.25,
      totalValue: 650,
      supplier: 'Plastigama',
      lastUpdated: '2024-06-19',
      status: 'En Stock',
      trend: 'up',
      priceChange: '+3.8%',
      projects: ['Centro Comercial Norte', 'Complejo Habitacional']
    }
  ];

  const categories = [
    { name: 'Cemento', count: 1, value: 1275 },
    { name: 'Acero', count: 1, value: 318.75 },
    { name: 'Agregados', count: 2, value: 2150 },
    { name: 'Mampostería', count: 1, value: 2125 },
    { name: 'Plomería', count: 1, value: 650 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En Stock': return 'bg-green-100 text-green-800';
      case 'Stock Bajo': return 'bg-yellow-100 text-yellow-800';
      case 'Crítico': return 'bg-red-100 text-red-800';
      case 'Agotado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100;
    if (current <= min) return { level: 'critical', percentage };
    if (current <= min * 1.5) return { level: 'low', percentage };
    return { level: 'good', percentage };
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === 'all' || material.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const totalValue = materials.reduce((sum, material) => sum + material.totalValue, 0);
  const lowStockItems = materials.filter(m => m.stock <= m.minStock).length;
  const criticalItems = materials.filter(m => m.status === 'Crítico').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Materiales</h1>
          <p className="text-gray-600 mt-2">
            Controla el inventario y costos de materiales de construcción
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-brand-gradient text-white">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Material
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Materiales</p>
                <p className="text-3xl font-bold text-gray-900">{materials.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalValue.toLocaleString()}
                </p>
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
                <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
                <p className="text-3xl font-bold text-yellow-600">{lowStockItems}</p>
                <p className="text-sm text-yellow-600">Requieren reposición</p>
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
                <p className="text-sm font-medium text-gray-600">Críticos</p>
                <p className="text-3xl font-bold text-red-600">{criticalItems}</p>
                <p className="text-sm text-red-600">Atención inmediata</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar materiales..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('all')}
                size="sm"
              >
                Todos
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={filterCategory === category.name ? 'default' : 'outline'}
                  onClick={() => setFilterCategory(category.name)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Materials Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900">Material</th>
                      <th className="text-left p-4 font-medium text-gray-900">Categoría</th>
                      <th className="text-right p-4 font-medium text-gray-900">Stock</th>
                      <th className="text-right p-4 font-medium text-gray-900">Precio Unit.</th>
                      <th className="text-right p-4 font-medium text-gray-900">Valor Total</th>
                      <th className="text-center p-4 font-medium text-gray-900">Estado</th>
                      <th className="text-center p-4 font-medium text-gray-900">Tendencia</th>
                      <th className="text-center p-4 font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMaterials.map((material) => {
                      const stockLevel = getStockLevel(material.stock, material.minStock, material.maxStock);
                      return (
                        <tr key={material.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <div className="font-medium text-gray-900">{material.name}</div>
                              <div className="text-sm text-gray-500">{material.supplier}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{material.category}</Badge>
                          </td>
                          <td className="p-4 text-right">
                            <div>
                              <div className="font-medium">{material.stock} {material.unit}</div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div 
                                  className={`h-1.5 rounded-full ${
                                    stockLevel.level === 'critical' ? 'bg-red-500' :
                                    stockLevel.level === 'low' ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(stockLevel.percentage, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right font-medium">
                            ${material.unitCost.toFixed(2)}
                          </td>
                          <td className="p-4 text-right font-medium">
                            ${material.totalValue.toLocaleString()}
                          </td>
                          <td className="p-4 text-center">
                            <Badge className={getStatusColor(material.status)}>
                              {material.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center">
                              {material.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                              ) : material.trend === 'down' ? (
                                <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                              ) : (
                                <div className="w-4 h-4 bg-gray-400 rounded-full mr-1" />
                              )}
                              <span className={`text-xs ${
                                material.trend === 'up' ? 'text-red-500' :
                                material.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                              }`}>
                                {material.priceChange}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
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
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Materiales:</span>
                      <span className="font-medium">{category.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Valor Total:</span>
                      <span className="font-medium">${category.value.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="space-y-4">
            {materials.filter(m => m.status === 'Crítico' || m.status === 'Stock Bajo').map((material) => (
              <Card key={material.id} className={`border-l-4 ${
                material.status === 'Crítico' ? 'border-l-red-500' : 'border-l-yellow-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        material.status === 'Crítico' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        <AlertTriangle className={`w-5 h-5 ${
                          material.status === 'Crítico' ? 'text-red-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{material.name}</h3>
                        <p className="text-sm text-gray-600">
                          Stock actual: {material.stock} {material.unit} | 
                          Mínimo requerido: {material.minStock} {material.unit}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Proveedor: {material.supplier}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Solicitar Cotización
                      </Button>
                      <Button size="sm" className="bg-brand-primary text-white">
                        Realizar Pedido
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