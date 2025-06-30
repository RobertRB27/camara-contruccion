'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp } from 'lucide-react';

interface CostBreakdownProps {
  costs: {
    total: number;
    breakdown: Array<{
      category: string;
      amount: number;
      percentage: number;
    }>;
  };
}

export function CostBreakdown({ costs }: CostBreakdownProps) {
  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-red-500',
      'bg-indigo-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Desglose de Costos</span>
          </CardTitle>
          <div className="text-3xl font-bold text-brand-primary">
            ${costs.total.toLocaleString()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costs.breakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${getCategoryColor(index)}`}></div>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ${item.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Costo por m²</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              $1,250
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Contingencia</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${(costs.total * 0.05).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">ROI Estimado</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              15-20%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}