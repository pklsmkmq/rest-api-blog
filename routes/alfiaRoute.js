var express = require('express');
var router = express.Router();
const verify = require('../middleware/verify');
const { upload } = require("../middleware/upload");
const { getAlfia, saveAlfia, updateAlfia, deleteAlfia } = require('../controller/alfiaController');

//user
router.get("/", getAlfia);
//admin
router.post("/hifz", upload.single("imageAlfia"), verify, saveAlfia);
router.put("/yataghayar/:slug", upload.single("imageAlfia"), verify, updateAlfia);
router.delete("/hadhf/:slug", verify, deleteAlfia);

module.exports = router;