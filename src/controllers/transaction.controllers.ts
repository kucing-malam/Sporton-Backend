import { Request, Response } from "express"
import Transaction from "../models/transaction.model"

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactionData = req.body;
        if (req.file) {
            transactionData.imageUrl = req.file.path
        }
        const transaction = new Transaction(transactionData)
        await transaction.save()
        res.status(201).json(transaction)
    } catch (error) {
        res.status(500).json({ message: "Error creating transaction" })
    }
}

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        const transaction = await Transaction.find().sort({ createdAt: -1 })
        res.status(201).json(transaction)
    } catch (error) {
        res.status(500).json({ message: "Error fetching transaction" })
    }
}

export const getTransactionByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const transaction = await Transaction.findById(req.params.id)
        if (!transaction) {
            res.status(404).json({
                message: "Transaction not found"
            })
            return
        }
        res.status(201).json(transaction)
    } catch (error) {
        res.status(500).json({ message: "Error fetching transaction" })
    }
}

export const updateTransactionByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactionData = req.body
        if (req.file) {
            transactionData.imageUrl = req.file.path
        }
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, transactionData, { new: true })
        if (!transaction) {
            res.status(404).json({
                message: "Transaction not found"
            })
            return
        }
        res.status(201).json(transaction)
    } catch (error) {
        res.status(500).json({ message: "Error updateing transaction" })
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
        res.status(200).json({message: "Transaction deleted succesfully"})
    } catch (error) {
        res.status(500).json({ message: "Error deleting transaction" })
    }
}
