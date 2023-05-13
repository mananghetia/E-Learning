import app from "./app.js"
import { connectDB } from "./config/database.js"
import cloudinary from "cloudinary"
import RazorPay from "razorpay"
import nodeCron from "node-cron"
import { Stats } from "./models/Stats.js"

import { createRequire } from "module";
const require = createRequire(import.meta.url)

//Accessing .env variable using Dotenv
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "./config/config.env"
    })
}

connectDB()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
})

export const instance = new RazorPay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

//1st day of every month
nodeCron.schedule("0 0 0 1 * *", async () => {
    try {
        await Stats.create({});
    } catch (error) {
        console.log(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is working on port: ${process.env.PORT}`);
})