var mongoose = require('./db.js'), 
Schema = mongoose.Schema; 
let UserSchema = new Schema(
  {
  userId:{type: String},
  userName:{type: String},
  userPwd:{type: String},
  cartList:[
    {
      _id:{type: String},
      productName:{type: String},
      prodcutPrice:{type: String},
      prodcutImg:{type: String},
      checked:{type: Boolean},
      productNum:{type: Number},
    }
  ],
  orderList:{type: Array},
  addressList : [
    {
      addressId:{type: String},
      userName:{type: String},
      street:{type: String},
      tel:{type: String},
      postCode:{type: Number}, 
      isDefault: {type: Boolean}, 
    }
  ]
})
module.exports = mongoose.model('User',UserSchema);