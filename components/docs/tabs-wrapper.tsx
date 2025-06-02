"use client";

import Tabs from "@/components/sections/Tabs";
import {
  HomeIcon,
  BarChartIcon,
  SettingsIcon,
  LineChartIcon,
  PieChartIcon,
  FileTextIcon,
  FileIcon,
} from "lucide-react";

export function TabsCustomClassDemo() {
  return (
    <Tabs
      tabs={[
        {
          label: "Dashboard",
          icon: <HomeIcon className="h-4 w-4" />,
          content: (
            <p className="text-zinc-700 dark:text-zinc-300">
              Panel principal de control
            </p>
          ),
        },
        {
          label: "Analytics",
          icon: <BarChartIcon className="h-4 w-4" />,
          content: (
            <p className="text-zinc-700 dark:text-zinc-300">
              Estadísticas y análisis
            </p>
          ),
        },
        {
          label: "Settings",
          icon: <SettingsIcon className="h-4 w-4" />,
          content: (
            <p className="text-zinc-700 dark:text-zinc-300">
              Configuración de la aplicación
            </p>
          ),
        },
      ]}
      tabsContainerClassName="bg-white dark:bg-zinc-900 shadow-lg shadow-zinc-200 dark:shadow-zinc-800 border-none p-1.5"
      indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 border-none shadow-md"
      tabClassName="px-5 py-2.5 font-medium"
      activeTabClassName="text-white"
      tabIconClassName="text-current"
      contentContainerClassName="bg-white/50 dark:bg-zinc-900/50 p-5 rounded-lg mt-5 border border-zinc-200 dark:border-zinc-800"
    />
  );
}

export function ModernTabsDemo() {
  return (
    <Tabs
      tabs={[
        {
          label: "Visión general",
          icon: <LineChartIcon className="h-4 w-4" />,
          content: (
            <div className="mt-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-semibold mb-1">
                    Total de usuarios
                  </h3>
                  <p className="text-2xl font-bold">12,493</p>
                </div>
                <div className="p-4 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-semibold mb-1">Nuevos hoy</h3>
                  <p className="text-2xl font-bold">249</p>
                </div>
                <div className="p-4 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-semibold mb-1">Activos</h3>
                  <p className="text-2xl font-bold">8,751</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: "Insights",
          icon: <PieChartIcon className="h-4 w-4" />,
          content: (
            <div className="mt-2 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-semibold mb-3">
                Análisis de comportamiento
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Los datos de análisis estarán disponibles pronto.
              </p>
            </div>
          ),
        },
        {
          label: "Documentos",
          icon: <FileTextIcon className="h-4 w-4" />,
          content: (
            <div className="mt-2">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center gap-3 border border-zinc-200 dark:border-zinc-800">
                  <FileIcon className="h-5 w-5 text-zinc-500" />
                  <div>
                    <p className="font-medium">Informe de ventas Q2 2023</p>
                    <p className="text-xs text-zinc-500">
                      Actualizado hace 2 días
                    </p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center gap-3 border border-zinc-200 dark:border-zinc-800">
                  <FileIcon className="h-5 w-5 text-zinc-500" />
                  <div>
                    <p className="font-medium">Estrategia de marketing</p>
                    <p className="text-xs text-zinc-500">
                      Actualizado hace 1 semana
                    </p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center gap-3 border border-zinc-200 dark:border-zinc-800">
                  <FileIcon className="h-5 w-5 text-zinc-500" />
                  <div>
                    <p className="font-medium">Presupuesto 2023</p>
                    <p className="text-xs text-zinc-500">
                      Actualizado hace 1 mes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ]}
      variant="primary"
      radius="md"
      tabsContainerClassName="bg-white/50 dark:bg-zinc-900/50 shadow-md border-none"
      indicatorClassName="bg-blue-500 dark:bg-blue-600 border-none"
      tabClassName="py-3 px-4"
      activeTabClassName="text-white"
      contentContainerClassName="bg-white/50 dark:bg-zinc-900/50 p-4 rounded-lg mt-5"
    />
  );
}
