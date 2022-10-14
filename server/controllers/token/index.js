const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {

  accessTokenSign: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY);
  },
  accessTokenSend: (res, token) => {
    // res.cookie("sourcingAccess", token, { httpOnly: true });
    res.cookie("sourcingAccess", token);
  },
  verifyToken: (req) => {

    if (!req.headers.authorization) {
      return null;
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
      return jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    } catch (err) {
      return null;
    }

  }
  
};