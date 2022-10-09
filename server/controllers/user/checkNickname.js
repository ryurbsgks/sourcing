const { user } = require("../../models");

module.exports = (req, res) => {

  const nickname = req.body.nickname;

  if (!nickname) {
    return res.status(400).send({ message: "잘못된 요청입니다" });
  }

  user.findOne({
    where: {
      nickname: nickname
    }
  }).then( (result) => {
    if (!result) {
      return res.status(200).send({ message: "사용할 수 있는 닉네임입니다" });
    }

    res.status(409).send({ message: "이미 사용 중인 닉네임입니다" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};