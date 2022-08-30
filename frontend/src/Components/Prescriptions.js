import axios from "axios";
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
} from "@chakra-ui/react";
import usePrescriptions from "../hooks/use-prescriptions";

export default function Prescriptions() {
  let { prescriptions, mutate } = usePrescriptions();
  if (!prescriptions) {
    return null;
  }

  function updateStatus(id, status) {
    axios.patch(`/prescriptions/${id}`, { status }).then(() => mutate());
  }

  return (
    <div>
      <Heading size="md" mb={5} textAlign="center">
        Prescriptions
      </Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Patient</Th>
              <Th>Medication</Th>
              <Th>Dosage</Th>
              <Td>Status</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody>
            {prescriptions.map((prescription) => (
              <Tr key={prescription.id}>
                <Td>
                  {prescription.patient.firstName}{" "}
                  {prescription.patient.lastName}
                </Td>
                <Td>{prescription.name}</Td>
                <Td>{prescription.dosage}</Td>
                <Td>{prescription.status}</Td>
                <Td>
                  {prescription.status === "Ordered" && (
                    <Button
                      onClick={() => updateStatus(prescription.id, "Filled")}
                    >
                      Mark filled
                    </Button>
                  )}
                  {prescription.status === "Filled" && (
                    <Button
                      onClick={() => updateStatus(prescription.id, "Received")}
                    >
                      Mark received
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
