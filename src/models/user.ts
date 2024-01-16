import { ObjectId } from "mongodb";
import { getCollection } from "../config/mongodb";
import { NewUser } from "../type/type";
import { hashPass } from "../helpers/bcrypt";
import { User } from "../type/type";

class UserModel {
  static getDb() {
    return getCollection("users");
  }

  static async getByEmail(email: string) {
    const user = (await this.getDb().findOne({ email })) as User;
    return user;
  }

  static async getById(_id: string) {
    const user = (await this.getDb().findOne({
      _id: new ObjectId(_id),
    })) as User;
    return user;
  }

  static async create(data: NewUser) {
    return await this.getDb().insertOne(data);
  }
}

export default UserModel;
