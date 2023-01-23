const { product } = require("../../models");
const multer = require('multer');

module.exports = (req, res) => {

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "img/product/");
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
    const img = res.req.file.path;
    const name = data.name;
    const price = data.price;
    let salePrice = data.salePrice;
    let salePct = data.salePct;
    let sortPrice = data.price;
    const unit = data.unit;
    const unitInfo = data.unitInfo;
    const weight = data.weight;
    const weightInfo = data.weightInfo;
    const origin = data.origin;
    const category = data.category;
    const content = data.content;
    const userID = data.userID;
    console.log("-------unitInfo--------", unitInfo)
    console.log("-------weightInfo--------", weightInfo)
    if (salePrice) {
      sortPrice = salePrice
    }

    if (!salePrice) {
      salePrice = 0;
    }

    if (!salePct) {
      salePct = 0;
    }

    if (!img || !name || !price || !unit || !weight || !origin || !category || !content || !userID) {
      return res.status(400).send({ message: "잘못된 요청입니다" }); 
    }

    product.create({
      img: img,
      name: name,
      price: price,
      salePrice: salePrice,
      salePct: salePct,
      sortPrice: sortPrice,
      unit: unit,
      saleUnit: unitInfo,
      weight: weight,
      weightUnit: weightInfo,
      origin: origin,
      category: category,
      content: content,
      userID: userID
    }).then( (result) => {
      if (!result) {
        return res.status(503).send({ message: "상품 등록 실패" });
      }
  
      return res.status(200).send({ message: "상품 등록 성공" });
    }).catch( (err) => {
      res.status(500).send({ message: err });
    });
    
  });

};