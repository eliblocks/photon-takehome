import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
} from '@chakra-ui/react'
import usePrescriptions from '../hooks/use-prescriptions'

export default function Prescriptions() {
  let { prescriptions, mutate } = usePrescriptions();
  if (!prescriptions) { return null }

  function updateStatus(e, id) {
    console.log(e.target.value)
    axios.patch(`/prescriptions/${id}`, {
      status: e.target.value
    }).then(() => {
      mutate()
    });
  }

  return (
    <div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Dosage</Th>
              <Td>Status</Td>
            </Tr>
          </Thead>
          <Tbody>
            {prescriptions.map(prescription => (
              <Tr key={prescription.id}>
                <Td>{prescription.name}</Td>
                <Td>{prescription.dosage}</Td>
                <Td>
                <Select onChange={e => updateStatus(e, prescription.id)} defaultValue={prescription.status}>
                  <option value='Ordered'>Ordered</option>
                  <option value='Filled'>Filled</option>
                  <option value='Received'>Received</option>
                </Select>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
