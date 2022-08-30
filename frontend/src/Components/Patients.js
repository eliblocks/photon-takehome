import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Link,
} from "@chakra-ui/react";

import usePatients from "../hooks/use-patients";
import CreatePatient from "./CreatePatient";

export default function Patients() {
  let { patients, mutate } = usePatients();
  if (!patients) {
    return null;
  }

  function deletePatient(patientId) {
    axios.delete(`/patients/${patientId}`).then(() => mutate());
  }

  return (
    <div>
      <Heading size="md" mb={5} textAlign="center">
        Patients
      </Heading>
      <CreatePatient mutate={mutate} />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Td>Precriptions</Td>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients.map((patient) => (
              <Tr key={patient.id}>
                <Td>{patient.firstName}</Td>
                <Td>{patient.lastName}</Td>
                <Td>
                  <Link as={RouterLink} to={patient.id}>
                    View Prescriptions
                  </Link>
                </Td>
                <Td>
                  <Button onClick={() => deletePatient(patient.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
