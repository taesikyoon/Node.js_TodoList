const SignRepository = require("../repositories/sign.repository");
const jwt = require("jsonwebtoken");
class SignService {
  signRepository = new SignRepository();

  signIn = async (nickname, password) => {
    let message = "";
    const existUser = this.signRepository.findUser(nickname, password);
    if (existUser === null) {
      return (message = " 입력정보를 확인해주세요.");
    } else {
      const token = jwt.sign(
        {
          // 만료시간 1시간
          // exp: Math.floor(Date.now() / 1000) + 60 * 60,
          nickname,
        },
        process.env.SECRET_KEY
      );
      return token;
    }
  };

  signUp = async (nickname, password) => {
    let message = "";
    console.log("test", nickname, password);
    const existUser = await this.signRepository.existUser(nickname, password);
    if (existUser === null) {
      this.signRepository.createUser(nickname, password);
      return (message = "회원가입에 성공했습니다.");
    } else return (message = "회원가입에 실패했습니다.");
  };
}
module.exports = SignService;
