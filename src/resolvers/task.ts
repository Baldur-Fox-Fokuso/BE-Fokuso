import { GraphQLError } from "graphql";

const taskResolvers = {
  Query: {
    getTask: async (_, { _id }, contextValue) => {
      const user = await contextValue.authentication();
      if (!user) {
        throw new GraphQLError("Invalid token", {
          extensions: { code: "INVALID_TOKEN" },
        });
      }
    },
  },
};
