

let m_good = require("../models/m_good");

module.exports = {
  productAdd: async (ctx)=>{
    try{
      let findRes = await m_good.productAdd(ctx.request.body.data)
      console.log(findRes);
      ctx.body = {
        state : 1,
        msg:'suc',
      }
    }catch(err){
      ctx.body = {
        state : 0,
        msg:err,
      }
    }
    
  },
  // 获取商品列表
  productList: async (ctx, next) => {
    try {
      let list = await m_good.goodList("goods",ctx.request.query);
      ctx.body = {
        state: 1,
        msg: "suc",
        data: list
      };
    } catch (err) {
      ctx.body = {
        state: 0,
        msg: err.message
      };
    }
  }
};
