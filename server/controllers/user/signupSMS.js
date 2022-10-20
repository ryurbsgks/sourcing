const { send } = require("../../SMS");

module.exports = (req, res) => {

  const { tel } = req.params;

  send(tel);
  res.status(200).send({ message: "인증번호 전송 성공" });
};