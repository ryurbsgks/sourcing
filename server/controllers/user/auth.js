const { verifyToken } = require("../token");

module.exports = (req, res) => {

  const payload = verifyToken(req);

  if (!payload) {
    return res.status(200).send({ message: "Guest 상태입니다" });
  }

  res.status(200).send({ data: payload, message: "로그인 상태입니다" });

};