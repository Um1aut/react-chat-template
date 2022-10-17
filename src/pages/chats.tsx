import { Box, Button, Center, ChakraProvider, Flex, Heading, Text, HStack, Square, VStack, Divider, Grid, GridItem, useColorMode, useColorModeValue, Input, useDisclosure, DrawerOverlay, DrawerCloseButton, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, color } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import React from 'react'
import Settings from '../components/NewChat'

function ChatPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode()
    const btnRef = React.useRef()
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
                        <Heading textAlign={'center'}>Umlaut</Heading>
                        <Divider margin={'auto'} w={"80%"} mt='1em' mb='1em'></Divider>
                        
                        <VStack overflow={'auto'} spacing={"1vh"} display={'flex'} alignItems='center' h='70vh'>
                                <Box as='button' p="20px" w="90%" rounded={20} bg={colorMode == "dark" ? ("blackAlpha.100") : ("blackAlpha.200")}><Text textAlign={"center"}>Umlaut</Text></Box>
                                <Box as='button' p="20px" w="90%" rounded={20} bg={colorMode == "dark" ? ("blackAlpha.100") : ("blackAlpha.200")}><Text textAlign={"center"}>Pepuk</Text></Box>
                                <Box as='button' p="20px" w="90%" rounded={20} bg={colorMode == "dark" ? ("blackAlpha.100") : ("blackAlpha.200")}><Text textAlign={"center"}>Artem</Text></Box>
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
                                    <Flex justifyContent="flex-end" pr="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.500)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >That's so bad </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end" pr="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.500)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >I wanna cry </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end" pr="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.500)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >I wanna cry </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end" pr="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.500)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >I wanna cry </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end" pr="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.500)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >I wanna cry </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end" pr="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.500)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >.... </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start" pl="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >Cry cry shit </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end" pr="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.500)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >NOOOOOOO WHYY ARE YOU SO RUUDE </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start" pl="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >'cause i fucking want </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end" pr="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.500, blue.500)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >NO NO don't do that! </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start" pl="15px" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >yes yes my babe </Box>
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
        <Center display={{ md: 'none' }} mt="20%"><Box display={{ base: 'inline-block', md: 'none' }} h="88vh" w={"95%"}>
                <VStack w="100%" mt="2vh" spacing={"1vh"}>
                    <Heading>Umlaut</Heading>
                    <Divider w={"80%"}></Divider>
                    <Box onClick={onOpen} as='button' p="20px" w="90%" rounded={20} bg={colorMode == "dark" ? ("blackAlpha.300") : ("blackAlpha.200")}><Text textAlign={"center"}>Umlaut</Text></Box>
                    <Box as='button' p="20px" w="90%" rounded={20} bg={colorMode == "dark" ? ("blackAlpha.300") : ("blackAlpha.200")}><Text textAlign={"center"}>Pepuk</Text></Box>
                    <Box as='button' p="20px" w="90%" rounded={20} bg={colorMode == "dark" ? ("blackAlpha.300") : ("blackAlpha.200")}><Text textAlign={"center"}>Artem</Text></Box>

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
                                    <Flex justifyContent="flex-end" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.400, blue.300)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >Hey, how are you? </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end"  >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.400, blue.300)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >And why are you not answering me?</Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start"  >
                                        <Box mb="5px" 
                                        bgGradient = {colorMode == 'light' ? 'linear(to-r, gray.100, gray.300)' : 'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={colorMode == 'dark' ? 'white' : 'black'} >'cause you're a piece of shit </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end"  >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.400, blue.300)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >That's so bad </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end"  >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.400, blue.300)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >I wanna cry </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end"  >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.400, blue.300)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >.... </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start"  >
                                        <Box mb="5px" 
                                        bgGradient = {colorMode == 'light' ? 'linear(to-r, gray.100, gray.300)' : 'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={colorMode == 'dark' ? 'white' : 'black'} >'cause you're a piece of shit </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.400, blue.300)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >NOOOOOOO WHYY ARE YOU SO RUUDE </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start"  >
                                        <Box mb="5px" 
                                        bgGradient = {colorMode == 'light' ? 'linear(to-r, gray.100, gray.300)' : 'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={colorMode == 'dark' ? 'white' : 'black'} >'cause you're a piece of shit </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-end" >
                                        <Box mb="5px" 
                                        bgGradient = {'linear(to-r, teal.400, blue.300)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={'white'} >NO NO don't do that! </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start"  >
                                        <Box mb="5px" 
                                        bgGradient = {colorMode == 'light' ? 'linear(to-r, gray.100, gray.300)' : 'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={colorMode == 'dark' ? 'white' : 'black'} >'cause you're a piece of shit </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start"  >
                                        <Box mb="5px" 
                                        bgGradient = {colorMode == 'light' ? 'linear(to-r, gray.100, gray.300)' : 'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={colorMode == 'dark' ? 'white' : 'black'} >'cause you're a piece of shit </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start"  >
                                        <Box mb="5px" 
                                        bgGradient = {colorMode == 'light' ? 'linear(to-r, gray.100, gray.300)' : 'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={colorMode == 'dark' ? 'white' : 'black'} >'cause you're a piece of shit </Box>
                                    </Flex>
                                    <Flex justifyContent="flex-start"  >
                                        <Box mb="5px" 
                                        bgGradient = {colorMode == 'light' ? 'linear(to-r, gray.100, gray.300)' : 'linear(to-r, purple.900, gray.900)'}
                                        rounded={"19px"} 
                                        p={4} 
                                        color={colorMode == 'dark' ? 'white' : 'black'} >'cause you're a piece of shit </Box>
                                    </Flex>
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