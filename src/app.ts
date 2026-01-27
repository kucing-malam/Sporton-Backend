import express from "express";
import cors from "cors";
import authRouters from "./routes/auth.routers";
import { Authenticate } from "./middlewares/auth.middleware";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouters)

app.get("/", (req, res) => {
    res.send("Sporton Backend API is Running")
})

app.post("/test-middleware", Authenticate, (req, res) => {
    res.send("This endpoint use for public tes ting")
})

export default app