"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const bank_controllers_1 = require("../controllers/bank.controllers");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, bank_controllers_1.createBank);
router.get('/', bank_controllers_1.getBanks);
// router.get('/:id', getBankByID)
router.put('/:id', auth_middleware_1.authenticate, bank_controllers_1.updateBankByID);
router.delete('/:id', auth_middleware_1.authenticate, bank_controllers_1.deleteBankByID);
exports.default = router;
