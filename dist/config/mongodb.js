"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = exports.db = void 0;
require("dotenv/config");
const mongodb_1 = require("mongodb");
const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
exports.db = client.db("db_fokuso");
const getCollection = (collectionName) => {
    return exports.db.collection(collectionName);
};
exports.getCollection = getCollection;
