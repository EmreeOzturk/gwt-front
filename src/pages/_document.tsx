import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="DATS" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="DATS" />
        <script src="/script.js"></script>
      </Head>
      <title>DATS</title>
      <body className="max-w-[100vw] overflow-x-hidden bg-black  ">
        <canvas id="canvas" className="fixed z-10 bg-black"></canvas>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
