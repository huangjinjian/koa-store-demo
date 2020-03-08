
let User = require("./user.js"); 
let db = require("../models/mongodb");

module.exports = {
  // 加入購物車
  productAdd:  ({userId,productName,prodcutPrice , prodcutImg ,_id}) =>{
    return new Promise( (res,rej)=>{
      User.findById(userId,(err,doc)=>{
        if(err){
          res(err)
        }else{
          let existed = ''
          let index = 0
          doc.cartList.forEach((item,index)=>{
            if(item['_id'] == _id){
              index = index
              existed = true
            }
          })
          if(!existed){
            doc.cartList.push({
              _id,
              productName,
              prodcutPrice,
              prodcutImg,
              checked:true,
              productNum:1
            })
          }else{
            doc.cartList[index].checkout  = true
            doc.cartList[index].productNum += 1
          }
          doc.save(function (err, updatedTank) {
            if (err) {
              rej(err)
            }else{
              res(updatedTank);
            }
          })
        }
      })
    })
  },
  goodList ( cName ,{ page =1, size = 5 , options = {},sort = 0,startPrice = 0,endPrice =200000})  {
    if(!parseInt(sort)){
      return new Promise((resole, reject) => {
        db.connect((client, db) => {
          db.collection(cName)
            .find({'prodcutPrice':{$gt:parseInt(startPrice),$lte:parseInt(endPrice)}}).skip( (parseInt(page)-1)*size).limit(parseInt(size))
            .toArray((err, docs) => {
              if (err) {
                reject(err);
              } else {
                resole(docs);
              }
              client.close();
            });
        });
      });
    }else{
      return new Promise((resole, reject) => {
        db.connect((client, db) => {
          db.collection(cName)
            .find({'prodcutPrice':{$gt:parseInt(startPrice),$lte:parseInt(endPrice)}}).skip( (parseInt(page)-1)*size).limit(parseInt(size)).sort({prodcutPrice:parseInt(sort)})
            .toArray((err, docs) => {
              if (err) {
                reject(err);
              } else {
                resole(docs);
              }
              client.close();
            });
        });
      });
    }
  }
}