"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const user_1 = __importDefault(require("./resolvers/user"));
const user_2 = __importDefault(require("./schema/user"));
const authentication_1 = __importDefault(require("./middleware/authentication"));
const server = new server_1.ApolloServer({
    typeDefs: [user_2.default],
    resolvers: [user_1.default],
    introspection: true,
});
async function startServer() {
    try {
        const { url } = await (0, standalone_1.startStandaloneServer)(server, {
            context: async ({ req, res }) => {
                return {
                    authentication: async () => await (0, authentication_1.default)({ req }),
                };
            },
            listen: { port: 4000 },
        });
        console.log(`Server read at: ${url}`);
    }
    catch (error) {
        console.log(error);
    }
}
startServer();
