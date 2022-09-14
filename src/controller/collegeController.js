const collegeModel=require("../model/collegeModel.js")

const isvalid =function(vlaue){
    if(typeof value === "undefined"|| value  === null) return false
    if(typeof value===String && vlaue.trim().length===0) return false
    return true
}

const createCollege=async function(req,res){
    data = req.body;
    let{name,fullName,logoLink,isDeleted}=data
    if(!isValid(name)) return res.status(400),send({status:false,messege:"please provide name"})
    if(!isValid(fullName)) return res.status(400),send({status:false,messege:"please provide fullName"})
    if(!isValid(logoLink)) return res.status(400),send({status:false,messege:"please provide logoLink"})
    if(!isValid(isDeleted)) return res.status(400),send({status:false,messege:"please provide isDeleted"})
    if(data=="") return res.status(400).send({status:false,messege:"please provide some values"})
    
    let saveCollege=await collegeModel.create(data);
    return res.status(201).send({status:true,data:saveCollege});
}

router.exports.createCollege=createCollege;



// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, 
// logoLink: {mandatory}, isDeleted: {boolean, default: false} }