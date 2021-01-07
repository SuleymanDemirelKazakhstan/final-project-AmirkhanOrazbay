const data = require('./data.js');
const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    if (!req.session.user) res.redirect('/');
    next();
});

router.post('/', (req, res) => {
    res.render('elementPage', { css: 'elementPage' });
});

router.get('/:id', async(req, res) => {
    let board = await data.getBoard(req.session.user.name, req.params.id);
    res.render('elementPage', { css: 'elementPage', board: board });
});

router.put('/:id', async(req, res) => {
    console.log('put method work');
});

router.get('/info/:id', async(req, res) => {
    let board = await data.getBoard(req.session.user.name, req.params.id);
    res.send(board);
});

router.get('/newName/:id/:name', async(req, res) => {
    res.send(await data.updateBoardName(req.params.id, req.params.name));
});

router.get('/status/:type/:id/:status', async(req, res) => {
    res.send(await data.updateStatus(req.params.type, req.params.id, req.params.status));
});
module.exports = router;