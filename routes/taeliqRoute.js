var express = require('express');
var router = express.Router();
const verify = require('../middleware/verify');
const { getTaeliq ,saveTaeliq, getNullTaeliq, changeStatus, deleteTaeliq } = require('../controller/taeliqController');

//user
router.post("/hifz", saveTaeliq);
//admin
router.get("/gettaeliq/:id", verify, getTaeliq);
router.get("/getnull", verify, getNullTaeliq);
router.put("/changestatus/:id", verify, changeStatus);
router.delete("/hadhf/:id", verify, deleteTaeliq);

module.exports = router;