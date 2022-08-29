import axios from 'axios';
import { Link as RouterLink } from "react-router-dom";
import {
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

import usePatients from '../hooks/use-patients'
import CreatePatient from './CreatePatient';

export default function Patients() {
  let { patients, mutate } = usePatients();
  if (!patients) { return null }

  function deletePatient(patientId) {
    axios.delete(`/patients/${patientId}`)
      .then(() => mutate());
  } 

  return (
    <div>
      <CreatePatient mutate={mutate} />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Td>Precriptions</Td>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients.map(patient => (
              <Tr key={patient.id}>
                <Td>{patient.firstName}</Td>
                <Td>{patient.lastName}</Td>
                <Td>
                  <Link as={RouterLink} to={patient.id}>Prescriptions</Link>
                </Td>
                <Td><Button onClick={() => deletePatient(patient.id)}>Delete</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
