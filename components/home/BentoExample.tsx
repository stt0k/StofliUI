import React from "react";
import {
  HiArrowUpRight,
  HiCommandLine,
  HiCube,
  HiSparkles,
  HiRocketLaunch,
} from "react-icons/hi2";

const links = {
  powerful: "#",
  customizable: "#",
  optimized: "#",
  fast: "#",
};

const BentoExample = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto xl:px-20 container">
      {/* Background glow effect */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-[400px] container -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] bg-gradient-to-r from-[#00D1FF] via-[#FF8C33] to-[#FF5733]"></div>

      {/* Powerful UI */}
      <a
        href={links.powerful}
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-1 md:col-span-3 relative overflow-hidden group border border-[#00D1FF]/30 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-3xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,209,255,0.3)] hover:border-[#00D1FF]/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <HiArrowUpRight className="text-[#00D1FF] text-xl" />
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left h-full relative z-10 p-8">
          <div className="p-3 rounded-2xl bg-[#00D1FF]/20 border border-[#00D1FF]/30 mb-4">
            <HiCube className="text-[#00D1FF] text-2xl" />
          </div>
          <h3 className="text-black dark:text-white font-bold text-2xl mb-3">
            Powerful UI
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-base mb-8">
            Build stunning interfaces with our powerful components that look
            great in any project.
          </p>
          <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#00D1FF]/10 to-[#00D1FF]/5 border border-[#00D1FF]/20 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/70 flex items-center justify-center shadow-lg shadow-[#00D1FF]/20">
              <span className="text-black font-bold">UI</span>
            </div>
          </div>
        </div>
      </a>

      {/* Customizable components */}
      <a
        href={links.customizable}
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-1 md:col-span-3 relative overflow-hidden group border border-[#FF5733]/30 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-3xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,87,51,0.3)] hover:border-[#FF5733]/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5733]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <HiArrowUpRight className="text-[#FF5733] text-xl" />
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left h-full relative z-10 p-8">
          <div className="p-3 rounded-2xl bg-[#FF5733]/20 border border-[#FF5733]/30 mb-4">
            <HiSparkles className="text-[#FF5733] text-2xl" />
          </div>
          <h3 className="text-black dark:text-white font-bold text-2xl mb-3">
            Customizable components
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-base mb-8">
            Tailor every component to match your brand's unique style and
            requirements.
          </p>
          <div className="grid grid-cols-3 gap-3 w-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-[#FF5733]/10 to-[#FF5733]/5 border border-[#FF5733]/20 flex items-center justify-center"
              >
                <div
                  className={`w-6 h-6 rounded-md ${
                    i % 2 === 0 ? "bg-[#FF5733]" : "bg-[#FF8C33]"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </a>

      {/* Optimized */}
      <a
        href={links.optimized}
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-1 md:col-span-4 relative overflow-hidden group border border-[#00D1FF]/30 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-3xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,209,255,0.3)] hover:border-[#00D1FF]/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <HiArrowUpRight className="text-[#00D1FF] text-xl" />
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left h-full relative z-10 p-8">
          <div className="p-3 rounded-2xl bg-[#00D1FF]/20 border border-[#00D1FF]/30 mb-4">
            <HiCommandLine className="text-[#00D1FF] text-2xl" />
          </div>
          <h3 className="text-black dark:text-white font-bold text-2xl mb-3">
            Optimized for speed, scalability, and accessibility
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-base mb-8">
            Our components are built with performance and accessibility in mind,
            ensuring your UI is fast and inclusive.
          </p>

          <div className="flex flex-col h-full w-full rounded-2xl bg-[#111111] text-gray-100 font-mono text-sm border border-[#00D1FF]/20 overflow-hidden">
            <div className="flex items-center h-10 px-4 bg-[#0a0a0a] border-b border-[#00D1FF]/20">
              <div className="h-3 w-3 mr-2 rounded-full bg-[#00D1FF]/80"></div>
              <div className="h-3 w-3 mr-2 rounded-full bg-[#00D1FF]/60"></div>
              <div className="h-3 w-3 rounded-full bg-[#00D1FF]/40"></div>
            </div>

            <div className="flex-1 p-4">
              <div className="flex-col text-left">
                <p className="text-[#00D1FF]">&#47;&#47; Styling a button</p>
                <br />
                <p className="text-gray-300">
                  &lt;<span className="text-[#FF5733]">button</span>{" "}
                  <span className="text-[#FF8C33]">class</span>
                  <span className="text-[#00D1FF]">=</span>
                  <span className="text-[#98C379]">
                    "text-white bg-gradient-to-r from-[#00D1FF] to-[#FF5733]
                    hover:bg-gradient-to-l focus:ring-4 focus:outline-hidden
                    focus:ring-[#00D1FF]/50 font-medium rounded-lg text-sm px-5
                    py-2.5 text-center"
                  </span>
                  &gt; <br /> stofli/ui Button <br /> &lt;/
                  <span className="text-[#FF5733]">button</span>&gt;
                </p>
                <br />
                <p className="text-[#00D1FF]">&#47;&#47; Result:</p>
                <br />
                <button className="text-white bg-gradient-to-r from-[#00D1FF] to-[#FF5733] hover:bg-gradient-to-l focus:ring-4 focus:outline-hidden focus:ring-[#00D1FF]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  stofli/ui Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </a>

      {/* Fast */}
      <a
        href={links.fast}
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-1 md:col-span-2 relative overflow-hidden group border border-[#FF5733]/30 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-3xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,87,51,0.3)] hover:border-[#FF5733]/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5733]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <HiArrowUpRight className="text-[#FF5733] text-xl" />
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left h-full relative z-10 p-8">
          <div className="p-3 rounded-2xl bg-[#FF5733]/20 border border-[#FF5733]/30 mb-4">
            <HiRocketLaunch className="text-[#FF5733] text-2xl" />
          </div>
          <h3 className="text-black dark:text-white font-bold text-2xl mb-3">
            Fast & beautiful UI solutions
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-base mb-8">
            Get your project up and running quickly with our beautiful,
            ready-to-use components.
          </p>

          <div className="w-full flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF5733] to-[#FF8C33] flex items-center justify-center animate-pulse">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="absolute -inset-1 rounded-full bg-[#FF5733]/20 animate-ping"></div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default BentoExample;
