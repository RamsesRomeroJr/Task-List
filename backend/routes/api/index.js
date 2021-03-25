const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listRouter = require('./lists.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/lists', listRouter);

module.exports = router;
