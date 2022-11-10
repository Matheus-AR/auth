const express = require('express');
const autentica = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/',autentica, function(req, res) {
    res.json({msg: "Deu certo!"});
});

module.exports = router;