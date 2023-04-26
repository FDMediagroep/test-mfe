import { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  footerHtml: string;
  menuHtml: string;
}

export default function Page({ footerHtml, menuHtml }: Props) {
  return (
    <>
      <Head>
        <title>FD Micro-frontend test</title>
        <meta name="description" content="FD Micro-frontend test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Leaderboard ad here</div>
      <div dangerouslySetInnerHTML={{ __html: menuHtml }} />
      <div>Some other content here...</div>
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const footerPromise = fetch("https://fd.nl/mfe/footer")
    .then((res) => res.text())
    .then((html) => {
      // Handle anchors with relative URL's
      return html.replaceAll(' href="/', ' href="https://fd.nl/');
    });
  const menuPromise = fetch("https://fd.nl/mfe/menu")
    .then((res) => res.text())
    .then((html) => {
      // Handle anchors with relative URL's
      return html.replaceAll(' href="/', ' href="https://fd.nl/');
    })
    .then((html) => {
      // Handle form action with relative URL's
      return html.replaceAll(' action="/', ' action="https://fd.nl/');
    });

  const [footerHtml, menuHtml] = await Promise.all([
    footerPromise,
    menuPromise,
  ]);

  return {
    props: {
      footerHtml,
      menuHtml,
    },
  };
};
