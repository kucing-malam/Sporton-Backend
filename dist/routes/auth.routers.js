"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const router = (0, express_1.Router)();
router.post('/signin', auth_controllers_1.sigin);
router.post('/initiate-admin-user', auth_controllers_1.initiateAdmin);
exports.default = router;
