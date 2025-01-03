import "@/styles/globals.css"
import type { AppProps } from "next/app"
import dynamic from 'next/dynamic'

function MyApp({ Component, pageProps }: AppProps) {
 const SafeHydration = dynamic(() => Promise.resolve(Component), {
   ssr: false
 });

 return <SafeHydration {...pageProps} />
}

export default MyApp