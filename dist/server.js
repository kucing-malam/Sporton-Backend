"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || "3000";
const MONGO_URI = process.env.MONGO_URI || "no-mongo_uri";
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    app_1.default.listen(PORT, "0.0.0.0", () => {
        console.log("Server is running on ", PORT);
    });
})
    .catch((err) => {
    console.log(" \n ");
    console.log("MONGO_URI: ", MONGO_URI);
    console.log(" \n ");
    console.log("Error connecting to mongoDB: ", err);
    console.log(" \n ");
});
