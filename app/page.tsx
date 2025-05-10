import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import {
  ArrowRight,
  ChevronUp,
  Search,
  Grid,
  Monitor,
  Clock,
  Award,
  Circle,
  ChevronRight,
  LayoutDashboard,
  BarChart3,
  PieChart,
  Users,
} from "lucide-react";
import React from "react";
import Tabs from "@/components/sections/tabs";
import Button from "@/components/sections/button";
import Dropdown from "@/components/sections/dropdown";
import Avatar from "@/components/sections/avatar";
import dynamic from "next/dynamic";
import GovSection from "@/components/home/GovSection";
import BentoSection from "@/components/home/BentoSection";

// Importar los componentes de Recharts de forma dinámica para evitar problemas de SSR
const RechartsComponents = dynamic(
  () => import("@/components/charts/LineChartComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="h-44 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-md p-3 flex items-center justify-center">
        <p className="text-zinc-400 text-sm">Cargando gráfico...</p>
      </div>
    ),
  }
);

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-white w-full overflow-x-hidden">
      <Header />

      {/* Hero Section con el dashboard moderno */}
      <main className="flex-grow pt-40 pb-20 relative">
        {/* Fondo con grid más grande y con márgenes */}
        <div className="absolute inset-0 bg-white dark:bg-black">
          {/* Efecto de ruido solo dentro del círculo */}
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_75%)]">
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                backgroundRepeat: "repeat",
                backgroundSize: "200px 200px",
              }}
            />
          </div>

          {/* Grid con margen superior y overlay circular más grande */}
          <div className="absolute inset-x-0 top-16 bottom-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#8f8f8f15_1px,transparent_1px),linear-gradient(to_bottom,#8f8f8f15_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_75%)]"></div>

          {/* Fondo negro sólido para el área fuera del círculo en modo oscuro */}
          <div className="absolute inset-0 bg-transparent dark:bg-black opacity-0 dark:opacity-100 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_70%,#000_90%)]"></div>

          {/* Overlay adicional en la parte superior */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white dark:from-black to-transparent z-10"></div>

          {/* Overlay adicional en la parte inferior */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-black to-transparent z-10"></div>
        </div>

        <div className="container mx-auto px-4 z-20 relative">
          {/* Contenido principal */}
          <div className="max-w-6xl mx-auto text-center mt-10">
            {/* Tag más moderno */}
            <a
              href="/portal"
              className="inline-flex items-center px-3 py-1.5 mb-8 text-xs font-medium bg-transparent rounded-full border border-zinc-800/50 transition-all duration-300 relative group"
            >
              <span
                className="font-semibold"
                style={{
                  background:
                    "linear-gradient(90deg, rgb(179, 174, 245) 0.41%, rgb(215, 203, 231) 40.68%, rgb(229, 200, 200) 64.12%, rgb(234, 168, 121) 97.82%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                New Stofli UI Portal
              </span>
              <ArrowRight className="w-3 h-3 ml-1.5 inline text-white" />
              <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:shadow-[0_0_10px_1px_rgba(179,174,245,0.5),0_0_15px_2px_rgba(234,168,121,0.3)] group-hover:border-white/20"></div>
            </a>

            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300">
              Build Modern UI Designs
            </h1>

            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-12">
              Una biblioteca de componentes UI rápida, moderna y fácil de usar
              para todos tus proyectos web. Optimizada para rendimiento,
              accesibilidad y personalización.
            </p>

            {/* Botones más pequeños y modernos */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-[#B3AEF5] via-[#E5C8C8] to-[#EAA879] text-black shadow-lg hover:shadow-xl transition-all duration-300 scale-100 hover:scale-95"
              >
                Prueba Stofli UI Gratis
              </a>
              <a
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg bg-transparent border border-white/20 text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300 relative group"
              >
                Solicita una Demo
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#B3AEF5]/20 via-[#E5C8C8]/20 to-[#EAA879]/20 blur-md -z-10"></div>
              </a>
            </div>

            {/* Dashboard moderno inspirado en la imagen de referencia */}
            <div className="relative mx-auto max-w-5xl">
              {/* Efecto glass mejorado estilo macOS */}
              <div className="absolute -inset-5 bg-gray-100/60 dark:bg-zinc-800/30 rounded-3xl border border-gray-400/50 dark:border-white/10 shadow-xl"></div>

              {/* Contenido del dashboard */}
              <div className="relative rounded-xl overflow-hidden bg-black border border-zinc-800/40 dark:border-zinc-800/40 shadow-xl">
                {/* Vista de escritorio - componentes reales */}
                {/* Dashboard interior */}
                <div className="flex">
                  {/* Sidebar izquierda */}
                  <div className="w-16 bg-black border-r border-zinc-800/40 flex flex-col items-center py-6 gap-8">
                    {/* Logo */}
                    <div className="w-8 h-8 bg-black border border-zinc-800/60 rounded-lg flex items-center justify-center font-bold text-white">
                      X
                    </div>

                    {/* Íconos de navegación */}
                    <div className="flex flex-col gap-8">
                      <div className="w-8 h-8 bg-black/90 border border-zinc-800/40 rounded-md flex items-center justify-center">
                        <Grid size={16} className="text-white" />
                      </div>
                      <div className="w-8 h-8 rounded-md flex items-center justify-center">
                        <Monitor size={16} className="text-zinc-600" />
                      </div>
                      <div className="w-8 h-8 rounded-md flex items-center justify-center">
                        <Clock size={16} className="text-zinc-600" />
                      </div>
                      <div className="w-8 h-8 rounded-md flex items-center justify-center">
                        <Award size={16} className="text-zinc-600" />
                      </div>
                      <div className="w-8 h-8 rounded-md flex items-center justify-center">
                        <Circle size={16} className="text-zinc-600" />
                      </div>
                    </div>

                    {/* Avatar inferior */}
                    <div className="mt-auto">
                      <Avatar
                        src="https://i.pravatar.cc/150?u=user"
                        alt="Usuario"
                        size="sm"
                        status="online"
                        border={true}
                        borderColor="border-zinc-800/40"
                      />
                    </div>
                  </div>

                  {/* Contenido principal */}
                  <div className="flex-1 p-6">
                    {/* Header del dashboard */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-white">Overview</h2>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                          <input
                            type="text"
                            placeholder="Search"
                            className="bg-black border border-zinc-800/60 rounded-md py-1.5 pl-9 pr-3 text-xs text-zinc-300 w-60"
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="default"
                          className="!bg-white !hover:bg-zinc-200 !text-black !font-medium !text-xs !rounded-md !px-3 !py-1.5 !flex !items-center"
                          leftIcon={<span>+</span>}
                          rippleColor="#09090b"
                        >
                          Create
                        </Button>
                      </div>
                    </div>

                    {/* Tabs de navegación */}
                    <div className="mb-6">
                      <div className="dark">
                        <Tabs
                          tabs={[
                            {
                              label: "Dashboard",
                              content: null,
                              icon: <LayoutDashboard size={16} />,
                            },
                            {
                              label: "Rendimiento",
                              content: null,
                              icon: <BarChart3 size={16} />,
                            },
                            {
                              label: "Estadísticas",
                              content: null,
                              icon: <PieChart size={16} />,
                            },
                            {
                              label: "Usuarios",
                              content: null,
                              icon: <Users size={16} />,
                            },
                          ]}
                          defaultTab={0}
                          variant="default"
                          size="sm"
                          radius="md"
                          hoverEffect={true}
                          className="mt-1"
                          tabClassName="px-4 text-zinc-400 hover:text-zinc-200"
                          contentClassName="px-0"
                        />
                      </div>
                    </div>

                    {/* Métricas principales */}
                    <div className="grid grid-cols-5 gap-4 mb-6 text-center">
                      <div className="flex flex-col items-center bg-black backdrop-blur-sm rounded-lg p-2 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                        <span className="text-2xl font-bold text-white mb-0.5">
                          4
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          Battles
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-black backdrop-blur-sm rounded-lg p-2 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                        <span className="text-2xl font-bold text-white mb-0.5">
                          23
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          Players
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-black backdrop-blur-sm rounded-lg p-2 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                        <div className="relative w-12 h-12 mb-0.5">
                          <div className="absolute inset-0 rounded-full border-3 border-black"></div>
                          <div
                            className="absolute inset-0 rounded-full border-3 border-white/80"
                            style={{
                              clipPath:
                                "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                              clip: "rect(0px, 48px, 48px, 24px)",
                            }}
                          ></div>
                          <div className="absolute inset-1 flex items-center justify-center">
                            <span className="text-base font-bold text-white">
                              93
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-zinc-400">
                          Global NR
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-black backdrop-blur-sm rounded-lg p-2 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                        <span className="text-2xl font-bold text-white mb-0.5">
                          243
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          Questions
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-black backdrop-blur-sm rounded-lg p-2 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                        <span className="text-2xl font-bold text-white mb-0.5">
                          489
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          Topics
                        </span>
                      </div>
                    </div>

                    {/* Gráficos y tablas */}
                    <div className="grid grid-cols-3 gap-5">
                      {/* Gráfico de línea - aprendizaje */}
                      <div className="col-span-2">
                        <div className="mb-5">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold text-white">
                              Learning curve
                            </h3>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white"></span>
                                <span className="text-xs text-zinc-400">
                                  Unitary
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
                                <span className="text-xs text-zinc-400">
                                  Average
                                </span>
                              </div>
                              <Dropdown
                                items={[
                                  { label: "Day", value: "day" },
                                  { label: "Week", value: "week" },
                                  { label: "Month", value: "month" },
                                  { label: "Year", value: "year" },
                                ]}
                                defaultValue="week"
                                size="sm"
                                variant="default"
                                className="min-w-0"
                                buttonClassName="!bg-black/80 !border-zinc-800/60"
                                width="90px"
                              />
                            </div>
                          </div>

                          {/* Gráfico */}
                          <div className="h-44 relative bg-black border border-zinc-800/40 rounded-md pr-7 pt-2 overflow-hidden">
                            <RechartsComponents />
                          </div>
                        </div>

                        {/* Gráficos inferiores */}
                        <div className="grid grid-cols-2 gap-5">
                          {/* Gráfico circular */}
                          <div className="bg-black border border-zinc-800/40 rounded-md p-3 h-[calc(129%)]">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-sm font-semibold text-white">
                                Battles participation
                              </h3>
                            </div>
                            <div className="flex space-x-4 h-full items-center">
                              <div className="relative w-30 h-30">
                                <svg
                                  viewBox="0 0 100 100"
                                  className="w-full h-full drop-shadow-lg"
                                >
                                  {/* Fondo del círculo */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    stroke="#333333"
                                    strokeWidth="12"
                                  />

                                  {/* Segmentos del círculo con colores más distintivos */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    stroke="#16a34a"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="0"
                                    transform="rotate(-90, 50, 50)"
                                  />
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    stroke="#3b82f6"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="175.8"
                                    transform="rotate(-90, 50, 50)"
                                  />
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    stroke="#eab308"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="213.5"
                                    transform="rotate(-90, 50, 50)"
                                  />
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    stroke="#ef4444"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="238.6"
                                    transform="rotate(-90, 50, 50)"
                                  />

                                  {/* Texto central */}
                                  <text
                                    x="50"
                                    y="50"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="18"
                                    fontWeight="bold"
                                    fill="white"
                                  >
                                    67%
                                  </text>
                                </svg>
                              </div>
                              <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full bg-green-600"></span>
                                  <span className="text-xs text-zinc-300">
                                    Digital marketing
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                  <span className="text-xs text-zinc-300">
                                    Water theory
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                  <span className="text-xs text-zinc-300">
                                    Customer X
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                  <span className="text-xs text-zinc-300">
                                    Product design
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Gráfico de barras */}
                          <div className="bg-black border border-zinc-800/40 rounded-md p-3 h-[calc(129%)]">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-sm font-semibold text-white">
                                Gaming time
                              </h3>
                              <Dropdown
                                items={[
                                  { label: "Day", value: "day" },
                                  { label: "Week", value: "week" },
                                  { label: "Month", value: "month" },
                                  { label: "Year", value: "year" },
                                ]}
                                defaultValue="week"
                                size="sm"
                                variant="default"
                                className="min-w-0"
                                buttonClassName="!bg-black/80 !border-zinc-800/60"
                                width="90px"
                              />
                            </div>
                            <div className="h-[130px] flex items-end justify-between mt-6">
                              {[5, 3, 6, 4, 8, 10, 7].map((height, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col items-center"
                                >
                                  <div
                                    className={`w-6 ${
                                      index === 5
                                        ? "bg-gradient-to-t from-white/80 to-white"
                                        : "bg-gradient-to-t from-white/20 to-white/40"
                                    } rounded-sm transition-all hover:from-white/50 hover:to-white/80`}
                                    style={{ height: `${height * 10}px` }}
                                  ></div>
                                  <span className="mt-1 text-[10px] text-zinc-400">
                                    {
                                      [
                                        "Mon",
                                        "Tue",
                                        "Wed",
                                        "Thu",
                                        "Fri",
                                        "Sat",
                                        "Sun",
                                      ][index]
                                    }
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ranking de jugadores */}
                      <div className="col-span-1 bg-black border border-zinc-800/40 rounded-md">
                        <div className="mb-2 px-3 pt-3">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold text-white">
                              Ranking
                            </h3>
                          </div>
                          <div className="bg-black/80 border border-zinc-800/60 rounded-md p-1.5">
                            <div className="flex border-b border-zinc-700 text-xs">
                              <div className="p-1.5 text-white font-medium flex-1">
                                Points
                              </div>
                              <div className="p-1.5 text-zinc-400 flex-1">
                                Response time
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Lista de jugadores */}
                        <div className="space-y-2 px-3">
                          {[
                            {
                              name: "Jacob Jones",
                              role: "Customer service",
                              avatarSrc: "https://i.pravatar.cc/150?u=jacob",
                              score: 987,
                              trend: "up",
                            },
                            {
                              name: "Kristin Watson",
                              role: "UX Design",
                              avatarSrc: "https://i.pravatar.cc/150?u=kristin",
                              score: 943,
                              trend: "up",
                            },
                            {
                              name: "Cody Fisher",
                              role: "Marketing",
                              avatarSrc: "https://i.pravatar.cc/150?u=cody",
                              score: 845,
                              trend: "up",
                            },
                            {
                              name: "Theresa Webb",
                              role: "Customer service",
                              avatarSrc: "https://i.pravatar.cc/150?u=theresa",
                              score: 790,
                              trend: "up",
                            },
                            {
                              name: "Brooklyn Simmons",
                              role: "Marketing",
                              avatarSrc: "https://i.pravatar.cc/150?u=brooklyn",
                              score: 654,
                              trend: "same",
                            },
                            {
                              name: "Airam Rodriguez",
                              role: "Sales",
                              avatarSrc: "https://i.pravatar.cc/150?u=airam",
                              score: 721,
                              trend: "same",
                            },
                          ].map((player, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-1.5"
                            >
                              <div className="flex items-center">
                                <Avatar
                                  src={player.avatarSrc}
                                  alt={player.name}
                                  size="sm"
                                  className="mr-2"
                                  fallback={player.name.charAt(0)}
                                />
                                <div>
                                  <div className="text-[10px] font-medium text-white text-start">
                                    {player.name}
                                  </div>
                                  <div className="text-[8px] text-zinc-500 text-start">
                                    {player.role}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {player.trend === "up" ? (
                                  <span className="text-white mr-1.5">
                                    <ChevronUp size={12} />
                                  </span>
                                ) : (
                                  <span className="text-zinc-500 mr-1.5">
                                    <span className="inline-block w-2 h-px bg-zinc-500"></span>
                                  </span>
                                )}
                                <span className="text-[10px] font-semibold text-white">
                                  {player.score}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Ver más */}
                        <div className="mt-3 mb-3 flex justify-between items-center px-3">
                          <span className="text-[10px] text-zinc-500">
                            Ranking completo
                          </span>
                          <Button
                            size="xs"
                            variant="outline"
                            className="!border !border-zinc-800/60"
                            rightIcon={<ChevronRight className="w-3 h-3" />}
                          >
                            Ver
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Sección inspirada en la imagen */}
      <GovSection />

      {/* Sección de bento grid */}
      <BentoSection />

      <Footer />
    </div>
  );
}
