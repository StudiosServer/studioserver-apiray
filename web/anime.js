const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/anime', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'anime.html'));
});

module.exports = router;
