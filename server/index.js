const express = require("express");
const http = require("http");
const controllers = require("./controllers");

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.post("/user/signup", controllers.signup);
app.post("/user/login", controllers.login);

server.listen(80, () => {
  console.log("HTTP Server running on port 80")
});