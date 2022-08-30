import axios from "axios";
import { Link as RouterLink, useParams } from "react-router-dom";
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

import usePatient from "../hooks/use-patient";
import CreatePrescription from "./CreatePrescription";

export default function Patient() {
  let { id } = useParams();
  let { patient, mutate } = usePatient(id);
  if (!patient) {
    return null;
  }

  function deletePrescription(prescriptionId) {
    axios.delete(`/prescriptions/${prescriptionId}`).then(() => mutate());
  }

  return (
    <div>
      <Heading size="md" mb={5} textAlign="center">
        {patient.firstName} {patient.lastName} Prescriptions &nbsp;
        <Link to="/patients" as={RouterLink}>
          (View All Patients)
        </Link>
      </Heading>

      <CreatePrescription mutate={mutate} patientId={id} />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Dosage</Th>
              <Td>Status</Td>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patient?.prescriptions?.map((prescription) => (
              <Tr key={prescription.id}>
                <Td>{prescription.name}</Td>
                <Td>{prescription.dosage}</Td>
                <Td>{prescription.status}</Td>
                <Td>
                  <Button onClick={() => deletePrescription(prescription.id)}>
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
