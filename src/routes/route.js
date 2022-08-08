const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();
const logger = require('../logger/logger')
const helper=require("../util/helper")
const formatter=require("../validator/formatter")
const ldash=require("lodash")

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
   //chunk function 
    const arr1 = ["January","February","March","April","May","June","July","August",
    "September","October","November","December"];
    console.log(ldash.chunk(arr1,[sixe=3]))
    // tail function
    const arr2 = [1,3,5,7,9,11,13,15,17,19]
    console.log(ldash.tail(arr2))
    // function union
    const a1=[1,7,56]
    const a2=[56,57]
    const a3=[79,57]
    const a4=[64,98]
    const a5=[25,245]
    console.log(ldash.union(a1,a2,a3,a4,a5))
    // function fromPairs
    const movie=[['horror',"The Shining"],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']]
    console.log(ldash.fromPairs(movie))
});




router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason