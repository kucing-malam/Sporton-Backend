import { Router } from "express"
import { Authenticate } from "../middlewares/auth.middleware"
import {
    createBank,
    getBanks,
    updateBankByID,
    getBankByID,
    deleteBankByID
} from "../controllers/bank.controllers"
const router = Router();

router.post('/', Authenticate, createBank)
router.get('/', getBanks)
router.get('/:id', getBankByID)
router.put('/:id', Authenticate, updateBankByID)
router.delete('/:id', Authenticate, deleteBankByID)

export default router