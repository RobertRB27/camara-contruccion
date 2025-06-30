'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onAuthClick: (mode: 'login' | 'register') => void;
}

export function Header({ onAuthClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Inicio', href: '#home' },
    { name: 'Generador AI', href: '#ai-generator' },
    { name: 'Características', href: '#features' },
    { name: 'Precios', href: '#pricing' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Construction Management"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-brand-primary">
                Construction Pro
              </h1>
              <p className="text-xs text-gray-600">Gestión Inteligente</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-brand-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => onAuthClick('login')}
              className="text-gray-700 hover:text-brand-primary"
            >
              <User className="w-4 h-4 mr-2" />
              Iniciar Sesión
            </Button>
            <Button
              onClick={() => onAuthClick('register')}
              className="bg-brand-gradient hover:opacity-90 text-white"
            >
              Registrarse
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-brand-primary transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Button
                variant="ghost"
                onClick={() => {
                  onAuthClick('login');
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start text-gray-700 hover:text-brand-primary"
              >
                <User className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>
              <Button
                onClick={() => {
                  onAuthClick('register');
                  setIsMenuOpen(false);
                }}
                className="w-full bg-brand-gradient hover:opacity-90 text-white"
              >
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}