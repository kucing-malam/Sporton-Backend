import { Router } from "express"
import { upload } from "../middlewares/upload.middleware"
import { authenticate } from "../middlewares/auth.middleware"
import {
    createProduct,
    getProducts,
    updateProductByID,
    getProductByID,
    deleteProductByID
} from "../controllers/product.controllers"
const router = Router();

router.post('/', authenticate, upload.single("image"), createProduct)
router.get('/', getProducts)
router.get('/:id', getProductByID)
router.put('/:id', authenticate, upload.single("image"), updateProductByID)
router.delete('/:id', authenticate, deleteProductByID)

export default router