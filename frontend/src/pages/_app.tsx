import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import GlobalProvider from "../context/GlobalProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Head>
        <title>Sushi</title>
        <link rel="shortcut icon" href="/sushi.png" />
      </Head>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
