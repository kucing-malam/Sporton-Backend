import express from "express";
import cors from "cors";
import path from "path";
import categoryRouters from "./routes/category.routers";
import authRouters from "./routes/auth.routers";
import bankRouters from "./routes/bank.routers";
import transactionRouters from "./routes/transaction.routers";
import productRouters from "./routes/product.routers";
import { Authenticate } from "./middlewares/auth.middleware";

const app = express()

app.use(cors())
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({limit: "10mb", extended: true}))
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.use("/api/auth", authRouters)
app.use("/api/categories", categoryRouters)
app.use("/api/products", productRouters)
app.use("/api/transactions", transactionRouters)
app.use("/api/banks", bankRouters)

app.get("/", (req, res) => {
    res.send("Sporton Backend API is Running")
})

app.post("/test-middleware", Authenticate, (req, res) => {
    res.send("This endpoint use for public tes ting")
})

export default app 