let m_user = require("../models/m_user");

module.exports = {
  addressList: async ctx => {
    try {
      let { addressList } = await m_user.addressList(ctx.request.body.data);
      ctx.body = {
        state: 1,
        msg: "suc",
        data: {
          addressList
        }
      };
    } catch (err) {
      ctx.body = {
        state: 0,
        msg: err.message
      };
    }
  },
  editAddr: async ctx => {
    try {
      let editAddrRes = await m_user.editAddr(ctx.request.body.data);
      ctx.body = {
        state: 1,
        msg: "suc"
      };
    } catch (err) {
      ctx.body = {
        state: 0,
        msg: err.message
      };
    }
  },
  editCart: async ctx => {
    try {
      let editRes = await m_user.editCart(ctx.request.body.data);
      ctx.body = {
        state: 1,
        msg: "suc",
        data: {}
      };
    } catch (err) {
      ctx.body = {
        state: 0,
        msg: err.message
      };
    }
  },
  cartList: async ctx => {
    let user_id = ctx.cookies.get("c_user");
    let cartRes = await m_user.cartList({ user_id });
    if (cartRes.length) {
      ctx.body = {
        state: 1,
        msg: "suc",
        data: {
          cartList: cartRes[0].cartList,
          username: cartRes[0].userName
        }
      };
    } else {
      ctx.body = {
        state: 0,
        msg: "查询不到该用户"
      };
    }
  },
  login: async ctx => {
    try {
      let res = await m_user.login(ctx.request.body.data);
      if (res.length > 0) {
        ctx.cookies.set("c_user", res[0]["_id"]);
        ctx.body = {
          state: 1,
          msg: "",
          data: {
            userName: res[0].userName,
            userId: res[0]["_id"]
          }
        };
      } else {
        ctx.body = {
          state: 0,
          msg: "账号或密码不正确"
        };
      }
    } catch (err) {
      ctx.body = {
        state: 0,
        msg: err.message
      };
    }
  },
  checkoutLogin: async ctx => {
    let user_id = ctx.cookies.get("c_user");
    if (user_id) {
      let checkoutRes = await m_user.checkoutLogin(user_id);
      if (checkoutRes.length > 0) {
        ctx.body = {
          state: 1,
          msg: "suc",
          data: {
            userName: checkoutRes[0].userName,
            userId: checkoutRes[0]["_id"]
          }
        };
      } else {
        ctx.body = {
          state: 0,
          msg: "未登录"
        };
      }
    } else {
      ctx.body = {
        state: 0,
        msg: "未登录"
      };
    }
  },
  loginOut: async ctx => {
    ctx.cookies.set("c_user", "");
    ctx.body = {
      state: 1,
      msg: "suc"
    };
  },
  payment: async ctx => {
    let res = await m_user.payment(ctx.request.body.data);
    ctx.body = {
      state: 1,
      msg: "suc",
      data: {
        img: "ok-2.png",
        ...res
      }
    };
  }
};
