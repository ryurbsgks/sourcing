const nodemailer = require("nodemailer");
const { authNumberCreate } = require("../../function");
const { authNumberTokenSign, authNumberTokenSend } = require("../token");

module.exports = (req, res) => {

  const email = req.body.email;
  const authNumber = authNumberCreate();
  const payload = { authNumber: authNumber };
  const authNumberToken = authNumberTokenSign(payload);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  });
  const message = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: `[오늘의 장] 인증번호 [${authNumber}]를 입력해주세요`,
    text: `[오늘의 장] 인증번호 [${authNumber}]를 입력해주세요`
  };

  authNumberTokenSend(res, authNumberToken, "EmailAuthNumber");
  transporter.sendMail(message);
  res.status(200).send({ message: "인증번호 전송 성공" });
};