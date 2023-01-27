import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {

    return (
      <Html className = "scroll-smooth" lang="en">
        <Head />
        <body className = 'bg-gradient-to-r from-[#141b3d] via-slate-800 to-[#141b3d]'>
        {/* <body className = 'bg-gradient-to-r from-[#fffbe7] via-[#fffbe7] to-[#fffbe7]'> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}