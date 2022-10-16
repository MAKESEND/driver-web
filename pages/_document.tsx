import { Html, Head, Main, NextScript } from 'next/document';

export const Document = () => {
  return (
    <Html>
      <Head></Head>
      <body>
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
