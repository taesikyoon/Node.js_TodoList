const { Teams } = require("../models");
const { TeamInfos } = require("../models");
module.exports = class TeamRepository {
  existTeam = async (bossId, teamname) => {
    const result = await Teams.findOne({ where: { bossId, teamname } });
    return result;
  };

  getteamId = async (bossId, teamname, password) => {
    const { teamId } = await Teams.findOne({
      where: { bossId, password, teamname },
    });
    return teamId;
  };

  createTeam = async (teamname, bossId, password) => {
    await Teams.create({ teamname, bossId, password });
  };

  createTeamInfo = async (userId, teamId) => {
    await TeamInfos.create({ userId, teamId });
  };

  checkPassword = async (teamId, password) => {
    const team = await Teams.findOne({
      where: { teamId, password },
    });
    return team.teamId;
  };

  deleteTeam = async (teamId) => {
    await Teams.destroy({ where: { teamId } });
  };
};
