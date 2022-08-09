const MylistsService = require("../services/mylists.service");

class MylistsController {
    mylistsService = new MylistsService();


    //개인 할일 조회
    getMylists = async (req, res, next) => {
        const { userId } = res.locals;
        const mylists = await this.mylistsService.findAllMylists(userId);

        if (!mylists.length) {
            res.status(404).send("리스트가 존재하지 않습니다.");
        } else {
            res.status(200).json({ data: mylists });
        }
        return;
    };


    //개인 할일 생성
    createMylist = async (req, res, next) => {
        const { userId } = res.locals;
        const { content } = req.body;

        try {
            await this.mylistsService.createMylist(
                userId,
                content
            );
            res.status(200).json({ message: "리스트 작성에 성공하였습니다." });
        } catch (err) {
            res.status(400).json({ errorMessage: "리스트 내용을 입력해주세요." });
            return;
        }

    }


    //개인 할일 수정
    updateMylist = async (req, res, next) => {
        const { userId } = res.locals;
        const { listId } = req.params;
        const { content } = req.body;

        try {
            await this.mylistsService.updateMylist(
                userId,
                listId,
                content
            );

            return res.status(200).json({ message: "리스트를 수정하였습니다." })
        } catch (err) {
            res.status(400).send(err.message)
            return;
        }

    }


    //개인 할일 삭제
    deleteMylist = async (req, res, next) => {
        const { userId } = res.locals;
        const { listId } = req.params;

        try {
            await this.mylistsService.deleteMylist(
                userId,
                listId
            );

            return res.status(200).json({ message: "리스트를 삭제하였습니다." })
        } catch (err) {
            res.status(400).send(err.message)
            return;
        }

    }


    //개인 할일 완료
    doneMylist = async (req, res, next) => {
        const { userId } = res.locals;
        const { listId } = req.params;

        try {
            const doneList = await this.mylistsService.doneMylist(
                userId,
                listId
            );

            if (doneList === 1) {               //done이 1이면 TRUE(할일완료), done이 0이면 FALSE(할일미완료)
                res.status(200).send("할일 완료 체크되었습니다.");
            } else {
                res.status(200).send("할일 완료 체크 해제되었습니다.");
            }
        } catch (err) {
            res.status(400).send(err.message)
            return;
        }

    }


    //개인 할일 순서 변경
    orderMylist = async (req, res, next) => {
        const { userId } = res.locals;
        const { listId } = req.params;
        const { order } = req.body;      // 현재 리스트의 order 값이 아니라, 변경하고 싶은 자리의 order 값 입력

        try {
            await this.mylistsService.orderMylist(
                userId,
                listId,
                order
            );

            return res.status(200).json({ message: "리스트 순서 변경되었습니다." })
        } catch (err) {
            res.status(400).send(err.message)
            return;
        }

    }




}

module.exports = MylistsController;