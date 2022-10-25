const nodemailer = require("nodemailer");
const { send } = require("../../SMS");
const { user } = require("../../models");

module.exports = (req, res) => {

  if (!req.body.tel && !req.body.email) {
    return res.status(400).send({ message: "잘못된 요청입니다" });
  }

  if (req.body.tel) {

    const tel = req.body.tel;

    user.findOne({
      where: {
        tel: tel
      }
    }).then( (result) => {
      if (!result) {
        return res.status(404).send({ message: "입력하신 핸드폰 번호가 맞는지 확인해주세요" });
      }

      const content = `[오늘의 장] 아이디는 "${result.dataValues.userID}" 입니다`;
      
      send(tel, content);
      return res.status(200).send({ message: "핸드폰으로 아이디를 전송하였습니다" });
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
        email: email
      }
    }).then( (result) => {
      if (!result) {
        return res.status(404).send({ message: "입력하신 이메일이 맞는지 확인해주세요" });
      }

      const message = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: `[오늘의 장] 아이디 찾기 아이디를 알려드립니다`,
        text: `[오늘의 장] 아이디는 "${result.dataValues.userID}" 입니다`
      };

      transporter.sendMail(message);
      return res.status(200).send({ message: "이메일로 아이디를 전송하였습니다" });
    }).catch( (err) => {
      return res.status(500).send({ message: err });
    });

  }

};