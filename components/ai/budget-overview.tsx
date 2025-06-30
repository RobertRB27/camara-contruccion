'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Eye, X, ArrowLeft, ArrowRight, Maximize2, Minimize2, GitCompare as Compare, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BudgetItem {
  id: string;
  code: string;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  details?: BudgetDetail;
}

interface BudgetDetail {
  title: string;
  unit: string;
  equipment: Array<{
    description: string;
    quantity: number;
    rate: number;
    costPerHour: number;
    performance: number;
    cost: number;
  }>;
  labor: Array<{
    description: string;
    quantity: number;
    dailyRate: number;
    costPerHour: number;
    performance: number;
    cost: number;
  }>;
  materials: Array<{
    description: string;
    unit: string;
    quantity: number;
    unitPrice: number;
    cost: number;
  }>;
  transport: Array<{
    description: string;
    unit: string;
    quantity: number;
    rate: number;
    cost: number;
  }>;
  subtotals: {
    equipment: number;
    labor: number;
    materials: number;
    transport: number;
    directCost: number;
    indirectCost: number;
    totalCost: number;
  };
}

interface BudgetOverviewProps {
  projectTitle: string;
  projectDescription: string;
  distance: string;
  materials: string;
  budgetItems: BudgetItem[];
}

export function BudgetOverview({ 
  projectTitle, 
  projectDescription, 
  distance, 
  materials, 
  budgetItems 
}: BudgetOverviewProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'overview' | 'detail' | 'compare'>('overview');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Extended mock data with more items
  const mockBudgetItems: BudgetItem[] = [
    {
      id: '1',
      code: '',
      description: 'CONSTRUCCION DE LA VIA',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 9013529.01,
      category: 'HEADER'
    },
    {
      id: '1.1',
      code: '',
      description: 'OBRAS PRELIMINARES',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 9302.08,
      category: 'CATEGORY'
    },
    {
      id: '1.1.1',
      code: '302-1',
      description: 'DESBROCE, DESBOSQUE Y LIMPIEZA',
      unit: 'm2',
      quantity: 465.104,
      unitPrice: 0.02,
      totalPrice: 9302.08,
      category: 'OBRAS PRELIMINARES',
      details: {
        title: 'DESBROCE, DESBOSQUE Y LIMPIEZA',
        unit: 'm2',
        equipment: [
          {
            description: 'Tractor de oruga 175 HP',
            quantity: 1.00,
            rate: 57.06,
            costPerHour: 57.06,
            performance: 0.00030,
            cost: 0.02
          },
          {
            description: 'Motosierra 7 HP',
            quantity: 2.00,
            rate: 1.25,
            costPerHour: 2.50,
            performance: 0.00030,
            cost: 0.00
          }
        ],
        labor: [
          {
            description: 'TRACTOR DE CARRILES O RUEDAS (BULLDOZER, TOPADOR, ROTURADOR, MALACATE, TRAILLA) (GRUPO I) (E.O.C1)',
            quantity: 1.00,
            dailyRate: 4.65,
            costPerHour: 4.65,
            performance: 0.00030,
            cost: 0.00
          },
          {
            description: 'ENGRASADOR O ABASTECEDOR RESPONSABLE (E.O.D2)',
            quantity: 1.00,
            dailyRate: 4.19,
            costPerHour: 4.19,
            performance: 0.00030,
            cost: 0.00
          },
          {
            description: 'PEON/ AYUDANTE (albañil, carpintero,electricista, fierrero, plomero) (E.O.E2)',
            quantity: 2.00,
            dailyRate: 4.14,
            costPerHour: 8.28,
            performance: 0.00030,
            cost: 0.00
          }
        ],
        materials: [],
        transport: [],
        subtotals: {
          equipment: 0.02,
          labor: 0.00,
          materials: 0.00,
          transport: 0.00,
          directCost: 0.02,
          indirectCost: 0.00,
          totalCost: 0.02
        }
      }
    },
    {
      id: '1.2',
      code: '',
      description: 'MOVIMIENTO DE TIERRA',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 6329433.94,
      category: 'CATEGORY'
    },
    {
      id: '1.2.1',
      code: '303-2(1)',
      description: 'EXCAVACION SIN CLASIFICACION (empuje = 60 m) (con % relleno compactado)',
      unit: 'm3',
      quantity: 409.56,
      unitPrice: 1.44,
      totalPrice: 589.77,
      category: 'MOVIMIENTO DE TIERRA',
      details: {
        title: 'EXCAVACION SIN CLASIFICACION (empuje = 60 m) (con % relleno compactado)',
        unit: 'm3',
        equipment: [
          {
            description: 'Tractor de oruga 175 HP',
            quantity: 1.00,
            rate: 57.06,
            costPerHour: 57.06,
            performance: 0.01230,
            cost: 0.70
          },
          {
            description: 'Motoniveladora 135 HP',
            quantity: 0.15,
            rate: 59.65,
            costPerHour: 8.95,
            performance: 0.01230,
            cost: 0.11
          },
          {
            description: 'Rodillo pata de cabra 150 HP 10.9 Ton.',
            quantity: 0.30,
            rate: 38.00,
            costPerHour: 11.40,
            performance: 0.01230,
            cost: 0.14
          },
          {
            description: 'Tanquero 8Ton',
            quantity: 0.30,
            rate: 30.00,
            costPerHour: 9.00,
            performance: 0.01230,
            cost: 0.11
          }
        ],
        labor: [
          {
            description: 'TRACTOR DE CARRILES O RUEDAS (BULLDOZER, TOPADOR, ROTURADOR, MALACATE, TRAILLA) (GRUPO I) (E.O.C1)',
            quantity: 1.00,
            dailyRate: 4.65,
            costPerHour: 4.65,
            performance: 0.01230,
            cost: 0.06
          },
          {
            description: 'MOTONIVELADORA (E.O.C1)',
            quantity: 0.15,
            dailyRate: 4.65,
            costPerHour: 0.70,
            performance: 0.01230,
            cost: 0.01
          },
          {
            description: 'OPERADOR DE RODILLO AUTOPROPULSADO (E.O.C2)',
            quantity: 0.30,
            dailyRate: 4.42,
            costPerHour: 1.33,
            performance: 0.01230,
            cost: 0.02
          },
          {
            description: 'ENGRASADOR O ABASTECEDOR RESPONSABLE (E.O.D2)',
            quantity: 1.00,
            dailyRate: 4.19,
            costPerHour: 4.19,
            performance: 0.01230,
            cost: 0.05
          },
          {
            description: 'CHOFER: Tanqueros (Estr.Oc.C1)',
            quantity: 0.30,
            dailyRate: 6.08,
            costPerHour: 1.82,
            performance: 0.01230,
            cost: 0.02
          }
        ],
        materials: [],
        transport: [],
        subtotals: {
          equipment: 1.07,
          labor: 0.16,
          materials: 0.00,
          transport: 0.00,
          directCost: 1.23,
          indirectCost: 0.21,
          totalCost: 1.44
        }
      }
    },
    {
      id: '1.2.2',
      code: '304-1(2)',
      description: 'MATERIAL DE PRESTAMO IMPORTADO',
      unit: 'm3',
      quantity: 318084.74,
      unitPrice: 5.72,
      totalPrice: 1819444.71,
      category: 'MOVIMIENTO DE TIERRA',
      details: {
        title: 'MATERIAL DE PRESTAMO IMPORTADO',
        unit: 'm3',
        equipment: [
          {
            description: 'Motoniveladora 135 HP',
            quantity: 1.00,
            rate: 59.65,
            costPerHour: 59.65,
            performance: 0.01180,
            cost: 0.70
          },
          {
            description: 'Rodillo pata de cabra 125 HP 10.9 Ton.',
            quantity: 1.00,
            rate: 38.00,
            costPerHour: 38.00,
            performance: 0.01180,
            cost: 0.45
          },
          {
            description: 'Tanquero 10Ton',
            quantity: 1.00,
            rate: 30.00,
            costPerHour: 30.00,
            performance: 0.01180,
            cost: 0.35
          }
        ],
        labor: [
          {
            description: 'MOTONIVELADORA (E.O.C1)',
            quantity: 1.00,
            dailyRate: 4.65,
            costPerHour: 4.65,
            performance: 0.01180,
            cost: 0.05
          },
          {
            description: 'OPERADOR DE RODILLO AUTOPROPULSADO (E.O.C2)',
            quantity: 1.00,
            dailyRate: 4.42,
            costPerHour: 4.42,
            performance: 0.01180,
            cost: 0.05
          },
          {
            description: 'ENGRASADOR O ABASTECEDOR RESPONSABLE (E.O.D2)',
            quantity: 1.00,
            dailyRate: 4.19,
            costPerHour: 4.19,
            performance: 0.01180,
            cost: 0.05
          },
          {
            description: 'CHOFER: Tanqueros (Estr.Oc.C1)',
            quantity: 1.00,
            dailyRate: 6.08,
            costPerHour: 6.08,
            performance: 0.01180,
            cost: 0.07
          }
        ],
        materials: [
          {
            description: 'Cascajo mediano o fino',
            unit: 'm3',
            quantity: 1.25,
            unitPrice: 2.53,
            cost: 3.16
          }
        ],
        transport: [],
        subtotals: {
          equipment: 1.51,
          labor: 0.22,
          materials: 3.16,
          transport: 0.00,
          directCost: 4.89,
          indirectCost: 0.83,
          totalCost: 5.72
        }
      }
    },
    {
      id: '1.2.3',
      code: '402-2(3)P',
      description: 'MATERIAL DE PEDRAPLEN (Incluye transporte 15-25Km)',
      unit: 'm3',
      quantity: 215800.00,
      unitPrice: 13.60,
      totalPrice: 2934880.00,
      category: 'MOVIMIENTO DE TIERRA',
      details: {
        title: 'MATERIAL DE PEDRAPLEN (Incluye transporte 15-25Km)',
        unit: 'm3',
        equipment: [
          {
            description: 'Excavadora 320 HP',
            quantity: 1.00,
            rate: 65.50,
            costPerHour: 65.50,
            performance: 0.02500,
            cost: 1.64
          },
          {
            description: 'Volqueta 12 m3',
            quantity: 3.00,
            rate: 45.00,
            costPerHour: 135.00,
            performance: 0.02500,
            cost: 3.38
          }
        ],
        labor: [
          {
            description: 'OPERADOR DE EXCAVADORA (E.O.C1)',
            quantity: 1.00,
            dailyRate: 4.65,
            costPerHour: 4.65,
            performance: 0.02500,
            cost: 0.12
          },
          {
            description: 'CHOFER PROFESIONAL (E.O.C2)',
            quantity: 3.00,
            dailyRate: 4.42,
            costPerHour: 13.26,
            performance: 0.02500,
            cost: 0.33
          }
        ],
        materials: [
          {
            description: 'Piedra de cantera',
            unit: 'm3',
            quantity: 1.15,
            unitPrice: 7.50,
            cost: 8.63
          }
        ],
        transport: [],
        subtotals: {
          equipment: 5.02,
          labor: 0.45,
          materials: 8.63,
          transport: 0.00,
          directCost: 14.10,
          indirectCost: 2.40,
          totalCost: 16.50
        }
      }
    },
    {
      id: '1.2.4',
      code: '309-4(2)*P7',
      description: 'TRANSPORTE DE MATERIAL DE PRESTAMO IMPORTADO, LONGITUD DE ACARREO DE 25-45 KM',
      unit: 'm3-km',
      quantity: 4771271.10,
      unitPrice: 0.33,
      totalPrice: 1574519.46,
      category: 'MOVIMIENTO DE TIERRA',
      details: {
        title: 'TRANSPORTE DE MATERIAL DE PRESTAMO IMPORTADO, LONGITUD DE ACARREO DE 25-45 KM',
        unit: 'm3-km',
        equipment: [
          {
            description: 'Volqueta 12 m3',
            quantity: 1.00,
            rate: 45.00,
            costPerHour: 45.00,
            performance: 0.00750,
            cost: 0.34
          }
        ],
        labor: [
          {
            description: 'CHOFER PROFESIONAL (E.O.C2)',
            quantity: 1.00,
            dailyRate: 4.42,
            costPerHour: 4.42,
            performance: 0.00750,
            cost: 0.03
          }
        ],
        materials: [],
        transport: [],
        subtotals: {
          equipment: 0.34,
          labor: 0.03,
          materials: 0.00,
          transport: 0.00,
          directCost: 0.37,
          indirectCost: 0.06,
          totalCost: 0.43
        }
      }
    },
    {
      id: '1.3',
      code: '',
      description: 'ESTRUCTURA DE PAVIMENTO',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 2674792.99,
      category: 'CATEGORY'
    },
    {
      id: '1.3.1',
      code: '402-2(3)g',
      description: 'MEJORAMIENTO DE LA SUBRASANTE CON SUELO SELECCIONADO (Incluye transporte 20-40Km)',
      unit: 'm3',
      quantity: 56386.01,
      unitPrice: 16.02,
      totalPrice: 903303.88,
      category: 'ESTRUCTURA DE PAVIMENTO',
      details: {
        title: 'MEJORAMIENTO DE LA SUBRASANTE CON SUELO SELECCIONADO (Incluye transporte 20-40Km)',
        unit: 'm3',
        equipment: [
          {
            description: 'Motoniveladora 135 HP',
            quantity: 1.00,
            rate: 59.65,
            costPerHour: 59.65,
            performance: 0.01500,
            cost: 0.89
          },
          {
            description: 'Rodillo vibratorio 10 ton',
            quantity: 1.00,
            rate: 42.00,
            costPerHour: 42.00,
            performance: 0.01500,
            cost: 0.63
          },
          {
            description: 'Volqueta 12 m3',
            quantity: 2.00,
            rate: 45.00,
            costPerHour: 90.00,
            performance: 0.01500,
            cost: 1.35
          }
        ],
        labor: [
          {
            description: 'MOTONIVELADORA (E.O.C1)',
            quantity: 1.00,
            dailyRate: 4.65,
            costPerHour: 4.65,
            performance: 0.01500,
            cost: 0.07
          },
          {
            description: 'OPERADOR DE RODILLO (E.O.C2)',
            quantity: 1.00,
            dailyRate: 4.42,
            costPerHour: 4.42,
            performance: 0.01500,
            cost: 0.07
          },
          {
            description: 'CHOFER PROFESIONAL (E.O.C2)',
            quantity: 2.00,
            dailyRate: 4.42,
            costPerHour: 8.84,
            performance: 0.01500,
            cost: 0.13
          }
        ],
        materials: [
          {
            description: 'Suelo seleccionado',
            unit: 'm3',
            quantity: 1.20,
            unitPrice: 9.50,
            cost: 11.40
          }
        ],
        transport: [],
        subtotals: {
          equipment: 2.87,
          labor: 0.27,
          materials: 11.40,
          transport: 0.00,
          directCost: 14.54,
          indirectCost: 2.47,
          totalCost: 17.01
        }
      }
    },
    {
      id: '1.3.2',
      code: '404-1(2)',
      description: 'BASE CLASE 1 (e=0.25 m) (inc. transporte)',
      unit: 'm3',
      quantity: 22664.29,
      unitPrice: 12.04,
      totalPrice: 272878.05,
      category: 'ESTRUCTURA DE PAVIMENTO',
      details: {
        title: 'BASE CLASE 1 (e=0.25 m) (inc. transporte)',
        unit: 'm3',
        equipment: [
          {
            description: 'Motoniveladora 135 HP',
            quantity: 1.00,
            rate: 59.65,
            costPerHour: 59.65,
            performance: 0.01200,
            cost: 0.72
          },
          {
            description: 'Rodillo vibratorio 10 ton',
            quantity: 1.00,
            rate: 42.00,
            costPerHour: 42.00,
            performance: 0.01200,
            cost: 0.50
          },
          {
            description: 'Tanquero 8 ton',
            quantity: 1.00,
            rate: 30.00,
            costPerHour: 30.00,
            performance: 0.01200,
            cost: 0.36
          }
        ],
        labor: [
          {
            description: 'MOTONIVELADORA (E.O.C1)',
            quantity: 1.00,
            dailyRate: 4.65,
            costPerHour: 4.65,
            performance: 0.01200,
            cost: 0.06
          },
          {
            description: 'OPERADOR DE RODILLO (E.O.C2)',
            quantity: 1.00,
            dailyRate: 4.42,
            costPerHour: 4.42,
            performance: 0.01200,
            cost: 0.05
          },
          {
            description: 'CHOFER: Tanqueros (Estr.Oc.C1)',
            quantity: 1.00,
            dailyRate: 6.08,
            costPerHour: 6.08,
            performance: 0.01200,
            cost: 0.07
          }
        ],
        materials: [
          {
            description: 'Material de base clase 1',
            unit: 'm3',
            quantity: 1.25,
            unitPrice: 8.50,
            cost: 10.63
          }
        ],
        transport: [],
        subtotals: {
          equipment: 1.58,
          labor: 0.18,
          materials: 10.63,
          transport: 0.00,
          directCost: 12.39,
          indirectCost: 2.11,
          totalCost: 14.50
        }
      }
    },
    {
      id: '1.3.3',
      code: '403-1(3)*3',
      description: 'SUB-BASE CLASE 3 (e=0.30 m) (inc. transporte)',
      unit: 'm3',
      quantity: 27195.49,
      unitPrice: 19.15,
      totalPrice: 520793.63,
      category: 'ESTRUCTURA DE PAVIMENTO',
      details: {
        title: 'SUB-BASE CLASE 3 (e=0.30 m) (inc. transporte)',
        unit: 'm3',
        equipment: [
          {
            description: 'Motoniveladora 135 HP',
            quantity: 1.00,
            rate: 59.65,
            costPerHour: 59.65,
            performance: 0.01400,
            cost: 0.83
          },
          {
            description: 'Rodillo vibratorio 12 ton',
            quantity: 1.00,
            rate: 45.00,
            costPerHour: 45.00,
            performance: 0.01400,
            cost: 0.63
          },
          {
            description: 'Tanquero 10 ton',
            quantity: 1.00,
            rate: 32.00,
            costPerHour: 32.00,
            performance: 0.01400,
            cost: 0.45
          }
        ],
        labor: [
          {
            description: 'MOTONIVELADORA (E.O.C1)',
            quantity: 1.00,
            dailyRate: 4.65,
            costPerHour: 4.65,
            performance: 0.01400,
            cost: 0.07
          },
          {
            description: 'OPERADOR DE RODILLO (E.O.C2)',
            quantity: 1.00,
            dailyRate: 4.42,
            costPerHour: 4.42,
            performance: 0.01400,
            cost: 0.06
          },
          {
            description: 'CHOFER: Tanqueros (Estr.Oc.C1)',
            quantity: 1.00,
            dailyRate: 6.08,
            costPerHour: 6.08,
            performance: 0.01400,
            cost: 0.09
          }
        ],
        materials: [
          {
            description: 'Material sub-base clase 3',
            unit: 'm3',
            quantity: 1.30,
            unitPrice: 12.80,
            cost: 16.64
          }
        ],
        transport: [],
        subtotals: {
          equipment: 1.91,
          labor: 0.22,
          materials: 16.64,
          transport: 0.00,
          directCost: 18.77,
          indirectCost: 3.19,
          totalCost: 21.96
        }
      }
    },
    {
      id: '2',
      code: '',
      description: 'PUENTE RIO SECO L=30 METROS',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 2222725.34,
      category: 'HEADER'
    },
    {
      id: '2.1',
      code: '',
      description: 'INFRAESTRUCTURA',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 1322120.23,
      category: 'CATEGORY'
    },
    {
      id: '2.1.1',
      code: '303-2(1)',
      description: 'EXCAVACION SIN CLASIFICACION (empuje = 60 m) (con % relleno compactado)',
      unit: 'm3',
      quantity: 479.47,
      unitPrice: 1.44,
      totalPrice: 690.44,
      category: 'INFRAESTRUCTURA'
    },
    {
      id: '2.1.2',
      code: 'MR-8(1)*E2',
      description: 'DESALOJO DE ESCOMBROS (distancia hasta 20 km)',
      unit: 'm3',
      quantity: 143.78,
      unitPrice: 0.00,
      totalPrice: 0.00,
      category: 'INFRAESTRUCTURA'
    }
  ];

  const items = budgetItems.length > 0 ? budgetItems : mockBudgetItems;

  const handleItemClick = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item || item.category === 'HEADER' || item.category === 'CATEGORY') return;

    if (viewMode === 'compare') {
      if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter(id => id !== itemId));
      } else if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, itemId]);
      }
    } else {
      setSelectedItems([itemId]);
      setViewMode('detail');
    }
  };

  const handleDragStart = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item && item.category !== 'HEADER' && item.category !== 'CATEGORY') {
      setDraggedItem(itemId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetSlot?: number) => {
    e.preventDefault();
    if (draggedItem && !selectedItems.includes(draggedItem) && selectedItems.length < 3) {
      if (targetSlot !== undefined) {
        // Insert at specific position
        const newSelectedItems = [...selectedItems];
        newSelectedItems[targetSlot] = draggedItem;
        setSelectedItems(newSelectedItems);
      } else {
        setSelectedItems([...selectedItems, draggedItem]);
      }
      setViewMode('compare');
    }
    setDraggedItem(null);
  };

  const handleDropZoneClick = (slotIndex: number) => {
    // Show a simple selection interface or just add the first available item for demo
    if (selectedItems.length < 3) {
      const availableItems = items.filter(item => 
        item.category !== 'HEADER' && 
        item.category !== 'CATEGORY' && 
        !selectedItems.includes(item.id) &&
        item.details
      );
      
      if (availableItems.length > 0) {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[slotIndex] = availableItems[0].id;
        setSelectedItems(newSelectedItems);
        setViewMode('compare');
      }
    }
  };

  const getSelectedItemsData = () => {
    return selectedItems.map(id => items.find(item => item.id === id)).filter(Boolean);
  };

  const totalBudget = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const renderOverview = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardTitle className="text-center text-xl font-bold">PRESUPUESTO</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {projectTitle || "ESTUDIOS Y DISEÑOS DEFINITIVOS PARA LA REHABILITACIÓN DE LA VÍA QUE UNE LOS RECINTOS GENERAL GÓMEZ – SAN ANTONIO DE LA PARROQUIA TARIFA, UBICADA EN EL CANTÓN SAMBORONDÓN DE LA PROVINCIA DEL GUAYAS"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>DISTANCIAS DE ACARREO:</strong> {distance || "12.6 km"}
              </div>
              <div>
                <strong>MATERIAL DE BASE, SUBBASE, MEZCLA ASFÁLTICA:</strong>
              </div>
              <div className="md:col-span-2">
                <strong>MATERIAL DE MEJORAMIENTO, PRÉSTAMO IMPORTADO:</strong> {materials || "CANTERA LUZAGUI"}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Item</th>
                  <th className="border border-gray-300 p-2 text-left">Código</th>
                  <th className="border border-gray-300 p-2 text-left">Descripción</th>
                  <th className="border border-gray-300 p-2 text-center">Unidad</th>
                  <th className="border border-gray-300 p-2 text-right">Cantidad</th>
                  <th className="border border-gray-300 p-2 text-right">P.Unitario</th>
                  <th className="border border-gray-300 p-2 text-right">P.Total</th>
                  <th className="border border-gray-300 p-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const isHeader = item.category === 'HEADER';
                  const isCategory = item.category === 'CATEGORY';
                  const isClickable = !isHeader && !isCategory;
                  
                  return (
                    <tr 
                      key={item.id}
                      className={cn(
                        isHeader && "bg-blue-600 text-white font-bold",
                        isCategory && "bg-gray-200 font-semibold",
                        isClickable && "hover:bg-blue-50 cursor-pointer transition-colors",
                        selectedItems.includes(item.id) && "bg-blue-100"
                      )}
                      draggable={isClickable}
                      onDragStart={() => isClickable && handleDragStart(item.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e)}
                      onClick={() => isClickable && handleItemClick(item.id)}
                    >
                      <td className="border border-gray-300 p-2 font-medium">{item.id}</td>
                      <td className="border border-gray-300 p-2">{item.code}</td>
                      <td className="border border-gray-300 p-2">{item.description}</td>
                      <td className="border border-gray-300 p-2 text-center">{item.unit}</td>
                      <td className="border border-gray-300 p-2 text-right">
                        {item.quantity > 0 ? item.quantity.toLocaleString('es-ES', { minimumFractionDigits: 2 }) : ''}
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {item.unitPrice > 0 ? item.unitPrice.toFixed(2) : ''}
                      </td>
                      <td className="border border-gray-300 p-2 text-right font-semibold">
                        {item.totalPrice > 0 ? item.totalPrice.toLocaleString('es-ES', { minimumFractionDigits: 2 }) : ''}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {isClickable && item.details && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemClick(item.id);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDetail = () => {
    const item = items.find(i => i.id === selectedItems[0]);
    if (!item?.details) return null;

    const detail = item.details;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardTitle className="text-center text-xl font-bold">ANÁLISIS DE PRECIOS UNITARIOS</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <strong>Rubro:</strong>
                <div className="mt-1">{detail.title}</div>
              </div>
              <div>
                <strong>Unidad:</strong>
                <div className="mt-1">{detail.unit}</div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Equipment Section */}
              {detail.equipment.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold bg-gray-100 p-2 mb-2">EQUIPOS</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-2 text-left">Descripción</th>
                          <th className="border border-gray-300 p-2 text-right">Cantidad</th>
                          <th className="border border-gray-300 p-2 text-right">Tarifa</th>
                          <th className="border border-gray-300 p-2 text-right">Costo hora</th>
                          <th className="border border-gray-300 p-2 text-right">Rendimiento</th>
                          <th className="border border-gray-300 p-2 text-right">Costo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detail.equipment.map((eq, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-2">{eq.description}</td>
                            <td className="border border-gray-300 p-2 text-right">{eq.quantity.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">{eq.rate.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">{eq.costPerHour.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">{eq.performance.toFixed(5)}</td>
                            <td className="border border-gray-300 p-2 text-right">{eq.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 font-bold">
                          <td colSpan={5} className="border border-gray-300 p-2 text-right">SUBTOTAL M</td>
                          <td className="border border-gray-300 p-2 text-right">{detail.subtotals.equipment.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Labor Section */}
              {detail.labor.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold bg-gray-100 p-2 mb-2">MANO DE OBRA</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-2 text-left">Descripción</th>
                          <th className="border border-gray-300 p-2 text-right">Cantidad</th>
                          <th className="border border-gray-300 p-2 text-right">Jornal/hr</th>
                          <th className="border border-gray-300 p-2 text-right">Costo hora</th>
                          <th className="border border-gray-300 p-2 text-right">Rendimiento</th>
                          <th className="border border-gray-300 p-2 text-right">Costo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detail.labor.map((lab, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-2">{lab.description}</td>
                            <td className="border border-gray-300 p-2 text-right">{lab.quantity.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">{lab.dailyRate.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">{lab.costPerHour.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">{lab.performance.toFixed(5)}</td>
                            <td className="border border-gray-300 p-2 text-right">{lab.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 font-bold">
                          <td colSpan={5} className="border border-gray-300 p-2 text-right">SUBTOTAL N</td>
                          <td className="border border-gray-300 p-2 text-right">{detail.subtotals.labor.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Materials Section */}
              {detail.materials.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold bg-gray-100 p-2 mb-2">MATERIALES</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-2 text-left">Descripción</th>
                          <th className="border border-gray-300 p-2 text-center">Unidad</th>
                          <th className="border border-gray-300 p-2 text-right">Cantidad</th>
                          <th className="border border-gray-300 p-2 text-right">Precio unitario</th>
                          <th className="border border-gray-300 p-2 text-right">Costo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detail.materials.map((mat, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-2">{mat.description}</td>
                            <td className="border border-gray-300 p-2 text-center">{mat.unit}</td>
                            <td className="border border-gray-300 p-2 text-right">{mat.quantity.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">{mat.unitPrice.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">{mat.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 font-bold">
                          <td colSpan={4} className="border border-gray-300 p-2 text-right">SUBTOTAL O</td>
                          <td className="border border-gray-300 p-2 text-right">{detail.subtotals.materials.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Transport Section */}
              {detail.transport.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold bg-gray-100 p-2 mb-2">TRANSPORTE</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-2 text-left">Descripción</th>
                          <th className="border border-gray-300 p-2 text-center">Unidad</th>
                          <th className="border border-gray-300 p-2 text-right">Cantidad</th>
                          <th className="border border-gray-300 p-2 text-right">Tarifa</th>
                          <th className="border border-gray-300 p-2 text-right">Costo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detail.transport.map((trans, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-2">{trans.description}</td>
                            <td className="border border-gray-300 p-2 text-center">{trans.unit}</td>
                            <td className="border border-gray-300 p-2 text-right">{trans.quantity.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">{trans.rate.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">{trans.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 font-bold">
                          <td colSpan={4} className="border border-gray-300 p-2 text-right">SUBTOTAL P</td>
                          <td className="border border-gray-300 p-2 text-right">{detail.subtotals.transport.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Totals Section */}
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <tbody>
                      <tr className="bg-gray-100 font-bold">
                        <td className="border border-gray-300 p-2 text-right">TOTAL COSTO DIRECTO (M+N+O+P)</td>
                        <td className="border border-gray-300 p-2 text-right w-32">{detail.subtotals.directCost.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 text-right">INDIRECTOS</td>
                        <td className="border border-gray-300 p-2 text-right">17 %</td>
                      </tr>
                      <tr className="bg-yellow-100 font-bold">
                        <td className="border border-gray-300 p-2 text-right">COSTO TOTAL DEL RUBRO</td>
                        <td className="border border-gray-300 p-2 text-right">{detail.subtotals.totalCost.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 text-sm font-medium">
                ESTE PRECIO NO INCLUYEN IVA.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCompare = () => {
    const selectedItemsData = getSelectedItemsData();
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardTitle className="text-center text-xl font-bold">
              COMPARACIÓN DE ANÁLISIS DE PRECIOS UNITARIOS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((slotIndex) => {
                const item = selectedItemsData[slotIndex];
                
                if (item) {
                  return (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-sm">{item.description}</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedItems(selectedItems.filter(id => id !== item.id))}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <strong>Código:</strong> {item.code}
                          </div>
                          <div>
                            <strong>Unidad:</strong> {item.unit}
                          </div>
                          <div>
                            <strong>Cantidad:</strong> {item.quantity.toLocaleString()}
                          </div>
                          <div>
                            <strong>P. Unit:</strong> ${item.unitPrice.toFixed(2)}
                          </div>
                        </div>
                        
                        {item.details && (
                          <div className="space-y-2">
                            <div className="bg-gray-50 p-2 rounded">
                              <strong>Equipos:</strong> ${item.details.subtotals.equipment.toFixed(2)}
                            </div>
                            <div className="bg-gray-50 p-2 rounded">
                              <strong>Mano de Obra:</strong> ${item.details.subtotals.labor.toFixed(2)}
                            </div>
                            <div className="bg-gray-50 p-2 rounded">
                              <strong>Materiales:</strong> ${item.details.subtotals.materials.toFixed(2)}
                            </div>
                            <div className="bg-gray-50 p-2 rounded">
                              <strong>Transporte:</strong> ${item.details.subtotals.transport.toFixed(2)}
                            </div>
                            <div className="bg-blue-100 p-2 rounded font-bold">
                              <strong>Total:</strong> ${item.details.subtotals.totalCost.toFixed(2)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div 
                      key={slotIndex}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, slotIndex)}
                      onClick={() => handleDropZoneClick(slotIndex)}
                    >
                      <div className="text-center text-gray-500">
                        <Compare className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Arrastra un elemento aquí para comparar</p>
                        <p className="text-xs">(máximo 3 elementos)</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDropZoneClick(slotIndex);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {viewMode !== 'overview' && (
            <Button
              variant="outline"
              onClick={() => {
                setViewMode('overview');
                setSelectedItems([]);
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Presupuesto
            </Button>
          )}
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'overview' ? 'default' : 'outline'}
              onClick={() => {
                setViewMode('overview');
                setSelectedItems([]);
              }}
            >
              Presupuesto General
            </Button>
            
            <Button
              variant={viewMode === 'compare' ? 'default' : 'outline'}
              onClick={() => setViewMode('compare')}
              disabled={selectedItems.length === 0}
            >
              <Compare className="w-4 h-4 mr-2" />
              Comparar ({selectedItems.length})
            </Button>
          </div>
        </div>

        {viewMode === 'overview' && (
          <div className="text-sm text-gray-600">
            <p>💡 Haz clic en cualquier elemento para ver detalles</p>
            <p>🔄 Arrastra elementos para compararlos</p>
          </div>
        )}
      </div>

      {/* Content */}
      {viewMode === 'overview' && renderOverview()}
      {viewMode === 'detail' && renderDetail()}
      {viewMode === 'compare' && renderCompare()}
    </div>
  );
}