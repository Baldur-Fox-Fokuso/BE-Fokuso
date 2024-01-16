import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}
