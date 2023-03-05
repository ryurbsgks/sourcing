const express = require("express");
const http = require("http");
const cors = require("cors");
const controllers = require("./controllers");
const path = require("path")
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));
app.use('/img/editor', express.static(path.join(__dirname, './img/editor/')));
app.use('/img/product', express.static(path.join(__dirname, './img/product/')));

app.post("/user/signup", controllers.signup);
app.post("/user/login", controllers.login);
app.post("/user/checkID", controllers.checkID);
app.post("/user/checkNickname", controllers.checkNickname);
app.get("/user/auth", controllers.auth);
app.get("/user/signup/sms/:tel", controllers.signupSMS);
app.post("/user/signup/verify", controllers.verify);
app.post("/user/signup/email", controllers.signupEmail);
app.post("/user/find/id", controllers.findID);
app.post("/user/find/pw", controllers.findPW);
app.patch("/user/modify", controllers.modify);
app.delete("/user/withdrawal", controllers.withdrawal);
app.get("/product/list", controllers.list);
app.post("/product/new", controllers.new);
app.post("/product/editor", controllers.editor);
app.get("/product/detail", controllers.detail);
app.get("/product/like", controllers.getLike);
app.post("/product/like", controllers.insertLike);
app.delete("/product/like", controllers.deleteLike);
app.get("/product/cart", controllers.getCart);
app.post("/product/cart", controllers.insertCart);
app.delete("/product/cart", controllers.deleteCart);
app.get("/product/recommend", controllers.recommend);
app.patch("/product/goods", controllers.editGoods);
app.delete("/product/goods", controllers.deleteGoods);

server.listen(80, () => {
  console.log("HTTP Server running on port 80")
});