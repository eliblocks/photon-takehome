import { useState } from "react";
import axios from "axios";
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
  Text,
} from "@chakra-ui/react";

export default function CreatePrescription({ mutate, patientId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");

  function createPatient(e) {
    console.log("submitting");
    e.preventDefault();
    let formData = new FormData(e.target);
    axios
      .post(`/patients/${patientId}/prescriptions`, {
        name: formData.get("name"),
        dosage: formData.get("dosage"),
      })
      .then(() => {
        mutate();
        onClose();
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
  }

  return (
    <>
      <Button onClick={onOpen}>+ Add Prescription</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Prescription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={createPatient}>
              {!!error && <Text color="red">{error}</Text>}
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name="name" />
              </FormControl>
              <FormControl>
                <FormLabel>Dosage</FormLabel>
                <Input name="dosage" />
              </FormControl>
              <Button mt={3} mb={3} type="submit">
                Create
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
