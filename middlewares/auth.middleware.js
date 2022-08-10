"use strict";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Users } = require("../models");
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = async (req, res, next) => {

  try {
    const { authorization } = req.headers;
    const [Type, tokenValue] = authorization.split(" ");
    if (Type !== "Bearer") {
      return res.status(400).json({ message: "로그인이 필요합니다." });
    }

    // 검사시작;
    const { nickname } = jwt.verify(tokenValue, SECRET_KEY);
    const data = await Users.findOne({ where: { nickname } });
    if (data === null) res.status(400).json({ errorMessage: "error" });
    res.locals.userId = data.dataValues.userId;
    res.locals.nickname = data.dataValues.nickname;
    next();
  } catch (e) {
    // 유효성 검사 에러
    if (e.name === "TokenExpiredError")
      return res.status(419).json({ message: "토큰이 만료되었습니다." });

    if (e.name === "JsonWebTokenError")
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });


    res.status(400).send("로그인이 필요합니다.")
  }

};
