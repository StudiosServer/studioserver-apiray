const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/ia', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'ia.html'));
});

module.exports = router;
