const { user } = require("../../models");

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

  user.findOrCreate({
    where: {
      userID: userID
    },
    defaults: {
      pw: pw,
      nickname: nickname,
      tel: tel,
      email: email,
      address: `${address}-${addressDetail}`,
      auth: auth
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