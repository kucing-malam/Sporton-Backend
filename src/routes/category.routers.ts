import { Router } from "express"
import { upload } from "../middlewares/upload.middleware"
import { Authenticate } from "../middlewares/auth.middleware"
import {
    createCategory,
    getCategories,
    updateCategoryByID,
    getCategoryByID,
    deleteCategoryByID
} from "../controllers/category.controllers"
const router = Router();

router.post('/', Authenticate, upload.single("image"), createCategory)
router.get('/', getCategories)
router.get('/:id', getCategoryByID)
router.put('/:id', Authenticate, upload.single("image"), updateCategoryByID)
router.delete('/:id', Authenticate, deleteCategoryByID)

export default router