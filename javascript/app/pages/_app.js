import React from 'react'
import '../styles/globals.css'

global.React = React

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
