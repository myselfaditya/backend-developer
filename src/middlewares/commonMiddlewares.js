const userModel= require("../models/userModel")
const orderModel= require("../models/orderModel")
const productModel= require("../models/productModel")




// const mid1= function ( req, res, next) {
//     req.falana= "hi there. i am adding something new to the req object"
//     console.log("Hi I am a middleware named Mid1")
//     next()
// }

// const mid2= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid2")
//     next()
// }

// const mid3= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid3")
//     next()
// }

// const mid4= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid4")
//     next()
// }

const mid1=async function ( req, res, next) {
    const header=req.headers.isfreeappuser
    if(!header){
       return res.send("header is missing provide it")
    }
    next()
}

const mid2=async function ( req, res, next) {
    let data = req.body;
    let isproduct = await productModel.findOne({ _id: data.productId });
    let isuser = await userModel.findOne({ _id: data.userId });
  
    if (isproduct && isuser) {
     next()
    } else if (!isproduct || !isuser) {
      return res.send("error please provide product id and user id ");
    } 
  }

module.exports.mid1= mid1
module.exports.mid2= mid2
// module.exports.mid3= mid3
// module.exports.mid4= mid4
