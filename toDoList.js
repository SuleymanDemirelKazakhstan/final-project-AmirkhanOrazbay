const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    // console.log(req.originalUrl);
    if (!req.session.user) res.redirect('/');
    next();
});

router.get('/', (req, res) => {
    res.render('to-doList', { css: 'to-doList' });
});

module.exports = router;