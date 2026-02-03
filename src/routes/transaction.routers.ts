import { Router } from "express"
import { upload } from "../middlewares/upload.middleware"
import { authenticate } from "../middlewares/auth.middleware"
import {
    createTransaction,
    getTransactions,
    updateTransactionByID,
    getTransactionByID,
    deleteTransactionByID
} from "../controllers/transaction.controllers"
const router = Router();

router.post('/checkout', upload.single("image"), createTransaction)
router.get('/', authenticate, getTransactions)
router.get('/:id', getTransactionByID)
// router.put('/:id', authenticate, upload.single("image"), updateTransactionByID)
router.put('/:id', authenticate, updateTransactionByID)
// router.delete('/:id', authenticate, deleteTransactionByID)

export default router