const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/:name', (req,res) => {
    const query = req.query;
    query.css = req.params.name;
    console.log(query);
    res.render(req.params.name, query);
});

module.exports = router;