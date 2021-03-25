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

module.exports = router;
