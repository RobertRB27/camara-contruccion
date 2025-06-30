'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderOpen,
  Calculator,
  Users,
  Truck,
  AlertTriangle,
  FileText,
  BarChart3,
  Settings,
  Crown,
  DollarSign,
  UserCheck,
  Building
} from 'lucide-react';
import Image from 'next/image';

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ isOpen = true, onClose }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const userNavigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Mis Proyectos',
      href: '/dashboard/projects',
      icon: FolderOpen,
    },
    {
      name: 'Generador AI',
      href: '/dashboard/ai-generator',
      icon: Calculator,
    },
    {
      name: 'Cronogramas',
      href: '/dashboard/timelines',
      icon: FileText,
    },
    {
      name: 'Costos',
      href: '/dashboard/costs',
      icon: DollarSign,
    },
    {
      name: 'Materiales',
      href: '/dashboard/materials',
      icon: Building,
    },
    {
      name: 'Equipos',
      href: '/dashboard/equipment',
      icon: Truck,
    },
    {
      name: 'Personal',
      href: '/dashboard/labor',
      icon: Users,
    },
    {
      name: 'Riesgos',
      href: '/dashboard/risks',
      icon: AlertTriangle,
    },
    {
      name: 'Reportes',
      href: '/dashboard/reports',
      icon: BarChart3,
    },
  ];

  const adminNavigation = [
    {
      name: 'Admin Dashboard',
      href: '/admin',
      icon: Crown,
    },
    {
      name: 'Gestión de Usuarios',
      href: '/admin/users',
      icon: UserCheck,
    },
    {
      name: 'Control de Precios',
      href: '/admin/pricing',
      icon: DollarSign,
    },
    {
      name: 'Supervisión de Proyectos',
      href: '/admin/projects',
      icon: FolderOpen,
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
    },
    {
      name: 'Configuración',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const navigation = user?.role === 'admin' ? adminNavigation : userNavigation;

  const handleNavigation = (href: string) => {
    router.push(href);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Construction Pro"
              width={32}
              height={32}
              className="w-8 h-8 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-brand-primary truncate">
                Construction Pro
              </h2>
              <p className="text-xs text-gray-500 truncate">
                {user?.role === 'admin' ? 'Panel Admin' : 'Dashboard'}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 px-3 text-left font-medium",
                    isActive 
                      ? "bg-brand-primary text-white shadow-sm" 
                      : "text-gray-700 hover:text-brand-primary hover:bg-brand-light"
                  )}
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Button>
              );
            })}
          </nav>

          {/* User info */}
          <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}