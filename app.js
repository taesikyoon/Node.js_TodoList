const express = require("express");
const { sequelize } = require("./models");
const app = express();
const POST = 3000;
const router = require("./routes");

// sequelize.sync({ force: true });

app.use(express.json());
app.use("/", express.urlencoded({ extended: false }), router);

app.get("/", (req, res) => {
  res.send("Hello Todolist!");
});

app.listen(POST, () => {
  console.log("Server Running");
});

// const models = require("./models");
// models.sequelize.sync().then(() => {
// console.log(" DB 연결 성공");
// }).catch(err => {
// console.log("연결 실패");
// console.log(err);
// })
