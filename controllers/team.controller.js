const TeamService = require("../services/team.service");
class TeamController {
  teamService = new TeamService();

  createTeam = async (req, res) => {
    // try {
    const { userId } = res.locals;
    try {
      const { password, teamname } = req.body;
      console.log("test", teamname);
      await this.teamService.createTeam(userId, teamname, password);
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
    res.status(200).json({ message: "팀생성 되었습니다." });
  };
  deleteTeam = async (req, res) => {
    try {
      const { teamId } = req.params;
      const { password } = req.body;
      this.teamService.deleteTeam(teamId, password);
    } catch (err) {
      res.status(400).send(err.message);
    }

    res.status(200).json({ result: "삭제 되었습니다." });
  };
}
module.exports = TeamController;
