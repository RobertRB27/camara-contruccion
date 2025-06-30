'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  Users, 
  UserCheck,
  UserX,
  Crown,
  Building,
  Mail,
  Phone,
  Calendar,
  Download,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Shield,
  Activity
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

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@constructora.com',
      role: 'user',
      company: 'Constructora del Pacífico',
      status: 'active',
      lastLogin: '2024-06-21T10:30:00Z',
      joinDate: '2024-01-15T00:00:00Z',
      projectsCount: 8,
      phone: '+593 99 123 4567',
      subscription: 'Pro',
      avatar: null
    },
    {
      id: 2,
      name: 'Ana Rodríguez',
      email: 'ana.rodriguez@ingenieria.ec',
      role: 'user',
      company: 'Ingeniería & Construcción S.A.',
      status: 'active',
      lastLogin: '2024-06-21T09:15:00Z',
      joinDate: '2024-02-20T00:00:00Z',
      projectsCount: 12,
      phone: '+593 98 765 4321',
      subscription: 'Enterprise',
      avatar: null
    },
    {
      id: 3,
      name: 'Luis Ramírez',
      email: 'luis.ramirez@obras.com',
      role: 'user',
      company: 'Obras Civiles del Ecuador',
      status: 'active',
      lastLogin: '2024-06-20T16:45:00Z',
      joinDate: '2024-03-10T00:00:00Z',
      projectsCount: 5,
      phone: '+593 97 456 7890',
      subscription: 'Basic',
      avatar: null
    },
    {
      id: 4,
      name: 'María González',
      email: 'maria.gonzalez@admin.com',
      role: 'admin',
      company: 'Construction Pro',
      status: 'active',
      lastLogin: '2024-06-21T11:00:00Z',
      joinDate: '2023-12-01T00:00:00Z',
      projectsCount: 0,
      phone: '+593 96 321 0987',
      subscription: 'Admin',
      avatar: null
    },
    {
      id: 5,
      name: 'Pedro Vásquez',
      email: 'pedro.vasquez@construcciones.ec',
      role: 'user',
      company: 'Construcciones Modernas',
      status: 'inactive',
      lastLogin: '2024-05-15T14:20:00Z',
      joinDate: '2024-04-05T00:00:00Z',
      projectsCount: 2,
      phone: '+593 95 654 3210',
      subscription: 'Basic',
      avatar: null
    },
    {
      id: 6,
      name: 'Carmen Morales',
      email: 'carmen.morales@arquitectura.com',
      role: 'user',
      company: 'Estudio de Arquitectura CM',
      status: 'suspended',
      lastLogin: '2024-06-10T08:30:00Z',
      joinDate: '2024-01-30T00:00:00Z',
      projectsCount: 3,
      phone: '+593 94 789 0123',
      subscription: 'Pro',
      avatar: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'Enterprise': return 'bg-yellow-100 text-yellow-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Basic': return 'bg-gray-100 text-gray-800';
      case 'Admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const adminUsers = users.filter(u => u.role === 'admin').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended').length;

  const subscriptionStats = users.reduce((acc, user) => {
    acc[user.subscription] = (acc[user.subscription] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-2">
            Administra todos los usuarios de la plataforma
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-gradient text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" placeholder="Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="juan@empresa.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" placeholder="Constructora ABC" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="+593 99 123 4567" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Usuario</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subscription">Suscripción</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Pro">Pro</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancelar
                  </Button>
                  <Button className="bg-brand-primary text-white">
                    Crear Usuario
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
                <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
                <p className="text-3xl font-bold text-green-600">{activeUsers}</p>
                <p className="text-sm text-green-600">En línea</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Administradores</p>
                <p className="text-3xl font-bold text-purple-600">{adminUsers}</p>
                <p className="text-sm text-purple-600">Con privilegios</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suspendidos</p>
                <p className="text-3xl font-bold text-red-600">{suspendedUsers}</p>
                <p className="text-sm text-red-600">Requieren atención</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="subscriptions">Suscripciones</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                  <SelectItem value="suspended">Suspendido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900">Usuario</th>
                      <th className="text-left p-4 font-medium text-gray-900">Empresa</th>
                      <th className="text-center p-4 font-medium text-gray-900">Rol</th>
                      <th className="text-center p-4 font-medium text-gray-900">Estado</th>
                      <th className="text-center p-4 font-medium text-gray-900">Suscripción</th>
                      <th className="text-center p-4 font-medium text-gray-900">Proyectos</th>
                      <th className="text-center p-4 font-medium text-gray-900">Último Acceso</th>
                      <th className="text-center p-4 font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar || undefined} alt={user.name} />
                              <AvatarFallback className="bg-brand-primary text-white">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{user.company}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status === 'active' ? 'Activo' : 
                             user.status === 'inactive' ? 'Inactivo' : 'Suspendido'}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <Badge className={getSubscriptionColor(user.subscription)}>
                            {user.subscription}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <span className="font-medium">{user.projectsCount}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-sm text-gray-600">
                            {new Date(user.lastLogin).toLocaleDateString('es-ES')}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Perfil
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="w-4 h-4 mr-2" />
                                Cambiar Rol
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <UserX className="w-4 h-4 mr-2" />
                                Suspender
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuarios Más Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users
                    .filter(u => u.role === 'user')
                    .sort((a, b) => b.projectsCount - a.projectsCount)
                    .slice(0, 5)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.company}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-brand-primary">
                            {user.projectsCount}
                          </div>
                          <div className="text-xs text-gray-500">proyectos</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <Activity className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Nuevo usuario registrado
                      </p>
                      <p className="text-xs text-green-700">
                        Pedro Vásquez se unió a la plataforma
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Actualización de suscripción
                      </p>
                      <p className="text-xs text-blue-700">
                        Ana Rodríguez actualizó a Enterprise
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Activity className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">
                        Usuario inactivo detectado
                      </p>
                      <p className="text-xs text-yellow-700">
                        Pedro Vásquez sin actividad por 30 días
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(subscriptionStats).map(([plan, count]) => (
              <Card key={plan}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{plan}</h3>
                    <Badge className={getSubscriptionColor(plan)}>
                      {plan}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-gray-900">{count}</div>
                    <div className="text-sm text-gray-600">usuarios</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((count / totalUsers) * 100)}% del total
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