const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/download', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'download.html'));
});

module.exports = router;
