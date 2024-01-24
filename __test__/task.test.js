const app = require("../app");
const request = require("supertest");
const { createToken } = require("../helpers/jwt");
const { getCollection } = require("../config/mongodb");
const { hashPass } = require("../helpers/bcrypt");

const data = {
  name: "Membuat rawon",
  description: "Makanan khas indonesia",
  deadline: "2024-02-01",
  subTask: ["MAkanan", "Rawon"],
};

let token;
let userId;

beforeAll(async () => {
  await getCollection("tasks").deleteMany({});

  await getCollection("users").insertOne({
    name: "user",
    email: "email11@email.com",
    password: hashPass("12345678"),
  });

  const user = await getCollection("users").findOne({
    email: "email11@email.com",
  });

  token = createToken({
    _id: user._id,
    email: user.email,
    name: user.name,
  });

  userId = user._id;
});

const invalidToken = "tokennya salah nih";

describe("POST /task - create new Task", () => {
  test("200 success create new task", (done) => {
    request(app)
      .post("/task")
      .send(data)
      .set("authorization", `Bearer ${token}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Task created successfully");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test("401 Failed to create because Unauthorized", (done) => {
    request(app)
      .post("/task")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(data)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test("401 Failed to create without token", (done) => {
    request(app)
      .post("/task")
      .send(data)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});

// describe("GET /user/:userId/task", () => {
//   test("200 success get user tasks ", (done) => {
//     request(app)
//       .get(`/user/${userId}/task`)
//       //   .set("Authorization", `Bearer ${token}`)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(200);
//         expect(Array.isArray(body)).toBeTruthy();
//         done();
//       })
//       .catch((error) => {
//         done(error);
//       });
//   });
// test("401 failed to get tasks because invalid token", (done) => {
//   request(app)
//     .get(`/user/${userId}/task`)
//     //   .set("Authroziation", `Bearer ${invalidToken}`)
//     .then((response) => {
//       const { body, status } = response;

//       expect(status).toBe(401);
//       expect(body).toHaveProperty("message", "Invalid token");
//       done();
//     })
//     .catch((error) => {
//       done(error);
//     });
// });
// });

// describe("GET /user/:userId/task/filterByDate", () => {
//   test("200 success get task by date", (done) => {
//     request(app)
//       .get(`/user/${userId}/task/filterByDate`)
//       //   .set("Authorization", `Bearer ${token}`)
//       .send({
//         date: "2024-01-21",
//       })
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(200);
//         expect(Array.isArray(body)).toBeTruthy();
//         done();
//       })
//       .catch((error) => {
//         done(error);
//       });
//   });
//   test("400 input date is empty", (done) => {
//     request(app)
//       .get(`/user/${userId}/task/filterByDate`)
//       //   .set("Authorization", `Bearer ${token}`)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(400);
//         expect(body).toHaveProperty("message", "Input date is empty");
//         done();
//       })
//       .catch((error) => {
//         done(error);
//       });
//   });
//   test("400 input userId is empty", (done) => {
//     const empty = "";
//     request(app)
//       .get(`/user/${empty}/task/filterByDate`)
//       //   .set("Authorization", `Bearer ${token}`)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(400);
//         expect(body).toHaveProperty("message", "userID is empty");
//         done();
//       })
//       .catch((error) => {
//         done(error);
//       });
//   });
// });

// describe("GET /user/:userId/task/today", () => {
//   test("200 success get today task", (done) => {
//     request(app)
//       .get(`/user/${userId}/task/today`)
//       //   .set("Authorization", `Bearer ${token}`)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(200);
//         expect(Array.isArray(body)).toBeTruthy();
//         done();
//       })
//       .catch((error) => {
//         done(error);
//       });
//   });
// });
