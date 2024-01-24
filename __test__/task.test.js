const app = require("../app");
const request = require("supertest");
const { createToken } = require("../helpers/jwt");
const { getCollection } = require("../config/mongodb");
const { hashPass } = require("../helpers/bcrypt");
const { ObjectId } = require("mongodb");

const data = {
  name: "Membuat rawon",
  description: "Makanan khas indonesia",
  deadline: "2024-02-01",
  subTask: ["MAkanan", "Rawon"],
};

const dummyData = {
  name: "Membuat rawon",
  description: "Makanan khas indonesia",
  deadline: "2024-02-01",
  subTask: ["MAkanan", "Rawon"],
};

let token;
let userId;
let taskId;

beforeAll(async () => {
  await getCollection("tasks").deleteMany({});

  const user = await getCollection("users").insertOne({
    name: "user",
    email: "email11@email.com",
    password: hashPass("12345678"),
  });

  // const user = await getCollection("users").findOne({
  //   email: "email11@email.com",
  // });
  console.log(user, ">>>>>>>>>>>> di test");
  token = createToken({
    _id: user.insertedId,
    email: "email11@email.com",
    name: "user",
  });

  userId = user.insertedId;

  const task = await getCollection("tasks").insertOne(dummyData);

  taskId = task.insertedId;
});

const invalidToken = "tokennya salah nih";
const invalidTaskId = new ObjectId();
const dummyUserId = new ObjectId();

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
  test("401 Failed to create with invalid token", (done) => {
    request(app)
      .post("/task")
      .set("authorization", `Bearer ${invalidToken}`)
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

describe("GET /user/:userId/task", () => {
  test("200 success get user tasks ", (done) => {
    request(app)
      .get(`/user/${userId}/task`)
      //   .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test("404 tasks not found", (done) => {
    request(app)
      .get(`/user/${dummyUserId}/task`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Not Found");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});

describe("GET /user/:userId/task/filterByDate", () => {
  test("200 success get task by date", (done) => {
    request(app)
      .get(`/user/${userId}/task/filterByDate`)
      //   .set("Authorization", `Bearer ${token}`)
      .send({
        date: "2024-01-21",
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test("400 input date is empty", (done) => {
    request(app)
      .get(`/user/${userId}/task/filterByDate`)
      //   .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Input date is empty");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});

describe("GET /user/:userId/task/today", () => {
  test("200 success get today task", (done) => {
    request(app)
      .get(`/user/${userId}/task/today`)
      //   .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test("404 no tasks found today", (done) => {
    request(app)
      .get(`/user/${dummyUserId}/task/today`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Not Found");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});

describe("GET /user/:userId/task/recent", () => {
  test("200 success get recent task", (done) => {
    request(app)
      .get(`/user/${userId}/task/recent`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test("404 no task found recent", (done) => {
    request(app)
      .get(`/user/${dummyUserId}/task/recent`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Not Found");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});

describe("GET /task/:taskId", () => {
  test("200 success get task by id", (done) => {
    request(app)
      .get(`/task/${taskId}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("name", "Membuat rawon");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test("404 Not Found", (done) => {
    request(app)
      .get(`/task/${invalidTaskId}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Not Found");
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
