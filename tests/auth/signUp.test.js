import request from "supertest";
import { app } from "../../index";
import { Users } from "../../src/models/userModel.js";
import bcrypt from "bcrypt";

describe("POST /signup", () => {
  beforeEach(async () => {
    // Clear the users collection before each test
    await Users.deleteMany({});
  });

  it("should create a new user", async () => {
    const userData = {
      email: "test@example.com",
      password: "password123",
      username: "testuser",
    };

    const response = await request(app).post("/signup").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("token");
  });

  it("should return 400 if missing required fields", async () => {
    const response = await request(app).post("/signup").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty(
      "errors",
      "Email, password, and username are required",
    );
  });

  it("should return 400 if email already exists", async () => {
    const existingUser = new Users({
      email: "existing@example.com",
      password: bcrypt.hashSync("password123", 10),
      name: "existinguser",
    });
    await existingUser.save();

    const userData = {
      email: "existing@example.com",
      password: "password123",
      username: "existinguser",
    };

    const response = await request(app).post("/signup").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("errors", "Existing email");
  });
});
