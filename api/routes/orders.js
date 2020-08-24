const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const orderController = require("../controller/orders");

router.get("/", checkAuth, orderController.getAllOrders);

router.post("/", checkAuth, orderController.createOrder);

router.get("/:orderId", checkAuth, orderController.getOrderById);

router.delete("/:orderId", checkAuth, orderController.deteOrder);

module.exports = router;
