const Product = require('../models/productModel');

exports.getProductsService = async (filters, queries) =>{
    const products = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const total = await  Product.countDocuments(filters);
    const page = Math.ceil(total/queries.limit);
    return {total, page, products}
}
exports.getSingleProductService = async (id) =>{
    const product = await  Product.findOne(id);
    return product;
}
exports.createProductService = async (data) =>{
    const product = await  Product.create(data);
    return product;
}
exports.updateProductByIdService = async (productId, data) =>{
    const product = await  Product.updateOne({_id: productId},
        {
            $set: data
        },
        {
            runValidators: true
        });
    return product;
}
exports.bulkUpdateProductService = async (data) => {
    const result = await Product.updateMany({_id: data.ids}, data, {
        runValidators: true
    })

    return result;
}
exports.bulkDeleteProductService = async (ids) =>{
    const result = await Product.deleteMany(({_id: ids}));
    return result;
}
