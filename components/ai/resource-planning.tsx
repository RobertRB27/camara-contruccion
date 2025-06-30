'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, Truck, Calendar } from 'lucide-react';

interface ResourcePlanningProps {
  resources: {
    labor: Array<{
      role: string;
      quantity: number;
      utilization: number;
    }>;
    equipment: Array<{
      item: string;
      quantity: number;
      utilization: number;
    }>;
  };
}

export function ResourcePlanning({ resources }: ResourcePlanningProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Personal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources.labor.map((worker, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{worker.role}</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        {worker.quantity} personas
                      </div>
                      <div className="text-xs text-gray-500">
                        {worker.utilization}% utilización
                      </div>
                    </div>
                  </div>
                  <Progress value={worker.utilization} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <span>Equipos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources.equipment.map((equipment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{equipment.item}</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        {equipment.quantity} unidades
                      </div>
                      <div className="text-xs text-gray-500">
                        {equipment.utilization}% utilización
                      </div>
                    </div>
                  </div>
                  <Progress value={equipment.utilization} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}