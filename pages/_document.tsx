import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {

    return (
      <Html className = "scroll-smooth" lang="en">
        <Head />
        <body className = 'bg-gradient-to-r from-[#141b3d] via-slate-800 to-[#141b3d]'>
          <div className = "fixed h-screen w-full bg-main-pattern bg-repeat bg-center" style = {{zIndex:-999}}/>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}