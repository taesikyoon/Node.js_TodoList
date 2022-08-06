const express = require('express');
const router = express.Router();
const { Mylist } = require("../models")


//개인 할 일 조회
router.get("/my-lists/:nickname", async (req, res) => {
    const { nickname } = req.params; //authMiddleware 구현 후 res.locals.user에서 받아와도 됨.

    const mylists = await Mylist.findAll({ where: { nickname } });

    if (!mylists.length) {
        res.status(404).send({ "message": "리스트가 존재하지 않습니다." });
    } else {
        res.send({ mylists });
    }
});


//개인 할일 삭제 
router.delete("/my-lists/:nickname/:listId", async (req, res) => {
    const { nickname } = req.params; //authMiddleware 구현 후 res.locals.user에서 받아와도 됨.
    const { listId } = req.params;

    const existsList = await Mylist.findOne({
        where: {
            nickname,
            listId,
        },
    });

    if (existsList) {
        await existsList.destroy();
        res.send({ "message": "리스트를 삭제하였습니다." });
    } else {
        res.status(404).send({ "message": "삭제할 리스트가 없습니다." });
    }

});

//개인 할일 수정
  router.put("/my-lists/:nickname/:listId", async (req, res) => {
    const { nickname } = req.params; //authMiddleware 구현 후 res.locals.user에서 받아와도 됨.
    const { listId } = req.params;
    const { content } = req.body;

    const existsList = await Mylist.findOne({
      where: {
        nickname,
        listId,
      },
    });

    if (content != null && existsList) {
        existsList.content = content;
      await existsList.save();
      res.send({ "message": "리스트를 수정하였습니다." })
    } else {
      res.status(400).send({ "message": "리스트 내용이 입력되지 않았거나, 수정할 리스트가 없습니다." });
    }
  })

//개인 할일 생성  
router.post("/my-lists/:nickname", async (req, res) => {
    const { nickname } = req.params; //authMiddleware 구현 후 res.locals.user에서 받아와도 됨.
    const { content } = req.body;
    const done = 0;


    if (content != null) {
        await Mylist.create({ nickname, content, done });
        res.send({ "message": "리스트 작성에 성공하였습니다." })
    } else {
        res.status(400).json({ success: false, errorMessage: "리스트 내용을 입력해주세요." });
    }

});


module.exports = router;