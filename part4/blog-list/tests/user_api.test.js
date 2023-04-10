const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const User = require("../models/user");
const { usersInDb, initialUsers, getTestToken } = require("./test_helper");

const api = supertest(app);
let token = "";

beforeEach(async () => {
  token = await getTestToken();
  for (let user of initialUsers) {
    let userObj = new User(user);
    await userObj.save();
  }
});

describe("user api tests", () => {
  test("prevents from creating user without a username", async () => {
    const newUser = {
      name: "User1",
      password: "secret",
    };
    const response = await api
      .post("/api/users")
      .send(newUser)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
    expect(response.body.error).toContain("`username` is required");
  });
  test("prevents from creating user without a password", async () => {
    const newUser = {
      username: "newUser",
      name: "User1",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
    expect(response.body.error).toContain("`password` is required");
  });
  test("prevents from creating user with a password less than 3 characters", async () => {
    const newUser = {
      username: "newUser",
      name: "User1",
      password: "ne",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
    expect(response.body.error).toContain(
      "Password length must be atleast 3 characters"
    );
  });
  test("prevents from creating user with a username less than 3 characters", async () => {
    const newUser = {
      username: "ne",
      name: "User1",
      password: "secret",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
    expect(response.body.error).toContain("User validation failed");
  });
  test("prevents from creating user with an existing username", async () => {
    const newUser = {
      username: "superuser",
      name: "User1",
      password: "secret",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
    expect(response.body.error).toContain("expected `username` to be unique");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
