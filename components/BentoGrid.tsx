
const links = {
  nextjs: "/",
  astro: "#",
  vite: "#",
  laravel: "#",
  react: "#",
  angular: "#",
  svelte: "#",
  vuejs: "#",
};

// icons
import {
  RiNextjsFill,
  RiAngularjsFill,
  RiSvelteFill,
  RiVuejsFill

} from "react-icons/ri";

import {
  SiVite,
  SiAstro,
  SiLaravel,
  SiReact

} from "react-icons/si";

export default function svelteGrid() {
  return (
    <div className="p-4 md:p-6 lg:p-8 custom-scroll">
      <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto xl:px-5">
        {/* nextjs */}
        <a
          href={links.nextjs}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden group transition-colors border shadow-sm hover:bg-[#e2e2e2cc] dark:hover:bg-[#3f3f3f5d] dark:border-[#333333] cursor-pointer rounded-lg"
        > 
          <div className="flex flex-col items-center text-center md:text-left h-full relative z-10 p-4">
            <RiNextjsFill className="h-16 w-16" />
            <h3 className="dark:text-[#FFFFFF] font-bold">Next.js</h3>
          </div>
        </a>

        {/* nextjs */}
        <a
          href={links.nextjs}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden group transition-colors border shadow-sm hover:bg-[#e2e2e2cc] dark:hover:bg-[#3f3f3f5d] dark:border-[#333333] cursor-pointer rounded-lg"
        > 
          <div className="flex flex-col items-center text-center md:text-left h-full relative z-10 p-4">
            <SiAstro className="h-16 w-16" />
            <h3 className="dark:text-[#FFFFFF] font-bold">Astro</h3>
          </div>
        </a>
        {/* nextjs */}
        <a
          href={links.nextjs}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden group transition-colors border shadow-sm hover:bg-[#e2e2e2cc] dark:hover:bg-[#3f3f3f5d] dark:border-[#333333] cursor-pointer rounded-lg"
        > 
          <div className="flex flex-col items-center text-center md:text-left h-full relative z-10 p-4">
            <SiVite className="h-16 w-16" />
            <h3 className="dark:text-[#FFFFFF] font-bold">Vite</h3>
          </div>
        </a>
        {/* nextjs */}
        <a
          href={links.nextjs}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden group transition-colors border shadow-sm hover:bg-[#e2e2e2cc] dark:hover:bg-[#3f3f3f5d] dark:border-[#333333] cursor-pointer rounded-lg"
        > 
          <div className="flex flex-col items-center text-center md:text-left h-full relative z-10 p-4">
            <SiLaravel className="h-16 w-16" />
            <h3 className="dark:text-[#FFFFFF] font-bold">Laravel</h3>
          </div>
        </a>
        {/* nextjs */}
        <a
          href={links.nextjs}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden group transition-colors border shadow-sm hover:bg-[#e2e2e2cc] dark:hover:bg-[#3f3f3f5d] dark:border-[#333333] cursor-pointer rounded-lg"
        > 
          <div className="flex flex-col items-center text-center md:text-left h-full relative z-10 p-4">
            <SiReact className="h-16 w-16" />
            <h3 className="dark:text-[#FFFFFF] font-bold">React</h3>
          </div>
        </a>
        {/* nextjs */}
        <a
          href={links.nextjs}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden group transition-colors border shadow-sm hover:bg-[#e2e2e2cc] dark:hover:bg-[#3f3f3f5d] dark:border-[#333333] cursor-pointer rounded-lg"
        > 
          <div className="flex flex-col items-center text-center md:text-left h-full relative z-10 p-4">
            <RiAngularjsFill className="h-16 w-16" />
            <h3 className="dark:text-[#FFFFFF] font-bold">Angular</h3>
          </div>
        </a>
        {/* nextjs */}
        <a
          href={links.nextjs}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden group transition-colors border shadow-sm hover:bg-[#e2e2e2cc] dark:hover:bg-[#3f3f3f5d] dark:border-[#333333] cursor-pointer rounded-lg"
        > 
          <div className="flex flex-col items-center text-center md:text-left h-full relative z-10 p-4">
            <RiSvelteFill className="h-16 w-16" />
            <h3 className="dark:text-[#FFFFFF] font-bold">Svelte</h3>
          </div>
        </a>
        {/* nextjs */}
        <a
          href={links.nextjs}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden group transition-colors border shadow-sm hover:bg-[#e2e2e2cc] dark:hover:bg-[#3f3f3f5d] dark:border-[#333333] cursor-pointer rounded-lg"
        > 
          <div className="flex flex-col items-center text-center md:text-left h-full relative z-10 p-4">
            <RiVuejsFill className="h-16 w-16" />
            <h3 className="dark:text-[#FFFFFF] font-bold">Vue.js</h3>
          </div>
        </a>
      </div>
    </div>
  );
}