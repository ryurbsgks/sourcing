const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {

  accessTokenSign: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: "1h" });
  },
  accessTokenSend: (res, token) => {
    res.cookie("sourcingAccess", token, { httpOnly: true });
  }
  
};