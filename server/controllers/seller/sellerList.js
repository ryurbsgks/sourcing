const { user } = require("../../models");

module.exports = (req, res) => {

  let arr = [];

  user.findAll({
    attributes: ["nickname"],
    where: { auth: 2 },
    order: [["id", "asc"]],
    raw: true
  }).then( (result) => {
    if (result.length === 0) {
      return res.status(204).send();
    }

    result.map( (el) => arr.push(el.nickname));

    return res.status(200).send({ message: "판매자 리스트 조회 성공", data: arr });
  }).catch( (err) => {
    return res.status(500).send({ message: err });
  });

};