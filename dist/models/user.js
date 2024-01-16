"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongodb_2 = require("../config/mongodb");
class UserModel {
    static getDb() {
        return (0, mongodb_2.getCollection)("users");
    }
    static async getByEmail(email) {
        const user = (await this.getDb().findOne({ email }));
        return user;
    }
    static async getById(_id) {
        const user = (await this.getDb().findOne({
            _id: new mongodb_1.ObjectId(_id),
        }));
        return user;
    }
    static async create(data) {
        return await this.getDb().insertOne(data);
    }
}
exports.default = UserModel;
