const { user } = require("../../models");

module.exports = (req, res) => {

  const userID = req.body.userID;

  if (!userID) {
    return res.status(400).send({ message: "잘못된 요청입니다" });
  }

  user.findOne({
    where: {
      userID: userID
    }
  }).then( (result) => {
    if (!result) {
      return res.status(200).send({ message: "사용할 수 있는 아이디입니다" });
    }

    res.status(409).send({ message: "이미 사용 중인 아이디입니다" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};