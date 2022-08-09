const express = require("express");
const SignService = require("../services/sign.service");

const jwt = require("jsonwebtoken");
require("dotenv").config();

class SignController {
  signService = new SignService();

  signIn = async (req, res, next) => {
    const { nickname, password } = req.body;
    let token = await this.signService.signIn(nickname, password);
    if (token) res.status(200).json({ token });
    else res.status(400).json({ message });
  };

  signUp = async (req, res, next) => {
    const { nickname, password } = req.body;
    const message = await this.signService.signUp(nickname, password);
    res.json({ message });
  };
}
module.exports = SignController;
