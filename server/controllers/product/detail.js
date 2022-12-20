const { product } = require("../../models");

module.exports = (req, res) => {

  const id = req.query.id;

  product.findOne({
    where: {
      id: id
    }
  }).then( (result) => {
    if (!result) {
      return res.status(404).send({ message: "요청한 데이터가 존재하지 않습니다" });
    }

    return res.status(200).send({data: result.dataValues, message: "상세페이지 요청 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};