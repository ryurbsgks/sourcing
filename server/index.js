const express = require("express");
const http = require("http");
const controllers = require("./controllers");

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.post("/user/signup", controllers.signup);

server.listen(80, () => {
  console.log("HTTP Server running on port 80")
});