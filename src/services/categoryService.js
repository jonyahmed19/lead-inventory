const Category = require('../models/categoryModel');

exports.getCategoriesService = async () =>{
    const categories = await Category.find({});
    return categories;
}
exports.createCategoryService = async (date) =>{
    const category = await Category.create(data);
    return category;
}