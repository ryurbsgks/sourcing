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
  methods: ["GET", "POST"],
  credentials: true
}));
app.use('/img/editor', express.static(path.join(__dirname, './img/editor/')));

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
app.post("/product/new", controllers.new);
app.post("/product/editor", controllers.editor);

server.listen(80, () => {
  console.log("HTTP Server running on port 80")
});