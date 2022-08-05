const express = require("express");
const { ppid } = require("process");
const app = express();
const POST = 3000;

app.listen(POST, () => {
  console.log("Server Running");
});
