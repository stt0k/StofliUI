import Header from "@/components/header/Header";
import BentoGrid from "@/components/BentoGrid";
import SpanHome from "@/components/home/SpanHome";
import ButtonHome from "@/components/home/ButtonHome";
import BentoHome from "@/components/home/BentoHome";
import Footer from "@/components/footer/Footer";
import { getAllFilesMetadata } from "@/lib/mdx";
import { FrontMatter } from "@/lib/mdx";
import Link from "next/link";

export default async function Page() {
  // Ahora obtenemos los posts dentro de la función del componente
  const posts: FrontMatter[] = await getAllFilesMetadata();
  console.log(posts);

  return (
    <div className="flex flex-col min-h-screen dark:bg-black bg-white dark:text-white">
      <Header />

      {/* Nebula background top */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Nebulas */}
        <div className="absolute inset-0">
          {/* Nebulosa azul (modo claro con más visibilidad) */}
          <div className="absolute top-[40%] -left-[25%] w-1/2 h-1/2 bg-gradient-to-br from-blue-300 to-transparent rounded-full filter blur-3xl dark:from-blue-500/20"></div>

          {/* Nebulosa verde */}
          <div className="absolute dark:top-[60%] top-[50%] dark:md:-right-[15%] -right-[15%] dark:right-[5%] h-[90%] w-1/2 dark:h-1/2 bg-gradient-to-bl from-green-300 to-transparent rounded-full filter blur-3xl dark:from-green-500/20"></div>

          {/* Nebulosa morada */}
          <div className="absolute -top-[5%] dark:-right-[40%]
          -right-[35%] w-1/2 h-1/2 bg-gradient-to-tr from-purple-300 to-transparent rounded-full filter blur-3xl dark:from-purple-500/30"></div>
        </div>

        {/* Grid overlay with gradient fade effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] md:bg-[size:200px_200px] bg-[size:50px_50px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] mask-image-[linear-gradient(to-bottom, black 60%, transparent 100%)]"></div>

        {/* Adding a fading effect using background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-black"></div>

        {/* Title section with content */}
        <div className="flex items-center justify-center min-h-screen container max-w-7xl relative z-10">
          <div className="w-full lg:w-1/2 space-y-7 2xl:mx-4 mx-8 flex justify-center flex-col items-center lg:items-start">
            <h1 className="tracking-tight inline font-semibold text-[2.5rem] leading-[3rem] lg:text-6xl text-center lg:text-left text-gray-900 dark:text-white">
              Build <SpanHome>beautiful</SpanHome>, responsive websites with minimal effort.
            </h1>
            <p className="text-lg text-gray-600 dark:text-zinc-400 text-center lg:text-left">
              A fast, modern, and easy-to-use UI component library for your web projects.
            </p>
            <ButtonHome />
          </div>
          <div className="hidden lg:flex">
            <BentoGrid />
          </div>
        </div>
      </div>

      {/* Rest of the content (without grid) */}
      <div className="flex flex-col container text-center lg:text-left relative z-10">
        <h3 className="tracking-tight inline font-semibold text-4xl lg:text-5xl mb-12 text-gray-900 dark:text-white">
          A <span className="tracking-tight inline font-semibold from-[#6FEE8D] to-[#17c964] text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b">delightful experience</span>
          <br />for you and your users
        </h3>
      </div>
      <BentoHome />

      <div className="flex flex-col container text-center lg:text-left relative z-10">
        <h3 className="tracking-tight inline font-semibold text-4xl lg:text-5xl mb-12 mt-52 text-gray-900 dark:text-white">
          <span className="tracking-tight inline font-semibold from-[#FF705B] to-[#FFB457] text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b">Beautiful</span>
          <br />example of use
        </h3>

        <div className="flex flex-col h-full mb-12 rounded-lg bg-[#1a1d24] text-gray-200 font-mono">
          <div className="flex items-center h-10 px-4">
            <div className="h-3 w-3 mr-2 rounded-full bg-[#454952]"></div>
            <div className="h-3 w-3 mr-2 rounded-full bg-[#454952]"></div>
            <div className="h-3 w-3 rounded-full bg-[#454952]"></div>
          </div>

          <div className="flex-1 p-4">
            <div className="flex-col text-left">
              <p className="text-gray-600">&#47;&#47; Styling a button</p><br />
              <p className="text-gray-400">&lt;<span className="text-[#E06C75]">button</span> <span className="text-[#e5ba6a]">class</span><span className="text-[#61AFEF]">=</span><span className="text-[#98C379]">"text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"</span>&gt; <br /> stofli/ui Button <br /> &lt;/<span className="text-[#E06C75]">button</span>&gt;</p>
              <br />
              <p className="text-gray-600">&#47;&#47; Result:</p>
              <br />
              <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">stofli/ui Button</button>
            </div>
          </div>
        </div>
      </div>
       {/* Renderizar los posts aquí */}
      <div className="flex flex-col container text-center lg:text-left relative z-10">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug} className="mb-4">
              <Link href={`/${post.slug}`}><h1>{post.title}</h1></Link>
            </div>
          ))
        ) : (
          <p>No hay posts disponibles.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

