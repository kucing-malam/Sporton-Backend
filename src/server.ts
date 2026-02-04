import mongoose from "mongoose"
import dotenv from "dotenv"
import app from "./app"

dotenv.config() 
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI  || "no-mongo_uri"

mongoose.connect(MONGO_URI as string)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT as number, "0.0.0.0", () => {
            console.log("Server is running on ", PORT)
        })
    })    
    .catch((err) => { 
        console.log(" \n ")
        console.log("MONGO_URI: ", MONGO_URI)
        console.log(" \n ")
        console.log("Error connecting to mongoDB: ", err)
        console.log(" \n ")
    } 
)  