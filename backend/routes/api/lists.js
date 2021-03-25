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
}))

module.exports = router;
