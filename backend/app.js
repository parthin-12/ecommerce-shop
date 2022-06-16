import express from "express";
import { errorHandler } from "./middleware/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Routers
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

////config

if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({ path: "backend/config/config.env" });
}

app.use("/api/v1/", product);
app.use("/api/v1/",user);
app.use("/api/v1/",order);
app.use("/api/v1/",payment);

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>(
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
))

app.use(errorHandler);

export default app;