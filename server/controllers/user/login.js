const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { user } = require("../../models");

dotenv.config();

module.exports = (req, res) => {

  const userID = req.body.userID;
  const pw = req.body.pw;

  if (!userID || !pw) {
    return res.status(400).send({ message: "잘못된 요청입니다" });
  }

  user.findOne({
    where: {
      userID: userID,
      pw: pw
    }
  }).then( (result) => {
    if (!result) {
      return res.status(400).send({ message: "아이디 또는 비밀번호가 일치하지 않습니다" });
    }

    const payload = {
      id: result.dataValues.id,
      userID: result.dataValues.userID,
      nickname: result.dataValues.nickname,
      tel: result.dataValues.tel,
      email: result.dataValues.email,
      address: result.dataValues.address,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    res.cookie("sourcing", token).status(200).send({ message: "로그인 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  })

};