const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/:name', (req,res) => {
    res.sendFile(path.join(__dirname + '/script/' + req.params.name));    
});

module.exports = router;