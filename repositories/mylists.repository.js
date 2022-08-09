const { Mylist } = require("../models");

class MylistsRepository {

    //개인 리스트 전체 조회(order 내림차순)
    findAllMylists = async (userId) => {
        const mylists = await Mylist.findAll({
            where: { userId },
            order: [['order', 'DESC']]
        });

        return mylists;
    };


    //userId로 order 값이 제일 큰 리스트 조회   
    findMaxOrderlist = async (userId) => {
        const maxOrder = await Mylist.findOne({
            where: { userId },
            order: [['order', 'DESC']],
        })

        return maxOrder;
    }


    //개인 리스트 생성(done 초기값은 0, 미완료상태)
    createMylist = async (userId, content, order) => {
    
        await Mylist.create({
            userId,
            content,
            done: 0,
            order,
        });

        return; 
    }

    //userId와 listId로 개인 리스트 조회
    findMylist = async (userId, listId) => {
        const mylist = await Mylist.findOne({
            where: { userId, listId },
        })

        return mylist;
    }

    //개인 리스트 content 수정
    updateMylist = async (userId, listId, content) => {
        await Mylist.update(
            { content },
            { where: { userId, listId }}
        );

        return;
    }

    //개인 리스트 삭제
    deleteMylist = async (userId, listId) => {
        await Mylist.destroy({
            where: {userId, listId}
        });

        return;
    }

    //개인 리스트 완료 체크, 해제(done 수정)
    doneMylist = async (userId, listId, done) => {
        await Mylist.update(
            { done },
            { where: { userId, listId }}
        );

        return done;
    }

    //개인 리스트 순서변경 - 현재리스트와 타켓리스트의 order값 바꿔 저장
    targetMylist = async (userId, order, existsOrder) => {
        await Mylist.update(
            { order: existsOrder },
            { where: { userId, order }}
        );

        return;
    }

    //개인 리스트 순서변경 - 현재리스트와 타켓리스트의 order값 바꿔 저장
    orderMylist = async (userId, listId, order) => {
        await Mylist.update(
            { order },
            { where: { userId, listId }}
        );

        return;
    }



}

module.exports = MylistsRepository;