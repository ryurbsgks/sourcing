const { product, productLike } = require("../../models");

module.exports = (req, res) => {

  const { userID } = req.query
  let arr = [];
  let data = [];

  productLike.findAll({
    where: {
      userID: userID
    }
  }).then( (result) => {
    if (!result.length) {
      return res.status(204).send();
    }

    for (let i = 0; i < result.length; i++) {
      arr.push(result[i].dataValues.productID);
    }

    Promise.all(arr.map( async (el) => {
      const productInfo = await product.findOne({
        attributes: ["id", "img", "name", "sortPrice"],
        where: {
          id: el
        }
      });
      data = [...data, productInfo.dataValues];
    })).then( () => {
      return res.status(200).send({ message: "찜 상품 리스트 조회 성공", data: data });
    });
      
  }).catch( (err) => {
    return res.status(500).send({ message: err });
  });

};