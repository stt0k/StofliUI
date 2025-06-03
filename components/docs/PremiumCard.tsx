import React from "react";
import Link from "next/link";

const PremiumCard = () => {
  return (
    <div className="w-full">
      <div className="dark:bg-black rounded-xl p-4 text-black/90 dark:text-white shadow-md border border-neutral-800/60 backdrop-blur-sm">
        <h3 className="text-base font-medium mb-2">
          Componentes Pro
        </h3>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
          Accede a nuestra biblioteca exclusiva de componentes diseñados para
          casos de uso profesionales.
        </p>

        <p className="text-xs text-zinc-600 dark:text-zinc-500 mb-5">
          Tablas avanzadas, gráficos interativos y dashboards empresariales.
        </p>

        <Link
          href="/pricing"
          className="group inline-flex items-center justify-between w-full text-xs font-medium py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md text-zinc-300 hover:text-white transition-all duration-200"
        >
          <span>Ver planes premium</span>
          <span className="group-hover:translate-x-0.5 transition-transform duration-200">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PremiumCard;
