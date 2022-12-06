const { product } = require("../../models");

module.exports = (req, res) => {

  const params = req.query.category;
  const sortTarget = req.query.sortTarget;
  const sortOption = req.query.sortOption;
  let category = "";
  let data = [];

  switch (params) {
    case "vegetable": 
      category = "야채";
      break;
    case "fruit":
      category = "과일"
      break;
    case "seafood":
      category = "수산물"
      break;
  };

  product.findAll({
    attributes: ["id", "img", "name", "price", "salePrice", "salePct"],
    where: {category: category},
    order: [[sortTarget, sortOption]]
  }).then( (result) => {
    if (result.length === 0) {
      return res.status(200).send({ message: "상품이 존재하지 않습니다" });
    }

    for (let i = 0; i < result.length; i++) {
      data.push(result[i].dataValues);
    }

    res.status(200).send({data: data, message: "상품 리스트 조회 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};