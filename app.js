const express = require("express");
const { sequelize } = require("./models");
const app = express();
const POST = 3000;
const routes = require("./routes");

const mylistsRouter = require("./routes/my-lists");

app.use(express.json());

app.use("/", [mylistsRouter]);

app.use("/", express.urlencoded({ extended: false }));
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Hello Todolist!");
});
// sequelize.sync({ force: true });
app.listen(POST, () => {
  console.log("Server Running");
});
