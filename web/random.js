const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/random', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'random.html'));
});

module.exports = router;
