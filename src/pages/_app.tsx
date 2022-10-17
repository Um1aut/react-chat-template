import { Box, ChakraProvider, Progress, useColorMode } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import NavBar from '../components/Header'
import { useState } from 'react'
import { useRouter } from 'next/router'
import React from 'react'
import { css, Global } from '@emotion/react'

const GlobalStyle = ({children}) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Global
        styles={css`
          .prg {
            position: fixed;
            hight: 1;
            width: 100%;
            left: 0;
            top: 0;
            z: 50;
          }/* width */
          ::-webkit-scrollbar {
            width: 5px;
          }
          
          /* Track */
          ::-webkit-scrollbar-track {
            border-radius: 10px;
          }
          
          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: white;
            border-radius: 10px;
          }
        `}
      />
      {children}
    </>
  )
}


function MyApp({ Component, pageProps }: AppProps) {
  const [animationValue, setAnimationValue] = useState(0)
  const router = useRouter()
  
  React.useEffect(() => {
    const el = document.getElementById('progressBar')
    const handleStart = () => {
      // for(let i=0; i<=50; i++) {
      //   setTimeout(() => setAnimationValue(i+20), 1);
      // }
      setTimeout(() => el.style.visibility='visible', 50);
      setAnimationValue(5)
      setTimeout(() => setAnimationValue(60), 200);
    }
    const handleStop = () => {
      setTimeout(() => setAnimationValue(100), 400);
      setTimeout(() => el.style.visibility='hidden', 800);
      setTimeout(() => setAnimationValue(0), 800);
    }
  
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
  
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
    }
  }, [router])

  return (
    <Box >
      <ChakraProvider theme={theme}>
        <GlobalStyle>
          <Progress className='prg' pos="fixed" h='2px' sx={{"& > div:first-child": {transitionProperty: "width",}, visibility: "hidden"}} zIndex={3} size='xs' id='progressBar' colorScheme='teal' value={animationValue}></Progress>
          <NavBar/>
          <Component {...pageProps} />
          </GlobalStyle>
      </ChakraProvider>
    </Box>
  )
}

export default MyApp
