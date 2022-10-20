const { verifyToken } = require("../token");

module.exports = (req, res) => {

  const payload = verifyToken(req);
  const authNumber = String(payload.authNumber);
  const verifyTel = String(req.body.verifyTel);

  if (verifyTel !== authNumber) {
    return res.status(403).send({ message: "인증번호가 일치하지 않습니다" });
  }

  res.status(200).send({ message: "인증번호가 일치합니다" });
};