const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/tools', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'tools.html'));
});

module.exports = router;
