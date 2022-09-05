const router = require('express').Router();
const User = require('../models/user.model');
const signin_controller=require('../controllers/signin_controller')
//router.get('/',(req,res)=>{res.send("test")});
router.post('/',signin_controller.signin);
router.post('/otp',signin_controller.otp);
module.exports = router;


