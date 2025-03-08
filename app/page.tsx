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
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-white max-w-screen">
      <Header />

      {/* Modern hexagon pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"></div>
      {/* Title section with content */}
      <section className="relative z-10">
        <div className="flex items-start justify-center min-h-screen container max-w-7xl z-10">
          <div className="w-full space-y-7 flex justify-center flex-col items-center text-center sm:mt-44 mt-36">
            <TagHome />
            {/* Gradient blob effect */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 dark:opacity-20 opacity-50 blur-[100px] bg-gradient-to-r from-[#FF5733] to-[#00D1FF] pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF5733]/10 blur-[120px] pointer-events-none dark:opacity-20 opacity-50"></div>
            <div className="absolute top-0 bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00D1FF]/10 blur-[120px] pointer-events-none dark:opacity-20 opacity-50"></div>
            <h1 className="font-display font-bold bg-gradient-to-r from-[#00D1FF] via-[#7e9ea5] dark:via-none to-[#FF5733] bg-clip-text text-transparent">
              <span className="flex flex-col items-center text-5xl md:text-[5rem] xl:text-[text-8rem] lg:text-[7rem] leading-none">
                <span className="whitespace-nowrap">Build modern</span>
                <span className="whitespace-nowrap">UI designs</span>
              </span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
              A fast, modern, and easy-to-use UI component library for your web
              projects.
            </p>
            <ButtonHome />
          </div>
        </div>
      </section>

      {/* Rest of the content */}
      <div className="flex flex-col container text-center lg:text-left relative z-10">
        <p className="tracking-tight inline text-center font-semibold text-4xl lg:text-6xl mb-12 text-gray-900 dark:text-white">
          A{" "}
          <span className="tracking-tight inline font-semibold bg-gradient-to-r from-[#00D1FF] to-[#FF5733] text-4xl lg:text-6xl bg-clip-text text-transparent">
            delightful experience
          </span>
          <br />
          for you and your users
        </p>
      </div>
      <BentoHome />

      <div className="flex flex-col container text-center lg:text-left relative z-10">
        <p className="tracking-tight inline text-center font-semibold text-4xl lg:text-6xl mb-12 mt-52 text-gray-900 dark:text-white">
          <span className="tracking-tight inline font-semibold bg-gradient-to-r from-[#FF5733] to-[#00D1FF] text-4xl lg:text-6xl bg-clip-text text-transparent">
            Beautiful
          </span>
          <br />
          examples of use
        </p>

        <BentoExample />
      </div>
      <Footer />
    </div>
  );
}
