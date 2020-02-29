const router = require("koa-router")();
let ControlGoods = require("../control/control-goods");

router.get("/good", ControlGoods.productList);
router.get("/addProduct", ControlGoods.addProduct);

module.exports = router;
