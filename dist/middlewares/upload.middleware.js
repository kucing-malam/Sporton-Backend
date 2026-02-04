"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uploadDir = path_1.default.join(__dirname, "../uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSufix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSufix + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only Image are allowed"));
    }
};
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});
