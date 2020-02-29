let db = require("../lib/mongodb");

module.exports = {
  // 添加商品
  addProduct: async (ctx, next) => {
    try {
      let res = await db.insert("goods", [
        {
          productId: "10001",
          productName: "15a米6",
          prodcutPrice: 12,
          prodcutImg: "15.jpg"
        },
        {
          productId: "10002",
          productName: "16a本",
          prodcutPrice: 14,
          prodcutImg: "16.jpg"
        }
      ]);
      ctx.body = {
        state: 0,
        msg: "suc",
        data: ""
      };
    } catch (err) {
      ctx.body = {
        state: 1,
        msg: err.message
      };
    }
  },
  // 获取商品列表
  productList: async (ctx, next) => {
    try {
      let list = await db.find("goods", {});
      ctx.body = {
        state: 0,
        msg: "suc",
        data: list
      };
    } catch (err) {
      ctx.body = {
        state: 1,
        msg: err.message
      };
    }
  }
};
