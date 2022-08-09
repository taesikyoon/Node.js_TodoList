const TeamRepository = require("../repositories/team.repository");
class TeamService {
  teamRepository = new TeamRepository();

  createTeam = async (userId, teamname, password) => {
    const existTeam = await this.teamRepository.existTeam(userId, teamname);

    if (existTeam !== null) {
      throw Error("중복되는 팀 이름이 있습니다.");
    } else {
      await this.teamRepository.createTeam(teamname, userId, password);
      // 에러나는지 확인해볼 부분
      const getteamId = await this.teamRepository.getteamId(
        userId,
        teamname,
        password
      );
      // userId는 토큰 인증에 사용된 유저 id 사용
      await this.teamRepository.createTeamInfo(userId, getteamId);
    }
  };

  deleteTeam = async (teamId, password) => {
    const getTeamId = await this.teamRepository.checkPassword(teamId, password);

    await this.teamRepository.deleteTeam(getTeamId);
  };
}
module.exports = TeamService;
