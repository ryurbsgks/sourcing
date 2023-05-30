const { orderHistory } = require("../../models");

module.exports = (req, res) => {

  const { userID } = req.query;

  orderHistory.findAll({
    where: { userID: userID },
    order: [["id", "desc"]],
    raw: true
  }).then( (result) => {
    if (result.length === 0) {
      return res.status(204).send();
    }

    result.map( (el) => el.productData = JSON.parse(el.productData));
    
    return res.status(200).send({ message: "주문 내역 리스트 조회 성공", data: result });
  }).catch( (err) => {
    return res.status(500).send({ message: err });
  });

};