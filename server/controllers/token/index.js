const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {

  accessTokenSign: (payload, auto) => {

    if (auto) {
      return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: "30d" });
    }

    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY);
  },
  accessTokenSend: (res, token, auto) => {

    if (auto) {
      // return res.cookie("sourcingAccess", token, { maxAge: 60*60*24*30, httpOnly: true });
      return res.cookie("sourcingAccess", token, { maxAge: 60*60*24*30 });
    }
    // return res.cookie("sourcingAccess", token, { httpOnly: true });
    return res.cookie("sourcingAccess", token);
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

  },
  authNumberTokenSign: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: "3m" });
  },
  authNumberTokenSend: (res, token) => {
    // return res.cookie("TelAuthNumber", token, { httpOnly: true });
    return res.cookie("TelAuthNumber", token);
  }
  
};