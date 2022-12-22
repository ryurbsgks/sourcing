const { product, user } = require("../../models");

module.exports = (req, res) => {

  const id = req.query.id;
  let data;

  product.findOne({
    where: {
      id: id
    }
  }).then( (result) => {
    if (!result) {
      return res.status(404).send({ message: "요청한 데이터가 존재하지 않습니다" });
    }

    data = result.dataValues;

    user.findOne({
      attributes: ["nickname"],
      where: {id: result.dataValues.userID}
    }).then( (result) => {
      if (!result) {
        return res.status(404).send({ message: "해당 게시물의 판매자가 존재하지 않습니다" });
      }

      data.nickname = result.dataValues.nickname;

      return res.status(200).send({data: data, message: "상세페이지 요청 성공" });
    }).catch( (err) => {
      res.status(500).send({ message: err });
    });

  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};