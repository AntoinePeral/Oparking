// on récupère un routeur express
const { Router } = require('express');
const router = Router();
const path = require('path');

router.get('/', (req,res) => {
    let filePath = path.join(__dirname, '../../', 'assets/index.html');
    res.sendFile(filePath);
});

module.exports = router;