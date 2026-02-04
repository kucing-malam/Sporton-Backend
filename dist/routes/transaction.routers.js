"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const transaction_controllers_1 = require("../controllers/transaction.controllers");
const router = (0, express_1.Router)();
router.post('/checkout', upload_middleware_1.upload.single("image"), transaction_controllers_1.createTransaction);
router.get('/', auth_middleware_1.authenticate, transaction_controllers_1.getTransactions);
router.get('/:id', transaction_controllers_1.getTransactionByID);
// router.put('/:id', authenticate, upload.single("image"), updateTransactionByID)
router.put('/:id', auth_middleware_1.authenticate, transaction_controllers_1.updateTransactionByID);
// router.delete('/:id', authenticate, deleteTransactionByID)
exports.default = router;
