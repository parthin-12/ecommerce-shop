import express from "express";
import { processPayment, sendStripeApiKey } from "../controllers/paymentController.js";
import { isUserHaveAuth} from "../middleware/auth.js";

const router=express.Router();

router.route("/order/payment/process").post(isUserHaveAuth,processPayment);
router.route("/stripeApikey").get(isUserHaveAuth,sendStripeApiKey);

export default router;