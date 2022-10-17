import { Box, Button, Center, ChakraProvider, FormControl, FormHelperText, Heading, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, useColorMode } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link'

function MainPage() {
    const [showPassword, setShowPassword] = useState(false);
  
    const handleShowClick = () => setShowPassword(!showPassword);
    const { colorMode } = useColorMode()
  return (
    <Center mt="100px">
        <Box w={"300px"}>
        <Heading textAlign={"center"}>Login</Heading>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor={colorMode}
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement 
                    pointerEvents="none"
                  />
                  <Input zIndex={0} type="email" placeholder="email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={20}
                type="submit"
                variant="outline"
                colorScheme="teal"
                width="full"
              >
                Log in
              </Button>
              <NextLink href='/signup'>Don't have an account? Sign up</NextLink>
            </Stack>
          </form>
        </Box>
    </Center>
  )
}

export default MainPage
