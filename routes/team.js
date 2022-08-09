const express = require("express");
const routre = express.Router();
const { Teams } = require("../models");
const { TeamInfos } = require("../models");
// 팀생성
const TeamController = require("../controllers/team.controller");
const authorization = require("../middlewares/auth.middleware");
const teamController = new TeamController();
routre.use(authorization);

routre.post("/", teamController.createTeam);
routre.delete("/:teamId", teamController.deleteTeam);
// routre.put("/:teamId", teamController.joinOrLeaveTheTeam);

module.exports = routre;

// // 팀 삭제
// routre.delete("/:teamId", async (req, res) => {
//   const { teamId } = req.params;
//   const existsTeam = await Teams.findByPk(teamId);
//   if (existsTeam) {
//     await Teams.destroy({ where: { teamId } });
//     return res.status(200).json({ result: "삭제 하였습니다." });
//   } else res.status(400).json({ result: "없는 팀입니다." });
//   // 에러핸들러로 삭제를 두번 반복하면 에러 표시하기
// });
// // 팀 가입 / 삭제
// routre.put("/teams/:teamId", (req, res) => {
//     // 토큰으로 유저 확인한 후 그유저의 팀아이디 삭제
//     await TeamInfo.destroy({where:{teamId,userId}});
//     // 에러핸들러로 삭제를 두번 반복하면 에러 표시하기y
//   res.json({ message: "삭제 되었습니다." });
// });
// // 팀 조회 조건
// // 1.내가 가입 팀 LIST 만 본다.
// // 문제점: boss
