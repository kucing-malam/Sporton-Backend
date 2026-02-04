"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductByID = exports.updateProductByID = exports.getProductByID = exports.getProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        if (req.file) {
            productData.imageUrl = req.file.path;
        }
        const product = new product_model_1.default(productData);
        yield product.save();
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.find().populate("category").sort({ createdAt: -1 });
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
});
exports.getProducts = getProducts;
const getProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(req.params.id).populate("category");
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
});
exports.getProductByID = getProductByID;
const updateProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        if (req.file) {
            productData.imageUrl = req.file.path;
        }
        const product = yield product_model_1.default.findByIdAndUpdate(req.params.id, productData, { new: true });
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating product" });
    }
});
exports.updateProductByID = updateProductByID;
const deleteProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }
        res.status(200).json({ message: "Product deleted succesfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
});
exports.deleteProductByID = deleteProductByID;
