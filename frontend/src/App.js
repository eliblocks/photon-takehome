import axios from "axios";
import { Routes, Route } from "react-router-dom";

import { Container } from "@chakra-ui/react";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Patients from "./Components/Patients";
import Patient from "./Components/Patient";
import Prescriptions from "./Components/Prescriptions";

function App() {
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <div className="App">
      <Navbar>Photon</Navbar>
      <Container maxW="800px" mt={5}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<Patient />} />
          <Route path="prescriptions" element={<Prescriptions />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
