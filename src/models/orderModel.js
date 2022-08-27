const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
//const date = Schema.Types.Date
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    productId: {
      type:ObjectId,
      ref:"Product"
    },
    amount: {
      type: Number
    },
    isFreeAppUser: {
      type: Boolean
    },
    date:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
