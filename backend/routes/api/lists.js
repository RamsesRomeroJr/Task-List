const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()

const {User,List, Task, Comment} = require('../../db/models');

router.get('/', asyncHandler(async (req,res) =>{

    const list = await List.findAll( {
        include:[
            {
                model: User,
            },
            {
                model: Task,
                order: [
                    [Task, 'creatidedAt', 'ASC']
                ],
                include : {
                    model: Comment
                }
            },
        ]
    });

    res.json({lists: list})
}));

router.post('/create', asyncHandler(async(req,res) => {
    const {
        userId,
        title
    } = req.body;

    await List.create(
        {userId, title}
    )
    const list = await List.findAll( {
        include:[
            {
                model: User,
            },
            {
                model: Task,
                order: [
                    [Task, 'creatidedAt', 'ASC']
                ],
                include : {
                    model: Comment
                }
            },
        ]
    });

    res.json({lists: list})
}))


router.delete('/delete/:id', asyncHandler(async(req,res) => {
    const listId = Number(req.params.id)
    const tasks = {}
    const commentIds = []
    const {userId} = req.body

    const list = await List.findOne({
        where: {
            id: listId,
            userId
        },
        include: [
            {
                model: Task,
                include: {
                    model: Comment
                }
            }
        ]
    })
    //loop to grab all associated tasks
    for(const i in list.Tasks ){
        let task = list.Tasks[i]
        tasks[i] = task
    }
    let taskKeys = Object.keys(tasks)
    let j = 0;
    let k = 0;

    //loop to grab all comments associated with each task
    while(j < taskKeys.length){
        let currTaskComments = tasks[j].Comments
        if(!currTaskComments.length || k === currTaskComments.length){
            j++
            k = 0;
            continue
        }
        else if(currTaskComments.length){
            let commentId = currTaskComments[k].id
            commentIds.push(commentId)
            k++
            continue
        }
    }
    for(let i in commentIds){
        Comment.destroy({
            where: {
                id: commentIds[i]
            }
        })
    }
    for(let i in tasks){
        Task.destroy({
            where: {
                id: tasks[i].id
            }
        })
    }

    list.destroy()

    const lists = await List.findAll( {
        include:[
            {
                model: User,
            },
            {
                model: Task,
                order: [
                    [Task, 'creatidedAt', 'ASC']
                ],
                include : {
                    model: Comment
                }
            },
        ]
    });

    res.json({lists: lists})
}))

module.exports = router;
