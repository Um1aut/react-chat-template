import { Box, Center, ChakraProvider, Heading, HStack } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'

function MainPage() {
  return (
    <Center>
        <Heading
        bgGradient='linear(to-r, blue.200, pink.300)'
        bgClip='text'
        fontSize='5xl'
        fontWeight='extrabold'>
            A Simple Chat Created With NextJS and FireBase
        </Heading>
    </Center>
  )
}

export default MainPage
