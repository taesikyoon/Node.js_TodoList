const express = require("express");
const { sequelize } = require("./models");
const app = express();
const POST = 3000;
const router = require("./routes");

// sequelize.sync({ force : true })

app.use(express.json());

app.use("/", express.urlencoded({ extended: false }), router);

app.get("/", (req, res) => {
  res.send("Hello Todolist!");
});

app.listen(POST, () => {
  console.log("Server Running");
});
