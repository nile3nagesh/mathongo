const router = require("express").Router();
const v = require("../controllers/signup_controller");
router.post("/",v.signup);

module.exports = router;
