import { Router } from "express"
import { upload } from "../middlewares/upload.middleware"
import { Authenticate } from "../middlewares/auth.middleware"
import {
    createProduct,
    getProducts,
    updateProductByID,
    getProductByID,
    deleteProductByID
} from "../controllers/product.controllers"
const router = Router();

router.post('/', Authenticate, upload.single("image"), createProduct)
router.get('/', getProducts)
router.get('/:id', getProductByID)
router.put('/:id', Authenticate, upload.single("image"), updateProductByID)
router.delete('/:id', Authenticate, deleteProductByID)

export default router