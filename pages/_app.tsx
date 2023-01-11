import React from 'react';
import type { AppProps } from 'next/app';
import '../public/css/globals.css'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }: AppProps) {
  
  React.useEffect(() => {
    window.history.scrollRestoration = 'manual'
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
      <Component {...pageProps} />
  )
}

export default MyApp