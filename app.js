const express = require("express");
const { sequelize } = require("./models");
const app = express();
const POST = 3000;
const router = express.Router();


const mylistsRouter = require("./routes/my-lists");

app.use(express.json());
app.use("/my-lists", [mylistsRouter]);



app.use("/", express.urlencoded({ extended: false }), router);

app.get('/', (req, res) => {
  res.send('Hello Todolist!');
});

app.listen(POST, () => {
  console.log("Server Running");
});
