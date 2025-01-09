import React from 'react'

const links = {
    powerful: "#",
    customizable: "#",
    optimized: "#",
    fast: "#",
  };
  
const BentoExample = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto xl:px-20 container">
        <div className="absolute left-1/2 top-1/3 -z-10 h-[400px] container -translate-x-1/2 -translate-y-1/2 dark:opacity-[8%] opacity-[15%] blur-[100px] bg-emerald-500"></div>
        {/* personalPortfolio */}
        <a
          href={links.powerful}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 md:col-span-3 bg-cover bg-center relative overflow-hidden group border border-gray-200 dark:border-none bg-transparent dark:bg-white/5 backdrop-blur rounded-3xl md:rounded-4xl"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left h-full relative z-10 p-6">
            <h3 className="dark:text-[#FFFFFF] text-gray-800 font-bold text-2xl mb-2">Powerful UI</h3>
            <p className="dark:text-white/40 text-zinc-600 text-base mb-8">Example4</p>
          </div>
        </a>

        {/* apis */}
        <a
          href={links.customizable}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 md:col-span-3 bg-cover bg-center relative overflow-hidden group border border-gray-200 bg-transparent dark:border-none dark:bg-white/5 backdrop-blur rounded-3xl md:rounded-4xl"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left h-full relative z-10 p-6">
            <h3 className="dark:text-[#FFFFFF] text-gray-800 font-bold text-2xl mb-2">Customizable components</h3>
            <p className="dark:text-white/40 text-zinc-600 text-base mb-8">Example2</p>
          </div>
        </a>

        {/* dashboard */}
        <a
          href={links.optimized}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 md:col-span-4 bg-cover bg-center relative overflow-hidden group border border-gray-200 bg-transparent dark:border-none dark:bg-white/5 backdrop-blur rounded-3xl md:rounded-4xl"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left h-full relative z-10 p-6">
            <h3 className="dark:text-[#FFFFFF] text-gray-800 font-bold text-2xl mb-2">Optimized for speed, scalability, and accessibility</h3>
            <p className="dark:text-white/40 text-zinc-600 text-base mb-8">
            Example3</p>

            <div className="flex flex-col h-full rounded-2xl bg-[#555555] dark:bg-[#111111] text-gray-100 font-mono text-sm">
                <div className="flex items-center h-10 px-4">
                    <div className="h-3 w-3 mr-2 rounded-full bg-[#919191] dark:bg-[#454952]"></div>
                    <div className="h-3 w-3 mr-2 rounded-full bg-[#919191] dark:bg-[#454952]"></div>
                    <div className="h-3 w-3 rounded-full bg-[#919191] dark:bg-[#454952]"></div>
                </div>

                <div className="flex-1 p-4">
                    <div className="flex-col text-left">
                    <p className="text-gray-200">&#47;&#47; Styling a button</p><br />
                    <p className="text-gray-300">&lt;<span className="text-[#E06C75]">button</span> <span className="text-[#e5ba6a]">class</span><span className="text-[#61AFEF]">=</span><span className="text-[#98C379]">"text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"</span>&gt; <br /> stofli/ui Button <br /> &lt;/<span className="text-[#E06C75]">button</span>&gt;</p>
                    <br />
                    <p className="text-gray-200">&#47;&#47; Result:</p>
                    <br />
                    <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">stofli/ui Button</button>
                    </div>
                </div>
            </div>

          </div>
        </a>

        {/* 3d */}
        <a
          href={links.fast}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 md:col-span-2 bg-cover bg-center relative overflow-hidden group border border-gray-200 bg-transparent dark:border-none dark:bg-white/5 backdrop-blur rounded-3xl md:rounded-4xl"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left h-full relative z-10 p-6">
            <h3 className="dark:text-[#FFFFFF] text-gray-800 font-bold text-2xl mb-2">Fast & beautiful UI solutions</h3>
            <p className="dark:text-white/40 text-zinc-600 text-base mb-8">Example4</p>
          </div>
        </a>
        </div>
  )
}

export default BentoExample
