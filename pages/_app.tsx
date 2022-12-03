import "../styles/globals.scss";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: err => {
            console.error(err);
          },
        }}
      >
        <NavBar />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
