const { product } = require("../../models");
const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {

  const id = req.body.id;
  const img = req.body.img;

  product.destroy({
    where: {
      id: id
    }
  }).then( (result) => {
    if (!result) {
      return res.status(400).send({ message: "상품 삭제 실패" });
    }

    fs.unlink(path.join(__dirname, `../../${img}`), (err) => {
      if (err) {
        throw err;
      }
    });

    res.status(200).send({ message: "상품 삭제 성공" });
  }).catch( (err) => {
    res.status(500).send({ message: err });
  });

};