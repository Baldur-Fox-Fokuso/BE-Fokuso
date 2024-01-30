const app = require("../app");
const request = require("supertest");
const { getCollection } = require("../config/mongodb");
const { hashPass } = require("../helpers/bcrypt");

const newUser = {
  name: "user1",
  email: "email1@email.com",
  password: "12345678",
};

const loginUser = {
  email: "email@email.com",
  password: "12345678",
};

beforeAll(async () => {
  await getCollection("users").deleteMany({});

  await getCollection("users").insertOne({
    name: "user",
    email: "email@email.com",
    password: hashPass("12345678"),
  });
});

describe("Users Routes Test", () => {
  describe("POTS /register - create new user", () => {
    test("201 Success register - should create new User", (done) => {
      request(app)
        .post("/register")
        .send(newUser)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(String));
          expect(body).toHaveProperty("email", newUser.email);
          return done();
        });
    });

    test("400 Failed Register - should return error if name/email/password is null", (done) => {
      request(app)
        .post("/register")
        .send({
          password: "wdawdawdaw",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "invalid input");
          return done();
        });
    });
  });

  describe("POST /login - user login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/login")
        .send(loginUser)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(200);
          expect(body).toHaveProperty("_id", expect.any(String));
          expect(body).toHaveProperty("access_token", expect.any(String));
          return done();
        });
    });

    test("401 Failed login - should return error", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "email@email.com",
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "invalid_email/password");
          return done();
        });
    });
  });
});
