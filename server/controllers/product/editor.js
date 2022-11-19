const multer = require('multer');

module.exports = (req, res) => {

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "img/editor/");
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

    res.status(200).send({ data: res.req.file.path, message: "업로드 성공" });
  });

};