const data = require('./data.js');
const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    // console.log(req.originalUrl);
    if (!req.session.user) res.redirect('/');
    next();
});

router.get('/', async(req, res) => {
    let page = req.query.page;
    let collection = await data.getCollection('tbt', 'board');
    let info = { username: req.session.user.name };
    if (page === 'Favorite') info.favorite = "on";
    let result = await collection.find(info).toArray();
    res.render('listPage', { css: 'listPage', tables: result });
});

module.exports = router;