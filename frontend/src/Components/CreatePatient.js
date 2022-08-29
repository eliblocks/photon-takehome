import { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react'

export default function CreatePatient({ mutate }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [error, setError] = useState("")

  function createPatient(e) {
    console.log("submitting")
    e.preventDefault()
    let formData = new FormData(e.target)
    axios.post("/patients", {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName")
    }).then(() => {
      mutate();
      onClose();
    }).catch(error => {
      console.log(error.response.data)
      setError(error.response.data)
    })
  }

  return (
    <>
      <Button onClick={onOpen}>+ Add Patient</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={createPatient}>
              {!!error && <Text color="red">{error}</Text>}
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input name="firstName" />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input name= "lastName" />
              </FormControl>
              <Button mt={3} mb={3} type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
