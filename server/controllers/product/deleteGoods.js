const { product } = require("../../models");

module.exports = (req, res) => {

  const id = req.body.id;

  product.destroy({
    where: {
      id: id
    }
  }).then( (result) => {
    if (!result) {
      return res.status(400).send({ message: "상품 삭제 실패" });
    }

    res.status(200).send({ message: "상품 삭제 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};