"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Rocket,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/FooterDocs";

type Author = {
  name: string;
  image: string;
  role: string;
};

type Release = {
  title: string;
  version: string;
  date: string;
  description: string;
  features: string[];
  image: string;
  author: Author;
  icon?: React.ReactNode;
  backgroundGradient?: string;
  accent?: string;
};

export default function ChangelogPage() {
  const releases: Release[] = [
    {
      title: "Lanzamiento Inicial",
      version: "v1.0.0",
      date: "Junio 1, 2025",
      description:
        "El primer lanzamiento público de StofliUI: una librería de componentes moderna, personalizable y accesible.",
      features: [
        "20+ componentes esenciales",
        "Compatibles con Tailwind CSS v3 y v4",
        "100% compatible con TypeScript",
        "Diseño responsive en todos los componentes",
        "Documentación completa y ejemplos",
      ],
      image:
        "/home.png",
      backgroundGradient: "from-emerald-950 to-teal-900",
      accent: "emerald",
      author: {
        name: "stt0k & hctor12",
        image:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        role: "Founders & Developers",
      },
      icon: <Rocket className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      {/* Espaciador para header fijo */}
      <div className="h-32"></div>

      <main className="container mx-auto px-4 pt-8 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Changelog
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed hidden md:block">
            Sigue la evolución de StofliUI, descubre las novedades mejoras y
            características que hemos ido incorporando a nuestra biblioteca de
            componentes.
          </p>
          <p className="text-base md:text-xl text-gray-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed block md:hidden">Descubre las últimas novedades de StofliUI.</p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {releases.map((release, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20 hover:border-blue-300 dark:hover:border-blue-800"
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 z-10">
                    <Image
                      src={release.image}
                      alt={`${release.title} ${release.version}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 z-10" />
                  </div>
                  <div className="absolute z-20 p-5 flex items-start justify-between w-full">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center rounded-full border border-gray-300 dark:border-zinc-700 bg-gray-100/80 dark:bg-zinc-800/80 backdrop-blur-sm px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:text-white">
                        {release.version}
                      </span>
                    </div>
                    {release.icon && (
                      <div className="w-8 h-8 rounded-full bg-gray-100/80 dark:bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-gray-800 dark:text-white">
                        {release.icon}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-3">
                  <h3 className="text-xl font-bold mt-2 drop-shadow-md">
                        {release.title}
                      </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
                    {release.date}
                  </p>
                  <p className="text-gray-800 dark:text-white mb-4">
                    {release.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {release.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                        <span className="text-sm text-gray-700 dark:text-zinc-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-300 dark:border-zinc-700">
                        <Image
                          src={release.author.image}
                          alt={release.author.name}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {release.author.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-zinc-400">
                          {release.author.role}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/docs/changelog/${release.version
                        .toLowerCase()
                        .replace("v", "")}`}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                    >
                      <span className="text-sm">Leer más</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
