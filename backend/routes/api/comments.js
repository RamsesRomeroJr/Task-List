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

    res.json({message: 'commented'})
}))

router.put('/update/:id', asyncHandler(async(req,res) => {
    const commentId = Number(req.params.id)

    const {content} = req.body

    await Comment.update(
        {content},
        {where: {id: commentId}}
    )

    res.json({message: 'updated'})
}))

module.exports = router;
