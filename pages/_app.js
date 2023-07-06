import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css"
import "../styles/navbar.css"
import Router from 'next/router'
import NProgress from 'nprogress'
import React from 'react'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }) {

  return (
    <Component {...pageProps} />
  )
}
