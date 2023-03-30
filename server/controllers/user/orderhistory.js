const { orderHistory, saleHistory, productcart } = require("../../models");

module.exports = (req, res) => {

  const { userID, merchant_uid, imp_uid, productData, productDataSale, status, where } = req.body;
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

    Promise.all(productDataSale.map( async (el) => {
      await saleHistory.create({
        productID: el.productID,
        seller: el.seller,
        count: el.count,
        price: el.price,
        merchant_uid: el.merchant_uid,
        status: el.status
      })
    })).then( () => {
      if (where) {
        Promise.all(productDataSale.map( async (el) => {
          await productcart.destroy({
            where: {
              userID: userID,
              productID: el.productID
            }
          })
        })).catch( (err) => {
          return res.status(500).send({ message: err });
        });
      }
      
    }).catch( (err) => {
      return res.status(500).send({ message: err });
    });

    return res.status(201).send({ message: "상품 주문 등록 성공" });
  }).catch( (err) => {
    return res.status(500).send({ message: err });
  });

};