const { product } = require("../../models");

module.exports = (req, res) => {

  const params = req.query.category;
  const sort = req.query.sort;
  const currentPage = req.query.currentPage;
  const offset = (currentPage - 1) * 16;
  let category, sortTarget, sortOption;
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

  switch (sort) {
    case "best":
      sortTarget = "id";
      sortOption = "desc";
      break;
    case "new":
      sortTarget = "id";
      sortOption = "desc";
      break;
    case "lowprice":
      sortTarget = "sortPrice";
      sortOption = "asc";
      break;
    case "heighprice":
      sortTarget = "sortPrice";
      sortOption = "desc";
      break;
    case undefined:
      sortTarget = "id";
      sortOption = "desc";
      break;
  };

  product.findAndCountAll({
    attributes: ["id", "img", "name", "price", "salePrice", "salePct"],
    where: {category: category},
    limit: 16,
    offset: offset,
    order: [[sortTarget, sortOption]]
  }).then( (result) => {
    if (result.count === 0) {
      return res.status(200).send({ message: "상품이 존재하지 않습니다" });
    }

    for (let i = 0; i < result.rows.length; i++) {
      data.push(result.rows[i].dataValues);
    }

    res.status(200).send({ data: data, count: result.count, message: "상품 리스트 조회 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};