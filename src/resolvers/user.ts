import { GraphQLError } from "graphql";
import { hashPass, comparePass } from "../helpers/bcrypt";
import { createToken } from "../helpers/jwt";
import { NewUser } from "../type/type";

import UserModel from "../models/user";
import { ObjectId } from "mongodb";

const userResolvers = {
  Query: {
    getUser: async (_, args) => {},
  },
  Mutation: {
    register: async (_, args) => {
      let NewUser: NewUser = { ...args.NewUser };
      NewUser.password = hashPass(args.NewUser.password);
      const result = await UserModel.create(NewUser);
      return NewUser;
    },
    login: async (_, args) => {
      const { email, password } = args;
      const findUser = await UserModel.getByEmail(email);
      if (!findUser) {
        throw new GraphQLError("Invalid email/password", {
          extensions: { code: "INVALID_EMAIL/PASSWORD" },
        });
      }
      console.log(password, "=======", findUser.password);
      const isValid = comparePass(password, findUser.password);
      console.log(isValid);
      if (!isValid) {
        throw new GraphQLError("Invalid email/password", {
          extensions: { code: "INVALID_EMAIL/PASSWORD" },
        });
      }

      const access_token = createToken({
        userId: findUser._id,
        email: findUser.email,
      });

      return { access_token };
    },
  },
};

export default userResolvers;
