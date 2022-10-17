import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { DarkModeSwitch } from '../components/DarkModeSwitch'
import NavBar from '../components/Header'
import MainPage from '../components/MainPage'

const Index = () => (
  <Box mt="200px">
    <MainPage/>
  </Box>
)

export default Index
