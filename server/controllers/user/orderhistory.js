const { orderHistory } = require("../../models");

module.exports = (req, res) => {

  const { userID, merchant_uid, imp_uid, productData, status } = req.body;
  const stringifyProductData = JSON.stringify(productData);

  orderHistory.create({
    userID: userID,
    merchant_uid: merchant_uid,
    imp_uid: imp_uid,
    productData: stringifyProductData,
    status: status
  }).then( (result) => {
    if (!result) {
      return res.status(400).send({ message: "상품 주문 등록 실패" });
    }

    return res.status(201).send({ message: "상품 주문 등록 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};