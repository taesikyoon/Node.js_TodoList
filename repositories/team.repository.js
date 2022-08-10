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

  checkUser = async (teamId, bossId, password) => {
    const data = await Teams.findOne({
      where: { teamId, bossId, password },
    });
    console.log(data);
    return data;
  };

  deleteTeam = async (teamId) => {
    await Teams.destroy({ where: { teamId } });
  };

  findTeam = async (teamId) => {
    const data = await Teams.findByPk(teamId);
    return data;
  };

  findTeamInfo = async (userId, teamId) => {
    const data = await TeamInfos.findOne({ where: { userId, teamId } });
    return data;
  };

  deleteTeamInfo = async (userId, teamId) => {
    await TeamInfos.destroy({ where: { userId, teamId } });
  };
};
