const email = require('./email.js');
const data = require('./data.js');
const express = require('express');

const router = express.Router();

// router.use(function(req, res, next) {
//     req.session.email = req.query.email;
//     if (req.session.email) res.redirect('/register');
//     next();
// });

router.get('/', (req, res) => {
    res.render('register', { email: req.query.email, css: 'register', auth: 'register' });
});

router.post('/', async(req, res) => {
    let newUser = await data.addUser(req.body);
    await email.sendMailTo(newUser);
    res.send('<h1>Check you email</h1>');
});

module.exports = router;