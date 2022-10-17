import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Heading,
    useColorMode,
    HStack,
    VStack,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';

import { DarkModeSwitch } from '../components/DarkModeSwitch'
import NextLink from 'next/link'

const NavBar = () => {
    const { colorMode } = useColorMode()
    return(
    <Box>
        <Flex
        position={"fixed"}
        top="0%"
        w={"100%"}
        h="4.5em"
        display={"flex"}
        justifyContent={"space-between"}
        css={{backdropFilter: 'blur(50px)'}}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'blackAlpha.100')}
        bg={useColorModeValue("white.50", "blackAlpha.50")}>
            <HStack ml={{ md: '20%', base: '5%' }}>
                <NextLink href={'/'}>
                    <Button bgGradient='linear(to-r, teal.500, green.500)' rounded={15} colorScheme='teal' color={"white"}>
                        Main Page
                    </Button>
                </NextLink>
                <NextLink href="/chats">
                    <Button display={{ md: 'inline-block', base: 'none' }} variant={"outline"} rounded={15} colorScheme='teal' color={colorMode == "light" ? ("teal.400") : ("teal.300")}>
                    Chats
                    </Button>
                </NextLink>
            </HStack>

            <HStack mr={{ md: '20%', base: '5%' }}>
                <Box>
                    <HStack spacing={2}>
                        <NextLink href="/login">
                            <Button display={{ md: 'inline-block', base: 'none' }} variant={"outline"} rounded={15} colorScheme='teal'>
                                Log in
                            </Button>
                        </NextLink>
                        <DarkModeSwitch />
                    </HStack>
                </Box>
                <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
                <Menu isLazy id="navbar-menu" >
                <MenuButton
                    as={IconButton}
                    icon={<HamburgerIcon />}
                    variant="outline"
                    aria-label="Options"
                />
                <MenuList  zIndex={2}>
                    <NextLink href="/login" passHref>
                        <MenuItem as={Link}>Log in</MenuItem>
                    </NextLink>
                    <NextLink href="/chats" passHref>
                        <MenuItem  as={Link}>Chats</MenuItem>
                    </NextLink>
                </MenuList>
                </Menu>
          </Box>
            </HStack>
        </Flex>
    </Box>
    )
}

export default NavBar