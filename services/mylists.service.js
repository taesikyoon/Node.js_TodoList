const MylistsRepository = require("../repositories/mylists.repository");

class MylistsService {
    mylistsRepository = new MylistsRepository();

    //개인 할일 조회
    findAllMylists = async (userId) => {
        const allMylists = await this.mylistsRepository.findAllMylists(userId);


        return allMylists.map((mylist) => {
            return {
                listId: mylist.listId,
                userId: mylist.userId,
                content: mylist.content,
                done: mylist.done,
                order: mylist.order,
                createdAt: mylist.createdAt,
                updatedAt: mylist.updatedAt,
            };
        });
    };


    //개인 할일 생성
    createMylist = async (userId, content) => {
        if (content.length) {
            const maxOrder = await this.mylistsRepository.findMaxOrderlist(       //이미 저장된 리스트 중 order 값이 제일 큰 리스트 조회
                userId
            )

            let order = 1;

            if (maxOrder) {                                                       //제일 큰 order 값이 있을 경우 +1을 하여 
                order = maxOrder.order + 1;                                       //생성하는 리스트의 order값으로 저장
            } else order = 1;                                                     //저장된 리스트가 없다면 order 값은 1로 저장

            await this.mylistsRepository.createMylist(
                userId,
                content,
                order
            )

            return;

        }


    }


    //개인 할일 수정
    updateMylist = async (userId, listId, content) => {
        const mylist = await this.mylistsRepository.findMylist(
            userId,
            listId
        )

        if (!content || !mylist) throw new Error("리스트 내용이 입력되지 않았거나, 수정할 리스트가 없습니다.");

        await this.mylistsRepository.updateMylist(
            userId,
            listId,
            content,
        )

        return;

    };


    //개인 할일 삭제
    deleteMylist = async (userId, listId) => {
        const mylist = await this.mylistsRepository.findMylist(
            userId,
            listId
        )

        if (!mylist) throw new Error("삭제할 리스트가 없습니다.");

        await this.mylistsRepository.deleteMylist(
            userId,
            listId
        )

        return;
    }


    //개인 할일 완료
    doneMylist = async (userId, listId) => {
        const mylist = await this.mylistsRepository.findMylist(
            userId,
            listId
        )

        if (!mylist) throw new Error("리스트가 존재하지 않습니다.");

        let done = 0;                                                        //done이 1이면 TRUE(할일완료), done이 0이면 FALSE(할일미완료)
        if (mylist.done === false) {                                         //처음 생성할 때는 done 값이 0(할일미완료)
            done = 1;                                                        //done값이 0이면 1로 재할당하여 저장(체크완료)
        } else { done = 0; }                                                 //done값이 1이면 0으로 재할당하여 저장(체크해제)

        const doneList = await this.mylistsRepository.doneMylist(
            userId,
            listId,
            done
        )

        return doneList;
    }


    //개인 할일 순서 변경
    orderMylist = async (userId, listId, order) => {
        if (!order) throw new Error("변경할 자리(order)가 입력되지 않았습니다.");

        const existsList = await this.mylistsRepository.findMylist(
            userId,
            listId
        )

        if (!existsList) throw new Error("리스트가 존재하지 않습니다.");

        const existsOrder = existsList.order;                                   //현재 리스트의 order 값을 existOrder 값으로 저장

        await this.mylistsRepository.targetMylist(                              //변경할 자리 리스트의 order 값에 existOrder 값 저장
            userId,
            order,
            existsOrder
        )

        await this.mylistsRepository.orderMylist(                               //현재 리스트의 order 값에 body에 입력했던 order 값 저장
            userId,
            listId,
            order
        )

        return;

    }

}

module.exports = MylistsService;