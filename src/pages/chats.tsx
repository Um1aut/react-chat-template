import { Box, Button, Center, ChakraProvider, Flex, Heading, Text, HStack, Square, VStack, Divider, Grid, GridItem, useColorMode, useColorModeValue, Input, useDisclosure, DrawerOverlay, DrawerCloseButton, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, color, Spinner, chakra, shouldForwardProp, Fade, FormControl } from '@chakra-ui/react'
import { css } from '@emotion/css';
import theme from '../theme'
import { AppProps } from 'next/app'
import React, { useState } from 'react'
import Settings from '../components/NewChat'
import { onAuthStateChanged } from 'firebase/auth'
import { getDocs, collection, doc, orderBy, query, addDoc, limit } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ScrollToBottom, {useScrollToBottom, useSticky} from 'react-scroll-to-bottom';

const ROOT_CSS = css({
    position: 'absolute',
    width: '100%',
    height: '100%'
  });

  const ROOT_CSS1 = css({
    height: '100%'
  });
function ChatPage() {
    const [loading, setLoading] = useState(true)
    const [Selectorloading, setSelectorloading] = useState(true)

    const [vh, setVh] = useState<number>(100)

    const scrollToBottom = useScrollToBottom();
    const [sticky] = useSticky();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode()
    const btnRef = React.useRef()

    let [sign, changeSign] = useState(Boolean)
    const [docState, setdocState] = useState()
    const [colorState, setColorState] = useState()
    const [emailState, emailsetState] = useState("")
    React.useEffect(() => {
      setTimeout(() => setVh(window.innerHeight), 200);
      console.log(vh)
      setTimeout(() => setLoading(false), 2000);
      setTimeout(() => setSelectorloading(false), 500);
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
                    setColorState(doc.data().color)
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
    const [chatUser, setChatUser] = useState('')

    const qer = query(collection(db, "chats"));
    const [chats] = useCollectionData(qer, {})

    const chatDoc = doc(db, "chats", chatMessagesState == "" ? ("G1GlnWYLe9QsUg4E9amT") : (chatMessagesState))
    const chatDocRef = query(collection(chatDoc, "messages"), orderBy("date", "asc"));
    let [chats1] = useCollectionData(chatDocRef)
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
        setChatUser(chat)
        console.log(chats1)
        console.log("opening chat: " + chat)
        await OpenChat(docState, chat)
      } catch (err) {
        console.log(err)
      }
    }

    const [messageValue, setmessageValue] = useState('')
    const handleMessageChange = (event) => setmessageValue(event.target.value)
    
    const curDate = new Date().getTimezoneOffset() / 60
    console.log(curDate)
    
    const sendMessage = async (name, message) => {
        try {
            const n = new Date().getMinutes()
            let p
            if(n<10) {
                p = '0' + n.toString()
            } else p=n
            console.log(n + " " + p)
            const docRef = await addDoc(collection(chatDoc, "messages"), {
              name: name,
              message: message,
              date: new Date().getTime(),
              dateForMessage: new Date().getUTCHours().toString(), 
              dateForMessageMinutes: p.toString()
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
      }

      const handleMessage = async (event) => {
        event.preventDefault()
        try {
            if(messageValue != '' && messageValue.length < 150) {
                window.scrollTo(0, document.body.scrollHeight);
                setmessageValue('')
                await sendMessage(docState, messageValue)
            }
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
                    {!Selectorloading ? (
                        <Box w="100%" mt="2vh" >
                        {sign ? <Heading textAlign={'center'}>{docState}</Heading> : <Text textAlign={'center'}>Log in at first.</Text>}
                        <Divider margin={'auto'} w={"80%"} mt='1em' mb='1em'></Divider>
                        
                        <VStack overflow={'auto'} spacing={"1vh"} display={'flex'} alignItems='center' h='70vh'>
                            {chats && chats.map((el) =>
                                el.firstMessager == docState && sign ? (
                                    <Box as='button' p="20px" w="90%" onClick={() => {handleOpenChat(el.secondMessager) 
                                        }} rounded={20} 
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
                        
                        <Flex ml='3vh'><Settings/></Flex>
                    </Box>
                    ) : (<Spinner margin={'auto'} size='lg'/>)}
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
                            {!loading ? (<ScrollToBottom className={ROOT_CSS1}>
                                            {chats1 && chats1.map((el)=>
                                            el.name == docState ? (
                                                <Fade in>
                                            <Flex justifyContent="flex-end" >
                                                <Box mb="5px" mr={docState == el.name ? ("5") : ('0')} 
                                                bgGradient = {'linear(to-l, teal.500,'  + colorState + " 180%" + ')'}
                                                rounded={"27px"} 
                                                p={4} 
                                                color={'white'}>
                                                    <Text pb={docState == el.name ? ("0px") : ('5px')} fontSize={"12px"} color={colorMode}>{
                                                    docState == el.name ? ('') : (el.name)
                                                    }</Text><Text fontSize={15} textAlign={'right'}>{el.message}</Text>
                                                    <Text fontSize={12} textAlign={'right'}>
                                {parseInt(el.dateForMessage) - curDate < 24 ? (parseInt(el.dateForMessage) - curDate) : (parseInt(el.dateForMessage) - curDate -24)} {":" + el.dateForMessageMinutes}</Text>
                                                </Box>
                                            </Flex>
                                            </Fade>) : (
                                            <Flex justifyContent="flex-start"  >
                                                    <Box mb="5px"  ml={docState == el.name ? ("0") : ('5')}
                                                    bgGradient = {colorMode == 'light' ? 'linear(to-r, gray.100, gray.300)' : 'linear(to-r, purple.900, purple.800)'}
                                                    rounded={"27px"} 
                                                    p={4} 
                                                    color={colorMode == 'dark' ? 'white' : 'black'} >
                                                        <Text pb={docState == el.name ? ("0px") : ('5px')} fontSize={"12px"} color={colorMode}>{
                                                        docState == el.name ? ('') : (el.name)
                                                        }</Text><Text fontSize={15} textAlign={docState == el.name ? ('right') : ('left')}>{el.message}</Text>
                                                        <Text fontSize={12} 
                                textAlign={docState == el.name ? ('right') : ('left')}>{parseInt(el.dateForMessage) - curDate < 24 ? (parseInt(el.dateForMessage) - curDate) : (parseInt(el.dateForMessage) - curDate -24)}</Text>
                                                    </Box>
                                                </Flex>
                                                )
                                            )}
                                            </ScrollToBottom>) : (
                                                <Spinner pos='absolute' top='50%' right={'40%'} size='lg'/>
                                            )}
                        </GridItem>
                        <GridItem p={2} rounded={20} bg={useColorModeValue('blackAlpha.200', 'blackAlpha.200')} h="6vh"> 
                            
                                <form
                                onSubmit={
                                    handleMessage}>
                                    <HStack><Input value={messageValue} onChange={handleMessageChange} rounded={20} placeholder='Message...' variant={"filled"} colorScheme={'teal'}/>
                                    <Button type='submit' onClick={
                                    handleMessage}rounded={20} variant={'outline'} colorScheme={useColorModeValue('blue', 'teal')}>
                                   Send
                                    </Button>
                                    </HStack>
                                </form>
                        </GridItem>
                    </Grid>
                </Flex>
            </HStack>
            </Flex>

    </Center>
        <Center display={{ md: 'none' }} mt="20%"><Box display={{ base: 'inline-block', md: 'none' }} h="80vh" w={"100%"}>
                <VStack w="100%" mt="2vh" spacing={"1vh"}>
                    <Heading>{docState}</Heading>
                    <Divider w={"80%"}></Divider>
                    {!loading ? (
                        chats && chats.map((el) =>
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
                    )) : (                        <Spinner pos='absolute' top='50%' right={'45%'} size='lg'/>
                    )}
                    <Flex pos='absolute' bottom={0}><Settings/></Flex>
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
        <DrawerContent height={vh.toString() + "px"} bg={colorMode == 'dark' ? "black" : "white"}>
          <DrawerCloseButton />
          <DrawerHeader>{chatUser}</DrawerHeader>
            <DrawerBody>
            {!loading ? (   <ScrollToBottom className={ROOT_CSS1}>
                                        {chats1 && chats1.map((el)=>
                                        el.name == docState ? (
                                            <Fade in>
                                        <Flex justifyContent="flex-end" >
                                            <Box mb="5px" 
                                            bgGradient = {'linear(to-l, teal.500,'  + colorState + " 180%" + ')'}
                                            rounded={"27px"} 
                                            p={4} 
                                            color={'white'}
                                            maxW={'300px'}>
                                                <Text pb={docState == el.name ? ("0px") : ('5px')} fontSize={"12px"} color={colorMode}>{
                                                docState == el.name ? ('') : (el.name)
                                                }</Text><Text fontSize={15}>{el.message}</Text>
                                                <Text fontSize={12} textAlign={'right'}>{parseInt(el.dateForMessage) - curDate} {":" + el.dateForMessageMinutes}</Text>
                                            </Box>
                                        </Flex>
                                        </Fade>) : (
                                        <Flex justifyContent="flex-start"  >
                                                <Box mb="5px" 
                                                bgGradient = {colorMode == 'light' ? 'linear(to-r, gray.100, gray.300)'
                                                : 'linear(to-r, purple.900, purple.800)'}
                                                rounded={"27px"} 
                                                p={4} 
                                                maxW={'300px'}
                                                color={colorMode == 'dark' ? 'white' : 'black'} >
                                                    <Text pb={docState == el.name ? ("0px") : ('5px')} 
                                                    fontSize={"12px"} color={colorMode}>{
                                                    docState == el.name ? ('') : (el.name)
                                                    }</Text><Text fontSize={15} 
                                                     textAlign={docState == el.name ? ('right') :
                                                    ('left')}>{el.message}</Text>
                                                    <Text fontSize={12} 
                                                   textAlign={docState == el.name ? ('right') : 
                                                    ('left')}>{parseInt(el.dateForMessage) - curDate} {":" + el.dateForMessageMinutes}</Text>
                                                </Box>
                                            </Flex>
                                            )
                                        )}
                                        </ScrollToBottom>
                ) : (
                    <Spinner pos='absolute' top='50%' right={'45%'} size='lg'/>
                )}
                </DrawerBody>

          <DrawerFooter>
            <Input value={messageValue} onChange={handleMessageChange} placeholder='Type here...' mr='20px' />
            <Button onClick={handleMessage} variant={'solid'} colorScheme='teal'>Send</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  )
}

export default ChatPage
