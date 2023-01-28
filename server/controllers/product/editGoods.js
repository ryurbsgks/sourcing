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
    const id = data.id;
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

    if (salePrice) {
      sortPrice = salePrice
    }

    if (!salePrice) {
      salePrice = 0;
    }

    if (!salePct) {
      salePct = 0;
    }

    if (res.req.file) {

      const img = res.req.file.path;

      product.update({
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
        content: content
      }, {
        where: {
          id: id
        }
      }).then( () => {
        return res.status(201).send({ message: "상품 수정 성공" });
      }).catch( (err) => {
        return res.status(500).send({ message: err });
      });

    } else {

      product.update({
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
        content: content
      }, {
        where: {
          id: id
        }
      }).then( () => {
        return res.status(201).send({ message: "상품 수정 성공" });
      }).catch( (err) => {
        res.status(500).send({ message: err });
      });

    }

  });

};