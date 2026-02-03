import { Router } from "express"
import { authenticate } from "../middlewares/auth.middleware"
import {
    createBank,
    getBanks,
    updateBankByID,
    getBankByID,
    deleteBankByID
} from "../controllers/bank.controllers"
const router = Router();

router.post('/', authenticate, createBank)
router.get('/', getBanks)
// router.get('/:id', getBankByID)
router.put('/:id', authenticate, updateBankByID)
router.delete('/:id', authenticate, deleteBankByID)

export default router