const { user } = require("../../models");
const { accessTokenSign, accessTokenSend } = require("../token"); 
const crypto = require("crypto");

module.exports = (req, res) => {

  const userID = req.body.userID;
  const pw = req.body.pw;
  const auto = req.body.auto;

  if (!userID || !pw) {
    return res.status(400).send({ message: "잘못된 요청입니다" });
  }

  user.findOne({
    where: {
      userID: userID
    }
  }).then( (result) => {
    if (!result) {
      return res.status(400).send({ message: "아이디 또는 비밀번호가 일치하지 않습니다" });
    }

    const password = crypto.pbkdf2Sync(pw, result.dataValues.salt, 9877, 64, "sha512").toString("base64");

    if (password !== result.dataValues.pw) {
      return res.status(400).send({ message: "아이디 또는 비밀번호가 일치하지 않습니다" });
    }

    delete result.dataValues.pw;
    delete result.dataValues.salt;

    const payload = { userInfo: result.dataValues };
    const accessToken = accessTokenSign(payload, auto);

    accessTokenSend(res, accessToken, auto);
    res.status(200).send({ message: "로그인 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};