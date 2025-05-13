"use client";

import React from "react";
import Header from "@/components/header/Header";
import FooterDocs from "@/components/footer/FooterDocs";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Div espaciador para compensar el header fijo */}
      <div className="h-32"></div>
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            Planes y Precios
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-zinc-400 leading-relaxed">
            Elige el plan perfecto para tu camino
          </p>
        </div>

        <div className="max-w-7xl mx-auto border border-gray-200 dark:border-zinc-900 bg-white dark:bg-black">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-zinc-800">
            <div className="p-8 flex flex-col">
              <h2 className="text-xl font-bold">Gratis</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Componentes gratis de nuestra web 100% personalizables
              </p>

              <div className="mt-5 mb-4">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1 block text-sm">
                  por mes
                </span>
              </div>

              <Link
                href="/#"
                className="bg-gray-200 dark:bg-zinc-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-700 w-full py-2 px-4 font-medium transition mb-8 block text-center"
              >
                Comenzar
              </Link>

              <p className="mb-6">
                Todos los componentes disponibles gratuitamente en el sitio web
                son de uso libre.
              </p>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>
                    Una biblioteca creciente de fantásticos componentes
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Código React / Next.js / Tailwind CSS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Sirve a una amplia variedad de audiencias</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Licencia MIT. Proyectos personales o comerciales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Contacto por chat para soporte</span>
                </li>
              </ul>
            </div>

            <div className="p-8 flex flex-col">
              <h2 className="text-xl font-bold">Componentes Pro</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pausar o cancelar en cualquier momento
              </p>

              <div className="mt-5 mb-4">
                <span className="text-5xl font-bold">$4995</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1 block text-sm">
                  /mes
                </span>
              </div>

              <Link
                href="/#"
                className="w-full py-2 px-4 bg-teal-500 text-black font-medium hover:bg-teal-400 transition mb-8 block text-center"
              >
                Seleccionar plan
              </Link>

              <p className="mb-6">
                Componentes independientes y privados adaptados a tus
                necesidades.
              </p>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Tantos componentes como sea posible en un mes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Código React / Next.js / Tailwind CSS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Diseño + Desarrollo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Revisiones ilimitadas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Tiempo de respuesta de soporte de 24 horas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Canal de comunicación privado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Tiempo de entrega de 4-7 días</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Pausar o cancelar en cualquier momento</span>
                </li>
              </ul>
            </div>

            <div className="p-8 flex flex-col">
              <h2 className="text-xl font-bold">Páginas</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pausar o cancelar en cualquier momento
              </p>

              <div className="mt-5 mb-4">
                <span className="text-5xl font-bold">$6995</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1 block text-sm">
                  /mes
                </span>
              </div>

              <Link
                href="/#"
                className="w-full py-2 px-4 bg-teal-500 text-black font-medium hover:bg-teal-400 transition mb-8 block text-center"
              >
                Seleccionar plan
              </Link>

              <p className="mb-6">
                Ideal para startups en fase inicial y negocios que necesitan un
                sitio de marketing.
              </p>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Una solicitud / página a la vez</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Código React / Next.js / Tailwind CSS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Diseño + Desarrollo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Revisiones ilimitadas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Integración CMS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Optimización para motores de búsqueda (SEO)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Tiempo de respuesta de soporte de 24 horas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Canal de comunicación privado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Tiempo de entrega de 7-10 días</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Pausar o cancelar en cualquier momento</span>
                </li>
              </ul>
            </div>

            <div className="p-8 flex flex-col">
              <h2 className="text-xl font-bold">Aplicaciones Web</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pausar o cancelar en cualquier momento
              </p>

              <div className="mt-5 mb-4">
                <span className="text-5xl font-bold">$9995</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1 block text-sm">
                  /mes
                </span>
              </div>

              <Link
                href="/#"
                className="w-full py-2 px-4 bg-teal-500 text-black font-medium hover:bg-teal-400 transition mb-8 block text-center"
              >
                Seleccionar plan
              </Link>

              <p className="mb-6">
                Aplicaciones más complejas con autenticación de usuarios, bases
                de datos y funciones avanzadas.
              </p>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Un proyecto a la vez</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Código React / Next.js / Tailwind CSS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Diseño + Desarrollo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Revisiones ilimitadas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Integración con base de datos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Autenticación / Cuentas de usuario</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Optimización para motores de búsqueda (SEO)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Tiempo de respuesta de soporte de 24 horas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Canal de comunicación privado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Tiempo de entrega de 2-3 semanas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 dark:text-teal-400 mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Pausar o cancelar en cualquier momento</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compare Plans Section */}
        <div className="max-w-7xl mx-auto border-b border-r border-l border-gray-200 dark:border-zinc-900 bg-white dark:bg-black">
          <div className="text-center p-8 border-b border-gray-200 dark:border-zinc-900">
            <h2 className="text-4xl font-bold">Comparar planes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <th className="p-6 text-left border-r border-gray-200 dark:border-zinc-900"></th>
                  <th className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <div className="font-bold">Gratis</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      $0/mes
                    </div>
                  </th>
                  <th className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <div className="font-bold">Componentes Pro</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      $4995/mes
                    </div>
                  </th>
                  <th className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <div className="font-bold">Páginas</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      $6995/mes
                    </div>
                  </th>
                  <th className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <div className="font-bold">Aplicaciones Web</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      $9995/mes
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <td className="p-6 font-medium border-r border-gray-200 dark:border-zinc-900">
                    Componentes
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <div>Biblioteca creciente</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Uso gratuito
                    </div>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <div>Tantos como sea posible</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      en un mes
                    </div>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <div>Una solicitud / página</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      a la vez
                    </div>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <div>Un proyecto</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      a la vez
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <td className="p-6 font-medium border-r border-gray-200 dark:border-zinc-900">
                    Diseño + Desarrollo
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <td className="p-6 font-medium border-r border-gray-200 dark:border-zinc-900">
                    Revisiones ilimitadas
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <td className="p-6 font-medium border-r border-gray-200 dark:border-zinc-900">
                    Integración CMS
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <td className="p-6 font-medium border-r border-gray-200 dark:border-zinc-900">
                    Integración con base de datos
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <td className="p-6 font-medium border-r border-gray-200 dark:border-zinc-900">
                    Autenticación de usuarios
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <td className="p-6 font-medium border-r border-gray-200 dark:border-zinc-900">
                    SEO
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <td className="p-6 font-medium border-r border-gray-200 dark:border-zinc-900">
                    Comunicación privada
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <td className="p-6 font-medium border-r border-gray-200 dark:border-zinc-900">
                    Tiempo de entrega
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span>4-7 días</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span>7-10 días</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span>2-3 semanas</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-zinc-900">
                  <td className="p-6 font-medium border-r border-gray-200 dark:border-zinc-900">
                    Pausar o cancelar en cualquier momento
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                  <td className="p-6 text-center border-r border-gray-200 dark:border-zinc-900">
                    <span className="text-teal-500 dark:text-teal-400">✓</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FooterDocs />
    </div>
  );
}
