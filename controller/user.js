const { getCollection } = require("../config/mongodb");
const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
// const validate = require("validate.js")
//
// const userConstraints = {
//   name: {
//     presence: true
//   },
//   email: {
//     presence: true,
//     allowEmpty: false,
//     email: true
//   },
//   password: {
//     presence: true,
//     length: 8
//   }
// }

class UserController {
  static getDb() {
    return getCollection("users");
  }

  static async getById(req, res, next) {
    try {
      const { userId } = req.body;
      if (!userId) {
        throw { code: 400, message: 'invalid input' }
      }
      const user = await this.getDb().findOne({
        _id: new ObjectId(userId),
      });
      res.status(200).json(user)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw { code: 400, message: 'invalid input' }
      }

      const user = await getCollection("users").insertOne({ name, email, password });
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
        throw { code: 400, message: "invalid_input" };
      }

      const user = await this.getDb().findOne({ email });
      if (!user) {
        throw { code: 401, message: "invalid_email/password" };
      }

      const checkPass = comparePass(password, user.password);
      if (!checkPass) {
        throw { code: 401, message: "invalid_email/password" };
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

module.exports = UserController;
