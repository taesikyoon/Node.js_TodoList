const express = require("express");
const router = express.Router();
const signRouter = require("./sign");
const teamRouter = require("./team");
const signupMiddleware = require("../middlewares/signup.middleware");
const mylistsRouter = require("../routes/mylists.routes");

router.use("/auth", signRouter);
router.use("/teams", teamRouter);
router.use("/my-lists", mylistsRouter);

module.exports = router;
