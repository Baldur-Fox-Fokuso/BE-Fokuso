"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const bcrypt_1 = require("../helpers/bcrypt");
const jwt_1 = require("../helpers/jwt");
const user_1 = __importDefault(require("../models/user"));
const userResolvers = {
    Query: {
        getUser: async (_, args, contextValue) => {
            const user = await contextValue.authentication();
            return user;
        },
    },
    Mutation: {
        register: async (_, args) => {
            let NewUser = { ...args.NewUser };
            NewUser.password = (0, bcrypt_1.hashPass)(args.NewUser.password);
            const result = await user_1.default.create(NewUser);
            return NewUser;
        },
        login: async (_, { email, password }) => {
            // const { email, password } = args;
            const findUser = await user_1.default.getByEmail(email);
            if (!findUser) {
                throw new graphql_1.GraphQLError("Invalid email/password", {
                    extensions: { code: "INVALID_EMAIL/PASSWORD" },
                });
            }
            console.log(password, "=======", findUser.password);
            const isValid = (0, bcrypt_1.comparePass)(password, findUser.password);
            console.log(isValid);
            if (!isValid) {
                throw new graphql_1.GraphQLError("Invalid email/password", {
                    extensions: { code: "INVALID_EMAIL/PASSWORD" },
                });
            }
            const access_token = (0, jwt_1.createToken)({
                userId: findUser._id,
                email: findUser.email,
            });
            return { access_token };
        },
    },
};
exports.default = userResolvers;
