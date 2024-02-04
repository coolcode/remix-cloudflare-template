import { cssBundleHref } from "@remix-run/css-bundle"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import Footer from "~/components/_/Footer"
import NavBar from "~/components/_/NavBar"
import ScrollToTopButton from "~/components/_/ScrollToTopButton"
import cssTailwind from "~/styles/tailwind.css"

export const links = () => [{ rel: "stylesheet", href: cssTailwind }, ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])]

// https://aitdk.com/
export const meta = () => [
  { title: "Remix Cloudflare Template" },
  {
    name: "description",
    content: "A Remix Cloudflare Template.",
  },
  {
    name: "keywords",
    content: "Remix, Cloudflare, Template",
  },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <Meta />
        <Links />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900 subpixel-antialiased dark:bg-gray-700 dark:text-white">
          <div className="max-w-8xl mx-auto min-h-[calc(100vh-3.5rem)]"> 
            <header className="sticky top-0 z-50 w-full border-b-2 border-primary-500 bg-gray-700 text-white dark:shadow-neon-green">
              <NavBar className="min-w-80 max-w-screen-lg px-2 sm:px-6 xl:w-3/4" />
            </header> 
            <main className="min-w-80 relative mx-auto flex min-h-[calc(100vh-9rem)] max-w-screen-lg flex-col overflow-x-auto px-2 py-6 sm:p-6 xl:w-3/4">
              <section className="flex w-full flex-col items-center ">
                <Outlet />
              </section>
            </main>
          </div>
          <ScrollToTopButton />
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
