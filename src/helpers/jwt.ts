import "dotenv/config";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;
type User = {
  userId: ObjectId;
  email: string;
};

export const createToken = (payload: User) => jwt.sign(payload, secret);
export const verifyToken = (token: string) => jwt.verify(token, secret);
