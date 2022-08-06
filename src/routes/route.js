const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();
const logger = require('../logger/logger')
const helper=require("../util/helper")
const formatter=require("../validator/formatter")

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
    logger.fun1()
    console.log("current date is :",helper.currentDate)
    console.log("current Month is :",helper.currentMonth)
    helper.getBatchInfo()
    formatter.stringTrim()
    formatter.changeToLowerCase()
    formatter.changeToUpperCase()
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason