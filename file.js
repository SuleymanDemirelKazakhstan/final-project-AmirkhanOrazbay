const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/:folder/:name', (req,res) => {
    res.sendFile(path.join(__dirname + '/' + req.params.folder + '/' + req.params.name));
});

module.exports = router;