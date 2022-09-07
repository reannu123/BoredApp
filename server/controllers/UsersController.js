const UserDAO = require("../dao/UserDAO");

class UsersController {
  static async getUsers(req, res, next) {
    try {
      const users = await UserDAO.getUsers();
      users.length > 0 ? res.send(users) : res.json("No Users Found");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async registerUser(req, res, next) {
    try {
      const user = await UserDAO.makeUser(req.body.username, req.body.password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UsersController;
