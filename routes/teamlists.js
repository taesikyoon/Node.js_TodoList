const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/auth.middleware");

const TeamlistsController = require("../controllers/teamlists.controller");
const teamlistsController = new TeamlistsController();

router.use(authMiddlewares);

//나의 팀 리스트 조회
router.get("/", teamlistsController.get_my_teamlists);
//팀 할일 생성
router.post("/:teamId", teamlistsController.create_teamlist);
//팀 할일 수정
router.put("/:teamId/:listId", teamlistsController.update_teamlist);
//팀 할일 삭제
router.delete("/:teamId/:listId", teamlistsController.delete_teamlist);
//팀 할일 완료
router.put("/done/:teamId/:listId", teamlistsController.done_teamlist);
//팀 할일 순서 변경
router.patch("/:teamId/:listId", teamlistsController.order_teamlist);

module.exports = router;
