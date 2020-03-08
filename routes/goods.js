const router = require("koa-router")();
let ControlGoods = require("../control/control-goods");

router.get("/goods", ControlGoods.productList);

router.post("/goods-add", ControlGoods.productAdd);
// router.get("/addProduct", ControlGoods.addProduct);

module.exports = router;
