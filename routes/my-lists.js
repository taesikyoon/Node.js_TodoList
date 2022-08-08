const express = require('express');
const router = express.Router();
const { Mylist } = require("../models")
const authMiddleware = require("../middlewares/auth-middleware")


//개인 할 일 조회
router.get("/my-lists/:userId", async (req, res) => {
  const { userId } = req.params; //authMiddleware 구현 후 res.locals.user에서 받아와도 됨.

  const mylists = await Mylist.findAll({
    where: { userId },
    order: [['order', 'DESC']]
  });

  if (!mylists.length) {
    res.status(404).send({ "message": "리스트가 존재하지 않습니다." });
  } else {
    res.send({ mylists });
  }
});


//개인 할일 삭제 
router.delete("/my-lists/:userId/:listId", async (req, res) => {
  const { userId } = req.params; //authMiddleware 구현 후 res.locals.user에서 받아와도 됨.
  const { listId } = req.params;

  const existsList = await Mylist.findOne({
    where: {
      userId,
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
router.put("/my-lists/:userId/:listId", async (req, res) => {
  const { userId } = req.params; //authMiddleware 구현 후 res.locals.user에서 받아와도 됨.
  const { listId } = req.params;
  const { content } = req.body;

  const existsList = await Mylist.findOne({
    where: {
      userId,
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
router.post("/my-lists/:userId", async (req, res) => {
  const { userId } = req.params; //authMiddleware 구현 후 res.locals.user에서 받아와도 됨.
  const { content } = req.body;
  const done = 0;
  const maxOrder = await Mylist.findOne({
    where: {userId},
    order: [['order','DESC']],
  })

  let order = 1;

  if(maxOrder) {
    order = maxOrder.order + 1;
  }

  console.log(userId, content, order)

  if (content != null) {
    await Mylist.create({ userId, content, done, order });
    res.send({ "message": "리스트 작성에 성공하였습니다." })
  } else {
    res.status(400).json({ success: false, errorMessage: "리스트 내용을 입력해주세요." });
  }

});

//개인 할일 완료
router.patch("/my-lists/done/:userId/:listId", async (req, res) => {
  const { userId } = req.params; //authMiddleware 구현 후 res.locals.user에서 받아와도 됨.
  const { listId } = req.params;

  const existsList = await Mylist.findOne({
    where: {
      userId,
      listId,
    },
  });

  if (existsList.done === false) {
    existsList.done = 1;
    await existsList.save();
    res.send({ "message": "할일 완료 체크되었습니다." })
  } else {
    existsList.done = 0;
    await existsList.save();
    res.send({ "message": "할일 완료 체크 해제되었습니다." })
  }

});

//개인 할일 순서변경
router.patch("/my-lists/:userId/:listId", async (req, res) => {
  const { userId } = req.params; //authMiddleware 구현 후 res.locals.user에서 받아와도 됨.
  const { listId } = req.params;
  const { order } = req.body;


  const existsList = await Mylist.findOne({
    where: {
      userId,
      listId,
    },
  });


  if (order) {
    const targetList = await Mylist.findOne({where: {order}});
    if (targetList) {
      targetList.order = existsList.order
      await targetList.save();
    }
    existsList.order = order;
    await existsList.save();
    res.send({ "message": "순서 변경되었습니다." })
  } else {
    res.status(400).json({ success: false, errorMessage: "변경할 리스트가 없습니다." });
  }

});

module.exports = router;