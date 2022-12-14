// controllers/teamlists.controller.js

const TeamlistsService = require("../services/teamlists.service");

class TeamlistsController {
  teamlistsService = new TeamlistsService();

  //나의 팀 리스트들 조회
  get_my_teamlists = async (req, res, next) => {
    const { userId } = res.locals;

    try {
      const get_todolist = await this.teamlistsService.findAll_my_teamlists(
        userId
      );

      res.status(200).json({ myteamlists: get_todolist });
    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
  };

  //팀 할일 생성
  create_teamlist = async (req, res, next) => {
    const { teamId } = req.params;
    const { content } = req.body;
    const { userId } = res.locals;
    const done = 0;

    try {
      const msg = await this.teamlistsService.create_teamlist(
        teamId,
        content,
        userId,
        done
      );

      res.status(201).json({ message: msg });
    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
  };

  //팀 할일 수정
  update_teamlist = async (req, res, next) => {
    const { listId } = req.params;
    const { userId } = res.locals;
    const { teamId } = req.params;
    const { content } = req.body;

    try {
      const msg = await this.teamlistsService.update_teamlist(listId, userId, teamId, content);


      res.status(201).json({ message: msg });
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
      return;
    }
  };

  //팀 할일 삭제
  delete_teamlist = async (req, res, next) => {
    const { listId } = req.params;
    const { userId } = res.locals;
    const { teamId } = req.params;

    try {
      const msg = await this.teamlistsService.delete_teamlist(listId,userId,teamId);

      res.status(200).json({ message: msg });
    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
  };

  //팀 할일 완료 설정
  done_teamlist = async (req, res, next) => {
    const { userId } = res.locals;
    const { teamId, listId } = req.params;

    try {
      const doneList = await this.teamlistsService.done_teamlist(userId,teamId, listId);

      if (doneList === 1) {               //done이 1이면 TRUE(할일완료), done이 0이면 FALSE(할일미완료)
        res.status(200).send("할일 완료 체크되었습니다.");
      } else {
        res.status(200).send("할일 완료 체크 해제되었습니다.");
      }
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
      return;
    }

  }

  //팀 할일 순서 변경
  order_teamlist = async (req, res, next) => {
    const { teamId, listId } = req.params;
    const { userId } = res.locals;
    const { order } = req.body; // 현재 리스트의 order 값이 아니라, 변경하고 싶은 자리의 order 값 입력

    try {
      await this.teamlistsService.order_teamlist(teamId, listId, userId, order);

      return res.status(200).json({ message: "리스트 순서 변경되었습니다." });
    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
  };
}

module.exports = TeamlistsController;
