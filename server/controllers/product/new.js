const { product } = require("../../models");
const multer = require('multer');

module.exports = (req, res) => {

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "img/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  const upload = multer({ storage: storage }).single("img");

  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send({ message: "업로드 오류" });
    }

    const data = JSON.parse(req.body.data);
    const category = data.category;
    const pic = res.req.file.path;
    const name = data.name;
    const price = data.price;
    const saleInfo = data.saleInfo;
    const salePrice = data.salePrice;
    const unit = data.unit;
    const weight = data.weight;
    const origin = data.origin;
    const info = data.info;

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
  
      return res.status(200).send({ message: "상품 등록 성공" });
    }).catch( (err) => {
      res.status(500).send({ message: err });
    });
    
  });

};