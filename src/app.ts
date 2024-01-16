import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import userResolvers from "./resolvers/user";
import userTypeDefs from "./schema/user";

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
  introspection: true,
});

async function startServer() {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(process.env.PORT) || 3000 },
    });
    console.log(`Server read at: ${url}`);
  } catch (error) {
    console.log(error);
  }
}

startServer();
