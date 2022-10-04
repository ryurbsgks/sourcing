const express = require("express");
const http = require("http");
const cors = require("cors");
const controllers = require("./controllers");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: "POST"
}));

app.post("/user/signup", controllers.signup);
app.post("/user/login", controllers.login);

server.listen(80, () => {
  console.log("HTTP Server running on port 80")
});