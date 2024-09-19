  import Header from "@/components/header/Header"
import BentoGrid from "@/components/BentoGrid"
import SpanHome from "@/components/SpanHome"
import ButtonHome from "@/components/ButtonHome"
import Image from "next/image"

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
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 container">
        <article className="flex-col flex justify-center space-y-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-md dark:border-transparent dark:bg-[#0b0b0b]">
          <div className="flex items-center space-x-4">
            <Image src="/imgs/prueba.png" width={40} height={40} alt="prueba" className="w-10 h-10 rounded-full " />
            <p className="text-base font-bold">Author Name</p>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Author Description</p>
        </article>
        <article className="col-span-1 flex flex-col items-center justify-center space-y-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-800">Prueba</article>
        <article className="col-span-1 flex flex-col items-center justify-center space-y-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-800">Prueba</article>
        <article className="col-span-1 flex flex-col items-center justify-center space-y-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-800">Prueba</article>
      </div>
    </div>
    </>
    )
}