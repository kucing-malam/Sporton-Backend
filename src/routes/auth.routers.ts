import {Router} from "express"
import {sigin, initiateAdmin} from "../controllers/auth.controllers"
const router = Router();

router.post('/signin', sigin)
router.post('/initiate-admin-user', initiateAdmin)

export default router