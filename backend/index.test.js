const request = require('supertest');
const app = require('./app');

describe("End to End", () => {
  test("It should make and update prescriptions", async () => {
    let response = await request(app)
      .post("/patients")
      .send({ firstName: "Eli", lastName: "Block" })
    expect(response.body.firstName).toBe("Eli")

    let patientId = response.body.id
    response = await request(app)
      .post(`/patients/${patientId}/prescriptions`)
      .send({ name: "Ibuprofen", dosage: "800mg" })
    expect(response.body.status).toBe("Ordered")

    let prescriptionId = response.body.id
    response = await request(app)
      .patch(`/prescriptions/${prescriptionId}`)
      .send({ status: "Filled" })
    expect(response.statusCode).toBe(200)

    response = await request(app).get("/prescriptions")
    expect(response.body.length).toBe(1)
    expect(response.body[0].status).toBe("Filled")

    response = await request(app).delete(`/patients/${patientId}`)

    response = await request(app).get("/patients")
    expect(response.body.length).toBe(0)

    response = await request(app).get("/prescriptions")
    expect(response.body.length).toBe(0)
  });
});
