const orderModel = require("../models/orderModel")


const createOrder = async function (req, res) {
  let data = req.body;
  const savedData=await orderModel.create(data)
  let allData=await orderModel.find(savedData).populate("userId",{balance:1})
 res.send(allData)
};

module.exports.createOrder = createOrder;
