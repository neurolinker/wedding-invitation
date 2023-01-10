import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {

    return (
      <Html className = "scroll-smooth" lang="en">
        <Head />
        <body className = 'bg-gradient-to-r from-[#B1C6B3] to-[#BCCB93]'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}