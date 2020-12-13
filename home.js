const path = require('path');
const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    // console.log(req.originalUrl);
    if (!req.session.user) res.redirect('/');
    next();
});

router.get('/', (req, res) => {
    res.render('listPage', { css: 'listPage' });
});

module.exports = router;