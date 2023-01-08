const { product, productLike } = require("../../models");

module.exports = (req, res) => {

  const userID = req.body.userID;
  const productID = req.body.productID;

  productLike.destroy({
    where: {
      userID: userID,
      productID: productID
    }
  }).then( () => {

    product.findOne({
      where: {
        id: productID
      }
    }).then( (result) => {

      product.update({
        likeCount: result.dataValues.likeCount - 1
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

    return res.status(204).send({ message: "찜하기 취소 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};