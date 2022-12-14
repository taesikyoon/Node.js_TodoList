const TeamService = require("../services/team.service");
class TeamController {
  teamService = new TeamService();

  createTeam = async (req, res, next) => {
    // try {
    const { userId } = res.locals;
    try {
      const { password, teamname } = req.body;
      console.log("test", teamname);
      await this.teamService.createTeam(userId, teamname, password);
    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
    res.status(200).json({ message: "팀생성 되었습니다." });
  };

  deleteTeam = async (req, res, next) => {
    try {
      const { teamId } = req.params;
      const { password } = req.body;
      const { userId } = res.locals;
      await this.teamService.deleteTeam(teamId, password, userId);
    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
    res.status(200).json({ result: "팀 삭제 되었습니다." });
  };

  joinOrLeaveTheTeam = async (req, res, next) => {
    const { userId } = res.locals;
    const { teamId } = req.params;
    const { password } = req.body;
    try {
      const result = await this.teamService.joinOrLeaveTheTeam(userId, teamId, password);

      if (result) {
        res.status(200).send("팀 가입 되었습니다.");
      } else {
        res.status(200).send("팀 탈퇴 되었습니다.");
      }

    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
      return;
    }

  };

  leaveTheTeam = async (req, res) => {
    console.log("팀을 떠날 예정");
  };
}
module.exports = TeamController;
