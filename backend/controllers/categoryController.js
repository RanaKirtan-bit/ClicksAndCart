import categoryModel from '../models/categoryModel.js';

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new categoryModel({ name, description });
        await category.save();
        res.json({ success: true, message: "Category added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const listCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.json({ success: true, categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const removeCategory = async (req, res) => {
    try {
        const { id } = req.body;
        await categoryModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Category removed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addCategory, listCategories, removeCategory };
