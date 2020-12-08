const express = require('express');

const mainRouter = require('./main.js');
const fileRouter = require('./file.js');
const htmlRouter = require('./html.js');

const router = express.Router();

router.use('/', mainRouter);
router.use('/file', fileRouter);
router.use('/html', htmlRouter);

module.exports.router = router;