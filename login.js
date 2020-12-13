const data = require('./data.js');
const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    if (req.session.user) res.redirect('/home');
    next();
});

router.get('/', (req, res) => {
    res.render('register', { css: 'register', auth: 'login', display: 'none' });
});

router.post('/', async(req, res) => {
    let user = await data.isUser(req.body);
    if (user) {
        req.session.user = user;
        res.redirect('/home');
    } else {
        res.render('register', { css: 'register', status: 'error', auth: 'login', display: 'none' });
    }
});
module.exports = router;