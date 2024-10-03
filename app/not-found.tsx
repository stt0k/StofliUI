import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"

const notFoundPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-zinc-50">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <div className="mx-auto w-full min-w-0 flex gap-5 items-center justify-center">
          <h1 className="">404</h1>
          <h2>Not found</h2>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default notFoundPage
