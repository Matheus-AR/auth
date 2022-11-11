const express = require('express');
const autentica = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/',autentica, function(req, res) {
    res.json({msg: "Deu certo!", id: req.body.id});
});

module.exports = router;