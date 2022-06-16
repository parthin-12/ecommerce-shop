import express from "express";
import { createNewOrder, deleteOrder, getAllOrders, getSingleOrder, myOrders, updateOrder } from "../controllers/orderController.js";
import { isUserHaveAuth, userRole } from "../middleware/auth.js";

const router = express.Router();

router.route("/order/new").post(isUserHaveAuth,createNewOrder);

router.route("/order/:id").get(isUserHaveAuth,getSingleOrder);
router.route("/admin/orders").get(isUserHaveAuth,userRole("admin","master"),getAllOrders);
router.route("/admin/order/:id").put(isUserHaveAuth,userRole("admin","master"),updateOrder)
.delete(isUserHaveAuth,userRole("admin","master"),deleteOrder);
router.route("/orders/me").get(isUserHaveAuth,myOrders);

export default router;