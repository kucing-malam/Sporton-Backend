import { Router } from "express"
import { upload } from "../middlewares/upload.middleware"
import { authenticate } from "../middlewares/auth.middleware"
import {
    createCategory,
    getCategories,
    updateCategoryByID,
    getCategoryByID,
    deleteCategoryByID
} from "../controllers/category.controllers"
const router = Router();

router.post('/', authenticate, upload.single("image"), createCategory)
router.get('/', getCategories)
router.get('/:id', getCategoryByID)
router.put('/:id', authenticate, upload.single("image"), updateCategoryByID)
router.delete('/:id', authenticate, deleteCategoryByID)

export default router