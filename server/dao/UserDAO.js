const UserModel = require("../models/UserModel");

class UserDAO {
  static async getUsers(username = null) {
    if (username) {
      return UserModel.find({ username });
    }
    return UserModel.find();
  }

  static async makeUser(username, password) {
    const user = new UserModel({ username, password });
    user.username = username;
    user.password = password;
    return user.save();
  }
}

module.exports = UserDAO;
