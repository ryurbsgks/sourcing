const { reservation } = require("../../models");

module.exports = (req, res) => {

  const { day, userID, seller } = req.body;
  const { content, address, addressDetail, name, tel } = req.body.reservationFormInfo;

  reservation.create({
    day: day,
    userID: userID,
    seller: seller,
    content: content,
    address: address,
    addressDetail: addressDetail,
    name: name,
    tel: tel
  }).then( (result) => {
    if (!result) {
      return res.status(400).send({ message: "예약 실패" });
    }

    return res.status(201).send({ message: "예약 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};