const express = require("express");
const routre = express.Router();
const { TeamLists } = require("../models");
// 팀생성
const TeamController = require("../controllers/team.controller");
const authorization = require("../middlewares/auth.middleware");
const teamController = new TeamController();
routre.use(authorization);

routre.post("/", teamController.createTeam);
routre.delete("/:teamId", teamController.deleteTeam);
routre.put("/:teamId/JoinOrWithdraw", teamController.joinOrLeaveTheTeam);
// routre.put("/:teamId/leaveteam", teamController.leaveTheTeam);

module.exports = routre;

// // 팀 가입 / 탈퇴
// routre.put("/teams/:teamId", (req, res) => {
//     // 토큰으로 유저 확인한 후 그유저의 팀아이디 삭제
//     await TeamInfo.destroy({where:{teamId,userId}});
//     // 에러핸들러로 삭제를 두번 반복하면 에러 표시하기y
//   res.json({ message: "삭제 되었습니다." });
// });
// // 팀 조회 조건
// // 1.내가 가입 팀 LIST 만 본다.
// // 문제점: boss
