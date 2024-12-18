import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

const notFoundPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="mx-auto w-full min-w-0 flex gap-5 items-center justify-center pt-52">
          <h1 className="text-3xl font-bold tracking-tight border-r pr-5">404</h1>
          
          <h2>This page could not be found</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default notFoundPage;
