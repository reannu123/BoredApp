const UserModel = require("../models/UserModel");

class UserDAO {
  static async getUsers() {
    return UserModel.find();
  }

  static async makeUser({ username, password }) {
    const user = new UserModel({ username, password });
    return user.save();
  }
}

module.exports = UserDAO;
