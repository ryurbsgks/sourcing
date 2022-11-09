const { product } = require("../../models");

module.exports = (req, res) => {

  const category = req.body.category;
  const pic = req.body.pic;
  const name = req.body.name;
  const price = req.body.price;
  const saleInfo = req.body.saleInfo;
  const salePrice = req.body.salePrice;
  const unit = req.body.unit;
  const weight = req.body.weight;
  const origin = req.body.origin;
  const info = req.body.info;

  if (!category || !pic || !name || !price || !unit || !weight || !origin) {
    return res.status(400).send({ message: "잘못된 요청입니다" }); 
  }

  product.create({
    category: category,
    pic: pic,
    name: name,
    price: price,
    saleInfo: saleInfo,
    salePrice: salePrice,
    unit: unit,
    weight: weight,
    origin: origin,
    info: info
  }).then( (result) => {
    if (!result) {
      return res.status(400).send({ message: "상품 등록 실패" });
    }

    res.status(200).send({ message: "상품 등록 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};