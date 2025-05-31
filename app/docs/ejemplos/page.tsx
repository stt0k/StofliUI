"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Lock,
  Bell,
  Search,
  Boxes,
  BarChart,
  Users,
  FileText,
  Layers,
  ArrowRight,
  Heart,
  MessageCircle,
  Repeat,
  Bookmark,
} from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/FooterDocs";

// Importación de componentes de section
import Button from "@/components/sections/Button";
import Checkbox from "@/components/sections/Checkbox";
import Badge from "@/components/sections/Badge";
import Tabs from "@/components/sections/Tabs";
import Card from "@/components/sections/Card";
import Accordion from "@/components/sections/Accordion";
import Dropdown from "@/components/sections/Dropdown";

export default function ExamplesPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab] = useState(0);

  const dashboardTabs = [
    { label: "Overview", content: <OverviewTabContent /> },
    {
      label: "Analytics",
      content: <div className="p-4">Contenido de analytics</div>,
    },
    {
      label: "Reports",
      content: <div className="p-4">Contenido de reportes</div>,
    },
    {
      label: "Notifications",
      content: <div className="p-4">Contenido de notificaciones</div>,
    },
  ];

  const faqItems = [
    {
      title: "¿Qué es StofliUI?",
      content:
        "StofliUI es una biblioteca de componentes modernos para desarrollar interfaces de usuario con un enfoque en diseño y usabilidad.",
    },
    {
      title: "¿Cómo instalar StofliUI?",
      content:
        "Puedes instalar StofliUI usando npm o yarn con el comando: npm install stofli-ui",
    },
    {
      title: "¿Es compatible con otros frameworks?",
      content:
        "Sí, StofliUI funciona perfectamente con React, Next.js y otros frameworks basados en React.",
    },
    {
      title: "¿Cómo puedo contribuir al proyecto?",
      content:
        "Puedes contribuir al proyecto a través de GitHub, reportando errores, sugiriendo mejoras o enviando pull requests.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      {/* Div espaciador para compensar el header fijo */}
      <div className="h-32"></div>

      <main className="container mx-auto px-4 pb-12">
        {/* Hero section centrado */}
        <div className="text-center mb-20">
          <h1 className="scroll-m-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Building blocks for <br /> StofliUI interfaces
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            Explora diferentes componentes y patrones de UI construidos con
            StofliUI.
          </p>

          <div className="flex gap-4 mt-6 justify-center">
            <Button variant="primary" className="h-10 px-6">
              Browse components
            </Button>
            <Button variant="outline" className="h-10 px-6">
              Add component
            </Button>
          </div>
        </div>

        {/* Contenedor de ejemplos más ancho y centrado */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Dashboard example */}
          <ExampleSection
            id="dashboard"
            title="Dashboard"
            description="Un dashboard completo con estadísticas, gráficos y navegación."
          >
            <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-zinc-800 flex flex-col lg:flex-row items-stretch">
                <div className="w-full lg:w-60 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-zinc-800 py-4 px-4">
                  <div className="flex items-center mb-6 px-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 mr-2 flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <span className="font-semibold">Stofli Inc.</span>
                  </div>

                  <div className="space-y-1">
                    {[
                      {
                        icon: <Boxes className="h-4 w-4 mr-2" />,
                        label: "Dashboard",
                        active: true,
                      },
                      {
                        icon: <BarChart className="h-4 w-4 mr-2" />,
                        label: "Analytics",
                      },
                      {
                        icon: <Users className="h-4 w-4 mr-2" />,
                        label: "Customers",
                      },
                      {
                        icon: <FileText className="h-4 w-4 mr-2" />,
                        label: "Reports",
                      },
                      {
                        icon: <Layers className="h-4 w-4 mr-2" />,
                        label: "Projects",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                          item.active
                            ? "text-white bg-blue-600 dark:bg-blue-600"
                            : "text-gray-700 dark:text-zinc-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 min-h-[400px] lg:min-h-[600px]">
                  <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold text-lg">Dashboard</h2>

                      {/* Versión móvil: Solo iconos de notificación y perfil */}
                      <div className="flex items-center gap-2 sm:hidden">
                        <Button variant="ghost" size="icon">
                          <Bell className="h-5 w-5" />
                        </Button>
                        <Dropdown
                          avatarOnly
                          avatarSrc="https://randomuser.me/api/portraits/men/32.jpg"
                          avatarSize="md"
                          variant="default"
                          placement="left"
                          items={[
                            {
                              label: "Carlos Rodríguez",
                              value: "profile",
                              avatarSrc:
                                "https://randomuser.me/api/portraits/men/32.jpg",
                            },
                            {
                              label: "Configuración",
                              value: "settings",
                            },
                            {
                              label: "Mis proyectos",
                              value: "projects",
                            },
                            {
                              label: "Cerrar sesión",
                              value: "logout",
                            },
                          ]}
                        />
                      </div>

                      {/* Versión desktop: Todo en una línea */}
                      <div className="hidden sm:flex items-center space-x-2">
                        <div className="relative w-64">
                          <Search className="h-4 w-4 text-gray-400 dark:text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-zinc-800 rounded-md pl-10 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                          />
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bell className="h-5 w-5" />
                        </Button>
                        <Dropdown
                          avatarOnly
                          avatarSrc="https://randomuser.me/api/portraits/men/32.jpg"
                          avatarSize="md"
                          variant="default"
                          placement="left"
                          items={[
                            {
                              label: "Carlos Rodríguez",
                              value: "profile",
                              avatarSrc:
                                "https://randomuser.me/api/portraits/men/32.jpg",
                            },
                            {
                              label: "Configuración",
                              value: "settings",
                            },
                            {
                              label: "Mis proyectos",
                              value: "projects",
                            },
                            {
                              label: "Cerrar sesión",
                              value: "logout",
                            },
                          ]}
                        />
                      </div>
                    </div>

                    {/* Barra de búsqueda solo en móvil */}
                    <div className="mt-3 sm:hidden">
                      <div className="relative w-full">
                        <Search className="h-4 w-4 text-gray-400 dark:text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-zinc-800 rounded-md pl-10 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <Tabs
                      tabs={dashboardTabs}
                      defaultTab={activeTab}
                      variant="primary"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </ExampleSection>

          {/* Authentication example */}
          <ExampleSection
            id="authentication"
            title="Authentication"
            description="Formularios para registro, inicio de sesión y gestión de acceso."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium mb-1">Iniciar sesión</h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Ingresa tus credenciales para continuar
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-zinc-400 block mb-1">
                      Email
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 dark:text-zinc-400 absolute left-3" />
                      <input
                        type="email"
                        placeholder="ejemplo@stofli.com"
                        className="w-full bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-zinc-800 rounded-md pl-10 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm text-gray-500 dark:text-zinc-400">
                        Contraseña
                      </label>
                    </div>
                    <div className="relative flex items-center">
                      <Lock className="h-4 w-4 text-gray-400 dark:text-zinc-400 absolute left-3" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-zinc-800 rounded-md pl-10 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <label className="text-sm text-gray-700 dark:text-zinc-300 ml-2">
                        Recordarme durante 30 días
                      </label>
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs"
                    >
                      ¿Olvidaste tu contraseña?
                    </Button>
                  </div>

                  <Button variant="primary" className="w-full mt-2">
                    Iniciar sesión
                  </Button>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      ¿No tienes una cuenta?{" "}
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Regístrate
                      </Button>
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium mb-1">Crear cuenta</h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Ingresa tus datos para registrarte
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500 dark:text-zinc-400 block mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-zinc-800 rounded-md px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 dark:text-zinc-400 block mb-1">
                        Apellido
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-zinc-800 rounded-md px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 dark:text-zinc-400 block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="ejemplo@stofli.com"
                      className="w-full bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-zinc-800 rounded-md px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 dark:text-zinc-400 block mb-1">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-zinc-800 rounded-md px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="flex items-center">
                    <Checkbox checked={true} />
                    <label className="text-sm text-gray-700 dark:text-zinc-300 ml-2">
                      Acepto los{" "}
                      <Button variant="link" size="sm" className="h-auto p-0">
                        términos y condiciones
                      </Button>
                    </label>
                  </div>

                  <Button variant="primary" className="w-full mt-2">
                    Crear cuenta
                  </Button>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      ¿Ya tienes una cuenta?{" "}
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Inicia sesión
                      </Button>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </ExampleSection>

          {/* Cards example */}
          <ExampleSection
            id="cards"
            title="Cards"
            description="Diseños de tarjetas para diferentes casos de uso."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Profile Card - reemplazando la tarjeta de Login */}
              <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden p-4 sm:p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="h-20 w-20 mb-4 rounded-full overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                      alt="Jane Doe"
                      className="object-cover"
                      fill
                      sizes="80px"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">Jane Doe</h3>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm">
                    Product Designer
                  </p>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary" className="mr-2">
                      Pro
                    </Badge>
                    <Badge variant="outline">Design Team</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-md p-2">
                      <p className="text-2xl font-bold">28</p>
                      <p className="text-gray-500 dark:text-zinc-400 text-xs">
                        Proyectos
                      </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-md p-2">
                      <p className="text-2xl font-bold">142</p>
                      <p className="text-gray-500 dark:text-zinc-400 text-xs">
                        Seguidores
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-zinc-800 pt-4">
                    <p className="text-sm text-gray-700 dark:text-zinc-300 mb-4">
                      Diseñadora de producto especializada en interfaces para
                      aplicaciones móviles y web.
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="primary" className="flex-1">
                      Ver perfil
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Mensaje
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Pricing Card */}
              <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Pro Plan</h3>
                    <p className="text-gray-500 dark:text-zinc-400 text-sm">
                      All the basics for starting a new business
                    </p>
                  </div>
                  <Badge variant="primary">Popular</Badge>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold">$15</span>
                  <span className="text-gray-500 dark:text-zinc-400 text-sm">
                    /month
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-zinc-800 my-4 pt-4">
                  <ul className="space-y-3">
                    {[
                      "Unlimited products",
                      "Custom domains",
                      "Analytics platform",
                      "24/7 support",
                      "Email marketing",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <div className="mr-2 text-emerald-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="primary" className="w-full mt-2">
                  Get Started
                </Button>
              </Card>

              {/* Notification Card */}
              <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Notifications</h3>
                    <p className="text-gray-500 dark:text-zinc-400 text-sm">
                      You have 3 unread messages
                    </p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Olivia Martin",
                      email: "olivia.martin@email.com",
                      message: "Just sent you the new contract",
                      time: "5m ago",
                    },
                    {
                      name: "Jackson Lee",
                      email: "jackson.lee@email.com",
                      message: "Sent you documents to sign",
                      time: "2h ago",
                    },
                    {
                      name: "Isabella Nguyen",
                      email: "isabella.nguyen@email.com",
                      message: "Please review the latest changes",
                      time: "1d ago",
                    },
                  ].map((notification, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full overflow-hidden relative">
                        <Image
                          src={
                            i === 0
                              ? "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                              : i === 1
                              ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                              : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                          }
                          alt={notification.name}
                          className="object-cover"
                          fill
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">
                          {notification.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                          {notification.email}
                        </p>
                        <p className="text-sm mt-1">{notification.message}</p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-zinc-500">
                        {notification.time}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 flex items-center justify-center text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                >
                  <span className="flex items-center">
                    View all
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </span>
                </Button>
              </Card>
            </div>
          </ExampleSection>

          {/* Perfil Social example */}
          <ExampleSection
            id="perfil-social"
            title="Perfil Social"
            description="Perfil de red social con banner, información del usuario y publicaciones."
          >
            <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden">
              {/* Banner */}
              <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Banner"
                  className="w-full h-full object-cover"
                  fill
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Perfil header */}
              <div className="px-3 sm:px-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-end -mt-12 sm:-mt-16 mb-4 sm:mb-6">
                  <div className="h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-white dark:ring-zinc-900 rounded-full overflow-hidden mx-auto sm:mx-0 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                      alt="Alex Lee"
                      className="object-cover"
                      fill
                      sizes="(max-width: 640px) 96px, 128px"
                    />
                  </div>
                  <div className="sm:ml-4 flex-1 mt-3 sm:mt-0 text-center sm:text-left sm:flex sm:justify-between sm:items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Alex Lee</h3>
                      <p className="text-gray-500 dark:text-zinc-400">
                        @alexlee · Diseñador & Fotógrafo
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-3 sm:mt-0 w-full sm:w-auto"
                    >
                      Seguir
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center sm:justify-start mb-6 text-sm">
                  <div className="flex items-center">
                    <span className="font-bold mr-1">1,248</span>
                    <span className="text-gray-500 dark:text-zinc-400">
                      Publicaciones
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold mr-1">4.3K</span>
                    <span className="text-gray-500 dark:text-zinc-400">
                      Seguidores
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold mr-1">532</span>
                    <span className="text-gray-500 dark:text-zinc-400">
                      Siguiendo
                    </span>
                  </div>
                </div>

                <p className="text-sm mb-5 text-center sm:text-left">
                  Diseñador y fotógrafo apasionado por explorar nuevas
                  perspectivas. Amante de la naturaleza y los viajes. Creando
                  arte digital y capturando momentos únicos.
                  <span className="text-blue-400">
                    {" "}
                    #diseño #fotografía #viajes
                  </span>
                </p>
              </div>

              {/* Navigation */}
              <div className="border-t border-b border-gray-200 dark:border-zinc-800">
                <div className="flex overflow-x-auto scrollbar-none">
                  {[
                    "Publicaciones",
                    "Fotos",
                    "Videos",
                    "Me gusta",
                    "Guardados",
                  ].map((tab, index) => (
                    <div
                      key={index}
                      className={`px-3 sm:px-6 py-3 font-medium whitespace-nowrap cursor-pointer ${
                        index === 0
                          ? "text-blue-600 dark:text-white border-b-2 border-blue-500"
                          : "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200"
                      }`}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </div>

              {/* Posts */}
              <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
                {/* New post */}
                <div className="bg-gray-100 dark:bg-zinc-800/50 p-3 sm:p-4 rounded-lg">
                  <div className="flex space-x-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden relative">
                      <Image
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                        alt="Alex Lee"
                        className="object-cover"
                        fill
                        sizes="40px"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="¿Qué estás pensando?"
                      className="flex-1 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap justify-between mt-3 pt-3 border-t border-gray-300 dark:border-zinc-700">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 dark:text-zinc-400"
                      >
                        Foto
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 dark:text-zinc-400"
                      >
                        Video
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 dark:text-zinc-400"
                      >
                        Encuesta
                      </Button>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-2 sm:mt-0"
                    >
                      Publicar
                    </Button>
                  </div>
                </div>

                {/* Posts */}
                {[
                  {
                    avatar: "JD",
                    name: "Alex Lee",
                    username: "@alexlee",
                    time: "2h",
                    content:
                      "Acabo de terminar este nuevo proyecto de diseño. Me encantaría saber su opinión.",
                    image: true,
                    likes: 84,
                    comments: 12,
                    shares: 3,
                  },
                  {
                    avatar: "JD",
                    name: "Alex Lee",
                    username: "@alexlee",
                    time: "1d",
                    content:
                      "Un hermoso atardecer durante mi última sesión de fotos en la playa. La luz natural siempre ofrece los mejores resultados.",
                    image: false,
                    likes: 147,
                    comments: 28,
                    shares: 9,
                  },
                ].map((post, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-zinc-800/50 p-3 sm:p-4 rounded-lg"
                  >
                    <div className="flex space-x-2 sm:space-x-3 mb-3">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden relative">
                        <Image
                          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                          alt={post.name}
                          className="object-cover"
                          fill
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center">
                          <span className="font-medium mr-1">{post.name}</span>
                          <span className="text-gray-500 dark:text-zinc-400 text-xs sm:text-sm">
                            {post.username}
                          </span>
                          <span className="text-gray-500 dark:text-zinc-500 text-xs ml-1 sm:ml-2">
                            · {post.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm sm:text-base">
                          {post.content}
                        </p>
                      </div>
                    </div>

                    {post.image && (
                      <div className="mt-3 mb-3 rounded-lg overflow-hidden relative h-60 sm:h-72 lg:h-80">
                        <Image
                          src="https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                          alt="Post image"
                          className="object-cover"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Botones de interacción estilo Twitter */}
                    <div className="flex justify-around py-2">
                      <button className="flex items-center space-x-1 sm:space-x-1.5 text-gray-500 dark:text-zinc-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="text-xs">{post.comments}</span>
                      </button>

                      <button className="flex items-center space-x-1 sm:space-x-1.5 text-gray-500 dark:text-zinc-500 hover:text-green-500 transition-colors">
                        <Repeat className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="text-xs">{post.shares}</span>
                      </button>

                      <button className="flex items-center space-x-1 sm:space-x-1.5 text-gray-500 dark:text-zinc-500 hover:text-red-500 transition-colors">
                        <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="text-xs">{post.likes}</span>
                      </button>

                      <button className="text-gray-500 dark:text-zinc-500 hover:text-yellow-500 transition-colors">
                        <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>

                      <button className="text-gray-500 dark:text-zinc-500 hover:text-blue-400 transition-colors">
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="text-center">
                  <Button
                    variant="ghost"
                    className="text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white"
                  >
                    Cargar más publicaciones
                  </Button>
                </div>
              </div>
            </Card>
          </ExampleSection>

          {/* FAQ example */}
          <ExampleSection
            id="faq"
            title="FAQ"
            description="Componente de preguntas frecuentes con acordeón expandible."
          >
            <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6">
              <h3 className="text-xl font-medium mb-6">Preguntas frecuentes</h3>
              <Accordion items={faqItems} allowMultiple={true} />

              <div className="mt-8 flex items-center justify-center space-x-4">
                <span className="text-gray-500 dark:text-zinc-400">
                  ¿No encuentras lo que buscas?
                </span>
                <Button variant="primary">Contactar soporte</Button>
              </div>
            </Card>
          </ExampleSection>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Componente de sección de ejemplo
function ExampleSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12 md:mb-16">
      <div className="mb-6">
        <h2 id={id} className="text-2xl font-bold mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-zinc-400">{description}</p>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

// Componente para el contenido de la pestaña Overview
function OverviewTabContent() {
  // Valores predeterminados para las alturas de las barras
  const barHeights = [45, 65, 35, 80, 55, 70, 60, 40, 75, 50, 90, 65];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-white/80 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 dark:text-zinc-300 font-medium">
              Ingresos
            </h3>
            <Badge variant="success">+12.5%</Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            $15,231.89
          </p>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            Comparado al mes anterior
          </p>
        </Card>
        <Card className="p-4 bg-white/80 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 dark:text-zinc-300 font-medium">
              Usuarios
            </h3>
            <Badge variant="primary">+24.8%</Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            2,543
          </p>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            Nuevos usuarios este mes
          </p>
        </Card>
        <Card className="p-4 bg-white/80 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 dark:text-zinc-300 font-medium">
              Conversión
            </h3>
            <Badge variant="warning">-2.3%</Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            3.42%
          </p>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            Tasa de conversión
          </p>
        </Card>
      </div>

      <Card className="p-4 bg-white/80 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-300 mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Rendimiento reciente
        </h3>
        <div className="h-40 flex items-end space-x-2">
          {barHeights.map((height, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t w-full"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-gray-500 dark:text-zinc-400 text-sm">
            Enero
          </span>
          <span className="text-gray-500 dark:text-zinc-400 text-sm">
            Diciembre
          </span>
        </div>
      </Card>
    </div>
  );
}
