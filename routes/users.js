const router = require("koa-router")();

let ControlUser = require("../control/control-users");

// router.prefix('/users')

router.get("/", function(ctx, next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", function(ctx, next) {
  ctx.body = "this is a users/bar response";
});

router.post("/login", ControlUser.login);
router.post("/login-checkout", ControlUser.checkoutLogin);
router.post("/login-out", ControlUser.loginOut);
router.post("/user-cartlist", ControlUser.cartList);
router.post("/user-editcart", ControlUser.editCart);
router.post("/user-editaddr", ControlUser.editAddr);
router.post("/user-addrlist", ControlUser.addressList);
router.post("/user-payment", ControlUser.payment);

module.exports = router;
