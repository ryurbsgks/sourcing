const express = require("express");
const http = require("http");
const cors = require("cors");
const controllers = require("./controllers");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.post("/user/signup", controllers.signup);
app.post("/user/login", controllers.login);
app.post("/user/checkID", controllers.checkID);
app.post("/user/checkNickname", controllers.checkNickname);
app.get("/user/checkLogin", controllers.checkLogin);

server.listen(80, () => {
  console.log("HTTP Server running on port 80")
});