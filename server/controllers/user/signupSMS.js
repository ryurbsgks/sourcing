const { send } = require("../../SMS");
const { authNumberCreate } = require("../../function");
const { authNumberTokenSign, authNumberTokenSend } = require("../token");

module.exports = (req, res) => {

  const { tel } = req.params;
  const authNumber = authNumberCreate();
  const payload = { authNumber: authNumber };
  const authNumberToken = authNumberTokenSign(payload);

  authNumberTokenSend(res, authNumberToken, "TelAuthNumber");
  send(tel, authNumber);
  res.status(200).send({ message: "인증번호 전송 성공" });
};