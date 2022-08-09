const express = require("express");
const router = express.Router();
const signupMiddleware = require("../middlewares/signup.middleware");
// /auth/
const SignController = require("../controllers/sign.controller");
const signController = new SignController();
// 로그인
router.post("/signin", signController.signIn);
router.post("/signup", signupMiddleware, signController.signUp);


module.exports = router;

// router.post("/signIn", async (req, res) => {
//   const { nickname, password } = req.body;
//   const existUser = await User.findOne({ where: { nickname, password } });
//   if (existUser) {
//     const token = jwt.sign(
//       {
//         // 만료시간 1시간
//         // exp: Math.floor(Date.now() / 1000) + 60 * 60,
//         nickname,
//       },
//       process.env.SECRET_KEY
//     );
//     res.status(200).json({ token });
//   } else
//     res.status(400).json({ message: "아이디 또는 비밀번호를 확인해주세요." });
// });

// 회원가입 (joi로 회원가입 기준검증 미들웨어 만들기)
// router.post("/signup", async (req, res) => {
//   const { nickname, password } = req.body;
//   //   패스워드를 암호화 했다면 중간에 바로 암호화 하기
//   const existUser = await User.findOne({ where: { nickname, password } });
//   if (existUser !== null) {
//     await User.create({ nickname, password });
//     res.status(200).json({ message: "회원가입 되었습니다." });
//   } else res.status(400).json({ message: "중복된 아이디입니다." });
// });
