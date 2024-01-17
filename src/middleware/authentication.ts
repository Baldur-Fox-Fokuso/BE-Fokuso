import { GraphQLError } from "graphql";
import { verifyToken } from "../helpers/jwt";
import UserModel from "../models/user";

async function authentication({ req }) {
  let token = req.headers.authorization;
  console.log(token, "di auth");
  return token;
}

export default authentication;
