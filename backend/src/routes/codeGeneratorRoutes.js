const express = require('express');
const router = express.Router();
const { createCode } = require('../controllers/codeGeneratorController');

router.post('/generate-code', createCode);

module.exports = router;
