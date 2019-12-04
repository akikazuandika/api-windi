import { Router } from 'express'
import Product from '../controllers/product.controller'
const router = Router()

router.get("/", Product.getAll)
router.get("/id/:id", Product.getById)
router.post("/", Product.create)
router.put("/update/:id", Product.update)
router.post("/delete/:id", Product.delete)

export default router