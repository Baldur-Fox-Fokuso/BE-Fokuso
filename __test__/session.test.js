const app = require("../app")
const request = require("supertest")
const { createToken } = require("../helpers/jwt")
const { getCollection } = require("../config/mongodb")
const { hashPass } = require("../helpers/bcrypt");
const { ObjectId } = require("mongodb");

const falseTaskId = new ObjectId()
const sessionId = new ObjectId()

const task = {
  name: "Session Test Task",
  desciption: "This task is only for testing purpose",
  deadline: "2024-01-26",
  subTask: ["subTask1", "subTask2"],
  sessions: [{ _id: sessionId }, "b"]
};
const newUser = {
  name: 'Session Test User',
  email: 'sessiontestuser@email.com',
  password: hashPass('asdfasdf')
}

let token;
let userId;
let userObjId
let taskId;
let taskObjId

beforeAll(async () => {
  // make new user for testing
  const insertUserResponse = await getCollection("users").insertOne(newUser)
  console.log(insertUserResponse, '<-- insertUserResponse')
  userObjId = insertUserResponse.insertedId
  userId = userObjId.toString()
  console.log(userId, '<-- userId')
  token = createToken({
    _id: userId,
    email: newUser.email,
    name: newUser.name
  })

  // make new task for testing
  const insertTaskResponse = await getCollection("tasks").insertOne(task)
  console.log(insertTaskResponse, '<-- insertTaskResponse')
  taskObjId = insertTaskResponse.insertedId
  taskId = taskObjId.toString()
  console.log(taskId, '<-- taskId')
})

afterAll(async () => {
  await getCollection("users").deleteOne({
    _id: userObjId
  })
  await getCollection("tasks").deleteOne({
    _id: taskObjId
  })
})

describe("GET /task/:taskId/session - get sessions by taskId", () => {
  test("200 success get sessions by taskId", (done) => {
    request(app)
      .get(`/task/${taskId}/session`)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(Array.isArray(body)).toBeTruthy()
        done()
      })
      .catch((error) => {
        done(error)
      })
  })

  test("404 not found", (done) => {
    request(app)
      .get(`/task/${falseTaskId}/session`)
      .then((response) => {
        const { body, status } = response
        console.log(`/task/${taskId}/session <-- inside test`)
        expect(status).toBe(404)
        expect(body).toHaveProperty("message", "Not Found")
        expect(body).toHaveProperty("success", false)
        expect(body).toHaveProperty("status", 404)
        done()
      })
      .catch((error) => {
        done(error)
      })
  })
})

describe("POST /task/:taskId/session, SessionController.create", () => {
  test("201 success create session", (done) => {
    request(app)
      .post(`/task/${taskId}/session`)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty("message", "Session created successfully");
        expect(body).toHaveProperty("data")
        expect(body).toHaveProperty("sessionId")
        done()
      })
      .catch((error) => {
        done(error)
      })
  })
})

describe("POST /task/:taskId/session/:sessionId, SessionController.isDone", () => {
  test("201 success create session", (done) => {
    request(app)
      .patch(`/task/${taskId}/session/${sessionId}`)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("message", "Session has been updated to Done");
        expect(body).toHaveProperty("updateResult")
        expect(body).toHaveProperty("success")
        done()
      })
      .catch((error) => {
        done(error)
      })
  })
})


