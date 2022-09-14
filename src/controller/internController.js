const collegeModel=require('../model/collegeModel')
const internModel = require("../model/internModel")

const getIntership=async function(req,res){
    const collegeName=req.query.name
    const saveData=await collegeModel.find({name:collegeName})
    if(!savedData) res.status(400).send({status:false,messege:"No college appears with this college name"});
    console.log(data._id)

    // const data=await internModel.find(data._id);
    
    
     
    return res.send({status:true,data:savedData});

}

//const regex= 
// const isValid = function(value){
//     if(typeof value === 'undefined' || value === null) 
//     {return false }
//     if(typeof value === "string" && value.trim().length===0){
//         return false
//     }
//     return true;
// }


//--------------------------create Intern--------------------------//

const createIntern = async function(req, res){
    try{
        data=req.body
    let { name, mobile, email, collegeId} = data


      var isValidData = function(data){
        return Object.keys(data).length> 0;
      }


    if(!name)
    {return res.status(400).send({status:false, msg:"College name is mandatory"})}

    if(!mobile)
    {return res.status(400).send({status:false, msg:"mobile no. is mandatory"})}
    
    if(!email)
    {return res.status(400).send({status:false, msg:"email is mandatory"})}

    if(!collegeId)
    {return res.status(400).send({status:false, msg:"college is mandatory"})}

//-------mobile validation-------------//

let  isValidMobile = function (mobile) { return /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(mobile) }
if(!isValidMobile(mobile)) { return res.status(400).send({status:false, msg: "invalid mobile no."})}

let  uniqueMobile = await internModel.findOne({mobile})
if(uniqueMobile) {return res.status(400).send({status:false, msg: "this number already exist"})}


//-----------email validation----------------//

 const validEmail = function (email) { return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email) }
if(!validEmail(email)){ return res.status(401).send({status:false, msg: "invalid email"})}

const uniqueEmail = await internModel.findOne({email})
if(uniqueEmail){
    return res.status(401).send({staus:false, msg: "already exist email"})
}



const createData = await internModel.create(data)
    return res.status(201).send({status:true,msg: "created data", data:createData});

    } catch(err){
        res.status(500).send({status:false, msg:err.message })
    }
}
module.exports = {createIntern}


module.exports.getIntership=getIntership