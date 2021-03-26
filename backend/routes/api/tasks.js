const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()

const {User,List, Task, Comment} = require('../../db/models');

router.get('/:id', asyncHandler(async(req,res) => {
    const taskId = Number(req.params.id)

    const task = await Task.findByPk(taskId, {
        include: [
            {
                model: List
            },
            {
                model: Comment
            },
            {
                model: User
            }
        ]
    })
    res.json({task: task})
}))

router.put('/update/:id', asyncHandler(async(req,res) => {
    const taskId = Number(req.params.id)

    const {
        title,
        description
    } = req.body

    await Task.update(
        {title,
        description},
        {where: {id:taskId}}
    )

    const task = await Task.findByPk(taskId, {
        include: [
            {
                model: List
            },
            {
                model: Comment
            },
            {
                model: User
            }
        ]
    })
    res.json({task: task})

}));

router.put('/check/:id', asyncHandler(async(req,res) => {
    const taskId = Number(req.params.id)

    const oldTask = await Task.findByPk(taskId)

    await Task.update(
        {complete: (!oldTask.complete)},
        {where: {id: taskId}}
    )

    const task = await Task.findByPk(taskId, {
        include: [
            {
                model: List
            },
            {
                model: Comment
            },
            {
                model: User
            }
        ]
    })
    res.json({task: task})
}))

router.post('/create', asyncHandler(async(req,res) => {
    const {
        listId,
        userId,
        title,
        description
    } = req.body

    await Task.create(
        {listId,userId,title,description, complete:false}
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
}));

router.delete('/delete/:id', asyncHandler(async(req,res) => {
    const taskId = Number(req.params.id);

    const task = await Task.findOne({
        where: {
            id: taskId
        },
        include: [{
            model: Comment
        }]
    })

    for(let i =0; i< task.Comments.length; i++){
        let comment = task.Comments[i]
        await Comment.destroy({
            where: {
                id: comment.id
            }
        })
    }

    await Task.destroy({
        where:{
            id: taskId
        }
    })

    res.json({message: 'deleted'})
}))

module.exports = router;
