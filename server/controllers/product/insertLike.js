const { productLike } = require("../../models");

module.exports = (req, res) => {

  const userID = req.body.userID;
  const productID = req.body.productID;

  productLike.create({
    userID: userID,
    productID: productID
  }).then( (result) => {
    if (!result) {
      return res.status(400).send({ message: "찜하기 등록 실패" });
    }

    return res.status(201).send({ message: "찜하기 등록 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};
