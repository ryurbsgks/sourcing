const { product } = require("../../models");

module.exports = (req, res) => {

  const category = req.query.category;

  product.findAll({
    attributes: ["id", "img", "name", "price", "salePrice", "salePct", "likeCount"],
    where: { category: category },
    limit: 8,
    order: [["likeCount", "desc"]],
    raw: true
  }).then( (result) => {
    if (result.length === 0) {
      return res.status(400).send({ message: "추천 상품 리스트가 존재하지 않습니다" });
    }

    res.status(200).send({ data: result, message: "추천 상품 리스트 조회 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};