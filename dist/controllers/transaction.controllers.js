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
exports.deleteTransactionByID = exports.updateTransactionByID = exports.getTransactionByID = exports.getTransactions = exports.createTransaction = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const transaction_model_2 = __importDefault(require("../models/transaction.model"));
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionData = req.body;
        if (req.file) {
            transactionData.imageUrl = req.file.path;
        }
        else {
            res.status(400).json({ message: "Payment proof is required" });
            return;
        }
        if (typeof transactionData.purchasedItems === "string") {
            try {
                transactionData.purchasedItems = JSON.parse(transactionData.purchasedItems);
            }
            catch (error) {
                res.status(400).json({ message: "Invalid format for purchasedItems" });
                return;
            }
        }
        transactionData.status = "pending";
        const transaction = new transaction_model_1.default(transactionData);
        yield transaction.save();
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating transaction", error });
    }
});
exports.createTransaction = createTransaction;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transaction_model_1.default.find().sort({ createdAt: -1 }).populate("purchasedItem.productId");
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching transaction", error });
    }
});
exports.getTransactions = getTransactions;
const getTransactionByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield transaction_model_1.default.findById(req.params.id).populate("purchasedItem.productId");
        if (!transaction) {
            res.status(404).json({
                message: "Transaction not found"
            });
            return;
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching transaction", error });
    }
});
exports.getTransactionByID = getTransactionByID;
const updateTransactionByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const exsitingTansaction = yield transaction_model_1.default.findById(req.params.id);
        if (!exsitingTansaction) {
            res.status(404).json({
                message: "Transaction not found"
            });
            return;
        }
        if (status === "paid" && exsitingTansaction.status !== "paid") {
            for (const item of exsitingTansaction.purchasedItems) {
                yield product_model_1.default.findByIdAndUpdate(item.productId, { $inc: { stock: -item.qty } });
            }
        }
        const transaction = yield transaction_model_2.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.status(200).json(transaction);
    }
    catch (error) {
        res.status(500).json({ message: "Error updateing transaction status" });
    }
});
exports.updateTransactionByID = updateTransactionByID;
const deleteTransactionByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield transaction_model_1.default.findByIdAndDelete(req.params.id);
        if (!transaction) {
            res.status(404).json({
                message: "Transaction not found"
            });
            return;
        }
        res.status(200).json({ message: "Transaction deleted succesfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting transaction" });
    }
});
exports.deleteTransactionByID = deleteTransactionByID;
