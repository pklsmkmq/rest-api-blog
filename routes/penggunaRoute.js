const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/penggunaController');

router.post('/qayima', register);

router.post('/tasjil-aldukhul', login);

module.exports = router;
