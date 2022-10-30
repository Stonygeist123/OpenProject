<<<<<<< HEAD
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar/NavBar'

export default function App({ Component, pageProps }: AppProps) {
  return
  <>
    <NavBar />
    <Component {...pageProps} />
  </>

=======
import "../styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
>>>>>>> 11001f68a0b0f7533b46b16dd42e152a84011c57
}
