"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const category_routers_1 = __importDefault(require("./routes/category.routers"));
const auth_routers_1 = __importDefault(require("./routes/auth.routers"));
const bank_routers_1 = __importDefault(require("./routes/bank.routers"));
const transaction_routers_1 = __importDefault(require("./routes/transaction.routers"));
const product_routers_1 = __importDefault(require("./routes/product.routers"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/api/auth", auth_routers_1.default);
app.use("/api/categories", category_routers_1.default);
app.use("/api/products", product_routers_1.default);
app.use("/api/transactions", transaction_routers_1.default);
app.use("/api/banks", bank_routers_1.default);
app.get("/", (req, res) => {
    res.status(200).json("Sporton Backend API is Running");
});
app.post("/test-middleware", auth_middleware_1.authenticate, (req, res) => {
    res.status(200).json("This endpoint use for public tes ting");
});
exports.default = app;
