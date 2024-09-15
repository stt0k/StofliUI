import Header from "@/components/Header"
import BentoGrid from "@/components/ui/BentoGrid"
import SpanHome from "@/components/ui/SpanHome"
import ButtonHome from "@/components/ui/ButtonHome"

export default function Page() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-zinc-50">
    <Header />
      <div className="flex items-center justify-center h-screen container max-w-7xl">
        <div className="w-full lg:w-1/2 space-y-7 2xl:mx-4 mx-8 flex justify-center flex-col items-center lg:items-start">
          <h1 className="text-bold text-[2.5rem] lg:text-5xl text-center lg:text-left">Build <SpanHome>beautiful</SpanHome>, responsive websites with <SpanHome>minimal</SpanHome> effort.</h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 text-center lg:text-left">A fast, modern, and easy-to-use UI component library for your web projects.</p>
          <ButtonHome />
        </div>
        <div className="hidden lg:flex">
          <BentoGrid />
        </div>
      </div>
    </div>
    </>
    )
}