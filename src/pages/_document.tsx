import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript, Link } from '@chakra-ui/react'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600&family=Podkova:wght@600&family=Poppins:wght@400;500&display=swap" rel="stylesheet"/> 
{/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
