const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/nsfw', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'nsfw.html'));
});

module.exports = router;
