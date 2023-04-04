const { orderHistory, saleHistory } = require("../../models");
const axios = require("axios");

module.exports = async (req, res) => {

  const { merchant_uid, status, cancel_request_amount, reason } = req.body;
  const getAccessToken = await axios({
    url: "https://api.iamport.kr/users/getToken",
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: {
      imp_key: process.env.IAMPORT_REST_API_KEY,
      imp_secret: process.env.IAMPORT_REST_API_SECRET
    }
  });
  const { access_token } = getAccessToken.data.response;

  orderHistory.findOne({
    where: {
      merchant_uid: merchant_uid
    },
    raw: true
  }).then( async (result) => {

    const paymentData = result;
    const { imp_uid, amount, cancel_amount } = paymentData;
    const cancelableAmount = amount - cancel_amount;

    if (cancelableAmount <= 0) {
      return res.status(400).send({ message: "이미 전액환불된 주문입니다." });
    }

    await axios({
      url: "https://api.iamport.kr/payments/cancel",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      },
      data: {
        reason: reason,
        imp_uid: imp_uid,
        amount: cancel_request_amount,
        checksum: cancelableAmount
      }
    });

    orderHistory.update({
      status: status,
      cancel_amount: cancel_request_amount
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

  }).catch( (err) => {
    return res.status(500).send({ message: err });
  });

};