const express = require("express");
const router = express.Router();
const signRouter = require("./sign");
const teamRouter = require("./team");
const signupMiddleware = require("../middlewares/signup.middleware");
router.use("/auth", signRouter);
router.use("/teams", teamRouter);

module.exports = router;
