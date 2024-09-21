import Header from "@/components/header/Header"
import BentoGrid from "@/components/BentoGrid"
import SpanHome from "@/components/home/SpanHome"
import ButtonHome from "@/components/home/ButtonHome"
import BentoHome from "@/components/home/BentoHome"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black bg-white dark:text-white">
      <Header />
      <div className="flex items-center justify-center h-screen container max-w-7xl">
        <div className="w-full lg:w-1/2 space-y-7 2xl:mx-4 mx-8 flex justify-center flex-col items-center lg:items-start">
          <h1 className="tracking-tight inline font-semibold text-[2.5rem] leading-[3rem] lg:text-6xl text-center lg:text-left">Build <SpanHome>beautiful</SpanHome>, responsive websites with minimal effort.</h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 text-center lg:text-left">A fast, modern, and easy-to-use UI component library for your web projects.</p>
          <ButtonHome />
        </div>
        <div className="hidden lg:flex">
          <BentoGrid />
        </div>
      </div>
      <div className="flex flex-col container text-center lg:text-left">
          <h3 className="tracking-tight inline font-semibold text-4xl lg:text-5xl mb-12">
            A <span className="tracking-tight inline font-semibold from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent bg-gradient-to-b">delightful experience</span>
            <br />for you and your users
          </h3>
      </div>
      <BentoHome />
      <div className="flex flex-col container text-center lg:text-left">
          <h3 className="tracking-tight inline font-semibold text-4xl lg:text-5xl mb-12 mt-60">
            <span className="tracking-tight inline font-semibold from-[#FF705B] to-[#FFB457] text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b">Beautiful</span>
            <br />example of use
          </h3>

          <div className="flex flex-col h-full mb-12 rounded-lg bg-[#1a1d24] text-gray-200 font-mono">

            {/* Header del terminal */}
              <div className="flex items-center h-10 px-4">
                  <div className="h-3 w-3 mr-2 rounded-full bg-[#454952]"></div>
                  <div className="h-3 w-3 mr-2 rounded-full bg-[#454952]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#454952]"></div>
              </div>

              {/* Contenido del terminal */}
              <div className="flex-1 p-4">
                <div className="flex-col text-left">
                    <p className="text-gray-600">// Styling a button</p><br />
                    <p className="text-gray-400">&lt;<span className="text-[#E06C75]">button</span> <span className="text-[#e5ba6a]">class</span><span className="text-[#61AFEF]">=</span><span className="text-[#98C379]">"text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"</span>&gt; <br /> stofli/ui Button <br /> &lt;/<span className="text-[#E06C75]">button</span>&gt;</p>
                    <br />
                    <p className="text-gray-600">// Result:</p>
                    <br />
                    <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">stofli/ui Button</button>
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}