const data = require('./data.js');
const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    // console.log(req.originalUrl);
    if (!req.session.user) res.redirect('/');
    next();
});

router.get('/', (req, res) => {
    res.render('createPage', { css: 'createPage' });
});

router.post('/', async(req, res) => {
    let id = await data.createBoard(req.session.user.name, req.body);
    res.redirect('/tables/' + id);
});

module.exports = router;