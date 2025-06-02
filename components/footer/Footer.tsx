import React from "react";
import { linksHeader, linksDocs, linksFrameworks } from "./footerData";

const Footer = () => {
  return (
    <footer
      className="bg-zinc-50 dark:bg-black mt-44 text-white py-8 z-50"
      role="contentinfo"
    >
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-col md:justify-between md:flex-row w-full mb-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              StofliUI
            </h2>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">
              Creando el futuro de las interfaces de usuario.
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-10 flex-col items-center">
            <div className="flex gap-x-5">
              <div className="mt-2 text-sm space-y-2 flex flex-col">
                {linksDocs.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-neutral-600 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-zinc-300 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-2 text-sm space-y-2 flex flex-col">
                {linksFrameworks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-neutral-600 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-zinc-300 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-2 text-sm space-y-2 flex flex-col">
                {linksHeader.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-neutral-600 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-zinc-300 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-400/20 w-full mt-4 pt-4 text-center text-black dark:text-white">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} StofliUI. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
