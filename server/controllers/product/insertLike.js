const { product, productLike } = require("../../models");

module.exports = (req, res) => {

  const userID = req.body.userID;
  const productID = req.body.productID;

  productLike.create({
    userID: userID,
    productID: productID
  }).then( (result) => {
    if (!result) {
      return res.status(400).send({ message: "찜하기 등록 실패" });
    }

    product.findOne({
      where: {
        id: productID
      }
    }).then( (result) => {

      product.update({
        likeCount: result.dataValues.likeCount + 1
      }, {
        where: {
          id: productID
        }
      }).catch( (err) => {
        res.status(500).send({ message: err });
      });

    }).catch( (err) => {
      res.status(500).send({ message: err });
    });

    return res.status(201).send({ message: "찜하기 등록 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};