const express = require('express');
const router = express.Router();

// Definir la ruta de ejemplo
router.get('/activator', (req, res) => {
  res.json({
    creator: "Studio Sever",
    status: true
    
  });
});

module.exports = router;
