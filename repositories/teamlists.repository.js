// repositories/teamlists.repository.js

const { TeamLists, TeamInfos } = require("../models");

class TeamlistsRepository {
  //Teaminfo
  my_team = async (userId) => {
    const lists = await TeamInfos.findAll({ where: { userId }, raw: true });
    console.log(lists);
    return lists;
  };

  //TeamLists
  my_teamlists = async (teamId) => {
    const lists = await TeamLists.findAll({ where: { teamId }, raw: true });
    console.log("test", lists);

    return lists;
  };

  //TeamLists
  teamlist = async (listId) => {
    const onelist = await TeamLists.findOne({ where: { listId }, raw: true });

    console.log(onelist);

    return onelist;
  };

  //teamId로 order 값이 제일 큰 리스트 조회
  orderlist = async (teamId) => {
    const maxOrder = await TeamLists.findOne({
      where: { teamId },
      order: [["order", "DESC"]],
      raw: true,
    });

    return maxOrder;
  };

  //TeamLists
  create_teamlist = async (teamId, content, done, order) => {
    const createlist = await TeamLists.create({
      teamId,
      content,
      done,
      order,
    });

    return;
  };

  //TeamLists
  update_teamlist = async (content, listId) => {
    const updatelist = await TeamLists.update(
      { content },
      { where: { listId } }
    );

    return updatelist;
  };

  //TeamLists
  update_done = async (done, listId) => {
    const updatedone = await TeamLists.update({ done }, { where: { listId } });

    return updatedone;
  };

  //TeamLists
  delete_teamlist = async (listId) => {
    const deletelist = await TeamLists.destroy({ where: { listId } });

    return deletelist;
  };

  //teamId와 listId로 팀 리스트 조회
  findTeamlist = async (teamId, listId) => {
    const teamlist = await TeamLists.findOne({
      where: { teamId, listId },
    });

    return teamlist;
  };

  //팀 리스트 순서변경 - 현재리스트와 타켓리스트의 order값 바꿔 저장
  targetTeamlist = async (teamId, order, existsOrder) => {
    await TeamLists.update(
      { order: existsOrder },
      { where: { teamId, order } }
    );

    return;
  };

  //팀 리스트 순서변경 - 현재리스트와 타켓리스트의 order값 바꿔 저장
  orderTeamlist = async (teamId, listId, order) => {
    await TeamLists.update({ order }, { where: { teamId, listId } });

    return;
  };

  findMyteam = async (userId, teamId) => {
    const data = await TeamInfos.findOne({ where: { userId, teamId } });
    return data;
  };
}

module.exports = TeamlistsRepository;
