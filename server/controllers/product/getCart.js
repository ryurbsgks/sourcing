const { productcart } = require("../../models");

module.exports = (req, res) => {

  const userID = req.query.userID;
  const productID = req.query.productID;

  productcart.findOne({
    where: {
      userID: userID,
      productID: productID
    }
  }).then( (result) => {
    if (!result) {
      return res.status(200).send({ message: "장바구니에 담긴 상품이 아닙니다" });
    }

    return res.status(200).send({ message: "장바구니에 담긴 상품입니다" });
  }).catch( (err) => {
    return res.status(500).send({ message: err });
  });

};
