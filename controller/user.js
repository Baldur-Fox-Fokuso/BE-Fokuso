const { getCollection } = require("../config/mongodb");
const { getDb } = require("../config/mongodb");
const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class User {
  static getDb() {
    return getCollection("users");
  }

  static async getById(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await this.getDb().findOne({
        _id: new ObjectId(_id),
      });
      return user;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await this.getDb().insertOne({ name, email, password });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "invalid_input" };
      }

      const user = await this.getDb().findOne({ email });
      if (!user) {
        throw { name: "invalid_email/password" };
      }

      const checkPass = comparePass(password, user.password);
      if (!checkPass) {
        throw { name: "invalid_email/password" };
      }

      const access_token = createToken({
        _id: user._id,
        email: user.email,
      });

      res.status(200).json({
        _id: user._id,
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = User;
