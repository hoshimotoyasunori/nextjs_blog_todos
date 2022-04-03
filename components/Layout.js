import Head from "next/head";
import Header from "./Header"
import Footer from "./Footer"


export default function Layout({ children, title = "Default title" }){

    return (
            <div className="flex justify-center items-center flex-col min-h-screen text-gray-500 font-momo bg-opacity-50 bg-hero-img bg-no-repeat bg-cover">
                <Head>
                    <title>{title}</title>
                </Head>
                <Header />
                <main className="flex flex-1 justify-center items-center flex-col w-screen ">
                    {children}
                </main>
                <Footer />
            </div>
    );
}