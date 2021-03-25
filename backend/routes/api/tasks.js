const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()

const {User,List, Task, Comment} = require('../../db/models');

router.get('/:id', asyncHandler(async(req,res) => {
    const taskId = Number(req.params.id)

    const task = await Task.findByPk(taskId, {
        include: [
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
