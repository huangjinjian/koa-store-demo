let ObjectId = require("mongodb").ObjectId;
let db = require("../models/mongodb");

require("../util/util");
let User = require("./user.js");

module.exports = {
  login({ userName, userPwd }) {
    return db.find("users", { userName, userPwd });
  },
  checkoutLogin(user_id) {
    return db.find("users", { _id: ObjectId(user_id) });
  },
  cartList({ user_id }) {
    return db.find("users", { _id: ObjectId(user_id) });
  },
  editCart({
    productNum,
    checked,
    _id,
    user_id,
    checkAllOnoff = false,
    checkAll = true
  }) {
    return new Promise((res, rej) => {
      User.findById(user_id, (err, doc) => {
        if (err) {
          rej(err);
        } else {
          switch (checkAllOnoff) {
            case false:
              let itemIndex = 0;
              doc.cartList.forEach((item, index) => {
                if (item["_id"] == _id) {
                  itemIndex = index;
                }
              });
              if (productNum > 0) {
                //编辑商品
                doc.cartList[itemIndex]["productNum"] = productNum;
                doc.cartList[itemIndex]["checked"] = checked;
              } else {
                //移除商品
                doc.cartList.splice(itemIndex, 1);
              }
              break;
            default:
              doc.cartList = doc.cartList.map(item => {
                item.checked = checkAll;
                return item;
              });
              break;
          }
          doc.save((err, updateDoc) => {
            if (err) {
              rej(err);
            } else {
              res(updateDoc);
            }
          });
        }
      });
    });
  },
  editAddr({
    type,
    user_id,
    userName,
    street,
    tel,
    postCode,
    isDefault,
    addressId
  }) {
    return new Promise((res, rej) => {
      User.findById(user_id, (err, doc) => {
        if (err) {
          rej(err);
        }
        switch (type) {
          case "add":
            let timestamp = new Date().getTime() + "";
            let random = Math.floor(Math.random() * 100 + 1) + "";
            let id = timestamp + random;
            if (isDefault) {
              doc.addressList.forEach(item => {
                item.isDefault = false;
              });
            }
            doc.addressList.push({
              addressId: id,
              userName,
              tel,
              street,
              postCode,
              isDefault
            });
            break;
          case "del":
            let delIndex = 0;
            doc.addressList.forEach((item, index) => {
              delIndex = item.addressId == addressId ? index : delIndex;
            });
            doc.addressList.splice(delIndex, 1);
            if (isDefault && doc.addressList.length > 0) {
              doc.addressList[0].isDefault = true;
            }
            break;
          case "default":
            let setIndex = 0;
            doc.addressList.forEach((item, index) => {
              setIndex = item.addressId == addressId ? index : setIndex;
              item.isDefault = false;
            });
            doc.addressList[setIndex].isDefault = true;
            break;
          default:
            break;
        }

        doc.save((err, updateDoc) => {
          if (err) {
            rej(err);
          } else {
            res(updateDoc);
          }
        });
      });
    });
  },
  addressList({ user_id }) {
    return new Promise((res, rej) => {
      User.findById(user_id, (err, doc) => {
        if (err) {
          rej(err);
          return false;
        }
        res(doc);
      });
    });
  },
  payment({ user_id, addrId }) {
    return new Promise((res, rej) => {
      User.findById(user_id, (err, doc) => {
        if (err) {
          rej(err);
          return false;
        }
        let order = {
          orderId: "",
          productList: [],
          total: 0,
          addr: {},
          creatDate: ""
        };

        var platform = "6220-";
        var r1 = Math.floor(Math.random() * 10);
        var r2 = Math.floor(Math.random() * 10);
        var sysDate = new Date().Format("yyyyMMddhhmmss");
        var createDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
        order.orderId = platform + r1 + sysDate + r2;
        order.creatDate = createDate;

        let delArr = [];
        doc.cartList.forEach((item, index) => {
          if (item.checked) {
            delArr.unshift(index);
            order.productList.push(item);
            order.total += item.prodcutPrice * item.productNum;
          }
        });
        doc.addressList.forEach((item, index) => {
          order.addr = item.addressId == addrId ? item : order.addr;
        });

        delArr.forEach(item => {
          doc.cartList.splice(item, 1);
        });

        doc.orderList.push(order);
        doc.save((err, updateDoc) => {
          if (err) {
            rej(err);
          } else {
            res({ orderId: order.orderId, creatDate: order.creatDate });
          }
        });
      });
    });
  }
};
