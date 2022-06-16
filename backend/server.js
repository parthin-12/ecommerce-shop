import app from "./app.js"
import dotenv from "dotenv";
import database from "./config/database.js";
import cloudinary from "cloudinary";

// Handing uncaught Expection error

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Server is Shutting down due to unhandledRejection error...");
    process.exit(1);
})

//config

// if(process.env.NODE_ENV!=="PRODUCTION"){
// }
dotenv.config({ path: "backend/config/config.env" });

database();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running in localhost ${process.env.PORT}`);
})

// unhandledRejection error
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);

    console.log("Server is Shutting down due to unhandledRejection error....");
    server.close(() => {
        process.exit(1);
    });
})