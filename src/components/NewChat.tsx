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

    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    const [data, setData] = useState('')
    const OverlayOne = () => (
      <ModalOverlay
        bg={bgColor[colorMode]}
        backdropFilter='blur(10px)'
      />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const {colorMode} = useColorMode()

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
    
    const createChatHandler = async(e) => {
      try {
        console.log(docState)
        console.log(value)
        const q = query(collection(db, "chats"));
        const querySnapshot = await getDocs(q);
        let a1 = true;
        querySnapshot.forEach((doc) => {
          console.log(value + docState + ' ' + doc.data().firstMessager + doc.data().secondMessager)
          console.log(value + docState + ' ' + doc.data().secondMessager + doc.data().firstMessager)
            if(value + docState == doc.data().firstMessager + doc.data().secondMessager) {
              a1 = false
            } 
            if(value + docState == doc.data().secondMessager + doc.data().firstMessager) {
              a1 = false
            }
        })

        console.log(a1)
        if(a1) {
          await addDoc(collection(db, "chats"), {
            firstMessager: docState,
            secondMessager: value
          });
          a1 = false;
          setData('')
        } else { setData('Chat with this user is already added!') }
      } catch (e) {
        console.log(e)
      }
    }

    console.log(value)
  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];
    return (
      <>
        {sign ? (<Box width={'80%'}> 
      <Button onClick={() => {
        setOverlay(<OverlayOne />)
        onOpen()
      }} mt="2" m={5} variant="outline" h='1.75rem' w="100%" size='sm'>Add New Chat</Button>
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent >
        <ModalHeader>Add a new chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
        <Flex justify="center" align="center" w="full">
      <FormControl>
        <FormLabel>Select User</FormLabel>
        <AutoComplete onChange={vals => setValue(vals)} openOnFocus>
          <AutoCompleteInput />
          <AutoCompleteList>
            {users && users.map((el) => (
              el.name != docState ? 
              (<AutoCompleteItem
                key={el.email}
                value={el.name}
              >
                {el.name}
              </AutoCompleteItem>) : (
                ''
              )
            ))}
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText>Choose one from the list</FormHelperText>
        <FormHelperText><Text color={'red'}>{data}</Text></FormHelperText>
      </FormControl>
    </Flex>
        </ModalBody>
        <ModalFooter >
          <Button onClick={createChatHandler}>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
      </Box>) : (<Text>You need to log in.</Text>)}
      </>
    )
}


export default Settings