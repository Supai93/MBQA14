import { expect } from "chai";
import Ajv from "ajv";

const schema_login = {
  type: "object",
  properties: {
    status: {
      type: "number",
    },
    token: {
      type: "string",
    },
    message: {
      type: "string",
    },
  },
  required: ["status", "token", "message"],
};

const schema_users = {
  type: "object",
  properties: {
    status: {
      type: "number",
    },
    users: {
      type: "array",
    },
  },
  required: ["status", "users"],
};

const ajv = new Ajv();

describe("Sesi 7 API Automation Test Suite", () => {
  const baseURL = "https://belajar-bareng.onrender.com";

  let token;

  it("POST Login", async () => {
    const payload = {
      username: "admin",
      password: "admin",
    };

    const response = await fetch(`${baseURL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).to.equal(200);

    const data = await response.json();
    const schemaValidator = ajv.compile(schema_login);
    const hasil = schemaValidator(data);

    token = data.token;

    expect(hasil, "validasi JSON schema benar").to.be.true;
  });

  it("GET Users", async () => {
    const response = await fetch(`${baseURL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    expect(response.status).to.equal(200);

    const data = await response.json();
    const schemaValidator = ajv.compile(schema_users);
    const hasil = schemaValidator(data);

    expect(hasil, "validasi JSON schema benar").to.be.true;
  });
});
