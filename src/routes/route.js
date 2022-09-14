const express = require("express");
const router = express.Router();
const collegeControler=require('../controller/collegeController')
const internController=require('../controller/internController')

router.post('/functionup/colleges',collegeControler.createCollege)





module.exports = router;