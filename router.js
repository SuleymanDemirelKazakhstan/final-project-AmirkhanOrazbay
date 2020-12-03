const express = require('express');

const mainRouter = require('./main.js');
const cssRouter = require('./css.js');
const scriptRouter = require('./script.js');
const imgRouter = require('./img.js');
const htmlRouter = require('./html.js');

const router = express.Router();

router.use('/', mainRouter);
router.use('/css', cssRouter);
router.use('/script', scriptRouter);
router.use('/img', imgRouter);
router.use('/html', htmlRouter);

module.exports.router = router;