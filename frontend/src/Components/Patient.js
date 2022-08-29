import axios from 'axios';
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Link,
} from '@chakra-ui/react'

import usePatient from '../hooks/use-patient'
import CreatePrescription from './CreatePrescription';

export default function Patient() {
  let { id } = useParams();
  let { patient, mutate } = usePatient(id);
  if (!patient) { return null }

  function deletePrescription(prescriptionId) {
    axios.delete(`/prescriptions/${prescriptionId}`)
      .then(() => mutate());
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={5}>
        <Heading size="md">
          <Link as={RouterLink} to="/patients">All Patients</Link> &gt; {patient.firstName} {patient.lastName} prescriptions
        </Heading>
        {/* <Link as={RouterLink} to="/patients">
          <Heading size="md">all patients</Heading>
        </Link> */}
      </Box>
      
      <CreatePrescription mutate={mutate} patientId={id} />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Dosage</Th>
              <Td>Status</Td>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patient?.prescriptions?.map(prescription => (
              <Tr key={prescription.id}>
                <Td>{prescription.name}</Td>
                <Td>{prescription.dosage}</Td>
                <Td>{prescription.status}</Td>
                <Td><Button onClick={() => deletePrescription(prescription.id)}>Delete</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
