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

export interface Task {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  session: [Session];
}

export interface Session {
  _id: ObjectId;
  taskId: ObjectId;
  name: string;
  isDones: boolean;
  duration: number;
  createdAt: string;
  updatedAt: string;
}
