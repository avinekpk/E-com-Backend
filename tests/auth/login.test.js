import request from "supertest";
import { app } from "../../index";
import { Users } from "../../src/models/userModel.js";
import bcrypt from "bcrypt";

describe("POST /login", () => {
  beforeEach(async () => {
    // Clear the users collection before each test
    await Users.deleteMany({});
  });

  it("should login with correct credentials", async () => {
    const hashedPassword = bcrypt.hashSync("password123", 10);
    const existingUser = new Users({
      email: "test@example.com",
      password: hashedPassword,
      name: "testuser",
    });
    await existingUser.save();

    const loginData = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await request(app).post("/login").send(loginData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("token");
  });

  it("should return 400 if missing required fields", async () => {
    const response = await request(app).post("/login").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty(
      "errors",
      "Email and password are required",
    );
  });

  it("should return 401 for invalid credentials", async () => {
    const hashedPassword = bcrypt.hashSync("password123", 10);
    const existingUser = new Users({
      email: "test@example.com",
      password: hashedPassword,
      name: "testuser",
    });
    await existingUser.save();

    const loginData = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    const response = await request(app).post("/login").send(loginData);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "errors",
      "Invalid email or password.",
    );
    expect(response.body).toHaveProperty("status", false);
  });
});
