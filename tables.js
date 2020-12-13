const data = require('./data.js');
const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    if (!req.session.user) res.redirect('/');
    next();
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.render('elementPage', { css: 'elementPage' });
});

router.get('/:id', async(req, res) => {
    let board = await data.getBoard(req.session.user.name, req.params.id);
    console.log(board);
    res.render('elementPage', { css: 'elementPage', board: board });
});

router.put('/:id', async(req, res) => {
    console.log('put method work');
});



module.exports = router;