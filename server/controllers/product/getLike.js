const { productLike } = require("../../models");

module.exports = (req, res) => {

  const userID = req.query.userID;
  const productID = req.query.productID;

  productLike.findOne({
    where: {
      userID: userID,
      productID: productID
    }
  }).then( (result) => {
    if (!result) {
      return res.status(200).send({ message: "찜 상태가 아닙니다" });
    }

    return res.status(200).send({ message: "찜 상태입니다" });
  }).catch( (err) => {
    return res.status(500).send({ message: err });
  });

};
