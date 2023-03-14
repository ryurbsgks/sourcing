const { productcart } = require("../../models");

module.exports = (req, res) => {
  
  const { userID, productID, count } = req.body;

  productcart.create({
    userID: userID,
    productID: productID,
    count: count
  }).then( (result) => {
    if (!result) {
      return res.status(400).send({ message: "장바구니 추가 실패" });
    }

    return res.status(201).send({ message: "장바구니 추가 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  })

};