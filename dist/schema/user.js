"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userTypeDefs = `#graphql

type User {
    _id: ID
    name: String
    email: String
    password: String
}

input NewUser {
    name: String
    email: String!
    password: String!
}

type Query {
    getUser(_id: ID): User
}

type Token {
    access_token: String
}

type Mutation {
    register(NewUser: NewUser): User
    login(email: String!, password: String): Token
}
`;
exports.default = userTypeDefs;
