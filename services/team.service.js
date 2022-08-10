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

  deleteTeam = async (teamId, password, userId) => {
    const checkUser = await this.teamRepository.checkUser(
      teamId,
      userId,
      password
    );
    if (checkUser !== null) {
      await this.teamRepository.deleteTeam(teamId);
    } else {
      throw Error("팀장만이 삭제 권한을 가집니다.");
    }
  };

  joinOrLeaveTheTeam = async (userId, teamId, password) => {
    const existTeam = await this.teamRepository.findTeam(teamId);
    if (existTeam === null) {
      throw Error("팀 번호를 확인해주세요.");
    }
    const boss = existTeam.bossId;
    const teampw = existTeam.password;
    if (userId === boss) {
      throw Error("팀장은 자기 팀 삭제만 가능합니다.");
    }
    const existUserInTeamInfo = await this.teamRepository.findTeamInfo(
      userId,
      teamId
    );

    if (teampw === password) {
      if (existUserInTeamInfo === null) {
        await this.teamRepository.createTeamInfo(userId, teamId);
        return true;
      } else {
        await this.teamRepository.deleteTeamInfo(userId, teamId);
        return false;
      }
    } else throw Error("패스워드 까먹으셨수? 잘 생각해보셔");
  };
}
module.exports = TeamService;
