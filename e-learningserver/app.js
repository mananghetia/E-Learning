// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url)

//Accessing .env variable using Dotenv
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "./config/config.env"
    })
}
import express from "express"
import ErrorMiddleware from "./middlewares/Error.js"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

// Using Middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);



import course from "./routes/courseRoutes.js"
import user from "./routes/userRoutes.js"
import payment from "./routes/paymentRoutes.js"
import other from "./routes/otherRoutes.js"

app.use("/api/v1", course)
app.use("/api/v1", user)
app.use("/api/v1", payment)
app.use("/api/v1", other)

const path = require("path")
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "../e-learning/build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../e-learning/build/index.html"))
})

app.use(ErrorMiddleware)

export default app