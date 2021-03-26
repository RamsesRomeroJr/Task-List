const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()

const {User,List, Task, Comment} = require('../../db/models');

router.post('/create', asyncHandler(async(req,res) => {
    const {
        userId,
        taskId,
        content
    } = req.body

    await Comment.create(
        {
            userId,
            taskId,
            content
        }
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

router.put('/update/:id', asyncHandler(async(req,res) => {
    const commentId = Number(req.params.id)

    const {
        content,
        taskId
    } = req.body

    await Comment.update(
        {content},
        {where: {id: commentId}}
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

router.delete('/delete/:id', asyncHandler(async(req,res) => {
    const commentId = Number(req.params.id)
    const {
        taskId
    } = req.body

    await Comment.destroy(
        {where: {id: commentId}}
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
