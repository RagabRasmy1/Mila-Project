const multer = require('multer');
const fs = require('fs');
const path = require('path');

const handlerAsync = require('../middleware/handlerAsync');
const categoryModel = require('../model/categoryModel');

// Multer Configuration
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/category');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `category_${req.user._id}_${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadImage = upload.single('image');

// Create Category
exports.addCateogry = handlerAsync(async (req, res, next) => {
    if (!req.file) return next(new Error("Image is required"));

    const category = await categoryModel.create({
        name: req.body.name,
        image: req.file.filename,
        createdBy: req.user._id
    });

    res.status(201).json({
        message: "Category created successfully",
        category
    });
});

// Get All Categories
exports.getAllCategory = handlerAsync(async (req, res, next) => {
    const categories = await categoryModel.find();
    res.json({ categories });
});

// Get Specific Category
exports.getSpecificCategory = handlerAsync(async (req, res, next) => {
    const category = await categoryModel.findById(req.params.id);
    if (!category) return next(new Error("Category not found"));

    res.json({ category });
});

// Update Category
exports.updateCategory = handlerAsync(async (req, res, next) => {
    const category = await categoryModel.findById(req.params.id);
    if (!category) return next(new Error("Category not found"));

    if (req.file) {
        // Delete old image if exists
        const oldImagePath = path.join('uploads/category', category.image);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }

        category.image = req.file.filename;
    }

    if (req.body.name) {
        category.name = req.body.name;
    }

    await category.save();

    res.status(202).json({
        message: "Category updated successfully",
        category
    });
});

// Delete Category
exports.deleteCategory = handlerAsync(async (req, res, next) => {
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if (!category) return next(new Error("Category not found"));

    // Delete associated image
    const imagePath = path.join('uploads/category', category.image);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }

    res.status(204).json({});
});