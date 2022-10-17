import { Box, Button, Center, ChakraProvider, Flex, Heading, Text, HStack, Square, VStack, Divider, Grid, GridItem, useColorMode, useColorModeValue, Input, useDisclosure, DrawerOverlay, DrawerCloseButton, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, color, Spinner } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import React, { useState } from 'react'
import Settings from '../components/NewChat'
import { onAuthStateChanged } from 'firebase/auth'
import { getDocs, collection, doc, orderBy, query } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

function ChatPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode()
    const btnRef = React.useRef()

    let [sign, changeSign] = useState(Boolean)
    const [docState, setdocState] = useState()
    const [emailState, emailsetState] = useState("")
    React.useEffect(() => {
      const AuthStateChange = async() => {
        onAuthStateChanged(auth, (user) => {
              if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const uid = user.email;
                  changeSign(true);
                  // ...
              } else {
                  // User is signed out
                  // ...
                  changeSign(false);
              }
          });
      }
      const userState = onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            const email = user.email
            emailsetState(email)
          }
      })
      const getfromdb = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        if (userState) {
            querySnapshot.forEach((doc) => {
                if(emailState == doc.data().email) {
                    setdocState(doc.data().name)
                }
            });
        }
      } 
      AuthStateChange()
      getfromdb()
      userState()
    })
    const [chatMessagesState, setMessagesState] = useState('')

    const qer = query(collection(db, "chats"));
    const [chats] = useCollectionData(qer, {firstMessager: 'firstMessager', secondMessager: 'secondMessager'})
  
    const chatDoc = doc(db, "chats", chatMessagesState == "" ? ("G1GlnWYLe9QsUg4E9amT") : (chatMessagesState))
    const chatDocRef = query(collection(chatDoc, "messages"), orderBy("date", "asc"));
    const [chats1] = useCollectionData(chatDocRef)

    console.log(chats1)
    
    const OpenChat = async (firstMessager, secondMessager) => {
        const q = query(collection(db, "chats"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if(secondMessager + firstMessager == doc.data().firstMessager + doc.data().secondMessager) {
                setMessagesState(doc.id)
            } else if (firstMessager + secondMessager == doc.data().firstMessager + doc.data().secondMessager) {
              setMessagesState(doc.id)
            } else if(secondMessager + firstMessager == doc.data().secondMessager + doc.data().firstMessager) {
              setMessagesState(doc.id)
            } else if(firstMessager + secondMessager == doc.data().secondMessager + doc.data().firstMessager) {
              setMessagesState(doc.id)
            }
        })
        console.log(chatMessagesState)
    }
    const handleOpenChat = async (chat) => {
      try {
        console.log(chats1)
        console.log("opening chat: " + chat)
        await OpenChat(docState, chat)
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
      } catch (err) {
        console.log(err)
      }
    }

  return (
    <ChakraProvider theme={theme}>
    <Center w="100%">   
            <Flex mt="5em" display={{ md: 'inline-block', base: 'none' }}>
            <HStack spacing="10px">
                <Flex minH={"90vh"} 
        border={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('teal.100', 'blackAlpha.300')}
        rounded={30} w='300px' bg={colorMode == "dark" ? ("blackAlpha.100") : ("blackAlpha.50")}>
                    <Box w="100%" mt="2vh" >
                        {sign ? <Heading textAlign={'center'}>{docState}</Heading> : <Text textAlign={'center'}>Log in at first.</Text>}
                        <Divider margin={'auto'} w={"80%"} mt='1em' mb='1em'></Divider>
                        
                        <VStack overflow={'auto'} spacing={"1vh"} display={'flex'} alignItems='center' h='70vh'>
                            {chats && chats.map((el) =>
                                el.firstMessager == docState && sign ? (
                                    <Box as='button' p="20px" w="90%" onClick={() => {handleOpenChat(el.secondMessager) }} rounded={20} 
                                    bg={colorMode == "dark" ? ("blackAlpha.100") : ("blackAlpha.200")}
                                    ><Text textAlign={"center"}>{el.secondMessager}</Text></Box>
                                ) : (
                                    el.secondMessager == docState && sign ?
                                    (<Box as='button' p="20px" w="90%" onClick={() => {handleOpenChat(el.firstMessager) }} rounded={20} 
                                    bg={colorMode == "dark" ? ("blackAlpha.100") : ("blackAlpha.200")}
                                    ><Text textAlign={"center"}>{el.firstMessager}</Text></Box>) : ('')
                                    )
                            )}
                        </VStack>
                        
                        <Flex justifyContent={'center'} ><Settings/></Flex>
                    </Box>
                </Flex>
                <Flex 
        border={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('teal.100', 'blackAlpha.300')}
        rounded={30} p={5} bg={colorMode == "dark" ? ("blackAlpha.100") : ("blackAlpha.50")}>
                    <Grid
                    templateRows='repeat(1, 1fr)'
                    gap={1}
                    >
                        <GridItem overflow={'auto'} rounded={30} bg={useColorModeValue('blackAlpha.50', 'blackAlpha.50')} w="100vh" h="79vh">
                                <Box pt="10px">
                                    <Flex justifyContent="flex-end" pr="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.500)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >Hey, how are you? </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end" pr="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.500)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >And why are you not answering me?</Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start" pl="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >'cause you're a piece of shit </Box>
                                    </Flex>
                                </Box>
                                
                        </GridItem>
                        <GridItem p={2} rounded={20} bg={useColorModeValue('blackAlpha.200', 'blackAlpha.200')} h="6vh"> 
                            <HStack>
                                <Input rounded={20} placeholder='Message...' variant={"filled"} colorScheme={'teal'}/>
                                <Button rounded={20} variant={'outline'} colorScheme={useColorModeValue('blue', 'teal')}>
                                   Send
                                </Button>
                            </HStack>
                        </GridItem>
                    </Grid>
                </Flex>
            </HStack>
            </Flex>

    </Center>
        <Center display={{ md: 'none' }} mt="20%"><Box display={{ base: 'inline-block', md: 'none' }} h="88vh" w={"100%"}>
                <VStack w="100%" mt="2vh" spacing={"1vh"}>
                    <Heading>Umlaut</Heading>
                    <Divider w={"80%"}></Divider>
                    {chats && chats.map((el) =>
                                el.firstMessager == docState && sign ? (
                                    <Box as='button' p="20px" w="90%" onClick={() => {
                                        handleOpenChat(el.secondMessager)
                                        onOpen()}} rounded={20} 
                                    bg={colorMode == "dark" ? ("blackAlpha.300") : ("blackAlpha.200")}
                                    ><Text textAlign={"center"}>{el.secondMessager}</Text></Box>
                                ) : (
                                    el.secondMessager == docState && sign ?
                                    (<Box as='button' p="20px" w="90%" onClick={() => {
                                        handleOpenChat(el.firstMessager)
                                        onOpen()}} rounded={20} 
                                    bg={colorMode == "dark" ? ("blackAlpha.300") : ("blackAlpha.200")}
                                    ><Text textAlign={"center"}>{el.firstMessager}</Text></Box>) : ('')
                                    )
                    )}
                </VStack>
        </Box>
        </Center>
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='full'
      >
        <DrawerOverlay />
        <DrawerContent bg={colorMode == 'dark' ? "black" : "white"}>
          <DrawerCloseButton />
          <DrawerHeader>Umlaut</DrawerHeader>

          <DrawerBody overflow={'auto'}>
                <Box pt="10px">
                                {chats1 && chats1.map((el)=>
                                    el.name == docState ? (
                                    <Flex justifyContent="flex-end" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.300)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >{el.message} </Box>
                                    </Flex>) : (
                                    <Flex justifyContent="flex-start"  >
                                            <Box mb="5px" 
                                            bgGradient = {colorMode == 'light' ? 'linear(to-r, gray.100, gray.300)' : 'linear(to-r, purple.900, purple.800)'}
                                            rounded={"19px"} 
                                            p={4} 
                                            color={colorMode == 'dark' ? 'white' : 'black'} >{el.message}</Box>
                                        </Flex>
                                        )
                                    )}
                                    
                                </Box>
          </DrawerBody>

          <DrawerFooter>
          <Input placeholder='Type here...' mr='20px' />
            <Button variant={'solid'} colorScheme='teal'>Send</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  )
}

export default ChatPage