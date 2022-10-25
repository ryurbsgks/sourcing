const nodemailer = require("nodemailer");
const { send } = require("../../SMS");
const { user } = require("../../models");

module.exports = (req, res) => {

  const userID = req.body.userID;

  if (req.body.tel) {

    const tel = req.body.tel;

    user.findOne({
      where: {
        userID: userID,
        tel: tel
      }
    }).then( (result) => {
      if (!result) {
        return res.status(404).send({ message: "입력하신 회원 정보가 맞는지 확인해주세요" });
      }

      const content = `[오늘의 장] 비밀번호는 "${result.dataValues.pw}" 입니다`;

      send(tel, content);
      return res.status(200).send({ message: "핸드폰으로 비밀번호를 전송하였습니다" });
    }).catch( (err) => {
      return res.status(500).send({ message: err });
    });

  }

  if (req.body.email) {

    const email = req.body.email;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    });

    user.findOne({
      where: {
        userID: userID,
        email: email
      }
    }).then( (result) => {
      if (!result) {
        return res.status(404).send({ message: "입력하신 회원 정보가 맞는지 확인해주세요" });
      }

      const message = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: `[오늘의 장] 비밀번호 찾기 비밀번호를 알려드립니다`,
        text: `[오늘의 장] 비밀번호는 "${result.dataValues.pw}" 입니다`
      };

      transporter.sendMail(message);
      return res.status(200).send({ message: "이메일로 비밀번호를 전송하였습니다" });
    }).catch( (err) => {
      return res.status(500).send({ message: err });
    });

  }

};