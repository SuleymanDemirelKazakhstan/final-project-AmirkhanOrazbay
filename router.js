const express = require('express');

const mainRouter = require('./main.js');
const fileRouter = require('./file.js');
const createRouter = require('./createTable.js');
const tablesRouter = require('./tables.js');
const homeRouter = require('./home.js');
const registerRouter = require('./register.js');
const loginRouter = require('./login.js');
const toDoListRouter = require('./toDoList.js');


const router = express.Router();

router.use('/', mainRouter);
router.use('/file', fileRouter);
router.use('/create', createRouter);
router.use('/tables', tablesRouter);
router.use('/home', homeRouter);
router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/to-doList', toDoListRouter);

module.exports.router = router;