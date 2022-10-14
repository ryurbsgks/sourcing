module.exports = (req, res) => {

  if (!req.headers.cookie) {
    return res.status(200).send({ message: "Guest 상태입니다" });
  }

  const cookie = req.headers.cookie.split("=")[0];

  if (cookie !== "sourcing") {
    return res.status(200).send({ message: "Guest 상태입니다" });
  }

  res.status(200).send({ message: "로그인 상태입니다"});

};