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

router.put('/update/:id', asyncHandler(async(req,res) => {
    const listId = Number(req.params.id)

    const {
        userId,
        title
    } = req.body;

    await List.update(
        {title},
        {where: {id: listId, userId}}
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
    //loop to grab all associated tasks and add them to object
    for(const i in list.Tasks ){
        let task = list.Tasks[i]
        tasks[i] = task
    }

    //used to count how many task there are
    let taskKeys = Object.keys(tasks)
    let j = 0;
    let k = 0;

    //loop to grab all comments associated with each task
    while(j < taskKeys.length){
        //grabs comments of current task
        let currTaskComments = tasks[j].Comments
        //if task don't got comments or if we reached end of current comments array
        if(!currTaskComments.length || k === currTaskComments.length){
            j++
            k = 0;
            continue
        }
        // double checks that comments exist
        else if(currTaskComments.length){
            //grabs comments id and adds it to array
            let commentId = currTaskComments[k].id
            commentIds.push(commentId)
            k++
            continue
        }
    }
    //loops through all comments and deletes them
    for(let i in commentIds){
        Comment.destroy({
            where: {
                id: commentIds[i]
            }
        })
    }
    //loops through task and deletes them
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
