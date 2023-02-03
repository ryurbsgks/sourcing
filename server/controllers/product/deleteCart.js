const { productcart } = require("../../models");

module.exports = (req, res) => {

  const userID = req.body.userID;
  const productID = req.body.productID;

  productcart.destroy({
    where: {
      userID: userID,
      productID: productID
    }
  }).then( () => {
    return res.status(204).send({ message: "장바구니 제거 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};