const { Users } = require("../models");

class SignRepository {
  findUser = async (nickname, password) => {
    const existUser = await Users.findOne({ where: { nickname, password } });
    return existUser;
  };

  createUser = async (nickname, password) => {
    const existUser = await Users.findOne({ where: { nickname, password } });
    await Users.create({ nickname, password });
  };
  existUser = async (nickname, password) => {
    return await Users.findOne({ where: { nickname, password } });
  };
}
module.exports = SignRepository;
