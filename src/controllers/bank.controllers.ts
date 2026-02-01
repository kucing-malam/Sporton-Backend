import { Request, Response } from "express"
import Bank from "../models/bank.model"

export const createBank = async (req: Request, res: Response): Promise<void> => {
    try {
        const bankData = req.body;
        const bank = new Bank(bankData)
        await bank.save()
        res.status(201).json(bank)
    } catch (error) {
        res.status(500).json({ message: "Error creating bank" })
    }
}

export const getBanks = async (req: Request, res: Response): Promise<void> => {
    try {
        const bank = await Bank.find().sort({ createdAt: -1 })
        res.status(201).json(bank)
    } catch (error) {
        res.status(500).json({ message: "Error fetching bank" })
    }
}

export const getBankByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const bank = await Bank.findById(req.params.id)
        if (!bank) {
            res.status(404).json({
                message: "Bank not found"
            })
            return
        }
        res.status(201).json(bank)
    } catch (error) {
        res.status(500).json({ message: "Error fetching bank" })
    }
}

export const updateBankByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const bankData = req.body
        const bank = await Bank.findByIdAndUpdate(req.params.id, bankData, { new: true })
        if (!bank) {
            res.status(404).json({
                message: "Bank not found"
            })
            return
        }
        res.status(201).json(bank)
    } catch (error) {
        res.status(500).json({ message: "Error updateing bank" })
    }
}

export const deleteBankByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const bank = await Bank.findByIdAndDelete(req.params.id)
        if (!bank) {
            res.status(404).json({
                message: "Bank not found"
            })
            return
        }
        res.status(200).json({ message: "Bank deleted succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting bank" })
    }
}
