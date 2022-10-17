import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore"; 
import NextLink from 'next/link'
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
  } from "@choc-ui/chakra-autocomplete";
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Link,
    Box,
    Button,
    Spinner,
    useBoolean,
    Center,
    Progress,
    useDisclosure,
    ModalOverlay,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useColorMode,
    Input,
    HStack,
    FormErrorMessage
} from '@chakra-ui/react'
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'

const auth = getAuth();
const user = auth.currentUser;

import {db} from '../config/firebase'
import router from 'next/router';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function Settings() {
  const q = query(collection(db, "users"));
  const [users] = useCollectionData(q, {})

    const bgColor = {
      light: 'white',
      dark: 'gray.650'
    }
    
    const color = {
      light: 'black',
      dark: 'white'
    }

    const OverlayOne = () => (
      <ModalOverlay
        bg={bgColor[colorMode]}
        backdropFilter='blur(10px)'
      />
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const {colorMode} = useColorMode()
      
  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];
    return (
      <Box width={'80%'}> 
      <Button onClick={() => {
        setOverlay(<OverlayOne />)
        onOpen()
      }} mt="2" variant="outline" h='1.75rem' w="100%" size='sm'>Add New Chat</Button>
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent >
        <ModalHeader>Add a new chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
        <Flex justify="center" align="center" w="full">
      <FormControl>
        <FormLabel>Select User</FormLabel>
        <AutoComplete openOnFocus>
          <AutoCompleteInput />
          <AutoCompleteList>
            {users && users.map((el) => (
              <AutoCompleteItem
                key={`option-${el.email}`}
                value={el.name}
                textTransform="capitalize"
              >
                {el.name}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText><Text color="red">fdsfsdfsd</Text></FormHelperText>
      </FormControl>
    </Flex>
        </ModalBody>
        <ModalFooter >
          <Button>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
      </Box>
    )
}


export default Settings