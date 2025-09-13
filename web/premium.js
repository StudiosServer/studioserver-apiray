const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/premium', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'premium.html'));
});

module.exports = router;
