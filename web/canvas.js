const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/canvas', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'canvas.html'));
});

module.exports = router;
