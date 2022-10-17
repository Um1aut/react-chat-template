import { Box, Button, Center, ChakraProvider, FormControl, FormHelperText, Heading, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, useColorMode } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { useRouter } from 'next/router';

function MainPage() {
    const [showPassword, setShowPassword] = useState(false);
  
    const [passwordValue, setpasswordValue] = useState('')
    const handlePassChange = (event) => setpasswordValue(event.target.value)

    const [emailValue, setemailValue] = useState('')
    const handleEmailChange = (event) => setemailValue(event.target.value)

    const [userNameValue, setuserNameValue] = useState('')
    const handleUserNameChange = (event) => setuserNameValue(event.target.value)

    const signup = async (email: string, password: string, name: string) => {
      try {
          const docRef = await addDoc(collection(db, "users"), {
            name: name,
            email: email
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      return (
          createUserWithEmailAndPassword(auth, email, password)
      )
    }

    const router = useRouter()

    const handleSignUp = async (e: any) => {
      e.preventDefault()
      try {
        await signup(emailValue, passwordValue, userNameValue)
        router.push('/')
      } catch (err) {
        console.log(err)
      }
    }

    const handleShowClick = () => setShowPassword(!showPassword);
    const { colorMode } = useColorMode()
  return (
    <Center mt="100px">
        <Box w={"300px"}>
        <Heading textAlign={"center"}>Sign up</Heading>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor={colorMode}
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input type="email" onChange={handleEmailChange} required placeholder="umlaut@umlaut.com" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input onChange={handleUserNameChange} required placeholder="@Umlaut" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    required
                    onChange={handlePassChange}
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
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </Stack>
          </form>
        </Box>
    </Center>
  )
}

export default MainPage
