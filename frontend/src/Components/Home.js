import { Link as RouterLink } from "react-router-dom";
import { Heading, Box, Button } from '@chakra-ui/react'


export default function Home() {
  return (
    <Box align="center">
      <Heading mt={5}>
        Welcome to Photon
      </Heading>
      <Box mt={10}>
        <Button size="lg" width={200} as={RouterLink} to="/patients">For Providers</Button>
      </Box>
      <Box mt={5}>
        <Button size="lg" width={200} as={RouterLink} to="/prescriptions">For Pharmacists</Button>
      </Box>
    </Box>
  )
}
