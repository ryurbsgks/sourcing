const { product, productcart } = require("../../models");

module.exports = (req, res) => {

  const { userID } = req.query
  let arr = [];
  let data = [];

  productcart.findAll({
    where: {
      userID: userID
    }
  }).then( (result) => {
    if (!result.length) {
      return res.status(204).send();
    }

    for (let i = 0; i < result.length; i++) {
      delete result[i].dataValues.id;
      delete result[i].dataValues.userID;
      arr.push(result[i].dataValues);
    }

    Promise.all(arr.map( async (el) => {
      const productInfo = await product.findOne({
        attributes: ["id", "img", "name", "sortPrice", "saleUnit"],
        where: {
          id: el.productID
        }
      });
      productInfo.dataValues.count = el.count;
      data = [...data, productInfo.dataValues];
    })).then( () => {
      return res.status(200).send({ message: "장바구니 리스트 조회 성공", data: data});
    });

  }).catch( (err) => {
    return res.status(500).send({ message: err });
  });

};