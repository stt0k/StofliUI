import Header from "@/components/header/Header";
import ButtonHome from "@/components/home/ButtonHome";
import BentoHome from "@/components/home/BentoHome";
import Footer from "@/components/footer/Footer";
import { getAllFilesMetadata } from "@/lib/mdx";
import { FrontMatter } from "@/lib/mdx";
import TagHome from "@/components/home/TagHome";
import BentoExample from "@/components/home/BentoExample";

export default async function Page() {
  // Ahora obtenemos los posts dentro de la función del componente
  const posts: FrontMatter[] = await getAllFilesMetadata();
  console.log(posts);

  return (
    <div className="flex flex-col min-h-screen dark:bg-zinc-950 bg-white dark:text-white max-w-screen">
      <Header />

        {/* Grid overlay with gradient fade effect */}
        <div className="relative inset-0 bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] md:bg-[size:200px_200px] bg-[size:50px_50px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] mask-image-[linear-gradient(to-bottom, black 60%, transparent 100%)]"></div>

        {/* Adding a fading effect using background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>

        {/* Title section with content */}
        <div className="flex items-start justify-center min-h-screen container max-w-7xl z-10">
          <div className="w-full space-y-7 flex justify-center flex-col items-center text-center sm:mt-56 mt-36">
            <TagHome />
          <div className="fixed left-1/2 top-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-10 blur-[100px] bg-emerald-500 pointer-events-none" /
          >   <h1 className="font-display font-bold bg-gradient-to-r from-20% bg-clip-text text-transparent from-emerald-400 to-yellow-300">
              <span className="flex flex-col items-center text-5xl md:text-[5rem] xl:text-[text-8rem] lg:text-[7rem] leading-none">
                <span className="whitespace-nowrap">Build modern</span>
                <span className="whitespace-nowrap">UI designs</span>
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-2xl">
              A fast, modern, and easy-to-use UI component library for your web projects.
            </p>
            <ButtonHome />
          </div>
        </div>

      {/* Rest of the content (without grid) */}
      <div className="flex flex-col container text-center lg:text-left relative z-10">
        <p className="tracking-tight inline text-center font-semibold text-4xl lg:text-6xl mb-12 text-gray-900 dark:text-white">
          A <span className="tracking-tight inline font-semibold from-yellow-100 to-yellow-400 text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b">delightful experience</span>
          <br />for you and your users
        </p>
      </div>
        <BentoHome />

      <div className="flex flex-col container text-center lg:text-left relative z-10">
        <p className="tracking-tight inline text-center font-semibold text-4xl lg:text-6xl mb-12 mt-52 text-gray-900 dark:text-white">
          <span className="tracking-tight inline font-semibold from-[#6FEE8D] to-[#17c964] text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b">Beautiful</span>
          <br />examples of use
        </p>

        <BentoExample />
      </div>
      <Footer />
    </div>
  );
}

