# FD Micro-frontend test

Testing FD Micro-frontends

## Prerequisites

The micro frontends themselves don't include fonts. The page which include the micro-frontends need to make the fonts available.

## Running this application

### Getting started

After cloning this repository.

1. Make sure you've installed `node` and `npm`. [nodejs.org](https://nodejs.org/)
1. Run `npm i` in the application folder root to install dependencies required by this application
1. Run `npm run dev` to start the local development server. Use the information in the terminal to open the page in a webbrowser.

## Micro-frontend includes

The MFE includes happen in `pages/index.tsx`:

```
export const getStaticProps: GetStaticProps = async () => {
  const footerPromise = fetch("https://fd.nl/mfe/footer").then((res) =>
    res.text()
  );
  const menuPromise = fetch("https://fd.nl/mfe/menu").then((res) => res.text());

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
```

The `footer` and `menu` are fetched server-side as HTML and passed as `string` to the page as `props`. The page then renders the strings as inline-HTML.
