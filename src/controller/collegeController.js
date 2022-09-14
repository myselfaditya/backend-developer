const collegeModel=require("../model/collegeModel.js")
const mongoose = require('mongoose')

const isValid =function(value){
    if(typeof value === "undefined"|| value  === null) return false
    if(typeof value ==='string' && value.trim().length===0) return false
    return true
}

const createCollege=async function(req,res){
    data = req.body;

    //checking for the empty data
    if((Object.keys(data).length == 0) ) {return res.status(400).send({status:false,messege:"please provide some values"})}

    //cheking the credentials to be true
    let{name,fullName,logoLink}=data
    if(!isValid(name)) return res.status(400).send({status:false,messege:"please provide name"})
    if(!isValid(fullName)) return res.status(400).send({status:false,messege:"please provide fullName"})
    if(!isValid(logoLink)) return res.status(400).send({status:false,messege:"please provide logoLink"})
    
    let isDeleted=req.body.isDeleted
    if(isDeleted){return res.status(400).send({status:false,messege:"You cant delete data"})}
    

    let saveCollege=await collegeModel.create(data);
    return res.status(201).send({status:true,data:saveCollege});
}

module.exports.createCollege=createCollege;



// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, 
// logoLink: {mandatory}, isDeleted: {boolean, default: false} }