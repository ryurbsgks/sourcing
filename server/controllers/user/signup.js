const { user } = require("../../models");
const crypto = require("crypto");

module.exports = (req, res) => {

  const userID = req.body.userID;
  const pw = req.body.pw;
  const nickname = req.body.nickname;
  const tel = req.body.tel;
  const email = req.body.email;
  const address = req.body.address;
  const addressDetail = req.body.addressDetail;
  const auth = req.body.auth;

  if (!userID || !pw || !nickname || !tel) {
    return res.status(400).send({ message: "잘못된 요청입니다" }); 
  }

  const salt = crypto.randomBytes(64).toString("base64");
  const password = crypto.pbkdf2Sync(pw, salt, 9877, 64, "sha512").toString("base64");

  user.findOrCreate({
    where: {
      userID: userID
    },
    defaults: {
      pw: password,
      nickname: nickname,
      tel: tel,
      email: email,
      address: `${address}-${addressDetail}`,
      auth: auth,
      salt: salt
    }
  }).then( ([user, created]) => {
    if (!created) {
      return res.status(409).send({ message: "이미 존재하는 아이디입니다" });
    }

    res.status(201).send({ message: "회원가입 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};