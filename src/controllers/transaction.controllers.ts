import { Request, Response } from "express"
import Transaction from "../models/transaction.model"
import productModel from "../models/product.model";
import transactionModel from "../models/transaction.model";

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactionData = req.body;
        if (req.file) {
            transactionData.imageUrl = req.file.path
        } else {
            res.status(400).json({ message: "Payment proof is required" })
            return
        }
        if (typeof transactionData.purchasedItems === "string") {
            try {
                transactionData.purchasedItems = JSON.parse(transactionData.purchasedItems)
            } catch (error) {
                res.status(400).json({ message: "Invalid format for purchasedItems" })
                return
            }
        }
        transactionData.status = "pending";
        const transaction = new Transaction(transactionData)
        await transaction.save()
        res.status(201).json(transaction)
    } catch (error) {
        res.status(500).json({ message: "Error creating transaction", error })
    }
}

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 }).populate("purchasedItem.productId")
        res.status(200).json(transactions) 
    } catch (error) {
        res.status(500).json({ message: "Error fetching transaction", error })
    }
}

export const getTransactionByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate("purchasedItem.productId")
        if (!transaction) {
            res.status(404).json({
                message: "Transaction not found"
            })
            return
        }
        res.status(200).json(transaction)
    } catch (error) {
        res.status(500).json({ message: "Error fetching transaction", error })
    }
}

export const updateTransactionByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const {status} = req.body

        const exsitingTansaction = await Transaction.findById(req.params.id)
        if (!exsitingTansaction) {
            res.status(404).json({
                message: "Transaction not found"
            })
            return
        }
        if (status === "paid" && exsitingTansaction.status !== "paid") {
            for (const item of exsitingTansaction.purchasedItems) {
                await productModel.findByIdAndUpdate(item.productId, {$inc: {stock: -item.qty }})
            }
        }
        const transaction = await transactionModel.findByIdAndUpdate(req.params.id, {status}, {new: true})
        res.status(200).json(transaction)
    } catch (error) {
        res.status(500).json({ message: "Error updateing transaction status" })
    }
}

export const deleteTransactionByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id)
        if (!transaction) {
            res.status(404).json({
                message: "Transaction not found"
            })
            return
        }
        res.status(200).json({ message: "Transaction deleted succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting transaction" })
    }
}
