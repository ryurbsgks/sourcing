const { verifyToken } = require("../token");

module.exports = (req, res) => {

  const payload = verifyToken(req);

  if (!payload) {
    return res.status(403).send({ message: "인증 유효 시간이 만료되었습니다" });
  }

  const authNumber = String(payload.authNumber);
  
  if (req.body.verifyTel) {

    const verifyTel = String(req.body.verifyTel);

    if (verifyTel !== authNumber) {
      return res.status(403).send({ message: "인증번호가 일치하지 않습니다" });
    }

    return res.status(200).send({ message: "인증번호가 일치합니다" });
  }

  if (req.body.verifyEmail) {

    const verifyEmail = String(req.body.verifyEmail);

    if (verifyEmail !== authNumber) {
      return res.status(403).send({ message: "인증번호가 일치하지 않습니다" });
    }

    return res.status(200).send({ message: "인증번호가 일치합니다" });
  }

};