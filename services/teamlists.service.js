// services/teamlists.service.js

const TeamlistsRepository = require("../repositories/teamlists.repository");

class TeamlistsService {
  teamlistsRepository = new TeamlistsRepository();

  //내가 속한 팀들 리스트 찾기
  findAll_my_teamlists = async (userId) => {
    try {
      const mylists = await this.teamlistsRepository.my_team(userId);

      let myteamIds = [];

      for (let mylist of mylists) {
        let { teamId } = mylist;
        myteamIds.push(teamId);
      }

      console.log(myteamIds)

      let msg;

      if (allmylists === null) {
        msg = "리스트가 존재하지 않습니다";
        return msg;
      } else {
        msg = allmylists;
        return msg;
      }
    } catch (err) {
      console.log(err);
    }
  };

  //userId으로 팀을 찾고 속해있다면 생성하기
  create_teamlist = async (teamId, content, userId, done) => {
    try {
      const myteams = await this.teamlistsRepository.my_team(userId);

      let msg;

      for (let myteam of myteams) {
        let confirm_teamId = myteam.teamId;

        if (teamId == confirm_teamId) {
          const maxOrder = await this.teamlistsRepository.orderlist(teamId); //이미 저장된 리스트 중 order 값이 제일 큰 리스트 조회

          let order;

          if (maxOrder) {
            //제일 큰 order 값이 있을 경우 +1을 하여
            order = maxOrder.order + 1; //생성하는 리스트의 order값으로 저장
          } else order = 1; //저장된 리스트가 없다면 order 값은 1로 저장

          await this.teamlistsRepository.create_teamlist(
            teamId,
            content,
            done,
            order
          );

          msg = "리스트를 생성하였습니다";
          return msg;

        }
        msg = "존재하지 않거나 가입하지 않은 팀입니다.";
        return msg;

      }
    } catch (err) {
      console.log(err);
    }
  };

  update_teamlist = async (content, listId) => {
    try {
      const confirm = await this.teamlistsRepository.teamlist(listId);

      let msg;

      if (confirm === null) {
        msg = "없는 리스트입니다";
        return msg;
      } else {
        await this.teamlistsRepository.update_teamlist(content, listId);
        msg = "수정 되었습니다";
        return msg;
      }
    } catch (err) {
      console.log(err);
    }
  };

  delete_teamlist = async (listId) => {
    try {
      const confirm = await this.teamlistsRepository.teamlist(listId);

      let msg;

      if (confirm === null) {
        msg = "없는 리스트입니다";
        return msg;
      } else {
        await this.teamlistsRepository.delete_teamlist(listId);
        msg = "삭제 되었습니다";
        return msg;
      }
    } catch (err) {
      console.log(err);
    }
  };

  done_teamlist = async (listId) => {
    try {
      const confirm = await this.teamlistsRepository.teamlist(listId);

      let msg;

      if (confirm === null) {
        msg = "없는 리스트입니다";
        return msg;
      } else {
        let { done } = confirmdone;

        if (done === 0) {
          done = 1;
          await this.teamlistsRepository.update_done(done, listId);
          msg = "체크 처리되었습니다";
          return msg;
        } else {
          done = 0;
          await this.teamlistsRepository.update_done(done, listId);
          msg = "체크 취소되었습니다";
          return msg;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //팀 할일 순서 변경
  order_teamlist = async (teamId, listId, userId, order) => {
    if (!order) throw new Error("변경할 자리(order)가 입력되지 않았습니다.");
    // 변경은 자기팀만 가능하다.
    const isMyTeam = await this.teamlistsRepository.findMyteam(userId, teamId);
    if (!isMyTeam) throw new Error("팀 번호를 확인해주세요.");
    const existsList = await this.teamlistsRepository.findTeamlist(
      teamId,
      listId
    );

    if (!existsList) throw new Error("리스트가 존재하지 않습니다.");

    const existsOrder = existsList.order; //현재 리스트의 order 값을 existOrder 값으로 저장

    await this.teamlistsRepository.targetTeamlist(
      //변경할 자리 리스트의 order 값에 existOrder 값 저장
      teamId,
      order,
      existsOrder
    );

    await this.teamlistsRepository.orderTeamlist(
      //현재 리스트의 order 값에 body에 입력했던 order 값 저장
      teamId,
      listId,
      order
    );

    return;
  };
}

module.exports = TeamlistsService;
