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

      console.log(myteamIds);

      for (let myteamId of myteamIds) {
        let teamlists = await this.teamlistsRepository.my_teamlists(myteamId);
        for (let teamlist of teamlists) {
          lists.push(teamlist);
        }
      }
      console.log(lists[0].order);
      lists.sort((a, b) => {
        console.log(a.order, b.order);
        a.order - b.order;
      });

      console.log(lists);

      if (lists.length === 0) {
        msg = "리스트가 존재하지 않습니다";
        return msg;
      } else {
        msg = lists;
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

  //팀 할일 수정
  update_teamlist = async (listId, userId, teamId, content) => {
    if (!content) throw new Error("리스트 내용이 입력되지 않았습니다.");

    // 변경은 자기팀만 가능하다.
    const isMyTeam = await this.teamlistsRepository.findMyteam(userId, teamId);
    if (!isMyTeam) throw new Error("팀 번호를 확인해주세요.");

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
  };

  //팀 할일 삭제
  delete_teamlist = async (listId, userId, teamId) => {
    try {
      // 변경은 자기팀만 가능하다.
      const isMyTeam = await this.teamlistsRepository.findMyteam(
        userId,
        teamId
      );
      if (!isMyTeam) throw new Error("팀 번호를 확인해주세요.");

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

  //팀 할일 완료 설정
  done_teamlist = async (userId, teamId, listId) => {
    // 변경은 자기팀만 가능하다.
    const isMyTeam = await this.teamlistsRepository.findMyteam(userId, teamId);
    if (!isMyTeam) throw new Error("팀 번호를 확인해주세요.");

    const donelist = await this.teamlistsRepository.findTeamlist(
      teamId,
      listId
    );

    if (!donelist) throw new Error("리스트가 존재하지 않습니다.");

    let done = 0; //done이 1이면 TRUE(할일완료), done이 0이면 FALSE(할일미완료)
    if (donelist.done === false) {
      //처음 생성할 때는 done 값이 0(할일미완료)
      done = 1; //done값이 0이면 1로 재할당하여 저장(체크완료)
    } else {
      done = 0;
    }

    const doneTeamlist = await this.teamlistsRepository.doneTeamlist(
      teamId,
      listId,
      done
    );

    return doneTeamlist;
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
