import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import * as ComponentLib from '@widgets'
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'
import Router from 'next/router'
import { columnsTotalWidthSelector } from '@material-ui/data-grid'
import { CookiesProvider, withCookies, useCookies } from 'react-cookie'
import { createGlobalStyle } from 'styled-components'
import * as Utils from '@utils'

const loadingCss = `
`

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ffffff;
  }

  .page-loader-ui {
    display: inline-block;
    width: 80px;
    height: 80px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
  .page-loader-ui div {
    animation: page-loader-ui 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  .page-loader-ui div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #376fd0;
    margin: -4px 0 0 -4px;
  }
  .page-loader-ui div:nth-child(1) {
    animation-delay: -0.036s;
  }
  .page-loader-ui div:nth-child(1):after {
    top: 63px;
    left: 63px;
  }
  .page-loader-ui div:nth-child(2) {
    animation-delay: -0.072s;
  }
  .page-loader-ui div:nth-child(2):after {
    top: 68px;
    left: 56px;
  }
  .page-loader-ui div:nth-child(3) {
    animation-delay: -0.108s;
  }
  .page-loader-ui div:nth-child(3):after {
    top: 71px;
    left: 48px;
  }
  .page-loader-ui div:nth-child(4) {
    animation-delay: -0.144s;
  }
  .page-loader-ui div:nth-child(4):after {
    top: 72px;
    left: 40px;
  }
  .page-loader-ui div:nth-child(5) {
    animation-delay: -0.18s;
  }
  .page-loader-ui div:nth-child(5):after {
    top: 71px;
    left: 32px;
  }
  .page-loader-ui div:nth-child(6) {
    animation-delay: -0.216s;
  }
  .page-loader-ui div:nth-child(6):after {
    top: 68px;
    left: 24px;
  }
  .page-loader-ui div:nth-child(7) {
    animation-delay: -0.252s;
  }
  .page-loader-ui div:nth-child(7):after {
    top: 63px;
    left: 17px;
  }
  .page-loader-ui div:nth-child(8) {
    animation-delay: -0.288s;
  }
  .page-loader-ui div:nth-child(8):after {
    top: 56px;
    left: 12px;
  }
  @keyframes page-loader-ui {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
}

`
const generateClassName = createGenerateClassName({
  productionPrefix: 'pmmt-',
})

class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    const { allCookies, router: { pathname = '' } = {} } = this.props
    const { userId = '', isRememeberMe = 'false', logout = 'false' } =
      allCookies || {}

    // console.log('logout>>>', logout)

    if (
      (pathname !== '/' && userId.length > 0 === false) ||
      (pathname !== '/' &&
        userId.length > 0 === true &&
        isRememeberMe === 'false')
    ) {
      Router.push('/')
    }

    if (pathname === '/' && userId.length > 0 && isRememeberMe === 'true') {
      Router.push('/myworkspace')
    }
    const doRouting = () => {
      this.setState({ loading: true })
    }

    setTimeout(() => {
      doRouting()
    }, 1000)
  }

  render() {
    const { Component, pageProps, router } = this.props || {}
    const { pathname = '' } = router || {}

    const AppKit = () => {
      const [key, setKey] = React.useState(0)

      React.useEffect(() => {
        setKey(1)
      }, [])
      return (
        <CookiesProvider>
          <StylesProvider key={key} generateClassName={generateClassName}>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <CssBaseline />
              {this.state.loading ? (
                <></>
              ) : (
                <>
                  <style>{loadingCss}</style>
                  <div className="page-loader-ui">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </>
              )}
              {this.state.loading ? (
                pathname !== '/' && <ComponentLib.Header {...router} />
              ) : (
                <></>
              )}
              <div
                style={{
                  transition: 'all 250ms ease',
                  opacity: `${this.state.loading === true ? '100%' : '0%'}`,
                }}
              >
                <Component {...pageProps} />
              </div>
              {this.state.loading ? (
                pathname !== '/' && <ComponentLib.Footer />
              ) : (
                <></>
              )}
            </ThemeProvider>
          </StylesProvider>
        </CookiesProvider>
      )
    }

    return <AppKit />
  }
}

export default withCookies(MyApp)
