"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryByID = exports.updateCategoryByID = exports.getCategoryByID = exports.getCategories = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        if (req.file) {
            categoryData.imageUrl = req.file.path;
        }
        const category = new category_model_1.default(categoryData);
        yield category.save();
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating category" });
    }
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching categories" });
    }
});
exports.getCategories = getCategories;
const getCategoryByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.default.findById(req.params.id);
        if (!category) {
            res.status(404).json({
                message: "Category not found"
            });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching categories" });
    }
});
exports.getCategoryByID = getCategoryByID;
const updateCategoryByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        if (req.file) {
            categoryData.imageUrl = req.file.path;
        }
        const category = yield category_model_1.default.findByIdAndUpdate(req.params.id, categoryData, { new: true });
        if (!category) {
            res.status(404).json({
                message: "Category not found"
            });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Error updateing categories" });
    }
});
exports.updateCategoryByID = updateCategoryByID;
const deleteCategoryByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.default.findByIdAndDelete(req.params.id);
        if (!category) {
            res.status(404).json({
                message: "Category not found"
            });
            return;
        }
        res.status(200).json({ message: "Category deleted succesfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting categories" });
    }
});
exports.deleteCategoryByID = deleteCategoryByID;
