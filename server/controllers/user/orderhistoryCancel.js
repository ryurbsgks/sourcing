const { orderHistory, saleHistory } = require("../../models");

module.exports = (req, res) => {

  const { merchant_uid, status } = req.body;

  orderHistory.update({
    status: status
  }, {
    where: {
      merchant_uid: merchant_uid
    }
  }).then( () => {

    saleHistory.update({
      status: status
    }, {
      where: {
        merchant_uid: merchant_uid
      }
    }).then( () => {
      return res.status(201).send({ message: "구매 취소 성공" });
    }).catch( (err) => {
      return res.status(500).send({ message: err });
    });

  }).catch( (err) => {
    return res.status(500).send({ message: err });
  });

};