import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sushi</title>
        <link rel="shortcut icon" href="/sushi.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
