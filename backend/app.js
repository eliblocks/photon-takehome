const express = require("express");
var cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

const database = {
  patients: {},
  prescriptions: {},
};

function prescriptionsData() {
  let prescriptions = Object.values(database.prescriptions);
  let data = prescriptions.map((script) => ({
    ...script,
    patient: database.patients[script.patientId],
  }));

  return data;
}

app.get("/", (_, res) => {
  res.json({
    message: "hello world!",
  });
});

app.get("/patients", (_, res) => {
  res.json(Object.values(database.patients));
});

app.get("/patients/:id", (req, res) => {
  let patient = database.patients[req.params.id];
  if (patient) {
    let data = {
      ...patient,
      prescriptions: Object.values(database.prescriptions).filter(
        (prescription) => prescription.patientId === patient.id
      ),
    };
    res.json(data);
  }
  res.sendStatus(404);
});

app.post("/patients", (req, res) => {
  const { firstName, lastName } = req.body || {};
  if (!firstName || !lastName) {
    res.status(400).send("Error: Missing required fields");
  } else {
    const id = uuidv4();
    database.patients[id] = {
      id,
      firstName,
      lastName,
    };
    res.json(database.patients[id]);
  }
});

app.delete("/patients/:id", (req, res) => {
  delete database.patients[req.params.id];
  Object.entries(database.prescriptions).forEach(([key, value]) => {
    if (value.patientId === req.params.id) {
      delete database.prescriptions[key];
    }
  });
  res.json(Object.values(database.patients));
});

app.get("/prescriptions", (_, res) => {
  res.json(prescriptionsData());
});

app.post("/patients/:id/prescriptions", (req, res) => {
  const { name, dosage } = req.body || {};
  if (!name || !dosage) {
    res.status(400).send("Error: Missing required fields");
  } else {
    const id = uuidv4();
    const patientId = req.params.id;
    const status = "Ordered";
    database.prescriptions[id] = {
      id,
      patientId,
      name,
      dosage,
      status,
    };
    res.json(database.prescriptions[id]);
  }
});

app.patch("/prescriptions/:id", (req, res) => {
  database.prescriptions[req.params.id].status = req.body.status;
  res.json(database.prescriptions[req.params.id]);
});

app.delete("/prescriptions/:id", (req, res) => {
  delete database.prescriptions[req.params.id];
  res.json(prescriptionsData());
});

module.exports = app;
