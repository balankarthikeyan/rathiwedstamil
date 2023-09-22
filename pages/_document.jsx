import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { ServerStyleSheets } from '@material-ui/styles'
import Router from 'next/router'
import theme from '../theme'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentsSheet = new ServerStyleSheet()
    const materialSheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styledComponentsSheet.collectStyles(<App {...props} />),
          // enhanceApp: App => props =>
          //   styledComponentsSheet.collectStyles(
          //     materialSheets.collect(<App {...props} />)
          //   ),
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {/* {materialSheets.getStyleElement()} */}
            {/* {styledComponentsSheet.getStyleElement()} */}
          </React.Fragment>
        ),
      }
    } finally {
      styledComponentsSheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          {/* <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          /> */}
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            href="https://unpkg.com/swiper/swiper-bundle.css"
            rel="stylesheet"
          />
          {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <script src="https://unpkg.com/swiper/swiper-bundle.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
