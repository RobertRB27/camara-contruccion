'use client';

import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Construction Management"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <h3 className="text-xl font-bold">Construction Pro</h3>
                <p className="text-sm text-gray-400">Gestión Inteligente</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolucionando la industria de la construcción en Ecuador con 
              tecnología de inteligencia artificial avanzada.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#ai-generator" className="text-gray-400 hover:text-white transition-colors">Generador AI</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Características</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Precios</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Planificación AI</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Estimación de Costos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gestión de Recursos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Análisis de Riesgos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Reportes Avanzados</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-brand-secondary" />
                <span className="text-gray-400 text-sm">
                  Guayaquil, Ecuador
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-secondary" />
                <span className="text-gray-400 text-sm">
                  +593 4 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-secondary" />
                <span className="text-gray-400 text-sm">
                  info@constructionpro.ec
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Construction Pro. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Soporte
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}