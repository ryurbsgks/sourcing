const { user } = require("../../models");
const { accessTokenSign, accessTokenSend } = require("../token");
const crypto = require("crypto");

module.exports = (req, res) => {

  const { id, nickname, password, newPassword, email, address, auto } = req.body

  if (password) {

    user.findOne({
      where: {
        id: id
      }
    }).then( (result) => {
      
      const checkPassword = crypto.pbkdf2Sync(password, result.dataValues.salt, 9877, 64, "sha512").toString("base64");

      if (checkPassword !== result.dataValues.pw) {
        return res.status(400).send({ message: "비밀번호가 일치하지 않습니다" });
      }

      const updatePassword = crypto.pbkdf2Sync(newPassword, result.dataValues.salt, 9877, 64, "sha512").toString("base64");

      user.update({
        pw: updatePassword,
        nickname: nickname,
        email: email,
        address: address
      }, {
        where: {
          id: id
        }
      }).then( () => {

        user.findOne({
          where: {
            id: id
          }
        }).then( (result) => {

          delete result.dataValues.pw;
          delete result.dataValues.salt;
          result.dataValues.auto = auto;

          const payload = { userInfo: result.dataValues };
          const accessToken = accessTokenSign(payload, auto);

          return res.status(201).send({ message: "회원 정보 수정 성공", accessToken: accessToken });
        }).catch( (err) => {
          return res.status(500).send({ message: err });
        });

      }).catch( (err) => {
        return res.status(500).send({ message: err });
      });

    }).catch( (err) => {
      return res.status(500).send({ message: err });
    });

  } else {

    user.update({
      nickname: nickname,
      email: email,
      address: address
    }, {
      where: {
        id: id
      }
    }).then( () => {

      user.findOne({
        where: {
          id: id
        }
      }).then( (result) => {

        delete result.dataValues.pw;
        delete result.dataValues.salt;
        result.dataValues.auto = auto;

        const payload = { userInfo: result.dataValues };
        const accessToken = accessTokenSign(payload, auto);

        return res.status(201).send({ message: "회원 정보 수정 성공", accessToken: accessToken });
      }).catch( (err) => {
        return res.status(500).send({ message: err });
      });

    }).catch( (err) => {
      return res.status(500).send({ message: err });
    });

  }

};