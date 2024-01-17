import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import userResolvers from "./resolvers/user";
import userTypeDefs from "./schema/user";
import authentication from "./middleware/authentication";

interface MyContext {
  token?: String;
}

const server = new ApolloServer<MyContext>({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
  introspection: true,
});

async function startServer() {
  try {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req, res }) => {
        return {
          authentication: async () => await authentication({ req }),
        };
      },
      listen: { port: 4000 },
    });
    console.log(`Server read at: ${url}`);
  } catch (error) {
    console.log(error);
  }
}

startServer();
