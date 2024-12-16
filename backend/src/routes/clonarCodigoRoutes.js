const express = require('express');
const router = express.Router();
const { clonarCodigo } = require('../controllers/clonarCodigoController');

router.post('/', clonarCodigo);

module.exports = router;
