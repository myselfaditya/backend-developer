const express = require("express");
const router = express.Router();
const collegeControler=require('../controller/collegeController')
const internController=require('../controller/internController')

router.post('/functionup/colleges',collegeControler.createCollege)

router.post('/functionup/interns',internController.createIntern)

router.get('/functionup/collegeDetails',internController.getIntership)







module.exports = router;