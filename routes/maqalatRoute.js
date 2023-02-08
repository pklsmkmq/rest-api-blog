var express = require('express');
var router = express.Router();
const verify = require('../middleware/verify');
const { upload } = require('../middleware/upload');
const { getMaqalat, getDetailMaqalat, getDataByAlfia, saveMaqalat, updateMaqalat, deleteMaqalat, getMaqalatWithTaeliq } = require('../controller/maqalatController');

//user
router.get("/", getMaqalat);
router.get("/tafasil/:slug", getDetailMaqalat);
router.get("/alfia/:slug", getDataByAlfia);
//admin
router.get("/taeliq", verify, getMaqalatWithTaeliq);
router.post("/hifz", upload.single("imageMaqalat"), verify, saveMaqalat);
router.put("/yataghayar/:slug", upload.single("imageMaqalat"), verify, updateMaqalat);
router.delete("/hadhf/:slug", verify, deleteMaqalat);

module.exports = router;