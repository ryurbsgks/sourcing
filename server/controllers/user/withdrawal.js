const { user } = require("../../models");

module.exports = (req, res) => {

  const id = req.body.id;

  user.destroy({
    where: {
      id: id
    }
  }).then( () => {
    return res.status(204).send();
  }).catch( (err) => {
    return res.status(500).send({ message: err });
  });

};