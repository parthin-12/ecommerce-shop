import express from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct, createProductReview, getProductReviews, deleteProductReview, createCategory, updateCategory} from "../controllers/productController.js";
import { isUserHaveAuth, userRole } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isUserHaveAuth,userRole("admin","master"),createProduct);
router.route("/product/:id").put(isUserHaveAuth,userRole("admin","master"),updateProduct);
router.route("/product/:id").delete(isUserHaveAuth,userRole("admin","master"),deleteProduct);
router.route("/review").put(isUserHaveAuth,createProductReview);
router.route("/reviews").get(isUserHaveAuth,userRole("admin","master"),getProductReviews)
.delete(isUserHaveAuth,userRole("admin","master"),deleteProductReview);

router.route("/product/:id").get(getProduct);

router.route("/category/create").put(isUserHaveAuth,userRole("admin","master"),createCategory);
router.route("/category/update").put(isUserHaveAuth,userRole("admin","master"),updateCategory);


export default router;