const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listRouter = require('./lists.js');
const taskRouter = require('./tasks.js')
const commentRouter = require('./comments.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/lists', listRouter);

router.use('/tasks', taskRouter);

router.use('/comment', commentRouter);

module.exports = router;
