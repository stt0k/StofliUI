import React from "react";
import { socials, linksHeader, linksDocs, linksFrameworks } from "./footerData";

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
              stofli/ui
            </h2>
            <p className="mt-2 text-gray-600 dark:text-zinc-400">
              Building the future of decentralized applications.
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-10 flex-col items-center">
            <div className="flex space-x-4">
              {socials.map((item, index) => (
                <a
                  href={item.href}
                  key={index}
                  className="flex p-1"
                  aria-label={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon
                    className="h-4 w-4 text-black dark:text-white"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
            <div className="flex gap-x-5">
              <div className="mt-2 text-sm space-y-2 flex flex-col">
                {linksDocs.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-zinc-600 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-zinc-300 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
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
                    className="text-zinc-600 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-zinc-300 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
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
                    className="text-zinc-600 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-zinc-300 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
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
            &copy; {new Date().getFullYear()} stofli/ui. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
