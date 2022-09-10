const jwt = require("jsonwebtoken");
const passport = require("passport");

function authenticateToken(req, res, next) {
  passport.authenticate("jwt", { session: false });
}

module.exports = authenticateToken;
